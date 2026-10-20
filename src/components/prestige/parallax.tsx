'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useEffects } from '@/components/effects-provider';
import { watchMediaQuery } from '@/lib/effects';

/**
 * Soft scroll parallax. Desktop only, and only when motion is welcome: the
 * element drifts a few pixels against the scroll to add depth. It never changes
 * layout, so headings and buttons stay exactly where they were.
 */
export function Parallax({
  children,
  speed = 22,
  className = '',
}: {
  children: ReactNode;
  /** Maximum drift in pixels. */
  speed?: number;
  className?: string;
}) {
  const { enabled } = useEffects();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    const wide = window.matchMedia('(min-width: 1024px)');

    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wide.matches) {
        node.style.removeProperty('transform');
        return;
      }
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < -200 || rect.top > viewport + 200) return;
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = Math.max(-1.5, Math.min(1.5, progress)) * speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const stopQuery = watchMediaQuery(wide, onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      stopQuery();
      window.cancelAnimationFrame(raf);
      node.style.transform = '';
    };
  }, [enabled, speed]);

  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  );
}
