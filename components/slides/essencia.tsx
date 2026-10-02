"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { BrandImage } from "@/components/ui/BrandImage";
import { readableOn } from "@/components/ui/color";
import { GalleryTile } from "@/components/ui/GalleryTile";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { EASE, VIEWPORT } from "@/components/ui/motion";
import { MaskReveal, Reveal, Rule } from "@/components/ui/Reveal";
import type { Asset } from "@/data/assets";
import { concepts } from "@/data/brandPresentation";

const c = concepts.essencia;

// TELA 06 — Abertura --------------------------------------------------------

export function EssenciaOpening() {
  return (
    <SafeArea className="gap-14 lg:grid lg:grid-cols-[28%_1fr] lg:gap-0">
      <div className="order-2 flex flex-col justify-end lg:order-1">
        <Reveal delay={1.2}>
          <p className="numeral eyebrow text-(--slide-muted)">{c.number}</p>
        </Reveal>
        <Reveal delay={1.35}>
          <h2 className="mt-5 text-[clamp(1.4rem,2.1vw,2.4rem)] uppercase leading-none tracking-[0.46em]">{c.opening.title}</h2>
        </Reveal>
        <Rule delay={1.5} className="mt-7 w-16" />
        <Reveal delay={1.6}>
          <p className="mt-7 font-display text-[clamp(1.25rem,1.7vw,1.9rem)] italic leading-snug text-(--slide-muted)">
            <Lines lines={c.opening.subtitle} />
          </p>
        </Reveal>
      </div>

      <div className="order-1 flex items-center justify-center pt-10 lg:order-2 lg:pt-0">
        <MaskReveal from="left" duration={2.2} delay={0.2}>
          <BrandImage
            image={c.logo.light}
            alt="SUN Brazilian Hair — conceito Essência"
            width="min(86vw, 44vw + 20vh, 78vh, 700px)"
            sizes="(min-width: 1024px) 700px, 90vw"
            preload
          />
        </MaskReveal>
      </div>
    </SafeArea>
  );
}

// TELA 07 — Defesa ----------------------------------------------------------

function DetailFrame({
  image,
  position,
  zoom,
  label,
  index,
  className = "",
}: {
  image: Asset;
  position: string;
  zoom: number;
  label: string;
  index: number;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* O gatilho fica na moldura: a camada ampliada é quase toda recortada. */}
      <motion.div
        className="relative overflow-hidden border border-(--slide-line)"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        initial="hidden"
        whileInView="shown"
        viewport={VIEWPORT}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: position }}
          variants={{ hidden: { scale: zoom * 0.82, opacity: 0 }, shown: { scale: zoom, opacity: 1 } }}
          transition={{ duration: 2.6, delay: 0.3 + index * 0.25, ease: EASE }}
        >
          <Image src={image.src} alt="" fill sizes="100vw" quality={90} className="object-contain" />
        </motion.div>
      </motion.div>
      <figcaption className="eyebrow mt-3 flex gap-3 text-(--slide-muted)">
        <span className="numeral">{String(index + 1).padStart(2, "0")}</span>
        {label}
      </figcaption>
    </figure>
  );
}

export function EssenciaDefense() {
  const d = c.defense;
  return (
    <SafeArea className="gap-14 lg:grid lg:grid-cols-[40%_1fr] lg:items-center lg:gap-[6vw]">
      <div>
        <Reveal>
          <Eyebrow number={c.number}>{c.name}</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,4.2vw,5.2rem)] leading-[0.98]">
            <Lines lines={d.title} />
          </h2>
        </Reveal>
        <div className="mt-10 max-w-[38ch] space-y-5 text-[clamp(1rem,1.05vw,1.15rem)] leading-relaxed text-(--slide-muted)">
          {d.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.3 + i * 0.15}>
              <p className={i === d.paragraphs.length - 1 ? "text-(--slide-fg)" : ""}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:relative lg:block lg:h-[min(62vh,560px)]">
        <DetailFrame
          image={c.logo.light}
          index={0}
          {...d.details[0]}
          className="lg:absolute lg:left-0 lg:top-0 lg:w-[54%]"
        />
        <DetailFrame
          image={c.logo.light}
          index={1}
          {...d.details[1]}
          className="lg:absolute lg:bottom-0 lg:right-0 lg:w-[46%]"
        />
      </div>
    </SafeArea>
  );
}

