import type { PriceOption } from '@/data/products';
import { PAYMENT_METHODS, type PaymentMethod } from '@/data/store';
import { formatBdt, formatUsd } from '@/lib/format';

export type PaymentOption = {
  method: PaymentMethod;
  amount: number;
  amountLabel: string;
};

/**
 * Only offer a payment method when this exact duration has a usable amount in
 * that method's currency. Missing prices are never inferred or converted.
 */
export function getPaymentOptions(
  price: PriceOption | undefined,
  methods: readonly PaymentMethod[] = PAYMENT_METHODS,
): PaymentOption[] {
  if (!price) return [];

  return methods.flatMap((method) => {
    const amount = method.currency === 'BDT' ? price.bdt : price.usd;
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) return [];

    const formatted = method.currency === 'BDT' ? formatBdt(amount) : formatUsd(amount);
    return [{ method, amount, amountLabel: `${formatted} ${method.currency}` }];
  });
}

/** Keep a buyer's choice if it is still valid; otherwise use a listed option. */
export function selectPaymentOption(
  options: readonly PaymentOption[],
  preferredMethodId: string,
): PaymentOption | undefined {
  return options.find((option) => option.method.id === preferredMethodId) ?? options[0];
}
