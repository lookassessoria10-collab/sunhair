"use client";

import { motion, useInView } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useSlide } from "@/components/presentation/Slide";
import { BrandImage } from "@/components/ui/BrandImage";
import { readableOn } from "@/components/ui/color";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { EASE } from "@/components/ui/motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Rule } from "@/components/ui/Reveal";
import type { Asset } from "@/data/assets";
import { concepts, themes } from "@/data/brandPresentation";

const c = concepts.origem;
const bordo = themes.origemBordo.bg;
const ivory = themes.origemIvory.bg;
const gold = themes.origemBordo.accent;

// TELA 17 — Abertura --------------------------------------------------------

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

  // Isolado, o símbolo fica no centro da área da marca; depois sobe ao seu lugar.
  const { box } = o.symbol;
  const centerShift = `${((50 - (box.top + box.height / 2)) / box.height) * 100}%`;

  return (
    <SafeArea className="items-center justify-between gap-10">
      <div className="relative flex w-full flex-1 items-center justify-center">
        <svg
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
        </svg>

        <div
          ref={ref}
          className="relative w-[min(80vw,22vw_+_24vh,72vh,600px)]"
          style={{ aspectRatio: `${c.logo.dark.width} / ${c.logo.dark.height}` }}
        >
          <motion.div
            className="absolute"
            style={{ left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%` }}
            initial={{ opacity: 0, scale: 1.35, y: centerShift }}
            animate={inView ? (joined ? { opacity: 1, scale: 1, y: "0%" } : { opacity: 1, scale: 1.35, y: centerShift }) : undefined}
            transition={{ duration: joined ? 1.9 : 1.8, ease: EASE }}
          >
            <BrandImage image={o.symbol} alt="Símbolo Origem" sizes="(min-width: 1024px) 340px, 50vw" preload />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ left: `${o.body.box.left}%`, top: `${o.body.box.top}%`, width: `${o.body.box.width}%` }}
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={joined ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.8, delay: 0.45, ease: EASE }}
          >
            <BrandImage image={o.body} alt="SUN Brazilian Hair — Cabelo brasileiro. Sem exceção." sizes="(min-width: 1024px) 600px, 80vw" />
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
        <h2 className="text-[clamp(1.2rem,1.7vw,2rem)] font-light uppercase leading-none tracking-[0.46em] lg:text-center">{o.title}</h2>
        <p className="text-[clamp(1rem,1.25vw,1.4rem)] font-light leading-none lg:text-right">
          <Lines lines={o.subtitle} />
        </p>
      </motion.div>
    </SafeArea>
  );
}

// TELA 18 — Defesa ----------------------------------------------------------

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
          <h2 className="mt-8 font-display text-[clamp(2rem,3.1vw,3.9rem)] leading-[1.08]">
            <Lines lines={d.title} />
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-[46ch] text-[clamp(0.95rem,1.05vw,1.12rem)] leading-[1.7]">{lead}</p>
        </Reveal>
        <ol className="mt-8 max-w-[54ch] border-t border-(--slide-line)">
          {statements.map((s, i) => (
            <li key={s} className="border-b border-(--slide-line)">
              <Reveal delay={0.45 + i * 0.15} y={16}>
                <p className="flex gap-5 py-3.5 text-[clamp(0.9rem,0.95vw,1.05rem)] text-(--slide-muted)">
                  <span className="numeral eyebrow pt-1 text-(--slide-accent)">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={1}>
          <p className="mt-8 max-w-[38ch] text-[clamp(1.05rem,1.25vw,1.45rem)] font-light leading-snug">{closingLine}</p>
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

// TELA 19 — Construção do símbolo -------------------------------------------

/*
 * Guias de construção medidas sobre o símbolo oficial (coordenadas do PNG
 * em /public/brand/logos/origem.png). O arco segue um círculo ajustado por
 * mínimos quadrados aos pixels do traço; as linhas seguem o eixo de cada fio.
 * Servem apenas para a animação: ao final, a arte oficial assume o lugar.
 */
const CIRCLE = { cx: 719.7, cy: 367.8, r: 222.1 };
const ARC = "M 522.2 469.3 A 222.1 222.1 0 1 1 931.8 301.7";
const WAVES = [
  "M 525.7 465.7 C 528.9 459.4 536.8 440.2 544.6 427.9 C 552.4 415.6 563.0 402.0 572.3 391.8 C 581.5 381.6 589.0 373.7 600.1 366.8 C 611.2 359.9 626.0 354.2 639 350.7 C 652.0 347.2 664.0 345.8 677.9 345.7 C 691.8 345.6 707.5 346.6 722.3 350.1 C 737.1 353.6 752.0 362.8 766.8 366.8 C 781.6 370.8 796.4 374.0 811.2 374 C 826.0 374.0 841.8 371.3 855.7 366.8 C 869.6 362.4 883.5 354.5 894.6 347.3 C 905.7 340.1 915.4 332.2 922.3 323.4 C 929.2 314.6 933.2 303.5 936.2 294.6 C 939.2 285.7 939.5 274.2 940.1 270.1",
  "M 559.6 552.9 C 560.3 545.0 561.0 520.0 564 505.7 C 567.0 491.4 571.9 478.9 577.9 466.8 C 583.9 454.8 590.9 442.7 600.1 433.4 C 609.4 424.1 620.4 417.0 633.4 411.2 C 646.4 405.4 663.1 400.3 677.9 398.4 C 692.7 396.5 707.5 397.0 722.3 400.1 C 737.1 403.2 752.0 413.2 766.8 416.8 C 781.6 420.4 796.4 422.1 811.2 421.8 C 826.0 421.5 840.9 420.1 855.7 415.1 C 870.5 410.1 887.2 402.8 900.1 391.8 C 913.0 380.8 925.1 364.8 933.4 349 C 941.7 333.3 947.4 314.2 950.1 297.3 C 952.8 280.4 949.7 256.1 949.6 247.9",
  "M 637.9 575.1 C 639.9 569.1 644.4 550.6 650.1 539 C 655.8 527.4 664.0 515.0 672.3 505.7 C 680.6 496.4 689.9 489.5 700.1 483.4 C 710.3 477.3 720.4 471.9 733.4 469 C 746.4 466.1 763.1 466.8 777.9 465.7 C 792.7 464.6 807.5 464.0 822.3 462.3 C 837.1 460.6 853.8 459.1 866.8 455.7 C 879.8 452.3 889.9 448.3 900.1 441.8 C 910.3 435.3 920.0 427.9 927.9 416.8 C 935.8 405.7 942.8 387.5 947.3 375.1 C 951.8 362.7 953.4 347.8 954.6 342.3",
  "M 710.1 586.2 C 714.0 582.5 724.0 570.4 733.4 564 C 742.8 557.6 753.8 552.6 766.8 547.9 C 779.8 543.2 796.4 540.5 811.2 535.7 C 826.0 530.9 841.8 526.6 855.7 519 C 869.6 511.4 883.5 501.1 894.6 490.1 C 905.7 479.1 914.4 467.0 922.3 452.9 C 930.2 438.8 936.4 424.1 941.8 405.7 C 947.2 387.3 952.5 352.9 954.6 342.3",
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

  const { origin, width, height } = k.symbol;

  return (
    <SafeArea className="gap-12 lg:grid lg:grid-cols-[1fr_34%] lg:gap-[5vw]">
      <div className="flex flex-col">
        <Reveal>
          <Eyebrow number={c.number}>{k.eyebrow}</Eyebrow>
        </Reveal>
        <div className="flex flex-1 items-center justify-center py-10 lg:py-0">
          <div className="relative w-[min(80vw,20vw_+_22vh,52vh,480px)]" style={{ aspectRatio: `${width} / ${height}` }}>
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: phase >= 3 ? 1 : 0, filter: phase >= 3 ? "blur(0px)" : "blur(4px)" }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Image src={k.symbol.src} alt="Símbolo Origem" fill sizes="480px" quality={90} className="object-contain" />
            </motion.div>

            <svg
              key={run}
              viewBox={`${origin.x} ${origin.y} ${width} ${height}`}
              className="absolute inset-0 h-full w-full overflow-visible [&_*]:[vector-effect:non-scaling-stroke]"
              fill="none"
              aria-hidden
            >
              {/* guia: círculo completo */}
              <motion.circle
                cx={CIRCLE.cx}
                cy={CIRCLE.cy}
                r={CIRCLE.r}
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="2 6"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 0 ? 0 : phase >= 3 ? 0.14 : 0.32 }}
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
                  strokeWidth={1.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: phase >= 1 ? 1 : 0 }}
                  transition={{ duration: 1.7, ease: EASE }}
                />
                {WAVES.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    strokeWidth={1.5}
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
                  <p className="mt-3 font-display text-[clamp(1.35rem,1.7vw,2rem)] leading-none">{step.text}</p>
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

// TELA 20 — Símbolo + wordmark ----------------------------------------------

/**
 * Versão horizontal do brandboard Origem, remontada em alta com as partes
 * oficiais: símbolo à esquerda, SUN + Brazilian Hair à direita.
 */
function HorizontalLockup({ symbol, name, width }: { symbol: Asset; name: Asset; width: string }) {
  return (
    <div className="flex items-center" style={{ width, gap: "7.6%" }} role="img" aria-label="Versão horizontal">
      <div style={{ width: "29.5%" }}>
        <BrandImage image={symbol} alt="" sizes="160px" />
      </div>
      <div style={{ width: "62.9%" }}>
        <BrandImage image={name} alt="" sizes="320px" />
      </div>
    </div>
  );
}

/**
 * Selo do brandboard Origem, remontado em vetor: textos em arco
 * (Montserrat, tipografia secundária indicada no brandboard) e símbolo oficial.
 */
function Seal({ symbol, top, bottom, width }: { symbol: Asset; top: string; bottom: string; width: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 240 240" style={{ width }} role="img" aria-label={`Selo: ${top}. ${bottom}`}>
      <defs>
        <path id={`${id}-top`} d="M 30 120 A 90 90 0 0 1 210 120" />
        <path id={`${id}-bottom`} d="M 21 120 A 99 99 0 0 0 219 120" />
      </defs>
      <g fill={bordo} style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
        <text fontSize="13" letterSpacing="3.2">
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
            {top.toUpperCase()}
          </textPath>
        </text>
        <text fontSize="10.5" letterSpacing="2">
          <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
            {bottom.toUpperCase()}
          </textPath>
        </text>
        <circle cx="22" cy="120" r="2" />
        <circle cx="218" cy="120" r="2" />
      </g>
      <image href={symbol.src} x="70" y="72" width="100" height={(100 * symbol.height) / symbol.width} />
    </svg>
  );
}

const darkWidths = ["min(48vw, 7vw + 13vh, 190px)", "min(60vw, 9vw + 18vh, 290px)", "min(66vw, 11vw + 21vh, 330px)"];

export function OrigemMarks() {
  const m = c.marks;
  const L = m.light;
  const light = [
    { label: L.labels.horizontal, node: <HorizontalLockup symbol={L.symbol} name={L.name} width="min(72vw, 13vw + 22vh, 360px)" /> },
    { label: L.labels.vertical, node: <BrandImage image={L.full} alt="Versão vertical" width="min(56vw, 8vw + 17vh, 250px)" sizes="250px" /> },
    { label: L.labels.seal, node: <Seal symbol={L.symbol} top={L.seal.top} bottom={L.seal.bottom} width="min(56vw, 7vw + 17vh, 230px)" /> },
  ];
  const rows = [
    { bg: bordo, fg: ivory, items: m.dark.map((d, i) => ({ label: d.label, node: <BrandImage image={d.image} alt={d.label} width={darkWidths[i]} sizes="330px" /> })) },
    { bg: ivory, fg: bordo, items: light },
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
              <Reveal delay={0.2 + (r * 3 + i) * 0.12}>{item.node}</Reveal>
              <p
                className={`eyebrow absolute left-5 flex gap-3 opacity-70 lg:left-[2.2vw] ${
                  r === 0 ? "bottom-5 lg:bottom-[3vh]" : "top-5 lg:top-[3vh]"
                }`}
              >
                <span className="numeral">{String(r * 3 + i + 1).padStart(2, "0")}</span>
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

// TELA 21 — Paleta e sistema ------------------------------------------------

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
            <motion.div key={swatch.hex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
              <p className="font-display text-[clamp(1.8rem,2.8vw,3.4rem)] leading-none">{swatch.name}</p>
              <p className="numeral eyebrow mt-4">{swatch.hex}</p>
              <p className="mt-3 text-sm opacity-80">{swatch.role}</p>
            </motion.div>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col justify-between gap-10 lg:gap-[3vh]">
        <div>
          <Reveal>
            <Eyebrow number={c.number}>{s.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-[clamp(2rem,2.9vw,3.5rem)] leading-[1.08]">
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
                  className="flex w-full items-center gap-4 py-3 text-left lg:py-[1.1vh]"
                >
                  {/* O símbolo marca a cor ativa: o sistema usado como navegação */}
                  <span className="relative size-6 shrink-0">
                    <motion.span
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.6 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <Image src={s.symbolLight.src} alt="" fill sizes="24px" className="object-contain" />
                    </motion.span>
                  </span>
                  <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: sw.hex, boxShadow: `0 0 0 1px color-mix(in srgb, ${bordo} 18%, transparent)` }} />
                  <span className={`flex-1 text-[clamp(0.85rem,0.95vw,1.05rem)] uppercase tracking-[0.24em] transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-50"}`}>
                    {sw.name}
                  </span>
                  <span className="numeral eyebrow text-(--slide-muted)">{sw.hex}</span>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Escala: o símbolo como elemento reconhecível em qualquer tamanho */}
        <Reveal delay={0.5}>
          <div className="px-5 py-5 lg:px-[2vw]" style={{ backgroundColor: bordo, color: ivory }}>
            <div className="flex flex-wrap items-end gap-5 lg:flex-nowrap lg:gap-5">
              {s.sizes.map((size) => (
                <figure key={size} className="flex shrink-0 flex-col items-center gap-2">
                  <Image src={s.symbolDark.src} alt="" width={size} height={Math.round((size * s.symbolDark.height) / s.symbolDark.width)} sizes={`${size}px`} />
                  <figcaption className="numeral eyebrow opacity-60">{size}</figcaption>
                </figure>
              ))}
              <div className="min-w-0 flex-1 space-y-3 lg:text-right">
                <p className="eyebrow leading-relaxed opacity-60">{s.scaleNote}</p>
                <p className="eyebrow hidden leading-relaxed opacity-80 xl:block">{s.words.join("  |  ")}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SafeArea>
  );
}
