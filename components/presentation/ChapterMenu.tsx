"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { brand, chapters, slides } from "@/data/brandPresentation";
import { EASE } from "@/components/ui/motion";
import { usePresentation } from "./PresentationContext";

const pad = (n: number) => String(n).padStart(2, "0");

/** Índice completo: capítulos e todas as telas, com acesso direto. */
export function ChapterMenu() {
  const { menuOpen, setMenuOpen, active, goTo } = usePresentation();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [menuOpen, setMenuOpen]);

  const jump = (index: number) => {
    setMenuOpen(false);
    // Espera a sobreposição liberar a rolagem antes de navegar.
    requestAnimationFrame(() => goTo(index));
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Índice do manual"
          className="fixed inset-0 z-[70] overflow-y-auto bg-paper text-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex h-16 items-center justify-between px-5 lg:h-20 lg:px-10">
            <p className="flex items-baseline gap-3">
              <span className="wordmark text-[0.95rem] font-normal">{brand.name}</span>
              <span className="eyebrow opacity-60">{brand.presentationLabel}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              className="eyebrow flex items-center gap-3 py-2"
            >
              Fechar <X className="size-4" strokeWidth={1.25} aria-hidden />
            </button>
          </div>

          <nav className="grid gap-x-8 gap-y-12 px-5 pb-16 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 lg:px-10 lg:pt-[8vh]">
            {chapters.map((chapter, ci) => (
              <motion.section
                key={chapter.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.08 * ci + 0.1, ease: EASE }}
                className="border-t border-ink/15 pt-5"
              >
                <p className="eyebrow numeral opacity-50">{chapter.number}</p>
                <h2 className="mt-3 font-display text-3xl leading-none">{chapter.label}</h2>
                <ol className="mt-6 space-y-1">
                  {slides.map((s, i) =>
                    s.chapter === chapter.id ? (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => jump(i)}
                          aria-current={i === active ? "true" : undefined}
                          className={`group flex w-full items-baseline gap-3 py-1 text-left text-sm transition-opacity duration-300 ${
                            i === active ? "opacity-100" : "opacity-55 hover:opacity-100"
                          }`}
                        >
                          <span className="numeral w-6 text-xs opacity-60">{pad(i + 1)}</span>
                          <span className={i === active ? "underline decoration-1 underline-offset-4" : ""}>
                            {s.label}
                          </span>
                        </button>
                      </li>
                    ) : null,
                  )}
                </ol>
              </motion.section>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
