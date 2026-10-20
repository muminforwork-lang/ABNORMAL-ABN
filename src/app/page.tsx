import type { Metadata } from 'next';

import { Hero } from '@/components/hero';
import { STORE_DESCRIPTION, STORE_NAME, STORE_TAGLINE } from '@/data/store';

export const metadata: Metadata = {
  title: `${STORE_NAME} — ${STORE_TAGLINE}`,
  description: STORE_DESCRIPTION,
  alternates: { canonical: '/' },
};

/** A compact hero that can grow when a short screen or larger text needs room. */
export default function HomePage() {
  return <Hero />;
}
