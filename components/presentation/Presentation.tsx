"use client";

import { MotionConfig, MotionGlobalConfig, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { slides } from "@/data/brandPresentation";
import { slideComponents } from "@/components/slides/registry";
import { ChapterMenu } from "./ChapterMenu";
import { Chrome } from "./Chrome";
import { PresentationContext, type PresentationApi } from "./PresentationContext";
import { Slide } from "./Slide";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

// Modo estático (?static): todas as animações terminam instantaneamente.
// Útil para capturas de tela, impressão e revisão rápida do conteúdo.
const STATIC_MODE = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("static");
if (STATIC_MODE) MotionGlobalConfig.skipAnimations = true;

export function Presentation() {
  const total = slides.length;
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeRef = useRef(0);
  // Destino de uma navegação em andamento: permite apertar "próximo"
  // várias vezes seguidas sem esperar a rolagem terminar.
  const targetRef = useRef<number | null>(null);
  const targetTimer = useRef<number | undefined>(undefined);

  const goTo = useCallback(
    (index: number) => {
      const i = clamp(index, 0, total - 1);
      const el = document.getElementById(slides[i].id);
      if (!el) return;
      targetRef.current = i;
      window.clearTimeout(targetTimer.current);
      targetTimer.current = window.setTimeout(() => (targetRef.current = null), 1200);
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: reduceMotion || STATIC_MODE ? "instant" : "smooth" });
    },
    [total, reduceMotion],
  );

  const goToId = useCallback(
    (id: string) => {
      const i = slides.findIndex((s) => s.id === id);
      if (i >= 0) goTo(i);
    },
    [goTo],
  );

  const next = useCallback(() => goTo((targetRef.current ?? activeRef.current) + 1), [goTo]);
  const prev = useCallback(() => goTo((targetRef.current ?? activeRef.current) - 1), [goTo]);

  // Tela ativa = a que cruza a linha central da viewport.
  useEffect(() => {
    const sections = slides
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    // Link direto (#id): posiciona a tela antes de observar, para que a
    // âncora não seja sobrescrita pela capa durante a hidratação.
    const initial = slides.findIndex((s) => `#${s.id}` === window.location.hash);
    if (initial > 0) {
      const el = sections[initial];
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      activeRef.current = initial;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.slideIndex);
          activeRef.current = index;
          setActive(index);
          if (targetRef.current === index) targetRef.current = null;
          const hash = `#${slides[index].id}`;
          if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Teclado: setas, PageUp/PageDown, espaço, Home e End.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menuOpen) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true'], [data-local-keys]")) return;

      const isButton = Boolean(target?.closest("button, a"));
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case " ":
          if (isButton) return;
          e.preventDefault();
          if (e.shiftKey) prev();
          else next();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, next, prev, goTo, total]);

  // O índice aberto trava a rolagem da página.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const api = useMemo<PresentationApi>(
    () => ({
      active,
      total,
      goTo,
      goToId,
      next,
      prev,
      menuOpen,
      setMenuOpen,
    }),
    [active, total, goTo, goToId, next, prev, menuOpen],
  );

  return (
    <PresentationContext.Provider value={api}>
      <MotionConfig reducedMotion="user">
        <Chrome />
        <main>
          {slides.map((def, index) => {
            const Content = slideComponents[def.id];
            return (
              <Slide key={def.id} def={def} index={index}>
                {Content ? <Content /> : null}
              </Slide>
            );
          })}
        </main>
        <ChapterMenu />
        <div aria-hidden className="paper-grain" />
      </MotionConfig>
    </PresentationContext.Provider>
  );
}
