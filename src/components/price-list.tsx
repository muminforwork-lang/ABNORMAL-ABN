'use client';

import type { MouseEvent } from 'react';
import type Lenis from 'lenis';
import type { Product } from '@/data/products';
import { durationHours, isLifetime } from '@/lib/format';
import { ArrowIcon, Chip, PricePair } from '@/components/ui';
import { usePurchaseSelection } from '@/components/purchase-selection';

/**
 * Every configured duration of one product, with its exact price.
 * Each row selects its duration, then follows the existing purchase anchor.
 */
export function PriceList({ product }: { product: Product }) {
  const { duration, setDuration } = usePurchaseSelection();
  const prices = [...product.prices].sort(
    (a, b) => durationHours(a.duration) - durationHours(b.duration),
  );

  const chooseDuration = (event: MouseEvent<HTMLAnchorElement>, next: string) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    setDuration(next);
    if (window.location.hash !== '#purchase') window.history.pushState(null, '', '#purchase');

    // Keep the original anchor URL, but show the selected amount rather than
    // leaving keyboard focus below a long introduction. This is an immediate
    // jump on every device; it adds no touch/reduced-motion scroll animation.
    window.requestAnimationFrame(() => {
      const summary = document.getElementById(`duration-summary-${product.slug}`);
      if (!summary) return;
      const rect = summary.getBoundingClientRect();
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
      const top = Math.max(headerBottom + 16, (window.innerHeight - rect.height) / 2);
      const lenis = (window as Window & { __lenis?: Lenis }).__lenis;

      if (lenis) lenis.scrollTo(summary, { immediate: true, offset: -top });
      else window.scrollTo({ top: window.scrollY + rect.top - top, behavior: 'instant' });
      summary.focus({ preventScroll: true });
    });
  };

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-ink-700/70 px-5 py-4">
        <h2 className="font-display text-base tracking-wide text-bone-50">
          Durations &amp; prices
        </h2>
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-bone-500">
          {prices.length} option{prices.length === 1 ? '' : 's'}
        </span>
      </div>

      <ul className="divide-y divide-ink-700/60">
        {prices.map((price) => {
          const hourly = durationHours(price.duration) < 24;
          const selected = duration === price.duration;
          return (
            <li key={price.duration}>
              <a
                href="#purchase"
                onClick={(event) => chooseDuration(event, price.duration)}
                aria-current={selected ? 'true' : undefined}
                data-selected={selected ? 'true' : 'false'}
                className={`group flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-ink-800/70 ${selected ? 'bg-ink-800/70' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-[0.95rem] tracking-wide text-bone-50">
                    {price.duration}
                  </span>
                  {selected ? <span className="sr-only">Selected duration</span> : null}
                  {isLifetime(price.duration) ? <Chip tone="aura">Lifetime</Chip> : null}
                  {hourly ? <Chip>Hourly</Chip> : null}
                </span>

                <span className="flex items-center gap-4">
                  <PricePair usd={price.usd} bdt={price.bdt} className="text-[1.05rem] font-semibold" />
                  <ArrowIcon className="h-4 w-4 text-bone-500 transition-all group-hover:translate-x-1 group-hover:text-crimson-300" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-ink-700/70 bg-ink-900/60 px-5 py-4 text-xs leading-relaxed text-bone-400">
        Only the currencies shown for each duration are listed prices. Confirm the amount and payment method with support before paying.
      </div>
    </div>
  );
}
