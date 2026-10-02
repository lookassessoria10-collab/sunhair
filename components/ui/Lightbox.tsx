"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePresentation } from "@/components/presentation/PresentationContext";
import { EASE } from "./motion";

const pad = (n: number) => String(n).padStart(2, "0");

/** Visualização em tela cheia para aplicações e brandboards completos. */
export function Lightbox() {
  const { lightbox, closeLightbox } = usePresentation();
  return <AnimatePresence>{lightbox && <LightboxDialog key="lightbox" onClose={closeLightbox} />}</AnimatePresence>;
}

function LightboxDialog({ onClose }: { onClose: () => void }) {
  const { lightbox } = usePresentation();
  const items = lightbox?.items ?? [];
  const [index, setIndex] = useState(lightbox?.index ?? 0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const many = items.length > 1;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && many) step(1);
      if (e.key === "ArrowLeft" && many) step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose, step, many]);

  const item = items[index];
  if (!item) return null;
  const isTall = item.image.height > item.image.width * 1.05;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      className="fixed inset-0 z-[80] flex flex-col bg-[#170f0e]/96 text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      onClick={onClose}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-5 lg:h-20 lg:px-10" onClick={(e) => e.stopPropagation()}>
        <p className="flex items-baseline gap-4">
          {many && (
            <span className="eyebrow numeral opacity-60">
              {pad(index + 1)} / {pad(items.length)}
            </span>
          )}
          <span className="eyebrow">{item.label}</span>
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className="eyebrow flex items-center gap-3 py-2">
          Fechar <X className="size-4" strokeWidth={1.25} aria-hidden />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-5 lg:px-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.image.src}
            className={`relative mx-auto h-full ${isTall ? "max-w-[min(100%,72vh)]" : "max-w-6xl"}`}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={item.image.src}
              alt={item.label}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-contain"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {many && (
          <>
            <ArrowButton side="left" onClick={() => step(-1)} />
            <ArrowButton side="right" onClick={() => step(1)} />
          </>
        )}
      </div>

      <div className="flex h-16 shrink-0 items-center px-5 lg:h-20 lg:px-10" onClick={(e) => e.stopPropagation()}>
        {item.caption && <p className="text-sm opacity-70">{item.caption}</p>}
      </div>
    </motion.div>
  );
}

function ArrowButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Imagem anterior" : "Próxima imagem"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-paper/25 transition-colors hover:border-paper/70 ${
        side === "left" ? "left-3 lg:left-8" : "right-3 lg:right-8"
      }`}
    >
      <Icon className="size-4" strokeWidth={1.25} aria-hidden />
    </button>
  );
}
