'use client';

import { useEffect, useRef } from 'react';
import { useEffects } from '@/components/effects-provider';
import { STORE_NAME, STORE_NAME_KANJI, STORE_TAGLINE } from '@/data/store';

/**
 * First-visit curtain, pre-paint opt-in for eligible desktop visitors only.
 * It never blocks clicks. Disabling effects dismisses it, cancels its timer,
 * and prevents it replaying when preferences change back.
 */
export function SiteIntro() {
  const { enabled, ready } = useEffects();
  const played = useRef(false);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    if (!enabled) {
      delete root.dataset.intro;
      return;
    }
    if (played.current) return;
    played.current = true;

    // The preview flag never overrides the shared accessibility policy.
    if (new URLSearchParams(window.location.search).get('intro') === '1') root.dataset.intro = '1';
    if (root.dataset.intro !== '1') return;

    const dismiss = () => {
      delete root.dataset.intro;
      try {
        sessionStorage.setItem('abn-intro-seen', '1');
      } catch {
        // Storage is optional; this mount still cannot replay the curtain.
      }
    };
    const timer = window.setTimeout(dismiss, 2050);
    return () => {
      window.clearTimeout(timer);
      dismiss();
    };
  }, [enabled, ready]);

  return (
    <div className="site-intro" aria-hidden="true">
      <span className="site-intro__panel site-intro__panel--top" />
      <span className="site-intro__panel site-intro__panel--bottom" />

      <div className="site-intro__core">
        <span className="site-intro__mark">
          <span className="site-intro__frame" />
          <span className="site-intro__kanji">{STORE_NAME_KANJI}</span>
        </span>
        <span className="site-intro__name">{STORE_NAME}</span>
        <span className="site-intro__bar">
          <i />
        </span>
        <span className="site-intro__tag">{STORE_TAGLINE}</span>
      </div>
    </div>
  );
}
