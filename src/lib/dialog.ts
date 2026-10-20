import { lockScroll } from '@/components/prestige/scroll-lock';

const stack: HTMLDialogElement[] = [];
const isolated = new Map<HTMLElement, { count: number; inert: boolean; hidden: string | null }>();

/** A resized-away or unmounted trigger must never receive restored focus. */
export function canFocus(element: HTMLElement | null): element is HTMLElement {
  if (!element?.isConnected || element.matches(':disabled') || element.closest('[inert]')) return false;
  const style = getComputedStyle(element);
  return element.getClientRects().length > 0 && style.visibility !== 'hidden' && style.visibility !== 'collapse';
}

function focusable(dialog: HTMLDialogElement): HTMLElement[] {
  return Array.from(dialog.querySelectorAll<HTMLElement>(
    'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]',
  )).filter((element) => element.tabIndex >= 0 && canFocus(element));
}

/** Fallback isolation for browsers without showModal; native dialogs do this. */
function isolateBackground(dialog: HTMLDialogElement): () => void {
  const siblings = Array.from(document.body.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement && element !== dialog,
  );
  for (const element of siblings) {
    const previous = isolated.get(element);
    if (previous) previous.count += 1;
    else {
      isolated.set(element, { count: 1, inert: element.inert, hidden: element.getAttribute('aria-hidden') });
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    }
  }
  return () => {
    for (const element of siblings) {
      const previous = isolated.get(element);
      if (!previous || --previous.count > 0) continue;
      element.inert = previous.inert;
      if (previous.hidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', previous.hidden);
      isolated.delete(element);
    }
  };
}

/** Activate one modal and return all focus, isolation and scroll cleanup. */
export function activateDialog(
  dialog: HTMLDialogElement,
  {
    initialFocus,
    returnFocus,
    onDismiss,
  }: {
    initialFocus: HTMLElement | null;
    returnFocus?: () => HTMLElement | null;
    onDismiss: () => void;
  },
): () => void {
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const releaseScroll = lockScroll();
  const native = typeof dialog.showModal === 'function';
  stack.push(dialog);
  let releaseBackground: (() => void) | undefined;

  const focusInside = () => {
    const target = canFocus(initialFocus) ? initialFocus : focusable(dialog)[0] ?? dialog;
    target.focus({ preventScroll: true });
  };
  if (native) dialog.showModal();
  else {
    dialog.setAttribute('open', '');
    // Move focus before aria-hiding the trigger's ancestors.
    focusInside();
    releaseBackground = isolateBackground(dialog);
  }
  focusInside();

  const onKey = (event: KeyboardEvent) => {
    if (stack.at(-1) !== dialog || event.defaultPrevented) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onDismiss();
    } else if (event.key === 'Tab') {
      const items = focusable(dialog);
      const first = items[0];
      const last = items.at(-1);
      const active = document.activeElement;
      if (!first) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
      } else if (event.shiftKey && (active === first || active === dialog || !dialog.contains(active))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (active === last || active === dialog || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }
  };
  const onFocus = (event: FocusEvent) => {
    if (stack.at(-1) === dialog && event.target instanceof Node && !dialog.contains(event.target)) focusInside();
  };
  dialog.addEventListener('keydown', onKey);
  document.addEventListener('focusin', onFocus);
  let released = false;

  return () => {
    if (released) return;
    released = true;
    const wasTop = stack.at(-1) === dialog;
    stack.splice(stack.indexOf(dialog), 1);
    dialog.removeEventListener('keydown', onKey);
    document.removeEventListener('focusin', onFocus);
    if (native && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    releaseBackground?.();
    releaseScroll();
    if (wasTop) {
      const target = returnFocus ? returnFocus() : previousFocus;
      if (canFocus(target)) target.focus({ preventScroll: true });
    }
  };
}
