'use client';

import { useLayoutEffect, useRef, type KeyboardEventHandler, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { activateDialog } from '@/lib/dialog';
import { useHydrated } from '@/components/use-hydrated';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  initialFocusRef: RefObject<HTMLElement | null>;
  /** Keep this callback stable; it is evaluated when the modal closes. */
  returnFocus?: () => HTMLElement | null;
  children: ReactNode;
  className: string;
  label: string;
  id?: string;
  dismissOnBackdrop?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
};

/** Shared dialog semantics, focus containment, top-layer rendering and cleanup. */
export function Modal({
  open, onClose, initialFocusRef, returnFocus, children, className, label, id,
  dismissOnBackdrop = true, onKeyDown,
}: ModalProps) {
  const hydrated = useHydrated();
  const ref = useRef<HTMLDialogElement | null>(null);
  const backdropPress = useRef(false);

  useLayoutEffect(() => {
    if (!open || !hydrated || !ref.current) return;
    return activateDialog(ref.current, {
      initialFocus: initialFocusRef.current,
      returnFocus,
      onDismiss: onClose,
    });
  }, [open, hydrated, initialFocusRef, returnFocus, onClose]);

  if (!hydrated) return null;
  return createPortal(
    <dialog
      ref={ref}
      id={id}
      className={`modal-dialog ${className}`}
      aria-label={label}
      aria-modal="true"
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClose={(event) => {
        // A queued close from Strict Mode cleanup must not close a re-opened dialog.
        if (open && !event.currentTarget.open) onClose();
      }}
      onKeyDown={onKeyDown}
      onPointerDown={(event) => {
        backdropPress.current = event.target === event.currentTarget ||
          (event.target instanceof HTMLElement && event.target.hasAttribute('data-dialog-backdrop'));
      }}
      onClick={(event) => {
        const onBackdrop = event.target === event.currentTarget ||
          (event.target instanceof HTMLElement && event.target.hasAttribute('data-dialog-backdrop'));
        if (dismissOnBackdrop && backdropPress.current && onBackdrop && !event.defaultPrevented) onClose();
        backdropPress.current = false;
      }}
    >
      {open ? children : null}
    </dialog>,
    document.body,
  );
}
