"use client";

import { createContext, useContext } from "react";
import type { Tone } from "@/data/brandPresentation";
import type { GalleryItem } from "@/data/brandPresentation";

export type ToneOverride = { tone: Tone; bg: string };

export type LightboxState = { items: GalleryItem[]; index: number } | null;

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
  /** Lightbox de imagens em tela cheia */
  lightbox: LightboxState;
  openLightbox: (items: GalleryItem[], index?: number) => void;
  closeLightbox: () => void;
  /** Uma tela pode trocar o próprio tom (ex.: toggle claro/bordô) */
  setToneOverride: (slideId: string, override: ToneOverride | null) => void;
};

export const PresentationContext = createContext<PresentationApi | null>(null);

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation precisa estar dentro de <Presentation />");
  return ctx;
}
