import type { OrderDetails } from '@/components/order-context';

/** Plain text for the buyer to copy and send; this function submits nothing. */
export function formatOrderSummary(order: Readonly<OrderDetails>): string {
  return [
    'ABNORMAL — Payment summary for support',
    `Local support reference: ${order.reference}`,
    `Product: ${order.productName}`,
    `Platform: ${order.platform.toUpperCase()}`,
    `Duration: ${order.duration}`,
    `Payment amount: ${order.priceLabel}`,
    `Payment method: ${order.paymentMethod.toUpperCase()}`,
    `Payment destination: ${order.paymentDestination}`,
    order.senderNumber ? `Payment sender phone number: ${order.senderNumber}` : 'Payment sender phone number: Not required for Binance',
    `Transaction ID/number: ${order.transactionId}`,
    'Website status: Prepared locally; not automatically sent to support.',
    'Please verify my payment. I will attach my payment proof screenshot. Thank you.',
  ].join('\n');
}
