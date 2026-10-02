"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import type { SlideDef } from "@/data/brandPresentation";

type SlideInfo = { id: string; index: number; isActive: boolean };

const SlideContext = createContext<SlideInfo>({ id: "", index: 0, isActive: false });

export function useSlide() {
  return useContext(SlideContext);
}

type Props = {
  def: SlideDef;
  index: number;
  isActive: boolean;
  children: ReactNode;
};

/**
 * Moldura de cada tela: 100svh no desktop (composição 16:9),
 * bloco vertical de altura livre no mobile.
 */
export function Slide({ def, index, isActive, children }: Props) {
  const style = {
    "--slide-bg": def.theme.bg,
    "--slide-fg": def.theme.fg,
    "--slide-accent": def.theme.accent,
  } as CSSProperties;

  return (
    <section
      id={def.id}
      data-slide-index={index}
      aria-label={def.label}
      className="slide relative min-h-svh overflow-x-clip lg:h-svh lg:min-h-0 lg:overflow-hidden"
      style={style}
    >
      <SlideContext.Provider value={{ id: def.id, index, isActive }}>{children}</SlideContext.Provider>
    </section>
  );
}
