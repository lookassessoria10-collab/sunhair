"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { usePresentation } from "@/components/presentation/PresentationContext";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { EASE } from "@/components/ui/motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { MaskReveal, Reveal, Rule } from "@/components/ui/Reveal";
import { brand, conceptOrder, concepts, intro } from "@/data/brandPresentation";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.6, delay, ease: EASE },
});

// TELA 01 — Capa ------------------------------------------------------------

export function CoverSlide() {
  const { next } = usePresentation();
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center px-5 text-center lg:h-full lg:min-h-0">
      <motion.h1
        {...enter(0.1)}
        className="font-display text-[min(30vw,36vh)] leading-[0.78] tracking-[0.06em] lg:text-[min(22vw,38vh)]"
      >
        {brand.name}
      </motion.h1>
      <motion.p {...enter(0.35)} className="eyebrow mt-[5vh] text-[0.78rem] tracking-[0.62em]">
        {brand.descriptor}
      </motion.p>
      <motion.p {...enter(0.55)} className="mt-[3vh] font-display text-[clamp(1.35rem,2vw,2rem)] italic">
        {brand.tagline}
      </motion.p>
      <motion.p {...enter(0.75)} className="eyebrow mt-[7vh] text-(--slide-muted)">
        {brand.presentationLabel}
      </motion.p>

      <motion.button
        type="button"
        onClick={next}
        className="eyebrow absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 lg:bottom-[11vh]"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 + 0.6, ease: EASE }}
      >
        <span className="flex items-center gap-2">
          {intro.cover.explore} <ArrowDown className="size-3.5" strokeWidth={1.25} aria-hidden />
        </span>
        <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-current/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-current"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </span>
      </motion.button>
    </div>
  );
}

// TELA 02 — A marca ---------------------------------------------------------

export function BrandSlide() {
  const c = intro.brand;
  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-[55%_1fr]">
      <ParallaxImage
        image={c.image}
        alt={c.imageAlt}
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="mt-16 h-[56svh] lg:my-20 lg:ml-10 lg:h-auto"
        position="50% 40%"
      />
      <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:py-0 lg:pl-[5vw] lg:pr-[7vw]">
        <Reveal>
          <Eyebrow number="00">{c.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.6rem,4.4vw,5.4rem)] leading-[0.98] lg:mt-[6vh]">
            <Lines lines={c.title} />
          </h2>
        </Reveal>
        <div className="mt-10 max-w-[36ch] space-y-5 text-[clamp(1rem,1.05vw,1.15rem)] leading-relaxed text-(--slide-muted) lg:mt-[6vh]">
          {c.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.35 + i * 0.15}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// TELA 03 — Posicionamento --------------------------------------------------

export function PositioningSlide() {
  const c = intro.positioning;
  return (
    <SafeArea className="justify-between gap-16">
      <Reveal>
        <Eyebrow number="00">{c.eyebrow}</Eyebrow>
      </Reveal>

      <h2 className="font-display text-[min(15vw,19vh)] leading-[0.9] tracking-[-0.01em] lg:text-[min(12.5vw,23vh)]">
        <MaskReveal from="bottom" duration={1.6}>
          <span className="block">{c.title[0]}</span>
        </MaskReveal>
        <MaskReveal from="bottom" duration={1.6} delay={0.25}>
          <span className="block italic lg:pl-[16vw]">{c.title[1]}</span>
        </MaskReveal>
      </h2>

      <ol className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {c.words.map((word, i) => (
          <li key={word}>
            <Rule delay={0.8 + i * 0.35} />
            <Reveal delay={1 + i * 0.35} y={20}>
              <p className="mt-5 flex items-baseline gap-3 sm:gap-4">
                <span className="numeral eyebrow text-(--slide-muted)">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(0.78rem,1.15vw,1.25rem)] uppercase tracking-[0.18em] sm:tracking-[0.32em]">{word}</span>
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </SafeArea>
  );
}

// TELA 04 — O desafio -------------------------------------------------------

export function ChallengeSlide() {
  const c = intro.challenge;
  return (
    <SafeArea className="justify-between gap-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-[6vw]">
        <div>
          <Reveal>
            <Eyebrow number="00">{c.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-8 font-display text-[clamp(2.6rem,4.6vw,5.6rem)] leading-[0.98]">
              <Lines lines={c.title} />
            </h2>
          </Reveal>
        </div>
        <div className="max-w-[40ch] space-y-5 self-end text-[clamp(1rem,1.05vw,1.15rem)] leading-relaxed text-(--slide-muted)">
          {c.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.3 + i * 0.15}>
              <p className={i === c.paragraphs.length - 1 ? "text-(--slide-fg)" : ""}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.8}>
            <p className="eyebrow pt-3">{c.touchpoints.join("  ·  ")}</p>
          </Reveal>
        </div>
      </div>

      <div>
        <Rule delay={0.6} />
        <div className="mt-6 grid grid-cols-2 gap-6 lg:mt-[4vh]">
          {c.figures.map((f, i) => (
            <Reveal key={f.label} delay={0.9 + i * 0.25}>
              <p className="flex items-end gap-5">
                <span className="numeral font-display text-[clamp(4.5rem,11vw,13rem)] leading-[0.8]">{f.value}</span>
                <span className="eyebrow pb-2 lg:pb-4">{f.label}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </SafeArea>
  );
}

// TELA 05 — Escolha um caminho ---------------------------------------------

export function PathsSlide() {
  const { goToId } = usePresentation();
  const c = intro.paths;
  return (
    <SafeArea className="gap-10 lg:gap-[5vh]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <Eyebrow number="00">{c.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,3.6vw,4.4rem)] leading-none">{c.title}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <p className="eyebrow text-(--slide-muted)">{c.hint}</p>
        </Reveal>
      </div>

      <ul className="grid flex-1 gap-10 lg:min-h-0 lg:grid-cols-3 lg:gap-[2.5vw]">
        {conceptOrder.map((id, i) => {
          const concept = concepts[id];
          return (
            <li key={id} className="lg:min-h-0">
              <Reveal delay={0.35 + i * 0.15} className="h-full">
                <button
                  type="button"
                  onClick={() => goToId(concept.id)}
                  className="group flex h-full w-full flex-col text-left"
                  aria-label={`Ir para o conceito ${concept.number} ${concept.name}`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--slide-line) lg:aspect-auto lg:min-h-0 lg:flex-1">
                    <Image
                      src={concept.preview.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="scale-[1.06] object-cover blur-[10px] saturate-[0.75] transition-[filter,scale] duration-[1200ms] ease-(--ease-editorial) group-hover:scale-100 group-hover:blur-[0px] group-hover:saturate-100 group-focus-visible:scale-100 group-focus-visible:blur-[0px] pointer-coarse:blur-[0px]"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4 border-t border-(--slide-line) pt-5">
                    <div>
                      <p className="numeral eyebrow text-(--slide-muted)">{concept.number}</p>
                      <p className="mt-3 text-[clamp(1.1rem,1.5vw,1.6rem)] uppercase tracking-[0.34em]">{concept.name}</p>
                      <p className="mt-2 font-display text-lg italic text-(--slide-muted)">{concept.summary}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 transition-transform duration-700 ease-(--ease-editorial) group-hover:-translate-y-1 group-hover:translate-x-1"
                      strokeWidth={1}
                      aria-hidden
                    />
                  </div>
                </button>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </SafeArea>
  );
}
