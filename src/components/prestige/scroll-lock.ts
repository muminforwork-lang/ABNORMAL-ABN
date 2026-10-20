/** A shared, reference-counted scroll lock for all modal interfaces. */
type LenisLike = { stop: () => void; start: () => void; isStopped?: boolean };

function lenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

let locks = 0;
let restore: (() => void) | undefined;

/** Each owner receives an idempotent release function; the last owner restores. */
export function lockScroll(): () => void {
  if (locks === 0) {
    const root = document.documentElement;
    const body = document.body;
    const overflow = body.style.overflow;
    const overscroll = body.style.overscrollBehavior;
    const alreadyLocked = root.classList.contains('scroll-locked');
    const scroller = lenis();
    const wasStopped = scroller?.isStopped === true;

    root.classList.add('scroll-locked');
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    scroller?.stop();

    restore = () => {
      if (!alreadyLocked) root.classList.remove('scroll-locked');
      body.style.overflow = overflow;
      body.style.overscrollBehavior = overscroll;
      const current = lenis();
      // Preferences can replace/destroy Lenis while a dialog is open. Resume
      // the current instance, unless it was already stopped for another reason.
      if (!alreadyLocked && (current !== scroller || !wasStopped)) current?.start();
    };
  }
  locks += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks !== 0) return;
    restore?.();
    restore = undefined;
  };
}
