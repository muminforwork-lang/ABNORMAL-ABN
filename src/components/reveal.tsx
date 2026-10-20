'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { useEffects } from '@/components/effects-provider';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Server output is always visible. Only off-screen content with an attached
 * observer opts into a reveal. Disabling effects makes everything visible.
 */
export function Reveal({ children, delay = 0, className = '', as }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const { enabled } = useEffects();
  const ref = useRef<HTMLElement | null>(null);
  const revealed = useRef(false);
  const [visible, setVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || typeof IntersectionObserver === 'undefined') {
      setArmed(false);
      setVisible(true);
      return;
    }

    // Never hide content that the visitor is already reading.
    const rect = node.getBoundingClientRect();
    if (revealed.current || (rect.top < window.innerHeight && rect.bottom > 0)) {
      revealed.current = true;
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealed.current = true;
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    setVisible(false);
    setArmed(true);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <Tag
      ref={ref}
      data-reveal-ready={enabled && armed ? 'true' : 'false'}
      data-visible={visible ? 'true' : 'false'}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
