'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type Lenis from 'lenis';
import { useRouter } from 'next/navigation';
import type { Product } from '@/data/products';
import { PAYMENT_METHODS } from '@/data/store';
import { formatPriceOption } from '@/lib/format';
import { getPaymentOptions, selectPaymentOption } from '@/lib/purchase';
import { PURCHASE_FIELD_ORDER, SENDER_NUMBER_MAX_LENGTH, TRANSACTION_ID_MAX_LENGTH, validatePurchaseDetails, type PurchaseErrors, type PurchaseField } from '@/lib/purchase-validation';
import { CopyButton } from '@/components/copy-button';
import { useOrderContext } from '@/components/order-context';
import { usePurchaseSelection } from '@/components/purchase-selection';
import { useHydrated } from '@/components/use-hydrated';

export function PurchaseForm({ product }: { product: Product }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const { setOrder } = useOrderContext();
  const { duration, setDuration } = usePurchaseSelection();
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState<string>(PAYMENT_METHODS[0]?.id ?? '');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState<PurchaseErrors>({});
  const [attempt, setAttempt] = useState(0);
  const focusTarget = useRef<PurchaseField | 'summary' | null>(null);
  const errorSummary = useRef<HTMLParagraphElement | null>(null);
  const preparing = useRef(false);
  const [busy, setBusy] = useState(false);

  const price = useMemo(
    () => product.prices.find((item) => item.duration === duration),
    [duration, product.prices],
  );
  const paymentOptions = useMemo(() => getPaymentOptions(price), [price]);
  const selectedPayment = selectPaymentOption(paymentOptions, preferredPaymentMethod);
  const payment = selectedPayment?.method;
  const paymentMethod = payment?.id ?? '';
  const needsSenderNumber = !!payment && payment.id !== 'binance';
  const paymentHelpId = `payment-help-${product.slug}`;

  const clearError = useCallback((field: PurchaseField) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  // A changed duration/method must not leave an irrelevant error behind.
  useEffect(() => {
    clearError('duration');
    clearError('payment');
    if (!needsSenderNumber) clearError('sender');
  }, [duration, paymentMethod, needsSenderNumber, clearError]);

  useLayoutEffect(() => {
    const field = focusTarget.current;
    focusTarget.current = null;
    if (!field) return;
    const input = field === 'summary' ? null : document.getElementById(`${field}-${product.slug}`);
    const target = input && !input.matches(':disabled') ? input : errorSummary.current;
    if (!target) return;
    target.focus({ preventScroll: true });
    const scrollTarget = target.closest<HTMLElement>('[data-purchase-field]') ?? target;
    const top = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 72) + 16;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(scrollTarget, { immediate: true, offset: -top });
    else window.scrollTo({ top: window.scrollY + scrollTarget.getBoundingClientRect().top - top, behavior: 'instant' });
  }, [attempt, product.slug]);

  const fieldError = (field: PurchaseField) => errors[field] ? (
    <p id={`${field}-error-${product.slug}`} className="field-error">Error: {errors[field]}</p>
  ) : null;

  const prepareSummary = (event: FormEvent<HTMLFormElement>) => {
    // This form is local only: never allow a browser request with payment data.
    event.preventDefault();
    if (!hydrated || preparing.current) return;
    setFormError('');
    const nextErrors = validatePurchaseDetails({
      duration: price?.duration,
      paymentMethod: selectedPayment?.method.id,
      senderNumber,
      transactionId,
    });
    setErrors(nextErrors);
    const firstError = PURCHASE_FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstError) {
      focusTarget.current = firstError;
      setAttempt((count) => count + 1);
      return;
    }
    // Defensive guard; valid real options always reach this point together.
    if (!price || !payment || !selectedPayment) return;
    preparing.current = true;
    setBusy(true);
    try {
      const reference = `ABN-${Date.now().toString(36).toUpperCase()}`;
      setOrder({
        reference,
        productSlug: product.slug,
        productName: product.name,
        platform: product.platform,
        duration: price.duration,
        priceLabel: selectedPayment.amountLabel,
        paymentMethod: payment.id,
        paymentDestination: payment.value,
        senderNumber: needsSenderNumber ? senderNumber.trim() : '',
        transactionId: transactionId.trim(),
      });
      router.push('/order-confirmation');
    } catch {
      setFormError('Could not prepare the payment summary. Please try again.');
      setBusy(false);
      preparing.current = false;
      focusTarget.current = 'summary';
      setAttempt((count) => count + 1);
    }
  };

  return (
    <form className="panel overflow-hidden" onSubmit={prepareSummary} noValidate aria-labelledby={`purchase-title-${product.slug}`}>
      <div className="border-b border-ink-700/70 bg-ink-900/45 p-5 sm:p-6">
        <span className="eyebrow">Manual payment · no account required</span>
        <h3 id={`purchase-title-${product.slug}`} className="mt-2 font-display text-2xl text-bone-50">Prepare your payment summary</h3>
        <p className="mt-2 text-sm leading-relaxed text-bone-400">
          Before paying, confirm the product, duration, amount and payment method with support. After you pay, enter the details below to prepare a copyable summary. No login is needed, and nothing is sent to support by this website.
        </p>
        <noscript>
          <p className="panel-quiet mt-4 p-4 text-sm leading-relaxed text-bone-100">
            JavaScript is off, so this page cannot prepare a summary. Read the full
            duration and price list above, then use the support links below to confirm
            your choice before paying. After payment, send your product, duration,
            payment method, amount, transaction ID and receipt directly to support.
            You can select the displayed account number to copy it manually.
          </p>
        </noscript>
      </div>
      <div className="space-y-5 p-5 sm:p-6">
        {formError || Object.keys(errors).length > 0 ? (
          <p ref={errorSummary} tabIndex={-1} role="alert" className="rounded-xl border border-crimson-700/70 bg-crimson-950/50 p-3 text-sm leading-relaxed text-crimson-200">
            {formError || 'Your summary has not been prepared. Please check the highlighted details below.'}
          </p>
        ) : null}
        <div data-purchase-field="duration">
          <label htmlFor={`duration-${product.slug}`} className="field-label">Choose duration</label>
          <select disabled={!hydrated} id={`duration-${product.slug}`} value={duration} onChange={(event) => setDuration(event.target.value)} className="field mt-2 w-full" required aria-invalid={!!errors.duration} aria-describedby={errors.duration ? `duration-error-${product.slug}` : undefined}>
            {product.prices.map((item) => (
              <option key={item.duration} value={item.duration}>{item.duration} — {formatPriceOption(item)}</option>
            ))}
          </select>
          {fieldError('duration')}
        </div>

        {price ? (
          <div
            id={`duration-summary-${product.slug}`}
            tabIndex={-1}
            className="panel-quiet flex flex-wrap items-center justify-between gap-2 p-4"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-sm text-bone-300">Total for {price.duration}</span>
            <strong className="font-mono text-lg text-bone-50">{formatPriceOption(price)}</strong>
          </div>
        ) : null}

        <div data-purchase-field="payment">
          <label htmlFor={`payment-${product.slug}`} className="field-label">Payment method</label>
          <select
            id={`payment-${product.slug}`}
            value={paymentMethod}
            onChange={(event) => setPreferredPaymentMethod(event.target.value)}
            className="field mt-2 w-full"
            aria-invalid={!!errors.payment}
            aria-describedby={[paymentHelpId, errors.payment ? `payment-error-${product.slug}` : ''].filter(Boolean).join(' ')}
            required
            disabled={!hydrated || paymentOptions.length === 0}
          >
            {paymentOptions.length === 0 ? <option value="">Confirm with support</option> : null}
            {paymentOptions.map((option) => (
              <option key={option.method.id} value={option.method.id}>
                {option.method.name} — {option.amountLabel}
              </option>
            ))}
          </select>
          {fieldError('payment')}
          <p id={paymentHelpId} className="mt-2 text-xs leading-relaxed text-bone-400">
            Only methods with a listed amount for this duration are shown. For another currency,
            confirm the amount with support before paying. No automatic conversion is used.
          </p>
        </div>

        {payment && selectedPayment ? (
          <div className="panel-quiet p-4 sm:p-5">
            <p className="text-sm text-bone-300" aria-live="polite" aria-atomic="true">
              Amount for {payment.name}:{' '}
              <strong className="font-mono text-lg text-bone-50">{selectedPayment.amountLabel}</strong>
            </p>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="eyebrow">Send payment to</span>
                <h4 className="mt-2 font-display text-lg text-bone-50">{payment.name}{payment.kind ? ` · ${payment.kind}` : ''}</h4>
                <p className="mt-1 break-all font-mono text-base text-bone-100">{payment.value}</p>
              </div>
              <CopyButton value={payment.value} label="Copy account" />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-bone-400">
              Confirm this product, duration and amount with support before sending payment.
              Never share a PIN, OTP, password or wallet private key.
            </p>
          </div>
        ) : (
          <p className="panel-quiet p-4 text-sm leading-relaxed text-bone-300">
            No payment method has a listed amount for this duration. Please contact support before paying.
          </p>
        )}

        {needsSenderNumber ? (
          <div data-purchase-field="sender">
            <label htmlFor={`sender-${product.slug}`} className="field-label">Your payment phone number</label>
            <input
              disabled={!hydrated}
              id={`sender-${product.slug}`}
              value={senderNumber}
              onChange={(event) => { setSenderNumber(event.target.value); clearError('sender'); }}
              className="field mt-2 w-full"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Number you sent the payment from"
              required
              maxLength={SENDER_NUMBER_MAX_LENGTH}
              aria-invalid={!!errors.sender}
              aria-describedby={[`sender-help-${product.slug}`, errors.sender ? `sender-error-${product.slug}` : ''].filter(Boolean).join(' ')}
            />
            {fieldError('sender')}
            <p id={`sender-help-${product.slug}`} className="mt-1.5 text-xs text-bone-400">Use the number that sent the bKash/Nagad transfer, not the recipient account shown above.</p>
          </div>
        ) : payment ? (
          <div className="panel-quiet p-4 text-sm leading-relaxed text-bone-300">For Binance, only the transaction number/ID is required. No phone number is needed.</div>
        ) : null}

        <div data-purchase-field="transaction">
          <label htmlFor={`transaction-${product.slug}`} className="field-label">{paymentMethod === 'binance' ? 'Binance transaction number / ID' : 'Transaction ID'}</label>
          <input
            id={`transaction-${product.slug}`}
            value={transactionId}
            onChange={(event) => { setTransactionId(event.target.value); clearError('transaction'); }}
            className="field mt-2 w-full"
            autoComplete="off"
            placeholder="Copy it exactly from your receipt"
            required
            maxLength={TRANSACTION_ID_MAX_LENGTH}
            disabled={!hydrated || !payment}
            aria-invalid={!!errors.transaction}
            aria-describedby={[`transaction-help-${product.slug}`, errors.transaction ? `transaction-error-${product.slug}` : ''].filter(Boolean).join(' ')}
          />
          {fieldError('transaction')}
          <p id={`transaction-help-${product.slug}`} className="mt-1.5 text-xs text-bone-400">Enter the transaction reference only. Never enter a PIN or OTP.</p>
        </div>

        <button type="submit" disabled={!hydrated || busy || !selectedPayment} className="btn btn-primary w-full justify-center">{busy ? 'Preparing summary…' : 'Prepare summary & continue'}</button>
        <p className="text-xs leading-relaxed text-bone-500">Next, copy your summary and send it yourself through WhatsApp, Telegram or Discord with your payment screenshot. Preparing a summary does not submit an order or verify a payment. Staff verify the proof you send before delivery.</p>
      </div>
    </form>
  );
}
