'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { useEffects } from '@/components/effects-provider';

const CIRCUMFERENCE = 2 * Math.PI * 17;

/**
 * Two small pieces of interface chrome:
 *  - a hairline progress bar under the header,
 *  - a "back to top" button with a progress ring that fades in after the first
 *    screen. Both stay hidden on the compact home page.
 */
export function ScrollHud() {
  const { enabled } = useEffects();
  const barRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const topRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      if (enabled && barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      if (enabled && ringRef.current) {
        ringRef.current.style.strokeDashoffset = `${(CIRCUMFERENCE * (1 - progress)).toFixed(2)}`;
      }
      if (topRef.current) {
        const show = window.scrollY > window.innerHeight * 0.75;
        topRef.current.dataset.show = show ? 'true' : 'false';
        topRef.current.tabIndex = show ? 0 : -1;
      }
    };

    const onScroll = () => {
      if (!enabled) update();
      else if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(raf);
      barRef.current?.style.removeProperty('transform');
      ringRef.current?.style.removeProperty('stroke-dashoffset');
    };
  }, [enabled]);

  const backToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis;
    if (enabled && lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: enabled ? 'smooth' : 'instant' });
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={barRef} />
      </div>

      <a
        ref={topRef}
        href="#main"
        onClick={backToTop}
        className="to-top"
        data-show="false"
        tabIndex={-1}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle className="to-top__track" cx="20" cy="20" r="17" />
          <circle
            ref={ringRef}
            className="to-top__ring"
            cx="20"
            cy="20"
            r="17"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <span className="to-top__arrow" aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <path d="M10 15V5m0 0-4.2 4.2M10 5l4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </>
  );
}
