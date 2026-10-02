"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePresentation } from "@/components/presentation/PresentationContext";
import { useSlide } from "@/components/presentation/Slide";
import { BrandImage } from "@/components/ui/BrandImage";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { EASE, VIEWPORT } from "@/components/ui/motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { concepts, themes } from "@/data/brandPresentation";

const c = concepts.solar;
const bordo = themes.solarBordo.bg;
const ivory = themes.solarIvory.bg;
const gold = themes.solarBordo.accent;

// TELA 13 — Abertura --------------------------------------------------------

export function SolarOpening() {
  return (
    <SafeArea className="items-center justify-between gap-10 text-center">
      <div>
        <Reveal delay={0.1}>
          <p className="numeral eyebrow text-(--slide-accent)">{c.number}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <h2 className="mt-4 text-[clamp(1.3rem,1.9vw,2.2rem)] uppercase leading-none tracking-[0.5em] [margin-right:-0.5em]">
            {c.opening.title}
          </h2>
        </Reveal>
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center py-8 lg:py-0">
        <div className="relative">
          {/* Horizonte: um filete dourado que enquadra a marca sem tocá-la */}
          <motion.span
            aria-hidden
            className="absolute right-[calc(100%+4vw)] top-[32%] hidden h-px w-[40vw] origin-right lg:block"
            style={{ backgroundColor: gold, opacity: 0.45 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 2.4, delay: 1.4, ease: EASE }}
          />
          <motion.span
            aria-hidden
            className="absolute left-[calc(100%+4vw)] top-[32%] hidden h-px w-[40vw] origin-left lg:block"
            style={{ backgroundColor: gold, opacity: 0.45 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 2.4, delay: 1.4, ease: EASE }}
          />
          <MaskReveal from="bottom" duration={2.4} delay={0.3}>
            <BrandImage
              image={c.logo.dark}
              alt="SUN Brazilian Hair — conceito Solar"
              width="min(84vw, 24vw + 24vh, 66vh, 600px)"
              sizes="(min-width: 1024px) 600px, 90vw"
            />
          </MaskReveal>
        </div>
      </div>

      <Reveal delay={1.6}>
        <p className="font-display text-[clamp(1.3rem,1.9vw,2.1rem)] italic">
          <Lines lines={c.opening.subtitle} />
        </p>
      </Reveal>
    </SafeArea>
  );
}

// TELA 14 — Defesa ----------------------------------------------------------

