'use client';

import { useEffect, useState } from 'react';
import { useEffects } from '@/components/effects-provider';

const FORMAT = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** A desktop clock, or a static time-zone label when effects are disabled. */
export function StoreClock({ className = '' }: { className?: string }) {
  const { enabled } = useEffects();
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    if (!enabled) return;
    const tick = () => setTime(FORMAT.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [enabled]);

  return (
    <span className={`store-clock ${className}`} title="Bangladesh Standard Time (UTC+6)">
      <span className="store-clock__dot" aria-hidden="true" />
      <span className="store-clock__label">UTC+6</span>
      <span className="store-clock__time">{enabled ? time : 'Dhaka'}</span>
    </span>
  );
}
