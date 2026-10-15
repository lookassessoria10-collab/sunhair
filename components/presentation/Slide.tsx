"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import type { SlideDef } from "@/data/brandPresentation";

type SlideInfo = { id: string };

const SlideContext = createContext<SlideInfo>({ id: "" });

export function useSlide() {
  return useContext(SlideContext);
}

type Props = {
  def: SlideDef;
  index: number;
  children: ReactNode;
};

/**
 * Moldura de cada tela: 100svh no desktop (composição 16:9),
 * bloco vertical de altura livre no mobile.
 */
export function Slide({ def, index, children }: Props) {
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
      <SlideContext.Provider value={{ id: def.id }}>{children}</SlideContext.Provider>
    </section>
  );
}
