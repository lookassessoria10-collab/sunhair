"use client";

import { motion, useInView } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSlide } from "@/components/presentation/Slide";
import { BrandImage } from "@/components/ui/BrandImage";
import { readableOn } from "@/components/ui/color";
import { GalleryTile } from "@/components/ui/GalleryTile";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { EASE } from "@/components/ui/motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Rule } from "@/components/ui/Reveal";
import { concepts, themes } from "@/data/brandPresentation";

const c = concepts.origem;
const bordo = themes.origemBordo.bg;
const ivory = themes.origemIvory.bg;
const gold = themes.origemBordo.accent;

// TELA 19 — Abertura --------------------------------------------------------

export function OrigemOpening() {
  const o = c.opening;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setJoined(true), 2200);
    return () => window.clearTimeout(t);
  }, [inView]);

  // Posições dentro da assinatura original (520 × 348):
  // símbolo em x 32,3% / largura 34,6%; corpo começa em y 46,55%.
  return (
    <SafeArea className="items-center justify-between gap-10">
      <div className="relative flex w-full flex-1 items-center justify-center">
        <motion.svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[min(78vh,64vw)] -translate-x-1/2 -translate-y-1/2 lg:block"
          fill="none"
        >
          <motion.circle
            cx={50}
            cy={50}
            r={49.5}
            stroke={gold}
            strokeWidth={0.12}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.35 } : undefined}
            transition={{ duration: 3.2, delay: 0.4, ease: EASE }}
          />
        </motion.svg>

        <div ref={ref} className="relative w-[min(86vw,24vw_+_26vh,92vh,660px)]" style={{ aspectRatio: "520 / 348" }}>
          <motion.div
            className="absolute"
            style={{ left: "32.31%", top: "1.15%", width: "34.62%" }}
            initial={{ opacity: 0, scale: 1.45, y: "56%" }}
            animate={inView ? (joined ? { opacity: 1, scale: 1, y: "0%" } : { opacity: 1, scale: 1.45, y: "56%" }) : undefined}
            transition={{ duration: joined ? 1.9 : 1.8, ease: EASE }}
          >
            <BrandImage image={o.symbol} alt="Símbolo Origem" sizes="(min-width: 1024px) 240px, 40vw" preload />
          </motion.div>
          <motion.div
            className="absolute inset-x-0"
            style={{ top: "46.55%" }}
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={joined ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.8, delay: 0.45, ease: EASE }}
          >
            <BrandImage image={o.body} alt="SUN Brazilian Hair — Cabelo brasileiro. Sem exceção." sizes="(min-width: 1024px) 660px, 86vw" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="grid w-full gap-4 border-t border-(--slide-line) pt-6 text-center lg:grid-cols-3 lg:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={joined ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1.4, delay: 1.4, ease: EASE }}
      >
        <p className="numeral eyebrow text-(--slide-accent)">{c.number}</p>
        <h2 className="text-[clamp(1.3rem,1.9vw,2.2rem)] uppercase leading-none tracking-[0.5em] lg:text-center">{o.title}</h2>
        <p className="font-display text-[clamp(1.2rem,1.6vw,1.8rem)] italic leading-none lg:text-right">
          <Lines lines={o.subtitle} />
        </p>
      </motion.div>
    </SafeArea>
  );
}

// TELA 20 — Defesa ----------------------------------------------------------

