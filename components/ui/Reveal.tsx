"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { DURATION, EASE, VIEWPORT } from "./motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** Deslocamento vertical inicial (20 a 40px) */
  y?: number;
  /** Desfoque inicial muito discreto */
  blur?: number;
  duration?: number;
};

/** Entrada padrão: fade + leve subida + desfoque mínimo. */
export function Reveal({ children, className, style, delay = 0, y = 28, blur = 4, duration = DURATION.base }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type MaskProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  /** De onde a máscara se abre */
  from?: "left" | "bottom" | "top" | "center";
};

const hidden: Record<NonNullable<MaskProps["from"]>, string> = {
  left: "inset(0% 100% 0% 0%)",
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  center: "inset(0% 50% 0% 50%)",
};

/**
 * Revelação por máscara (clip-path) — usada nas marcas.
 * O gatilho fica no invólucro sem recorte: um elemento totalmente recortado
 * nunca é considerado visível pelo IntersectionObserver.
 */
export function MaskReveal({ children, className, style, delay = 0, duration = DURATION.reveal, from = "left" }: MaskProps) {
  return (
    <motion.div className={className} style={style} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      <motion.div
        variants={{
          hidden: { clipPath: hidden[from], opacity: 0.001 },
          shown: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
        }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Linha de 1px que se desenha horizontalmente. */
export function Rule({ className = "", delay = 0, vertical = false }: { className?: string; delay?: number; vertical?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={`block bg-(--slide-line) ${vertical ? "w-px origin-top" : "h-px origin-left"} ${className}`}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, delay, ease: EASE }}
    />
  );
}
