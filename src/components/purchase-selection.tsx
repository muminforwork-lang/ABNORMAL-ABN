'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type PurchaseSelection = {
  duration: string;
  setDuration: (duration: string) => void;
};

const PurchaseSelectionContext = createContext<PurchaseSelection | null>(null);

/**
 * One local duration selection for the price rows and purchase controls.
 * The product page keys this provider by slug, so another product starts with
 * its own duration. Nothing is stored, sent over the network, or added to URLs.
 */
export function PurchaseSelectionProvider({
  initialDuration,
  children,
}: {
  initialDuration: string;
  children: ReactNode;
}) {
  const [duration, setDuration] = useState(initialDuration);
  const value = useMemo(() => ({ duration, setDuration }), [duration]);

  return (
    <PurchaseSelectionContext.Provider value={value}>
      {children}
    </PurchaseSelectionContext.Provider>
  );
}

export function usePurchaseSelection() {
  const selection = useContext(PurchaseSelectionContext);
  if (!selection) throw new Error('Purchase controls must be inside PurchaseSelectionProvider.');
  return selection;
}