export function SolarDefense() {
  const d = c.defense;
  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-[46%_1fr]">
      <ParallaxImage image={d.photo} alt={d.photoAlt} sizes="(min-width: 1024px) 46vw, 100vw" className="mt-16 h-[56svh] lg:my-20 lg:ml-10 lg:h-auto" position="40% 30%" />
      <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-[6vw] lg:py-0">
        <Reveal>
          <Eyebrow number={c.number}>{c.name}</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <BrandImage image={c.symbol.symbol} alt="" width="clamp(96px, 8vw, 150px)" className="mt-10 lg:mt-[7vh]" sizes="150px" />
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,4.2vw,5.2rem)] leading-[0.98]">
            <Lines lines={d.title} />
          </h2>
        </Reveal>
        <div className="mt-10 max-w-[40ch] space-y-5 text-[clamp(1rem,1.05vw,1.15rem)] leading-relaxed text-(--slide-muted)">
          {d.paragraphs.slice(0, -1).map((p, i) => (
            <Reveal key={i} delay={0.45 + i * 0.15}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.8}>
          <p className="mt-8 max-w-[28ch] border-l border-(--slide-accent) pl-6 font-display text-[clamp(1.3rem,1.6vw,1.9rem)] italic leading-snug">
            {d.paragraphs[d.paragraphs.length - 1]}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

// TELA 15 — O símbolo -------------------------------------------------------

export function SolarSymbol() {
  const s = c.symbol;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setJoined(true), 1900);
    return () => window.clearTimeout(t);
  }, [inView]);

  // Posições do símbolo e do corpo dentro da assinatura original (350 × 262).
  return (
    <SafeArea className="items-center justify-between gap-12">
      <Reveal className="self-start">
        <Eyebrow number={c.number}>{s.eyebrow}</Eyebrow>
      </Reveal>

      <div ref={ref} className="relative w-[min(84vw,26vw_+_22vh,78vh,600px)]" style={{ aspectRatio: "350 / 262" }}>
        <motion.div
          className="absolute"
          style={{ left: "28%", top: 0, width: "52%" }}
          initial={{ opacity: 0, scale: 1.3, y: "92%" }}
          animate={inView ? (joined ? { opacity: 1, scale: 1, y: "0%" } : { opacity: 1, scale: 1.3, y: "92%" }) : undefined}
          transition={{ duration: joined ? 1.8 : 1.6, ease: EASE }}
        >
          <BrandImage image={s.symbol} alt="Símbolo solar" sizes="(min-width: 1024px) 320px, 45vw" />
        </motion.div>
        <motion.div
          className="absolute inset-x-0"
          style={{ top: "35.1%" }}
          initial={{ opacity: 0, y: 24 }}
          animate={joined ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
        >
          <BrandImage image={s.body} alt="SUN Brazilian Hair" sizes="(min-width: 1024px) 600px, 84vw" />
        </motion.div>
      </div>

      <ul className="grid w-full grid-cols-3 gap-4 border-t border-(--slide-line) pt-6 text-center lg:w-[min(70vw,880px)]">
        {s.ideas.map((idea, i) => (
          <motion.li
            key={idea.title}
            initial={{ opacity: 0, y: 20 }}
            animate={joined ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, delay: 1.2 + i * 0.2, ease: EASE }}
          >
            <p className="text-[clamp(0.8rem,1vw,1.05rem)] uppercase tracking-[0.36em]">{idea.title}</p>
            <p className="mt-2 font-display text-[clamp(1.1rem,1.4vw,1.6rem)] italic text-(--slide-muted)">{idea.text}</p>
          </motion.li>
        ))}
      </ul>
    </SafeArea>
  );
}

// TELA 16 — Bordô + dourado -------------------------------------------------