export function OrigemDefense() {
  const d = c.defense;
  const [lead, ...rest] = d.paragraphs;
  const statements = rest.slice(0, -1);
  const closingLine = rest[rest.length - 1];
  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-[1fr_44%]">
      <div className="order-2 flex flex-col justify-center px-5 py-20 sm:px-8 lg:order-1 lg:py-[13vh] lg:pl-[6vw] lg:pr-[4vw]">
        <Reveal>
          <Eyebrow number={c.number}>{c.name}</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.4rem,4vw,5rem)] leading-[0.98]">
            <Lines lines={d.title} />
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-[44ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-relaxed">{lead}</p>
        </Reveal>
        <ol className="mt-8 max-w-[52ch] border-t border-(--slide-line)">
          {statements.map((s, i) => (
            <li key={s} className="border-b border-(--slide-line)">
              <Reveal delay={0.45 + i * 0.15} y={16}>
                <p className="flex gap-5 py-3.5 text-[clamp(0.95rem,1vw,1.1rem)] text-(--slide-muted)">
                  <span className="numeral eyebrow pt-1 text-(--slide-accent)">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={1}>
          <p className="mt-8 max-w-[34ch] font-display text-[clamp(1.25rem,1.55vw,1.85rem)] italic leading-snug">{closingLine}</p>
        </Reveal>
      </div>
      <ParallaxImage
        image={d.photo}
        alt={d.photoAlt}
        sizes="(min-width: 1024px) 44vw, 100vw"
        className="order-1 mt-16 h-[56svh] lg:order-2 lg:my-20 lg:mr-10 lg:h-auto"
        position="50% 35%"
      />
    </div>
  );
}

// TELA 21 — Construção do símbolo -------------------------------------------

/** Catmull-Rom → Bézier: curva suave passando pelos pontos medidos. */
function smooth(points: [number, number][]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/*
 * Guias de construção medidas sobre o símbolo original (coordenadas do PNG
 * do brandboard, recorte 318,26 → 498,186). Servem apenas para a animação:
 * ao final, a arte original assume o lugar das guias.
 */
const ARC = "M 343 146 A 72 72 0 1 1 476 88";
const WAVES = [
  smooth([[343, 146], [355.5, 121], [368, 108.5], [390.5, 102], [413, 108.5], [430.5, 116], [448, 113.5], [468, 101], [483, 78.5]]),
  smooth([[354, 171], [362, 138.5], [375.5, 126], [393, 120], [418, 126], [433, 132], [450.5, 131], [473, 116], [483, 88.5]]),
  smooth([[385.5, 176], [400.5, 156], [418, 148.5], [438, 146], [458, 140], [473, 128.5], [483, 111]]),
  smooth([[408, 181], [425.5, 173.5], [448, 166], [463, 156], [478, 138.5], [483, 113.5]]),
];

const PHASES = [0.3, 2.1, 4.1]; // início de cada etapa (s)

export function OrigemConstruction() {
  const k = c.construction;
  const { isActive } = useSlide();
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);
  const started = useRef(false);

  const play = useCallback(() => {
    setPhase(0);
    setRun((r) => r + 1);
  }, []);

  useEffect(() => {
    if (isActive && !started.current) {
      started.current = true;
      const t = window.setTimeout(play, 0);
      return () => window.clearTimeout(t);
    }
  }, [isActive, play]);

  useEffect(() => {
    if (run === 0) return;
    const timers = PHASES.map((at, i) => window.setTimeout(() => setPhase(i + 1), at * 1000));
    return () => timers.forEach(window.clearTimeout);
  }, [run]);

  return (
    <SafeArea className="gap-12 lg:grid lg:grid-cols-[1fr_34%] lg:gap-[5vw]">
      <div className="flex flex-col">
        <Reveal>
          <Eyebrow number={c.number}>{k.eyebrow}</Eyebrow>
        </Reveal>
        <div className="flex flex-1 items-center justify-center py-10 lg:py-0">
          <div className="relative w-[min(80vw,20vw_+_22vh,50vh,440px)]" style={{ aspectRatio: "180 / 160" }}>
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: phase >= 3 ? 1 : 0, filter: phase >= 3 ? "blur(0px)" : "blur(4px)" }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Image src={k.symbol.src} alt="Símbolo Origem" fill sizes="440px" quality={90} className="object-contain" />
            </motion.div>

            <svg key={run} viewBox="318 26 180 160" className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden>
              {/* guia: círculo completo */}
              <motion.circle
                cx={405}
                cy={108}
                r={72}
                stroke="currentColor"
                strokeWidth={0.35}
                strokeDasharray="1.2 2.4"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 0 ? 0 : phase >= 3 ? 0.12 : 0.3 }}
                transition={{ duration: 1.2, ease: EASE }}
              />
              <motion.g
                stroke={gold}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: phase >= 3 ? 0 : 1 }}
                transition={{ duration: 1.4, ease: EASE }}
              >
                <motion.path
                  d={ARC}
                  strokeWidth={1.1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: phase >= 1 ? 1 : 0 }}
                  transition={{ duration: 1.7, ease: EASE }}
                />
                {WAVES.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    strokeWidth={1.1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase >= 2 ? 1 : 0 }}
                    transition={{ duration: 1.4, delay: phase >= 2 ? i * 0.18 : 0, ease: EASE }}
                  />
                ))}
              </motion.g>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <ol>
          {k.steps.map((step, i) => {
            const state = phase > i + 1 ? "done" : phase === i + 1 ? "current" : "next";
            return (
              <li key={step.title}>
                <Rule delay={0.3 + i * 0.15} />
                <div
                  className={`py-6 transition-opacity duration-700 lg:py-[3.5vh] ${
                    state === "current" ? "opacity-100" : state === "done" ? "opacity-60" : "opacity-25"
                  }`}
                >
                  <p className="eyebrow flex gap-3 text-(--slide-accent)">
                    <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                    {step.title}
                  </p>
                  <p className="mt-3 font-display text-[clamp(1.5rem,2vw,2.3rem)] italic leading-none">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={play}
          className="eyebrow mt-8 flex items-center gap-3 self-start opacity-70 transition-opacity hover:opacity-100"
        >
          <RotateCcw className="size-3.5" strokeWidth={1.25} aria-hidden />
          {k.replay}
        </button>
      </div>
    </SafeArea>
  );
}

// TELA 22 — Símbolo + wordmark ----------------------------------------------

const markWidths: Record<string, string> = {
  "Símbolo isolado": "min(52vw, 8vw + 14vh, 200px)",
  SUN: "min(60vw, 9vw + 18vh, 280px)",
  "SUN Brazilian Hair": "min(72vw, 12vw + 24vh, 360px)",
  "Versão horizontal": "min(68vw, 10vw + 20vh, 300px)",
  "Versão vertical": "min(56vw, 8vw + 16vh, 240px)",
  Selo: "min(48vw, 6vw + 14vh, 200px)",
};

export function OrigemMarks() {
  const m = c.marks;
  const rows = [
    { items: m.dark, bg: bordo, fg: ivory, offset: 0 },
    { items: m.light, bg: ivory, fg: bordo, offset: 3 },
  ];
  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-rows-2">
      {rows.map((row, r) => (
        <ul key={r} className="grid lg:grid-cols-3" style={{ backgroundColor: row.bg, color: row.fg }}>
          {row.items.map((item, i) => (
            <li
              key={item.label}
              className={`relative flex min-h-[42svh] items-center justify-center px-5 py-16 lg:min-h-0 lg:py-0 ${
                r === 0 ? "lg:pt-14" : "lg:pb-14"
              } ${i > 0 ? "lg:border-l" : ""}`}
              style={{ borderColor: `color-mix(in srgb, ${row.fg} 14%, transparent)` }}
            >
              <Reveal delay={0.2 + (row.offset + i) * 0.12}>
                <BrandImage image={item.image} alt={item.label} width={markWidths[item.label]} sizes="360px" />
              </Reveal>
              <p
                className={`eyebrow absolute left-5 flex gap-3 opacity-70 lg:left-[2.2vw] ${
                  r === 0 ? "bottom-5 lg:bottom-[3vh]" : "top-5 lg:top-[3vh]"
                }`}
              >
                <span className="numeral">{String(row.offset + i + 1).padStart(2, "0")}</span>
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

// TELA 23 — Paleta e sistema ------------------------------------------------

export function OrigemSystem() {
  const s = c.system;
  const [active, setActive] = useState(0);
  const swatch = s.swatches[active];
  const text = readableOn(swatch.hex, bordo, ivory);

  return (
    <SafeArea className="gap-12 lg:grid lg:grid-cols-[44%_1fr] lg:gap-[5vw]">
      <div className="flex items-center justify-center">
        <Reveal className="w-[min(84vw,18vw_+_30vh,56vh)]">
          <div
            className="relative grid aspect-square place-items-center rounded-full text-center transition-[background-color,color] duration-[900ms] ease-(--ease-editorial)"
            style={{ backgroundColor: swatch.hex, color: text, boxShadow: `0 0 0 1px color-mix(in srgb, ${bordo} 14%, transparent)` }}
          >
            <motion.div
              key={swatch.hex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="font-display text-[clamp(2rem,3.4vw,4rem)] leading-none">{swatch.name}</p>
              <p className="numeral eyebrow mt-4">{swatch.hex}</p>
              <p className="mt-3 text-sm opacity-80">{swatch.role}</p>
            </motion.div>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col justify-between gap-10">
        <div>
          <Reveal>
            <Eyebrow number={c.number}>{s.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,3.4vw,4.2rem)] leading-none">
              <Lines lines={s.title} />
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="eyebrow mb-3 text-(--slide-muted)">{s.hint}</p>
          <ol className="border-t border-(--slide-line)" data-local-keys>
            {s.swatches.map((sw, i) => (
              <li key={sw.hex} className="border-b border-(--slide-line)">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="flex w-full items-center gap-4 py-3 text-left lg:py-[1.6vh]"
                >
                  {/* O símbolo marca a cor ativa: o sistema usado como navegação */}
                  <span className="relative size-6 shrink-0">
                    <motion.span
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.6 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <Image src={c.construction.symbol.src} alt="" fill sizes="24px" className="object-contain" />
                    </motion.span>
                  </span>
                  <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: sw.hex, boxShadow: `0 0 0 1px color-mix(in srgb, ${bordo} 18%, transparent)` }} />
                  <span className={`flex-1 text-[clamp(0.95rem,1.1vw,1.2rem)] uppercase tracking-[0.24em] transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-50"}`}>
                    {sw.name}
                  </span>
                  <span className="numeral eyebrow text-(--slide-muted)">{sw.hex}</span>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="flex items-center gap-6 px-5 py-5 lg:px-[2vw]" style={{ backgroundColor: bordo, color: ivory }}>
            <BrandImage image={s.symbol} alt="" width="clamp(56px, 5vw, 84px)" sizes="84px" />
            <span aria-hidden className="h-12 w-px" style={{ backgroundColor: `color-mix(in srgb, ${gold} 60%, transparent)` }} />
            <BrandImage image={s.lines} alt="" width="clamp(52px, 4.6vw, 78px)" sizes="78px" />
            <p className="eyebrow ml-auto hidden text-right leading-relaxed opacity-80 xl:block">{s.words.join("  |  ")}</p>
          </div>
        </Reveal>
      </div>
    </SafeArea>
  );
}

// TELA 24 — Aplicações ------------------------------------------------------

export function OrigemApplications() {
  const a = c.applications;
  const items = a.items;
  return (
    <SafeArea wide className="gap-10 lg:gap-[5vh]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:px-[calc(6vw-2.5rem)]">
        <div>
          <Reveal>
            <Eyebrow number={c.number}>{a.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,3.4vw,4.2rem)] leading-none">
              <Lines lines={a.title} />
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <div className="flex items-end gap-6 lg:gap-8">
            {a.sizes.map((size) => (
              <figure key={size} className="flex flex-col items-center gap-3">
                <Image src={c.construction.symbol.src} alt="" width={size} height={Math.round((size * 160) / 180)} sizes={`${size}px`} />
                <figcaption className="numeral eyebrow text-(--slide-muted)">{size}</figcaption>
              </figure>
            ))}
          </div>
          <p className="eyebrow mt-4 text-(--slide-muted) lg:text-right">{a.scaleNote}</p>
        </Reveal>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2 lg:mx-auto lg:flex lg:min-h-0 lg:w-[min(100%,170vh)] lg:items-end">
        {items.map((item, i) => {
          const ratio = item.image.width / item.image.height;
          return (
            <Reveal
              key={item.label}
              delay={0.3 + i * 0.12}
              className={`lg:max-h-full ${i === 0 ? "col-span-2" : ""}`}
              style={{ flex: `${ratio} 1 0%` }}
            >
              <GalleryTile
                items={items}
                index={i}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="w-full"
                style={{ aspectRatio: `${ratio}` }}
              />
            </Reveal>
          );
        })}
      </div>
    </SafeArea>
  );
}
