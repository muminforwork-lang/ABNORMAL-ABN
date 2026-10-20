/** One capability policy for the pre-paint script and hydrated effects. */
export const EFFECTS_MEDIA = '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)';
export const TOUCH_MEDIA = '(any-pointer: coarse)';

export type EffectsCapabilities = {
  eligibleMedia: boolean;
  coarsePointer: boolean;
  maxTouchPoints: number | undefined;
  touchSeen?: boolean;
};

/** Unknown capabilities and hybrid touch/mouse devices stay static. */
export function canEnableEffects({
  eligibleMedia,
  coarsePointer,
  maxTouchPoints,
  touchSeen = false,
}: EffectsCapabilities): boolean {
  return eligibleMedia && !coarsePointer && maxTouchPoints === 0 && !touchSeen;
}

/**
 * Runs before paint. Static is the default, including when an API is missing.
 * Storage is optional: blocking it must not block the page or motion policy.
 * Tests keep this tiny browser script in agreement with canEnableEffects.
 */
export const EFFECTS_BOOT_SCRIPT = `(function(){
var d=document.documentElement;d.classList.add('js');d.dataset.effects='off';
try{if(window.matchMedia('${EFFECTS_MEDIA}').matches&&!window.matchMedia('${TOUCH_MEDIA}').matches&&navigator.maxTouchPoints===0){
d.dataset.effects='on';try{if(!sessionStorage.getItem('abn-intro-seen'))d.dataset.intro='1';}catch(e){}
}}catch(e){}
})();`;

/** Support both current media-query events and the older Safari listener API. */
export function watchMediaQuery(query: MediaQueryList, onChange: () => void): () => void {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }
  query.addListener(onChange);
  return () => query.removeListener(onChange);
}
