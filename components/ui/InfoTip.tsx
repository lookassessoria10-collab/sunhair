"use client";

import { Info } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

/**
 * Rótulo com ícone de informação. O texto aparece ao passar o mouse
 * (só em dispositivos com mouse), ao focar o ícone pelo teclado ou ao tocar.
 * Fecha com Esc ou com toque fora; o mouse pode ir até o texto sem fechá-lo.
 */
export function InfoTip({ label, note, buttonLabel, className = "" }: { label: string; note: string; buttonLabel: string; className?: string }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  // Aberto por clique/toque.
  const [open, setOpen] = useState(false);
  // Fechado com Esc: ignora hover e foco até o ponteiro sair ou o foco mudar.
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Esc fecha o texto mesmo quando ele foi aberto só pelo mouse (sem foco aqui).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = ref.current;
      if (e.key !== "Escape" || !el) return;
      if (open || el.matches(":hover") || el.contains(document.activeElement)) {
        setOpen(false);
        setSuppressed(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const reveal = suppressed ? "" : "group-hover:visible group-hover:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100";

  return (
    <div
      ref={ref}
      className={`group relative flex w-fit items-center gap-2.5 ${className}`}
      onMouseLeave={() => setSuppressed(false)}
      onBlur={() => setSuppressed(false)}
    >
      <p className="eyebrow text-(--slide-muted)">{label}</p>
      <button
        type="button"
        data-pdf-hide
        aria-label={buttonLabel}
        aria-describedby={id}
        onClick={() => {
          setSuppressed(false);
          setOpen((v) => !v);
        }}
        className="peer grid size-6 place-items-center rounded-full border border-current/30 text-(--slide-muted) transition-colors duration-300 hover:border-current hover:text-(--slide-fg)"
      >
        <Info className="size-3.5" strokeWidth={1.5} aria-hidden />
      </button>
      {/* pt-3 em vez de margem: o mouse atravessa até o texto sem perder o hover. */}
      <div
        role="tooltip"
        id={id}
        className={`absolute left-0 top-full z-20 w-[min(21rem,calc(100vw-2.5rem))] pt-3 transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : `invisible opacity-0 ${reveal}`
        }`}
      >
        <p className="rounded-sm bg-(--slide-fg) p-4 text-sm font-light leading-relaxed text-(--slide-bg) shadow-xl">{note}</p>
      </div>
    </div>
  );
}
