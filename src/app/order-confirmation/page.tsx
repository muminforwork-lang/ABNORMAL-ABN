import type { Metadata } from 'next';
import { OrderConfirmationClient } from '@/components/order-confirmation-client';

export const metadata: Metadata = {
  title: 'Payment summary',
  description: 'This website only prepares a local payment summary. Copy it and send it with payment proof to support for manual verification.',
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return <section className="shell pb-24 pt-32 sm:pt-36"><OrderConfirmationClient /></section>;
}
