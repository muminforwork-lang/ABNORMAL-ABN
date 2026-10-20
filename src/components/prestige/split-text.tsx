'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ElementType } from 'react';
import { useEffects } from '@/components/effects-provider';

type SplitTextProps = {
  /** Words are revealed one by one. Use \n to force a new line. */
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  /** Runs as soon as the component mounts instead of waiting for scroll. */
  playOnMount?: boolean;
  /** Milliseconds of extra delay before the first word. */
  delay?: number;
  /** Milliseconds between words. */
  stagger?: number;
};

/**
 * A tiny, dependency-free text reveal: every word sits in its own mask and
 * slides up with a stagger. The visible text is duplicated for screen readers
 * via aria-label, so the effect never hurts accessibility or search engines,
 * and without JavaScript the words are simply visible.
 */
export function SplitText({
  text,
  as,
  className = '',
  wordClassName = '',
  playOnMount = false,
  delay = 0,
  stagger = 55,
}: SplitTextProps) {
  const Tag = (as ?? 'span') as ElementType;
  const { enabled } = useEffects();
  const ref = useRef<HTMLElement | null>(null);
  const played = useRef(false);
  const [shown, setShown] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || played.current) {
      setArmed(false);
      setShown(true);
      return;
    }

    const show = () => {
      played.current = true;
      setShown(true);
    };
    if (playOnMount) {
      setArmed(true);
      setShown(false);
      const timer = window.setTimeout(show, 40);
      return () => window.clearTimeout(timer);
    }

    const rect = node.getBoundingClientRect();
    if (typeof IntersectionObserver === 'undefined' || (rect.top < window.innerHeight && rect.bottom > 0)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    observer.observe(node);
    setArmed(true);
    setShown(false);
    return () => observer.disconnect();
  }, [enabled, playOnMount]);

  const lines = text.split('\n');
  let wordIndex = 0;

  return (
    <Tag
      ref={ref}
      data-split-ready={enabled && armed ? 'true' : 'false'}
      className={`split-text ${shown ? 'is-shown' : ''} ${className}`}
      aria-label={text.replace(/\n/g, ' ')}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ').filter(Boolean);
        return (
          <span className="split-line" key={`line-${lineIndex}`} aria-hidden="true">
            {words.map((word, index) => {
              const current = wordIndex++;
              return (
                <Fragment key={`${word}-${index}`}>
                  <span className="split-word">
                    <span
                      className={`split-word-inner ${wordClassName}`}
                      style={
                        {
                          '--i': current,
                          '--stagger': `${stagger}ms`,
                          '--split-delay': `${delay}ms`,
                        } as CSSProperties
                      }
                    >
                      {word}
                    </span>
                  </span>
                  {index < words.length - 1 ? ' ' : null}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
