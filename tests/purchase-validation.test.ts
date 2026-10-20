import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isValidSenderNumber, validatePurchaseDetails } from '../src/lib/purchase-validation.ts';

const valid = { duration: '10 Days', paymentMethod: 'bkash', senderNumber: '+880 1700-000000', transactionId: 'TEST-ONLY-123' };

describe('local payment-summary validation', () => {
  it('accepts a formatted or plain sender number without changing the input', () => {
    for (const senderNumber of ['01700000000', '+8801700000000', ' +880 1700-000000 ']) {
      assert.equal(isValidSenderNumber(senderNumber), true);
      const input = { ...valid, senderNumber };
      const original = { ...input };
      assert.deepEqual(validatePurchaseDetails(input), {});
      assert.deepEqual(input, original);
    }
  });

  it('rejects the previously accepted punctuation-only phone value', () => {
    for (const senderNumber of ['+------', '-------', '       ', '']) {
      assert.ok(validatePurchaseDetails({ ...valid, senderNumber }).sender);
    }
  });

  it('counts digits rather than separators or total characters', () => {
    assert.equal(isValidSenderNumber('1 - 2 - 3 - 4 - 5 - 6'), false);
    assert.equal(isValidSenderNumber('1234567'), true);
    assert.equal(isValidSenderNumber('+123456789012345'), true);
    assert.equal(isValidSenderNumber('+1234567890123456'), false);
  });

  it('rejects letters, misplaced plus signs, controls and excessive raw length', () => {
    for (const senderNumber of ['abc1234567', '123+456789', '++8801700000000', '123\t456789', '123\n456789', `1${' '.repeat(40)}234567`]) {
      assert.equal(isValidSenderNumber(senderNumber), false);
    }
  });

  it('requires a sender number for Nagad as well as bKash', () => {
    assert.ok(validatePurchaseDetails({ ...valid, paymentMethod: 'nagad', senderNumber: '' }).sender);
  });

  it('does not require or validate a sender phone number for Binance', () => {
    assert.deepEqual(validatePurchaseDetails({ ...valid, paymentMethod: 'binance', senderNumber: '+------' }), {});
  });

  it('rejects a missing or whitespace-only receipt reference', () => {
    for (const transactionId of ['', '  ', '\n\t ']) assert.ok(validatePurchaseDetails({ ...valid, transactionId }).transaction);
  });

  it('allows real-world receipt punctuation and text without inventing a provider format', () => {
    for (const transactionId of ['TX-123_ABC', 'Receipt 123/ABC', 'ট্রানজ্যাকশন-123', 'a'.repeat(120)]) {
      assert.deepEqual(validatePurchaseDetails({ ...valid, transactionId }), {});
    }
  });

  it('rejects oversized or multi-line references', () => {
    for (const transactionId of ['a'.repeat(121), 'ABC\nDEF', 'ABC\rDEF', 'ABC\u0000DEF']) {
      assert.ok(validatePurchaseDetails({ ...valid, transactionId }).transaction);
    }
  });

  it('reports an unavailable duration or payment method before preparing anything', () => {
    const errors = validatePurchaseDetails({ ...valid, duration: undefined, paymentMethod: 'unknown' });
    assert.ok(errors.duration);
    assert.ok(errors.payment);
  });

  it('returns all applicable field errors so a submit can explain and focus them', () => {
    const errors = validatePurchaseDetails({ ...valid, duration: '', senderNumber: '+------', transactionId: '' });
    assert.deepEqual(Object.keys(errors), ['duration', 'sender', 'transaction']);
  });
});
