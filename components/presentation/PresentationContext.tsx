"use client";

import { createContext, useContext } from "react";

export type PresentationApi = {
  active: number;
  total: number;
  goTo: (index: number) => void;
  goToId: (id: string) => void;
  next: () => void;
  prev: () => void;
  /** Menu de capítulos aberto */
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export const PresentationContext = createContext<PresentationApi | null>(null);

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation precisa estar dentro de <Presentation />");
  return ctx;
}
