import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { PRODUCTS, type PriceOption } from '../src/data/products.ts';
import { PAYMENT_METHODS } from '../src/data/store.ts';
import { getPaymentOptions, selectPaymentOption } from '../src/lib/purchase.ts';

const dualCurrency: PriceOption = { duration: '1 Day', usd: 2, bdt: 250 };
const bdtOnly: PriceOption = { duration: '1 Hour', bdt: 21.12 };
const usdOnly: PriceOption = { duration: '1 Year', usd: 5 };

describe('currency-safe payment options', () => {
  it('preserves the exact dual-currency amounts without converting them', () => {
    assert.deepEqual(
      getPaymentOptions(dualCurrency).map(({ method, amount, amountLabel }) => ({
        id: method.id,
        amount,
        amountLabel,
      })),
      [
        { id: 'bkash', amount: 250, amountLabel: '৳250 BDT' },
        { id: 'nagad', amount: 250, amountLabel: '৳250 BDT' },
        { id: 'binance', amount: 2, amountLabel: '$2 USD' },
      ],
    );
  });

  it('offers only Binance for a USD-only option', () => {
    const options = getPaymentOptions(usdOnly);
    assert.deepEqual(options.map((option) => option.method.id), ['binance']);
    assert.equal(options[0].amountLabel, '$5 USD');
  });

  it('offers only bKash and Nagad for a BDT-only option, preserving decimals', () => {
    const options = getPaymentOptions(bdtOnly);
    assert.deepEqual(options.map((option) => option.method.id), ['bkash', 'nagad']);
    assert.ok(options.every((option) => option.amount === 21.12));
    assert.ok(options.every((option) => option.amountLabel === '৳21.12 BDT'));
  });

  it('keeps the preferred method when its currency is still listed', () => {
    assert.equal(selectPaymentOption(getPaymentOptions(dualCurrency), 'nagad')?.method.id, 'nagad');
    assert.equal(selectPaymentOption(getPaymentOptions(bdtOnly), 'nagad')?.method.id, 'nagad');
  });

  it('falls back immediately when a duration no longer supports the preferred method', () => {
    assert.equal(selectPaymentOption(getPaymentOptions(usdOnly), 'bkash')?.method.id, 'binance');
    assert.equal(selectPaymentOption(getPaymentOptions(bdtOnly), 'binance')?.method.id, 'bkash');
  });

  it('does not offer a payment for an absent, non-finite or non-positive amount', () => {
    assert.deepEqual(getPaymentOptions(undefined), []);
    assert.deepEqual(getPaymentOptions({ duration: '1 Day' }), []);
    for (const amount of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      assert.deepEqual(getPaymentOptions({ duration: '1 Day', usd: amount, bdt: amount }), []);
    }
    assert.equal(selectPaymentOption([], 'bkash'), undefined);
  });

  it('keeps a valid currency available when the other configured amount is invalid', () => {
    assert.deepEqual(
      getPaymentOptions({ duration: '1 Day', usd: Number.NaN, bdt: 250 }).map((option) => option.method.id),
      ['bkash', 'nagad'],
    );
  });

  it('does not mutate prices or payment-method configuration', () => {
    const price = Object.freeze({ ...dualCurrency });
    const methods = Object.freeze(PAYMENT_METHODS.map((method) => Object.freeze({ ...method })));
    const before = JSON.stringify({ price, methods });
    getPaymentOptions(price, methods);
    assert.equal(JSON.stringify({ price, methods }), before);
  });

  it('provides only exact configured amounts for every real catalog duration', () => {
    for (const product of PRODUCTS) {
      for (const price of product.prices) {
        const options = getPaymentOptions(price);
        assert.ok(options.length > 0, `${product.slug} / ${price.duration} needs a payment option`);
        for (const option of options) {
          const expected = option.method.currency === 'BDT' ? price.bdt : price.usd;
          assert.equal(option.amount, expected, `${product.slug} / ${price.duration} must not be converted`);
          assert.equal(option.method.value, PAYMENT_METHODS.find((method) => method.id === option.method.id)?.value);
        }
      }
    }
  });
});
