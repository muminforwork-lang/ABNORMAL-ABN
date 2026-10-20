import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import type { OrderDetails } from '../src/components/order-context.tsx';
import { ORDER_STEPS } from '../src/data/store.ts';
import { formatOrderSummary } from '../src/lib/order-summary.ts';

const draft: OrderDetails = {
  reference: 'ABN-TEST-ONLY',
  productSlug: 'br-mods-pc',
  productName: 'BR MODS PC',
  platform: 'pc',
  duration: '10 Days',
  priceLabel: '৳399 BDT',
  paymentMethod: 'bkash',
  paymentDestination: '+880 1629-835648',
  senderNumber: '+8801700000000',
  transactionId: 'TEST-NO-PAYMENT',
};

describe('truthful local payment summaries', () => {
  it('includes the selected duration, exact amount and payment destination', () => {
    const summary = formatOrderSummary(draft);
    assert.match(summary, /^ABNORMAL — Payment summary for support/);
    assert.ok(summary.includes('Product: BR MODS PC\nPlatform: PC\nDuration: 10 Days'));
    assert.ok(summary.includes('Payment amount: ৳399 BDT'));
    assert.ok(summary.includes('Payment method: BKASH'));
    assert.ok(summary.includes('Payment destination: +880 1629-835648'));
    assert.ok(summary.includes('Transaction ID/number: TEST-NO-PAYMENT'));
  });

  it('does not imply that the website submitted or verified an order', () => {
    const summary = formatOrderSummary(draft);
    assert.ok(summary.includes('Local support reference: ABN-TEST-ONLY'));
    assert.ok(summary.includes('Prepared locally; not automatically sent to support.'));
    assert.doesNotMatch(summary, /Awaiting manual payment verification|Order confirmed|Payment verified|Order submitted/i);
  });

  it('does not request a sender phone number for Binance', () => {
    const summary = formatOrderSummary({
      ...draft,
      paymentMethod: 'binance',
      paymentDestination: '1220374728',
      priceLabel: '$3 USD',
      senderNumber: '',
    });
    assert.ok(summary.includes('Payment amount: $3 USD'));
    assert.ok(summary.includes('Payment sender phone number: Not required for Binance'));
    assert.ok(!summary.includes(draft.senderNumber));
  });

  it('preserves decimal amounts and does not mutate the local draft', () => {
    const local = Object.freeze({ ...draft, priceLabel: '৳21.12 BDT' });
    const before = JSON.stringify(local);
    assert.ok(formatOrderSummary(local).includes('Payment amount: ৳21.12 BDT'));
    assert.equal(JSON.stringify(local), before);
  });

  it('keeps confirmation before payment and manual sending after preparation', () => {
    assert.deepEqual(ORDER_STEPS.map((step) => step.title), [
      'Confirm with support before paying',
      'Send the confirmed payment',
      'Prepare your payment summary',
      'Send the summary and proof to support',
    ]);
    assert.match(ORDER_STEPS[2].body, /nothing is sent to support/);
  });
});
