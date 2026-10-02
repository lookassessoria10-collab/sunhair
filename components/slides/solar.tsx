"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

// TELA 12 — Abertura --------------------------------------------------------

export function SolarOpening() {
  return (
    <SafeArea className="items-center justify-between gap-10 text-center">
      <div>
        <Reveal delay={0.1}>
          <p className="numeral eyebrow text-(--slide-accent)">{c.number}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <h2 className="mt-4 text-[clamp(1.2rem,1.7vw,2rem)] font-light uppercase leading-none tracking-[0.46em] [margin-right:-0.46em]">
            {c.opening.title}
          </h2>
        </Reveal>
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center py-8 lg:py-0">
        <div className="relative">
          {/* Horizonte: um filete dourado que enquadra a marca sem tocá-la */}
          {(["right", "left"] as const).map((side) => (
            <motion.span
              key={side}
              aria-hidden
              className={`absolute top-[32%] hidden h-px w-[40vw] lg:block ${
                side === "right" ? "right-[calc(100%+4vw)] origin-right" : "left-[calc(100%+4vw)] origin-left"
              }`}
              style={{ backgroundColor: gold, opacity: 0.45 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 2.4, delay: 1.4, ease: EASE }}
            />
          ))}
          <MaskReveal from="bottom" duration={2.4} delay={0.3}>
            <BrandImage
              image={c.logo.dark}
              alt="SUN Brazilian Hair — conceito Solar"
              width="min(84vw, 24vw + 24vh, 64vh, 620px)"
              sizes="(min-width: 1024px) 620px, 90vw"
            />
          </MaskReveal>
        </div>
      </div>

      <Reveal delay={1.6}>
        <p className="text-[clamp(1.05rem,1.4vw,1.55rem)] font-light tracking-[0.02em]">
          <Lines lines={c.opening.subtitle} />
        </p>
      </Reveal>
    </SafeArea>
  );
}

// TELA 13 — Defesa ----------------------------------------------------------

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
          <BrandImage image={c.symbol.symbol} alt="" width="clamp(110px, 9vw, 170px)" className="mt-10 lg:mt-[7vh]" sizes="170px" />
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-8 font-display text-[clamp(2.1rem,3.3vw,4.1rem)] leading-[1.08]">
            <Lines lines={d.title} />
          </h2>
        </Reveal>
        <div className="mt-10 max-w-[42ch] space-y-5 text-[clamp(0.95rem,1vw,1.08rem)] leading-[1.75] text-(--slide-muted)">
          {d.paragraphs.slice(0, -1).map((p, i) => (
            <Reveal key={i} delay={0.45 + i * 0.15}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.8}>
          <p className="mt-8 max-w-[30ch] border-l border-(--slide-accent) pl-6 text-[clamp(1.1rem,1.3vw,1.5rem)] font-light leading-snug">
            {d.paragraphs[d.paragraphs.length - 1]}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

// TELA 14 — O símbolo -------------------------------------------------------

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

  // Isolado, o símbolo fica centralizado na área da marca; depois desce ao seu lugar.
  const { box } = s.symbol;
  const centerShift = `${((50 - (box.top + box.height / 2)) / box.height) * 100}%`;

  return (
    <SafeArea className="items-center justify-between gap-12">
      <Reveal className="self-start">
        <Eyebrow number={c.number}>{s.eyebrow}</Eyebrow>
      </Reveal>

      <div ref={ref} className="relative w-[min(84vw,26vw_+_22vh,76vh,620px)]" style={{ aspectRatio: `${c.logo.light.width} / ${c.logo.light.height}` }}>
        <motion.div
          className="absolute"
          style={{ left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%` }}
          initial={{ opacity: 0, scale: 1.3, y: centerShift }}
          animate={inView ? (joined ? { opacity: 1, scale: 1, y: "0%" } : { opacity: 1, scale: 1.3, y: centerShift }) : undefined}
          transition={{ duration: joined ? 1.8 : 1.6, ease: EASE }}
        >
          <BrandImage image={s.symbol} alt="Símbolo solar" sizes="(min-width: 1024px) 420px, 60vw" />
        </motion.div>
        <motion.div
          className="absolute"
          style={{ left: `${s.body.box.left}%`, top: `${s.body.box.top}%`, width: `${s.body.box.width}%` }}
          initial={{ opacity: 0, y: 24 }}
          animate={joined ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
        >
          <BrandImage image={s.body} alt="SUN Brazilian Hair" sizes="(min-width: 1024px) 620px, 84vw" />
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
            <p className="text-[clamp(0.75rem,0.9vw,0.95rem)] font-medium uppercase tracking-[0.34em]">{idea.title}</p>
            <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.25rem)] font-light text-(--slide-muted)">{idea.text}</p>
          </motion.li>
        ))}
      </ul>
    </SafeArea>
  );
}

// TELA 15 — Bordô + dourado -------------------------------------------------

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
          <BrandImage image={c.logo.dark} alt="SUN Solar em fundo bordô" width="min(70vw, 16vw + 20vh, 52vh, 480px)" sizes="(min-width: 1024px) 480px, 70vw" />
        </Reveal>
        <Reveal delay={1.3} className="mt-12 lg:absolute lg:bottom-[13vh] lg:left-[6vw] lg:mt-0">
          <p className="max-w-[20ch] text-[clamp(1.05rem,1.25vw,1.4rem)] font-light leading-snug">{k.title}</p>
        </Reveal>
      </div>

      <div className="relative flex min-h-[70svh] flex-col items-center justify-center px-5 py-24 lg:min-h-0" style={{ backgroundColor: ivory, color: bordo }}>
        <Reveal delay={1.1}>
          <BrandImage image={c.logo.light} alt="SUN Solar em fundo ivory" width="min(70vw, 16vw + 20vh, 52vh, 480px)" sizes="(min-width: 1024px) 480px, 70vw" />
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

// TELA 16 — Sistema visual --------------------------------------------------

/** Raios derivados do símbolo: semicírculo + raios finos, sempre em 1px. */
function Rays({ count = 7, inner = 15, lengths = [7, 11] }: { count?: number; inner?: number; lengths?: number[] }) {
  const rays = Array.from({ length: count }, (_, i) => {
    const angle = Math.PI + (Math.PI * (i + 1)) / (count + 1);
    const len = lengths[i % lengths.length];
    return (
      <line
        key={i}
        x1={Math.cos(angle) * inner}
        y1={Math.sin(angle) * inner}
        x2={Math.cos(angle) * (inner + len)}
        y2={Math.sin(angle) * (inner + len)}
      />
    );
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
          const r2 = i % 2 ? 44 : 54;
          return <line key={i} x1={Math.cos(a) * 18} y1={Math.sin(a) * 18} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} />;
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
      <p className="text-[clamp(1rem,1.2vw,1.35rem)] font-light">Cabelo brasileiro.</p>
      <RayDivider className="w-[78%] text-(--slide-accent)" />
      <p className="text-[clamp(1rem,1.2vw,1.35rem)] font-light">Sem exceção.</p>
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
      <BrandImage image={s.symbol} alt="" width="clamp(72px, 6vw, 110px)" sizes="110px" />
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
            <h2 className="mt-6 font-display text-[clamp(2rem,2.9vw,3.5rem)] leading-[1.08]">
              <Lines lines={s.title} />
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <p className="max-w-[36ch] text-base font-light text-(--slide-muted) lg:text-right">{s.note}</p>
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
