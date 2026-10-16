"use client";

import { ArrowDown, ArrowUp, ArrowUpRight, Menu } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { brand, chapters, downloads, neutral, slides } from "@/data/brandPresentation";
import { usePresentation } from "./PresentationContext";

type Corner = "tl" | "tr" | "bl" | "br";

const pad = (n: number) => String(n).padStart(2, "0");

/** Navegação fixa e discreta: marca, capítulos, progresso, contador e setas. */
export function Chrome() {
  const { active, total, goTo, next, prev, setMenuOpen, goToId } = usePresentation();
  const slide = slides[active];

  const colorFor = (corner: Corner) => {
    const tone = slide.chrome?.[corner] ?? slide.theme.tone;
    if (tone === slide.theme.tone) return slide.theme.fg;
    return tone === "dark" ? neutral.paper : neutral.ink;
  };

  // Desktop: cor por canto (telas divididas). Mobile: barras sólidas na cor da tela.
  const style = {
    "--c-tl-lg": colorFor("tl"),
    "--c-tr-lg": colorFor("tr"),
    "--c-bl-lg": colorFor("bl"),
    "--c-br-lg": colorFor("br"),
    "--c-base": slide.theme.fg,
    "--c-bg": slide.theme.bg,
  } as CSSProperties;

  const chapterIndex = chapters.findIndex((c) => c.id === slide.chapter);
  const chapter = chapters[chapterIndex];
  const progress = (active + 1) / total;

  return (
    <div style={style} className="chrome pointer-events-none fixed inset-0 z-50">
      {/* Progresso */}
      <div className="absolute inset-x-0 top-0 h-px">
        <div
          className="h-full origin-left bg-(--c-tr) transition-[transform,background-color] duration-700 ease-(--ease-editorial)"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Topo */}
      <header className="absolute inset-x-0 top-0 flex h-16 items-center justify-between px-5 transition-colors duration-700 max-lg:bg-(--c-bg) lg:h-20 lg:px-10">
        <button
          type="button"
          onClick={() => goTo(0)}
          className="pointer-events-auto flex items-baseline gap-3 whitespace-nowrap text-(--c-tl) transition-colors duration-700"
          aria-label="Voltar para a capa"
        >
          <span className="wordmark text-[0.95rem] font-normal leading-none">{brand.name}</span>
          <span className="eyebrow hidden opacity-70 sm:inline">{brand.descriptor}</span>
        </button>

        <nav aria-label="Capítulos" className="pointer-events-auto flex items-center gap-8 text-(--c-tr) transition-colors duration-700">
          {/* Lista de capítulos só cabe ao lado da marca a partir de 1280 px; abaixo disso, o Índice. */}
          <ol className="hidden items-center gap-7 xl:flex">
            {chapters.map((c, i) => {
              const isCurrent = i === chapterIndex;
              const firstSlide = slides.find((s) => s.chapter === c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => firstSlide && goToId(firstSlide.id)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`eyebrow group relative flex gap-2 whitespace-nowrap py-2 transition-opacity duration-500 ${
                      isCurrent ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <span className="numeral">{c.number}</span>
                    <span>{c.label}</span>
                    <span
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-700 ease-(--ease-editorial) ${
                        isCurrent ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
          {/* Texto só quando cabe: some no celular e entre 1280 e 1440 px, onde os capítulos dividem a barra. */}
          <a
            href={downloads.brandFiles.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${downloads.brandFiles.label} (abre o Google Drive em uma nova aba)`}
            title={downloads.brandFiles.label}
            className="eyebrow flex items-center gap-2 whitespace-nowrap py-2"
          >
            <ArrowUpRight className="size-4" strokeWidth={1.25} aria-hidden />
            <span className="hidden sm:inline xl:max-[1440px]:hidden">{downloads.brandFiles.label}</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="eyebrow flex items-center gap-3 py-2"
            aria-haspopup="dialog"
          >
            <span className="hidden sm:inline">Índice</span>
            <Menu className="size-4" strokeWidth={1.25} aria-hidden />
            <span className="sr-only sm:hidden">Abrir índice</span>
          </button>
        </nav>
      </header>

      {/* Base */}
      <footer className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between px-5 transition-colors duration-700 max-lg:bg-(--c-bg) lg:h-20 lg:px-10">
        <p className="flex items-baseline gap-4 text-(--c-bl) transition-colors duration-700" aria-live="polite">
          <span className="numeral eyebrow tracking-[0.2em]">
            {pad(active + 1)} <span className="opacity-40">/</span> {pad(total)}
          </span>
          <span className="eyebrow hidden opacity-60 md:inline">
            {chapter.label} · {slide.label}
          </span>
        </p>

        <div className="pointer-events-auto flex items-center gap-2 text-(--c-br) transition-colors duration-700">
          <ControlButton label="Tela anterior" onClick={prev} disabled={active === 0}>
            <ArrowUp className="size-4" strokeWidth={1.25} aria-hidden />
          </ControlButton>
          <ControlButton label="Próxima tela" onClick={next} disabled={active === total - 1}>
            <ArrowDown className="size-4" strokeWidth={1.25} aria-hidden />
          </ControlButton>
        </div>
      </footer>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-current/25 transition-[opacity,border-color] duration-500 hover:border-current/70 disabled:opacity-25"
    >
      {children}
    </button>
  );
}
