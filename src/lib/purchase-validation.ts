import { PAYMENT_METHODS } from '@/data/store';

export const SENDER_NUMBER_MAX_LENGTH = 32;
export const TRANSACTION_ID_MAX_LENGTH = 120;
export const PURCHASE_FIELD_ORDER = ['duration', 'payment', 'sender', 'transaction'] as const;
export type PurchaseField = (typeof PURCHASE_FIELD_ORDER)[number];
export type PurchaseErrors = Partial<Record<PurchaseField, string>>;

type PurchaseInput = {
  duration: string | undefined;
  paymentMethod: string | undefined;
  senderNumber: string;
  transactionId: string;
};

/** Basic format checking only: this cannot verify an account or a payment. */
export function isValidSenderNumber(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length > SENDER_NUMBER_MAX_LENGTH || !/^\+?[0-9][0-9 -]*[0-9]$/.test(trimmed)) return false;
  const digits = trimmed.replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/** Independent, field-specific errors; never changes prices or payment options. */
export function validatePurchaseDetails(input: PurchaseInput): PurchaseErrors {
  const errors: PurchaseErrors = {};
  if (!input.duration?.trim()) errors.duration = 'Choose a listed duration, or contact support if none is available.';
  if (!PAYMENT_METHODS.some((method) => method.id === input.paymentMethod)) {
    errors.payment = 'Choose a payment method with a listed amount. Otherwise, confirm with support before paying.';
  }
  if (input.paymentMethod === 'bkash' || input.paymentMethod === 'nagad') {
    if (!isValidSenderNumber(input.senderNumber)) {
      errors.sender = 'Enter 7–15 digits. A leading +, spaces and hyphens are allowed.';
    }
  }
  const transaction = input.transactionId.trim();
  if (!transaction) errors.transaction = 'Enter the transaction ID/number from your payment receipt.';
  else if (transaction.length > TRANSACTION_ID_MAX_LENGTH || /[\u0000-\u001f\u007f]/.test(transaction)) {
    errors.transaction = 'Use a single-line transaction ID of 120 characters or fewer.';
  }
  return errors;
}