// TELA 08 — Construção ------------------------------------------------------

/** Distância entre as partes da assinatura depois da "explosão". */
const PART_GAP = "clamp(1.75rem, 5vh, 3.25rem)";

export function EssenciaConstruction() {
  const k = c.construction;
  // 0: tipografia e 1: movimento destacam "SUN"; 2: respiro destaca os espaços
  const [focus, setFocus] = useState<number | null>(null);
  const partDim = (part: number) => focus !== null && !(focus < 2 ? part === 0 : false);
  const gapActive = focus === 2;

  return (
    <SafeArea className="gap-14 lg:grid lg:grid-cols-[1fr_34%] lg:gap-[5vw]">
      <div className="flex flex-col">
        <Reveal>
          <Eyebrow number={c.number}>{k.eyebrow}</Eyebrow>
        </Reveal>
        <div className="flex flex-1 items-center justify-center py-10 lg:py-0">
          <div className="flex w-[min(84vw,40vw_+_16vh,560px)] flex-col items-stretch" style={{ gap: PART_GAP }}>
            {k.parts.map((part, i) => (
              <div key={part.src} className="relative">
                {i > 0 && <GapMarker active={gapActive} />}
                <motion.div
                  initial={{ y: i === 0 ? `calc(${PART_GAP})` : i === 2 ? `calc(-1 * ${PART_GAP})` : 0, opacity: 0.4 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
                >
                  <motion.div animate={{ opacity: partDim(i) ? 0.22 : 1 }} transition={{ duration: 0.6, ease: EASE }}>
                    <BrandImage image={part} alt="" sizes="(min-width: 1024px) 560px, 84vw" />
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol className="flex flex-col justify-center gap-0" onMouseLeave={() => setFocus(null)}>
        {k.callouts.map((callout, i) => (
          <li key={callout.title}>
            <Rule delay={0.8 + i * 0.2} />
            <Reveal delay={0.9 + i * 0.2} y={20}>
              <button
                type="button"
                onMouseEnter={() => setFocus(i)}
                onFocus={() => setFocus(i)}
                onBlur={() => setFocus(null)}
                className={`w-full py-6 text-left transition-opacity duration-500 lg:py-[3.5vh] ${
                  focus !== null && focus !== i ? "opacity-40" : "opacity-100"
                }`}
              >
                <span className="eyebrow flex gap-3 text-(--slide-muted)">
                  <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                  {callout.title}
                </span>
                <span className="mt-3 block font-display text-[clamp(1.35rem,1.75vw,2rem)] leading-snug">{callout.text}</span>
              </button>
            </Reveal>
          </li>
        ))}
      </ol>
    </SafeArea>
  );
}

/** Marcação discreta do respiro entre as partes da assinatura. */
function GapMarker({ active }: { active: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="absolute -left-8 bottom-full flex flex-col items-center justify-between lg:-left-12"
      style={{ height: PART_GAP }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, delay: 2.1, ease: EASE }}
    >
      <span className={`h-px w-2 transition-colors duration-500 ${active ? "bg-(--slide-fg)" : "bg-(--slide-accent)"}`} />
      <span className={`w-px flex-1 transition-colors duration-500 ${active ? "bg-(--slide-fg)" : "bg-(--slide-accent)"}`} />
      <span className={`h-px w-2 transition-colors duration-500 ${active ? "bg-(--slide-fg)" : "bg-(--slide-accent)"}`} />
    </motion.span>
  );
}

// TELA 09 — Cores -----------------------------------------------------------

export function EssenciaColors() {
  const p = c.palette;
  const [active, setActive] = useState<number | null>(null);
  return (
    <SafeArea className="gap-10 lg:gap-[5vh]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <Eyebrow number={c.number}>{p.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,3.4vw,4.2rem)] leading-none">{p.title}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <p className="eyebrow hidden text-(--slide-muted) lg:block">{p.hint}</p>
        </Reveal>
      </div>

      <div
        className="flex flex-1 flex-col border-y border-(--slide-line) lg:-mx-[6vw] lg:min-h-0 lg:flex-row"
        onMouseLeave={() => setActive(null)}
      >
        {p.swatches.map((s, i) => {
          const isActive = active === i;
          const text = readableOn(s.hex, "#3E2825", "#F8F3EC");
          return (
            <motion.button
              key={s.hex}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={`${s.name}, ${s.hex}. ${s.role}`}
              className="group relative min-h-24 overflow-hidden border-(--slide-line) text-left transition-[flex-grow] duration-[900ms] ease-(--ease-editorial) not-last:border-b lg:min-h-0 lg:not-last:border-b-0 lg:not-last:border-r"
              style={{ backgroundColor: s.hex, color: text, flexGrow: isActive ? p.weights[i] * 1.8 : p.weights[i], flexBasis: 0 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: EASE }}
            >
              <span className="absolute inset-x-4 bottom-4 block lg:inset-x-5 lg:bottom-6">
                <span className="block font-display text-[clamp(1.25rem,1.6vw,1.9rem)] leading-none">{s.name}</span>
                <span
                  className={`mt-3 block transition-[opacity,translate] duration-700 ease-(--ease-editorial) lg:translate-y-2 lg:opacity-0 ${
                    isActive ? "lg:translate-y-0 lg:opacity-100" : ""
                  }`}
                >
                  <span className="numeral eyebrow block">{s.hex}</span>
                  <span className="mt-2 block text-sm opacity-80">{s.role}</span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </SafeArea>
  );
}

// TELA 10 — Tipografia ------------------------------------------------------

export function EssenciaTypography() {
  const t = c.typography;
  return (
    <SafeArea className="gap-14 lg:grid lg:grid-cols-[38%_1fr] lg:gap-[6vw]">
      <div className="flex flex-col">
        <Reveal>
          <Eyebrow number={c.number}>{t.eyebrow}</Eyebrow>
        </Reveal>
        <div className="flex flex-1 flex-col justify-center gap-10 pt-10 lg:gap-[5vh] lg:pt-0">
          <Reveal delay={0.2}>
            <BrandImage image={t.primary.specimen} alt="Aa — tipografia principal" width="min(70vw, 18vw + 22vh, 400px)" />
            <p className="eyebrow mt-6">{t.primary.label}</p>
            <p className="eyebrow mt-2 text-(--slide-muted)">{t.primary.traits.join("  |  ")}</p>
          </Reveal>
          <Rule delay={0.5} className="w-full" />
          <Reveal delay={0.6} className="flex items-end gap-8">
            <BrandImage image={t.secondary.specimen} alt="Aa — tipografia de apoio" width="min(30vw, 6vw + 9vh, 150px)" />
            <div>
              <p className="eyebrow">{t.secondary.label}</p>
              <p className="eyebrow mt-2 text-(--slide-muted)">{t.secondary.traits.join("  |  ")}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-8 lg:gap-[4.5vh]">
        <Reveal delay={0.4}>
          <p className="font-essencia text-[clamp(2.6rem,5.2vw,6.4rem)] leading-[0.95]">{t.samples.brand}</p>
        </Reveal>
        <Rule delay={0.6} />
        <Reveal delay={0.7}>
          <p className="font-essencia text-[clamp(2rem,3.4vw,4.2rem)] leading-[1.02] text-(--slide-muted)">
            <Lines lines={t.samples.tagline} />
          </p>
        </Reveal>
        <Rule delay={0.85} />
        <Reveal delay={0.95}>
          <p className="font-essencia-support text-[clamp(1.05rem,1.45vw,1.6rem)] font-light tracking-[0.04em]">{t.samples.support}</p>
          <p className="mt-5 font-essencia-support text-sm font-light tracking-[0.22em] text-(--slide-muted)">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789
          </p>
        </Reveal>
      </div>
    </SafeArea>
  );
}

// TELA 11 — Linguagem gráfica ----------------------------------------------

export function EssenciaLanguage() {
  const l = c.language;
  return (
    <SafeArea className="gap-10 lg:gap-[5vh]">
      <div>
        <Reveal>
          <Eyebrow number={c.number}>{l.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,3.2vw,4rem)] leading-[1.02]">
            <span className="block">{l.title[0]}</span>
            <span className="block italic text-(--slide-muted)">{l.title[1]}</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid flex-1 gap-8 lg:min-h-0 lg:grid-cols-3 lg:gap-[2vw]">
        {/* 01 — linha isolada */}
        <Panel index={0} label={l.labels[0]}>
          <div className="absolute inset-0 grid place-items-center border border-(--slide-line) p-[8%]">
            <MaskReveal from="left" duration={2.4} delay={0.5} className="w-full">
              <BrandImage image={l.line} alt="" sizes="(min-width: 1024px) 30vw, 90vw" />
            </MaskReveal>
          </div>
        </Panel>

        {/* 02 — linha sobre fotografia */}
        <Panel index={1} label={l.labels[1]}>
          <div className="photo-grain absolute inset-0 overflow-hidden">
            <Image src={l.photo.src} alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
            <div className="absolute inset-0 grid place-items-center p-[6%]">
              <MaskReveal from="left" duration={2.4} delay={0.8} className="w-full">
                <BrandImage
                  image={l.line}
                  alt=""
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="mix-blend-screen brightness-[1.9] saturate-[0.7]"
                />
              </MaskReveal>
            </div>
          </div>
        </Panel>

        {/* 03 — linha aplicada em composição (recorte original do brandboard) */}
        <Panel index={2} label={l.labels[2]}>
          <div className="photo-grain absolute inset-0 overflow-hidden">
            <Image src={l.applied.src} alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" style={{ objectPosition: "50% 60%" }} />
          </div>
        </Panel>
      </div>
    </SafeArea>
  );
}

function Panel({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  return (
    <Reveal delay={0.3 + index * 0.15} className="flex flex-col lg:min-h-0">
      <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1">{children}</div>
      <p className="eyebrow mt-4 flex gap-3 text-(--slide-muted)">
        <span className="numeral">{String(index + 1).padStart(2, "0")}</span>
        {label}
      </p>
    </Reveal>
  );
}

// TELA 12 — Aplicações ------------------------------------------------------

export function EssenciaApplications() {
  const a = c.applications;
  const items = a.items;
  return (
    <SafeArea wide className="gap-8">
      <div className="grid flex-1 gap-2 lg:min-h-0 lg:grid-cols-4 lg:grid-rows-2">
        <Reveal className="lg:col-span-2 lg:row-span-2" delay={0.1}>
          <GalleryTile items={items} index={0} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] h-full w-full lg:aspect-auto" />
        </Reveal>
        <Reveal delay={0.25}>
          <GalleryTile items={items} index={1} sizes="(min-width: 1024px) 25vw, 100vw" className="aspect-[4/5] h-full w-full lg:aspect-auto" />
        </Reveal>
        <Reveal delay={0.4}>
          <GalleryTile items={items} index={2} sizes="(min-width: 1024px) 25vw, 100vw" className="aspect-[4/5] h-full w-full lg:aspect-auto" />
        </Reveal>
        <Reveal delay={0.55}>
          <GalleryTile
            items={items}
            index={3}
            sizes="(min-width: 1024px) 25vw, 100vw"
            position="50% 30%"
            className="aspect-[4/5] h-full w-full lg:aspect-auto"
          />
        </Reveal>
        <Reveal delay={0.7} className="flex flex-col justify-end p-2 lg:p-[2vw]">
          <Eyebrow number={c.number}>{a.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,3vw,3.6rem)] leading-none">{a.title}</h2>
          <p className="eyebrow mt-5 text-(--slide-muted)">Clique para ampliar</p>
        </Reveal>
      </div>
    </SafeArea>
  );
}
