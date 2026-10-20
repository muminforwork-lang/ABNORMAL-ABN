'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { canEnableEffects, EFFECTS_MEDIA, TOUCH_MEDIA, watchMediaQuery } from '@/lib/effects';

type EffectsPolicy = { enabled: boolean; ready: boolean };
const EffectsContext = createContext<EffectsPolicy>({ enabled: false, ready: false });

/**
 * A single live policy, independent of viewport width. Touch laptops also keep
 * the static experience. Components use `enabled` to attach/clean up their own
 * effects; the root attribute gives CSS exactly the same decision.
 */
export function EffectsProvider({ children }: { children: ReactNode }) {
  const [policy, setPolicy] = useState<EffectsPolicy>({ enabled: false, ready: false });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    if (typeof window.matchMedia !== 'function') {
      root.dataset.effects = 'off';
      delete root.dataset.intro;
      setPolicy({ enabled: false, ready: true });
      return;
    }

    const eligible = window.matchMedia(EFFECTS_MEDIA);
    const coarse = window.matchMedia(TOUCH_MEDIA);
    let touchSeen = false;
    let wasEnabled = root.dataset.effects === 'on';

    const sync = () => {
      const enabled = canEnableEffects({
        eligibleMedia: eligible.matches,
        coarsePointer: coarse.matches,
        maxTouchPoints: navigator.maxTouchPoints,
        touchSeen,
      });
      // Apply CSS safety immediately, before React cleans up JS subscribers.
      if (wasEnabled && !enabled) {
        window.scrollTo({ top: window.scrollY, left: window.scrollX, behavior: 'instant' });
      }
      wasEnabled = enabled;
      root.dataset.effects = enabled ? 'on' : 'off';
      if (!enabled) {
        delete root.dataset.intro;
        root.classList.remove('has-pointer', 'pointer-visible', 'pointer-down');
      }
      setPolicy((current) => current.ready && current.enabled === enabled ? current : { enabled, ready: true });
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' || touchSeen) return;
      touchSeen = true;
      sync();
    };

    sync();
    const stopEligible = watchMediaQuery(eligible, sync);
    const stopCoarse = watchMediaQuery(coarse, sync);
    window.addEventListener('pointerdown', onPointer, { capture: true, passive: true });
    window.addEventListener('resize', sync);
    window.addEventListener('pageshow', sync);
    return () => {
      stopEligible();
      stopCoarse();
      window.removeEventListener('pointerdown', onPointer, true);
      window.removeEventListener('resize', sync);
      window.removeEventListener('pageshow', sync);
      root.dataset.effects = 'off';
      delete root.dataset.intro;
      root.classList.remove('has-pointer', 'pointer-visible', 'pointer-down');
    };
  }, []);

  return <EffectsContext.Provider value={policy}>{children}</EffectsContext.Provider>;
}

export function useEffects() {
  return useContext(EffectsContext);
}
