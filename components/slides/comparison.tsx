"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { usePresentation } from "@/components/presentation/PresentationContext";
import { useSlide } from "@/components/presentation/Slide";
import { BrandImage } from "@/components/ui/BrandImage";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { EASE } from "@/components/ui/motion";
import { Reveal, Rule } from "@/components/ui/Reveal";
import { brand, closing, comparison, conceptOrder, concepts, neutral } from "@/data/brandPresentation";

const list = conceptOrder.map((id) => concepts[id]);

/** Largura relativa de cada marca para que as três tenham presença visual equivalente. */
const LOGO_SCALE: Record<string, number> = { essencia: 1, solar: 0.96, origem: 0.9 };

// TELA 22 — Três caminhos ---------------------------------------------------

export function ThreePathsSlide() {
  const p = comparison.paths;
  return (
    <SafeArea className="gap-10 lg:gap-[5vh]">
      <div>
        <Reveal>
          <Eyebrow number="04">{p.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-6 font-display text-[clamp(2rem,3vw,3.6rem)] leading-[1.05]">{p.title}</h2>
        </Reveal>
      </div>

      <ol className="grid flex-1 border-t border-(--slide-line) lg:min-h-0 lg:grid-cols-3">
        {list.map((concept, i) => (
          <li
            key={concept.id}
            className={`flex flex-col gap-8 border-b border-(--slide-line) py-8 lg:gap-[3vh] lg:border-b-0 lg:py-[3vh] ${
              i > 0 ? "lg:border-l lg:pl-[2.4vw]" : ""
            } ${i < 2 ? "lg:pr-[2.4vw]" : ""}`}
          >
            <Reveal delay={0.3 + i * 0.15}>
              <p className="numeral eyebrow text-(--slide-muted)">{concept.number}</p>
              <p className="mt-3 text-[clamp(1rem,1.3vw,1.4rem)] font-normal uppercase tracking-[0.34em]">{concept.name}</p>
            </Reveal>
            <Reveal delay={0.45 + i * 0.15}>
              <ul className="space-y-1 font-display text-[clamp(1.3rem,1.6vw,2rem)] leading-tight">
                {concept.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.6 + i * 0.15} className="mt-auto">
              <div className="grid aspect-[16/10] place-items-center border border-(--slide-line) lg:aspect-auto lg:h-[24vh]">
                <BrandImage
                  image={concept.logo.light}
                  alt={`Marca ${concept.name}`}
                  width={`calc(min(60vw, 6vw + 20vh, 26vh) * ${LOGO_SCALE[concept.id]})`}
                  sizes="360px"
                />
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </SafeArea>
  );
}

// TELA 23 — As três marcas --------------------------------------------------

export function ThreeMarksSlide() {
  const m = comparison.marks;
  const [dark, setDark] = useState(false);
  const { setToneOverride } = usePresentation();
  const { id } = useSlide();

  useEffect(() => {
    setToneOverride(id, dark ? { tone: "dark", bg: m.darkBackground } : null);
  }, [dark, id, setToneOverride, m.darkBackground]);
  useEffect(() => () => setToneOverride(id, null), [id, setToneOverride]);

  const vars = {
    "--slide-bg": dark ? m.darkBackground : m.lightBackground,
    "--slide-fg": dark ? neutral.paper : neutral.ink,
  } as CSSProperties;

  return (
    <div className="slide-vars relative lg:h-full" style={vars}>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={false}
        animate={{ backgroundColor: dark ? m.darkBackground : m.lightBackground }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <SafeArea className="gap-10 lg:gap-[4vh]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow number="04">{m.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <div role="radiogroup" aria-label="Fundo da comparação" data-local-keys className="flex border border-(--slide-line)">
              {[false, true].map((value) => (
                <button
                  key={String(value)}
                  type="button"
                  role="radio"
                  aria-checked={dark === value}
                  onClick={() => setDark(value)}
                  className={`eyebrow relative px-5 py-3 transition-colors duration-700 ${dark === value ? "" : "opacity-55 hover:opacity-90"}`}
                >
                  {dark === value && (
                    <motion.span layoutId="marks-toggle" className="absolute inset-0 bg-(--slide-fg)/8" transition={{ duration: 0.7, ease: EASE }} />
                  )}
                  <span className="relative">{value ? m.toggle.dark : m.toggle.light}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="grid flex-1 items-center gap-16 py-8 lg:grid-cols-3 lg:gap-[3vw] lg:py-0">
          {list.map((concept, i) => (
            <li key={concept.id} className="flex flex-col items-center gap-8 lg:gap-[5vh]">
              <Reveal delay={0.3 + i * 0.15}>
                <div
                  className="relative grid place-items-center"
                  style={{ width: `calc(min(70vw, 12vw + 26vh, 46vh) * ${LOGO_SCALE[concept.id]})` }}
                >
                  {(["light", "dark"] as const).map((variant) => (
                    <motion.div
                      key={variant}
                      className="col-start-1 row-start-1 w-full"
                      initial={false}
                      animate={{ opacity: (variant === "dark") === dark ? 1 : 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                      aria-hidden={(variant === "dark") !== dark}
                    >
                      <BrandImage image={concept.logo[variant]} alt={`Marca ${concept.name}`} sizes="(min-width: 1024px) 26vw, 70vw" />
                    </motion.div>
                  ))}
                </div>
              </Reveal>
              <p className="eyebrow flex gap-3">
                <span className="numeral opacity-60">{concept.number}</span>
                {concept.name}
              </p>
            </li>
          ))}
        </ul>

        <p className="mx-auto max-w-[70ch] text-center text-xs leading-relaxed text-(--slide-muted)">{m.footnote}</p>
      </SafeArea>
    </div>
  );
}

// TELA 24 — Encerramento ----------------------------------------------------

export function ClosingSlide() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-5 text-center lg:h-full lg:min-h-0">
      <Reveal duration={1.6}>
        <p className="wordmark text-[min(19vw,15vh)] leading-none lg:text-[min(12vw,19vh)]">{brand.name}</p>
      </Reveal>
      <Rule delay={0.3} className="mx-auto mt-[5vh] w-14 bg-current/40" />
      <Reveal delay={0.4}>
        <p className="eyebrow mt-[4vh] text-[0.8rem] tracking-[0.62em] [margin-right:-0.62em]">{brand.descriptor}</p>
      </Reveal>
      <Reveal delay={0.6}>
        <p className="mt-[6vh] text-[clamp(1.2rem,1.7vw,1.9rem)] font-light leading-snug">
          <Lines lines={closing.tagline} />
        </p>
      </Reveal>
      <Reveal delay={1}>
        <p className="mt-[6vh] text-[clamp(0.75rem,0.85vw,0.9rem)] uppercase leading-loose tracking-[0.36em] text-(--slide-muted)">
          <Lines lines={closing.signature} />
        </p>
      </Reveal>
    </div>
  );
}
