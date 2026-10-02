"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { usePresentation } from "@/components/presentation/PresentationContext";
import { useSlide } from "@/components/presentation/Slide";
import { BrandImage } from "@/components/ui/BrandImage";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { EASE } from "@/components/ui/motion";
import { Reveal, Rule } from "@/components/ui/Reveal";
import { brand, closing, comparison, conceptOrder, concepts, neutral, type GalleryItem } from "@/data/brandPresentation";

const list = conceptOrder.map((id) => concepts[id]);

/** Largura de cada marca para que as três tenham presença visual equivalente. */
const LOGO_SCALE: Record<string, number> = { essencia: 1, solar: 0.88, origem: 1 };

// TELA 25 — Três caminhos ---------------------------------------------------

export function ThreePathsSlide() {
  const p = comparison.paths;
  return (
    <SafeArea className="gap-10 lg:gap-[5vh]">
      <div>
        <Reveal>
          <Eyebrow number="04">{p.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,3.8vw,4.6rem)] leading-none">{p.title}</h2>
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
              <p className="mt-3 text-[clamp(1.1rem,1.5vw,1.6rem)] uppercase tracking-[0.36em]">{concept.name}</p>
            </Reveal>
            <Reveal delay={0.45 + i * 0.15}>
              <ul className="space-y-1 font-display text-[clamp(1.5rem,1.9vw,2.4rem)] leading-tight">
                {concept.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.6 + i * 0.15} className="mt-auto">
              <div className="grid aspect-[16/10] place-items-center border border-(--slide-line) lg:aspect-auto lg:h-[22vh]">
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

// TELA 26 — As três marcas --------------------------------------------------

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
                    <motion.span
                      layoutId="marks-toggle"
                      className="absolute inset-0 bg-(--slide-fg)/8"
                      transition={{ duration: 0.7, ease: EASE }}
                    />
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
                <div className="relative grid place-items-center" style={{ width: `calc(min(70vw, 12vw + 26vh, 46vh) * ${LOGO_SCALE[concept.id]})` }}>
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

// TELA 27 — Aplicadas ao produto --------------------------------------------

const boards: GalleryItem[] = list.map((concept) => ({
  label: `${concept.number} ${concept.name} — brandboard completo`,
  image: concept.brandboard,
}));

export function AppliedSlide() {
  const a = comparison.applied;
  const { openLightbox } = usePresentation();
  return (
    <SafeArea className="gap-10 lg:gap-[4.5vh]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <Eyebrow number="04">{a.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,3.8vw,4.6rem)] leading-none">{a.title}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <p className="eyebrow max-w-[46ch] text-(--slide-muted) lg:text-right">{a.hint}</p>
        </Reveal>
      </div>

      <ul className="grid flex-1 gap-10 lg:min-h-0 lg:grid-cols-3 lg:gap-[2vw]">
        {list.map((concept, i) => (
          <li key={concept.id} className="lg:min-h-0">
            <Reveal delay={0.3 + i * 0.15} className="h-full">
              <button
                type="button"
                onClick={() => openLightbox(boards, i)}
                className="group flex h-full w-full flex-col text-left"
                aria-label={`Abrir brandboard completo do conceito ${concept.name}`}
              >
                <div className="flex items-baseline justify-between border-t border-(--slide-line) pb-4 pt-4">
                  <p className="flex items-baseline gap-3">
                    <span className="numeral eyebrow text-(--slide-muted)">{concept.number}</span>
                    <span className="uppercase tracking-[0.32em]">{concept.name}</span>
                  </p>
                  <span className="eyebrow flex items-center gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                    {a.open}
                    <Maximize2 className="size-3.5" strokeWidth={1.25} aria-hidden />
                  </span>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden border border-(--slide-line) lg:aspect-auto lg:min-h-0 lg:flex-1">
                  <div className="absolute inset-0 grid place-items-center transition-opacity duration-700 group-hover:opacity-0 pointer-coarse:opacity-0">
                    <BrandImage
                      image={concept.logo.light}
                      alt=""
                      width={`calc(min(62vw, 9vw + 18vh, 34vh) * ${LOGO_SCALE[concept.id]})`}
                      sizes="360px"
                    />
                  </div>
                  <div className="photo-grain absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-coarse:opacity-100">
                    <Image
                      src={concept.product.src}
                      alt={`Embalagem — conceito ${concept.name}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="scale-[1.06] object-cover transition-[scale] duration-[1600ms] ease-(--ease-editorial) group-hover:scale-100"
                    />
                  </div>
                </div>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>
    </SafeArea>
  );
}

// TELA 28 — Encerramento ----------------------------------------------------

export function ClosingSlide() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-5 text-center lg:h-full lg:min-h-0">
      <Reveal duration={1.6}>
        <p className="font-display text-[min(26vw,30vh)] leading-[0.78] tracking-[0.06em] lg:text-[min(17vw,30vh)]">{brand.name}</p>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="eyebrow mt-[4.5vh] text-[0.78rem] tracking-[0.62em]">{brand.descriptor}</p>
      </Reveal>
      <Reveal delay={0.55}>
        <p className="mt-[6vh] font-display text-[clamp(1.5rem,2.3vw,2.6rem)] italic leading-tight">
          <Lines lines={closing.tagline} />
        </p>
      </Reveal>
      <Rule delay={0.9} className="mt-[6vh] w-16 bg-current/30" />
      <Reveal delay={1.1}>
        <p className="mt-[6vh] text-[clamp(0.8rem,0.95vw,1rem)] uppercase leading-loose tracking-[0.36em] text-(--slide-muted)">
          <Lines lines={closing.signature} />
        </p>
      </Reveal>
    </div>
  );
}
