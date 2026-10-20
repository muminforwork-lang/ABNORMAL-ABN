'use client';

import { useEffect, useRef, useState } from 'react';
import { useEffects } from '@/components/effects-provider';

/**
 * Counts up to a number the first time it scrolls into view (or immediately on
 * the home screen). The server renders the final value, so crawlers and
 * no-JavaScript visitors always see the real number; the animation only starts
 * on the client.
 */
export function CountUp({
  value,
  duration = 1100,
  className = '',
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const { enabled } = useEffects();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || value <= 0 || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }
    setDisplay(0);

    let started = false;
    let raf = 0;
    let timer = 0;

    // Safety nets, independent of animation frames: the true number is always
    // reached, even if the browser throttles rAF or the observer never fires.
    const snap = window.setTimeout(() => setDisplay(value), duration + 1500);
    const kick = window.setTimeout(() => {
      if (!started) run();
    }, 700);

    const run = () => {
      started = true;
      const begin = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - begin) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(Math.max(0, Math.min(value, Math.round(value * eased))));
        if (progress < 1) raf = window.requestAnimationFrame(step);
      };
      raf = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          observer.disconnect();
          window.clearTimeout(kick);
          timer = window.setTimeout(run, 180);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(kick);
      window.clearTimeout(snap);
    };
  }, [enabled, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {enabled ? display : value}
    </span>
  );
}