export function SolarContrast() {
  const k = c.contrast;
  const [hover, setHover] = useState<number | null>(null);
  const info = hover === null ? null : k.swatches[hover];

  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-2">
      <div className="relative isolate flex min-h-[70svh] flex-col items-center justify-center px-5 py-24 lg:min-h-0" style={{ color: ivory }}>
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 origin-left"
          style={{ backgroundColor: bordo }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <Reveal delay={0.9}>
          <BrandImage image={c.logo.dark} alt="SUN Solar em fundo bordô" width="min(70vw, 16vw + 20vh, 52vh, 460px)" sizes="(min-width: 1024px) 460px, 70vw" />
        </Reveal>
        <Reveal delay={1.3} className="mt-12 lg:absolute lg:bottom-[13vh] lg:left-[6vw] lg:mt-0">
          <p className="max-w-[18ch] font-display text-[clamp(1.25rem,1.6vw,1.9rem)] italic leading-snug">{k.title}</p>
        </Reveal>
      </div>

      <div className="relative flex min-h-[70svh] flex-col items-center justify-center px-5 py-24 lg:min-h-0" style={{ backgroundColor: ivory, color: bordo }}>
        <Reveal delay={1.1}>
          <BrandImage image={c.logo.light} alt="SUN Solar em fundo ivory" width="min(70vw, 16vw + 20vh, 52vh, 460px)" sizes="(min-width: 1024px) 460px, 70vw" />
        </Reveal>

        <Reveal delay={1.5} className="mt-12 w-full max-w-md lg:absolute lg:bottom-[13vh] lg:right-[6vw] lg:mt-0 lg:w-auto">
          <div className="flex flex-col items-start gap-4 lg:items-end" onMouseLeave={() => setHover(null)}>
            <p className="min-h-[2.75rem] text-sm lg:text-right" aria-live="polite">
              {info ? (
                <>
                  <span className="eyebrow block">
                    {info.name} <span className="numeral opacity-60">{info.hex}</span>
                  </span>
                  <span className="mt-1 block opacity-70">{info.role}</span>
                </>
              ) : (
                <span className="eyebrow block opacity-60">Paleta · cores sólidas</span>
              )}
            </p>
            <ul className="flex gap-2.5">
              {k.swatches.map((s, i) => (
                <li key={s.hex}>
                  <button
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    aria-label={`${s.name}, ${s.hex}. ${s.role}`}
                    className={`block size-9 rounded-full border transition-transform duration-500 ease-(--ease-editorial) lg:size-10 ${
                      hover === i ? "-translate-y-1" : ""
                    }`}
                    style={{ backgroundColor: s.hex, borderColor: "color-mix(in srgb, #5A0E1A 18%, transparent)" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// TELA 17 — Sistema visual --------------------------------------------------

/** Raios derivados do símbolo: semicírculo + raios finos, sempre em 1px. */
function Rays({ count = 7, inner = 15, lengths = [7, 11] }: { count?: number; inner?: number; lengths?: number[] }) {
  const rays = Array.from({ length: count }, (_, i) => {
    const angle = Math.PI + (Math.PI * (i + 1)) / (count + 1);
    const len = lengths[i % lengths.length];
    const x1 = Math.cos(angle) * inner;
    const y1 = Math.sin(angle) * inner;
    const x2 = Math.cos(angle) * (inner + len);
    const y2 = Math.sin(angle) * (inner + len);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
  return <g>{rays}</g>;
}

function RayDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-120 -30 240 34" className={`[&_*]:[vector-effect:non-scaling-stroke] ${className}`} fill="none" stroke="currentColor" aria-hidden>
      <g strokeWidth={1}>
        <motion.line x1={-120} y1={0} x2={-22} y2={0} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT} transition={{ duration: 1.6, delay: 0.6, ease: EASE }} />
        <motion.line x1={120} y1={0} x2={22} y2={0} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT} transition={{ duration: 1.6, delay: 0.6, ease: EASE }} />
        <path d="M -10 0 A 10 10 0 0 1 10 0" />
        <Rays />
      </g>
    </svg>
  );
}

function RayFragment({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-60 -60 60 60" className={`[&_*]:[vector-effect:non-scaling-stroke] ${className}`} fill="none" stroke="currentColor" aria-hidden>
      <g strokeWidth={1}>
        {Array.from({ length: 6 }, (_, i) => {
          const a = Math.PI + (Math.PI / 2) * ((i + 0.5) / 6);
          const r1 = 18;
          const r2 = i % 2 ? 44 : 54;
          return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} />;
        })}
        <path d="M -12 0 A 12 12 0 0 1 0 -12" />
      </g>
    </svg>
  );
}

export function SolarSystem() {
  const s = c.system;
  const demos = [
    // Divisores
    <div key="div" className="flex h-full flex-col items-center justify-center gap-6 border border-(--slide-line) px-6">
      <p className="font-display text-[clamp(1.2rem,1.6vw,1.8rem)]">Cabelo brasileiro.</p>
      <RayDivider className="w-[78%] text-(--slide-accent)" />
      <p className="font-display text-[clamp(1.2rem,1.6vw,1.8rem)] italic">Sem exceção.</p>
    </div>,
    // Molduras
    <div key="arc" className="grid h-full place-items-center border border-(--slide-line) py-8">
      <div className="relative aspect-[3/4] h-[78%] max-h-full">
        <span aria-hidden className="absolute -inset-[9px] rounded-t-full border border-(--slide-accent)" />
        <div className="photo-grain absolute inset-0 overflow-hidden rounded-t-full">
          <Image src={s.photo.src} alt="" fill sizes="(min-width: 1024px) 18vw, 60vw" className="object-cover" style={{ objectPosition: "35% 50%" }} />
        </div>
      </div>
    </div>,
    // Detalhes
    <div key="det" className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center" style={{ backgroundColor: bordo, color: ivory }}>
      <BrandImage image={c.symbol.symbol} alt="" width="clamp(64px, 5.5vw, 96px)" sizes="96px" />
      <span aria-hidden className="h-px w-10" style={{ backgroundColor: gold }} />
      <p className="eyebrow">Cabelo brasileiro. Sem exceção.</p>
    </div>,
    // Pequenos grafismos
    <div key="gra" className="relative h-full overflow-hidden" style={{ backgroundColor: "#D9B7A1", color: bordo }}>
      <Image src={s.flow.src} alt="" fill sizes="(min-width: 1024px) 22vw, 90vw" className="object-cover mix-blend-multiply" />
      <RayFragment className="absolute right-5 top-5 w-[34%] opacity-70" />
    </div>,
  ];

  return (
    <SafeArea className="gap-10 lg:gap-[5vh]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
          <p className="max-w-[34ch] font-display text-lg italic text-(--slide-muted) lg:text-right">{s.note}</p>
        </Reveal>
      </div>

      <ul className="grid flex-1 gap-8 sm:grid-cols-2 lg:min-h-0 lg:grid-cols-4 lg:gap-[1.6vw]">
        {s.items.map((item, i) => (
          <li key={item.title} className="flex flex-col lg:min-h-0">
            <Reveal delay={0.3 + i * 0.15} className="flex h-full flex-col">
              <div className="aspect-[4/5] lg:aspect-auto lg:min-h-0 lg:flex-1">{demos[i]}</div>
              <p className="eyebrow mt-4 flex gap-3">
                <span className="numeral text-(--slide-muted)">{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-(--slide-muted)">{item.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </SafeArea>
  );
}

// TELA 18 — Aplicações ------------------------------------------------------

const INTERVAL = 4.8;

export function SolarApplications() {
  const a = c.applications;
  const items = a.items;
  const { openLightbox } = usePresentation();
  const { isActive } = useSlide();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isActive || paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL * 1000);
    return () => window.clearInterval(t);
  }, [isActive, paused, items.length]);

  const item = items[index];

  return (
    <SafeArea className="gap-10 lg:grid lg:grid-cols-[30%_1fr] lg:gap-[4vw]">
      <div className="flex flex-col justify-between gap-10">
        <div>
          <Reveal>
            <Eyebrow number={c.number}>{a.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,3.4vw,4.2rem)] leading-none">{a.title}</h2>
          </Reveal>
        </div>

        <ol className="border-t border-(--slide-line)" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {items.map((it, i) => (
            <li key={it.label} className="border-b border-(--slide-line)">
              <button
                type="button"
                onClick={() => setIndex(i)}
                onFocus={() => setIndex(i)}
                aria-current={i === index ? "true" : undefined}
                className={`relative flex w-full items-baseline gap-4 py-4 text-left transition-opacity duration-500 lg:py-[2.2vh] ${
                  i === index ? "opacity-100" : "opacity-45 hover:opacity-80"
                }`}
              >
                <span className="numeral eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(0.95rem,1.15vw,1.25rem)] uppercase tracking-[0.24em]">{it.label}</span>
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    aria-hidden
                    className="absolute bottom-[-1px] left-0 h-px w-full origin-left"
                    style={{ backgroundColor: gold }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused || !isActive ? 0 : 1 }}
                    transition={{ duration: paused || !isActive ? 0.3 : INTERVAL, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="relative h-[62svh] lg:h-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false}>
          <motion.button
            key={item.image.src}
            type="button"
            onClick={() => openLightbox(items, index)}
            aria-label={`Ampliar: ${item.label}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <Image src={item.image.src} alt={item.label} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" />
          </motion.button>
        </AnimatePresence>
        {item.caption && (
          <p className="eyebrow absolute -bottom-8 right-0 text-(--slide-muted)">{item.caption}</p>
        )}
      </div>
    </SafeArea>
  );
}
