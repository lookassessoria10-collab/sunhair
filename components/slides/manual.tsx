"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BrandImage } from "@/components/ui/BrandImage";
import { Eyebrow, Lines, SafeArea } from "@/components/ui/Layout";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { EASE, VIEWPORT } from "@/components/ui/motion";
import { useSlide } from "@/components/presentation/Slide";
import { manual } from "@/data/brandPresentation";

const ivory = "#F8F3EC";
const paper = "#F5F0E8";
const bordo = "#6B2E2E";
const deep = "#4F1720";
const espresso = "#3E2825";
const gold = "#D4B483";
const sand = "#D9C6B4";

function Heading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string | string[];
  text?: string;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.12}>
        <h2 className="mt-6 font-display text-[clamp(2.3rem,4.4vw,5.4rem)] leading-[1.02]">
          <Lines lines={lines} />
        </h2>
      </Reveal>
      {text ? (
        <Reveal delay={0.24}>
          <p className="mt-8 max-w-[48ch] text-[clamp(1rem,1.15vw,1.2rem)] font-light leading-[1.8] text-(--slide-muted)">
            {text}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

function HairLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 180" className={className} fill="none" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M 8 ${125 + i * 13} C 130 ${55 + i * 8}, 270 ${175 - i * 6}, 515 ${55 + i * 16}`}
          stroke="currentColor"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.72 - i * 0.13 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.9, delay: 0.18 * i, ease: EASE }}
        />
      ))}
    </svg>
  );
}

function ArcGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 260" className={className} fill="none" aria-hidden>
      <motion.path
        d="M 40 210 C 48 92, 128 24, 236 34 C 307 40, 340 95, 324 156"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 2.2, ease: EASE }}
      />
    </svg>
  );
}

function BrandOnPanel({
  dark = false,
  label,
  mono = false,
}: {
  dark?: boolean;
  label: string;
  mono?: boolean;
}) {
  return (
    <div
      className="flex min-h-[240px] flex-col justify-between border border-(--slide-line) p-5"
      style={{ backgroundColor: dark ? deep : ivory }}
    >
      <div className={`flex flex-1 items-center justify-center ${mono ? "grayscale" : ""}`}>
        <BrandImage
          image={dark ? manual.logo.negative : manual.logo.primary}
          alt={label}
          width="min(76%, 360px)"
          sizes="360px"
        />
      </div>
      <p className="eyebrow" style={{ color: dark ? ivory : espresso }}>
        {label}
      </p>
    </div>
  );
}

export function ApprovedBrandSlide() {
  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-[56%_44%]">
      <SafeArea className="justify-center">
        <Reveal>
          <Eyebrow number="02">{manual.approved.eyebrow}</Eyebrow>
        </Reveal>
        <MaskReveal from="bottom" duration={2} delay={0.18} className="mt-10">
          <BrandImage
            image={manual.logo.primary}
            alt="SUN Brazilian Hair"
            width="min(76vw, 700px)"
            sizes="(min-width:1024px) 700px, 80vw"
          />
        </MaskReveal>
        <Reveal delay={0.65}>
          <p className="mt-10 text-[clamp(1.1rem,1.4vw,1.55rem)] font-light text-(--slide-muted)">
            {manual.approved.statement}
          </p>
        </Reveal>
      </SafeArea>
      <ParallaxImage
        image={manual.imagery.hero}
        alt="Cabelo em luz quente"
        sizes="(min-width:1024px) 44vw, 100vw"
        className="h-[62svh] lg:h-full"
        position="64% 42%"
      />
    </div>
  );
}

export function ConceptSlide() {
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Heading eyebrow={manual.concept.eyebrow} title={manual.concept.title} text={manual.concept.text} />
        <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden border border-(--slide-line) bg-[#F8F3EC] p-8 lg:min-h-[62vh]">
          <ArcGraphic className="absolute right-[6%] top-[4%] w-[68%] text-[#D4B483] opacity-80" />
          <HairLines className="absolute bottom-[2%] left-[4%] w-[86%] text-[#D4B483] opacity-75" />
          <MaskReveal from="bottom" delay={0.25} duration={2}>
            <BrandImage image={manual.logo.primary} alt="SUN Brazilian Hair" width="min(70vw, 560px)" sizes="560px" />
          </MaskReveal>
        </div>
      </div>
      <ul className="mt-8 grid gap-4 border-t border-(--slide-line) pt-6 sm:grid-cols-3">
        {manual.concept.ideas.map((item, i) => (
          <Reveal key={item.title} delay={0.35 + i * 0.1}>
            <li>
              <p className="eyebrow text-(--slide-fg)">{item.title}</p>
              <p className="mt-2 font-light text-(--slide-muted)">{item.text}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </SafeArea>
  );
}

export function ArchitectureSlide() {
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Heading eyebrow={manual.architecture.eyebrow} title={manual.architecture.title} text={manual.architecture.text} />
        <div className="relative mx-auto w-full max-w-[720px] py-16">
          <BrandImage image={manual.logo.primary} alt="Estrutura da marca SUN" width="100%" sizes="720px" />
          {manual.architecture.levels.map((level, i) => (
            <motion.div
              key={level}
              className="absolute left-[-7%] flex w-[40%] items-center gap-4"
              style={{ top: `${[31, 73, 90][i]}%` }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.15, ease: EASE }}
            >
              <span className="eyebrow whitespace-nowrap">0{i + 1} · {level}</span>
              <span className="h-px flex-1 bg-(--slide-accent)" />
            </motion.div>
          ))}
        </div>
      </div>
    </SafeArea>
  );
}

export function VersionsSlide() {
  return (
    <SafeArea className="gap-10">
      <Heading eyebrow={manual.versions.eyebrow} title={manual.versions.title} text={manual.versions.text} />
      <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:min-h-0 lg:grid-cols-4">
        <BrandOnPanel label={manual.versions.items[0]} />
        <BrandOnPanel label={manual.versions.items[1]} dark />
        <BrandOnPanel label={manual.versions.items[2]} mono />
        <BrandOnPanel label={manual.versions.items[3]} dark mono />
      </div>
    </SafeArea>
  );
}

export function ProtectionSlide() {
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <Heading eyebrow={manual.protection.eyebrow} title={manual.protection.title} text={manual.protection.text} />
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {manual.protection.sizes.map((item) => (
              <Reveal key={item.value}>
                <div className="border-t border-(--slide-line) pt-4">
                  <dt className="font-display text-[clamp(2rem,3vw,3.4rem)]">{item.value}</dt>
                  <dd className="mt-2 text-sm text-(--slide-muted)">{item.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-[660px] border border-(--slide-accent) p-[7%]"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <BrandImage image={manual.logo.primary} alt="Área de proteção da marca" width="100%" sizes="660px" />
        </motion.div>
      </div>
    </SafeArea>
  );
}

export function PaletteSlide() {
  return (
    <SafeArea className="justify-center gap-12">
      <Heading eyebrow={manual.palette.eyebrow} title={manual.palette.title} text={manual.palette.text} />
      <div className="grid min-h-[360px] flex-1 grid-cols-2 gap-px overflow-hidden bg-(--slide-line) sm:grid-cols-3 lg:min-h-0 lg:grid-cols-6">
        {manual.palette.swatches.map((s, i) => (
          <motion.div
            key={s.hex}
            className="group relative min-h-[220px] overflow-hidden p-5"
            style={{ backgroundColor: s.hex }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <div className={`absolute inset-x-5 bottom-5 ${i === 3 || i === 4 ? "text-[#F8F3EC]" : "text-[#3E2825]"}`}>
              <p className="eyebrow">{s.name}</p>
              <p className="numeral mt-2 text-sm opacity-70">{s.hex}</p>
              <p className="mt-5 text-sm opacity-70">{s.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SafeArea>
  );
}

export function TypographySlide() {
  return (
    <SafeArea className="justify-center">
      <Heading eyebrow={manual.typography.eyebrow} title={manual.typography.title} />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr_0.86fr]">
        <div className="border-t border-(--slide-line) pt-6">
          <p className="font-essencia text-[clamp(7rem,13vw,12rem)] leading-none text-[#6B2E2E]">Aa</p>
          <p className="eyebrow mt-4">{manual.typography.primary.name}</p>
          <p className="mt-2 text-(--slide-muted)">{manual.typography.primary.role}</p>
        </div>
        <div className="border-t border-(--slide-line) pt-6">
          <p className="font-essencia-support text-[clamp(7rem,13vw,12rem)] font-light leading-none">Aa</p>
          <p className="eyebrow mt-4">{manual.typography.secondary.name}</p>
          <p className="mt-2 text-(--slide-muted)">{manual.typography.secondary.role}</p>
        </div>
        <div className="flex min-h-[360px] flex-col justify-between bg-[#6B2E2E] p-8 text-[#F8F3EC]">
          <p className="font-display text-4xl font-light">A marca SUN</p>
          <p className="max-w-[31ch] leading-[1.7] text-[#F8F3EC]/75">{manual.typography.note}</p>
          <span className="h-px w-20 bg-[#D4B483]" />
        </div>
      </div>
    </SafeArea>
  );
}

export function GraphicSystemSlide() {
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <Heading eyebrow={manual.graphic.eyebrow} title={manual.graphic.title} text={manual.graphic.text} />
          <ol className="mt-10 space-y-4">
            {manual.graphic.rules.map((rule, i) => (
              <li key={rule} className="flex gap-5 border-t border-(--slide-line) pt-4 text-sm sm:text-base">
                <span className="numeral text-[#D4B483]">0{i + 1}</span><span>{rule}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative min-h-[500px] overflow-hidden border border-(--slide-line) bg-[#F8F3EC] lg:min-h-[65vh]">
          <ArcGraphic className="absolute -right-[4%] -top-[8%] w-[82%] text-[#D4B483]" />
          <HairLines className="absolute -bottom-[2%] -left-[4%] w-[92%] text-[#6B2E2E] opacity-70" />
          <div className="absolute left-[12%] top-[18%] h-[60%] w-[36%] overflow-hidden rounded-t-full border border-[#D4B483]">
            <Image src={manual.imagery.detail.src} alt="Detalhe de cabelo em luz quente" fill sizes="360px" className="object-cover" />
          </div>
          <p className="absolute bottom-[14%] right-[9%] max-w-[240px] font-essencia text-4xl text-[#6B2E2E]">Movimento</p>
        </div>
      </div>
    </SafeArea>
  );
}

export function PhotographySlide() {
  return (
    <SafeArea className="justify-center gap-10">
      <Heading eyebrow={manual.photography.eyebrow} title={manual.photography.title} text={manual.photography.text} />
      <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:min-h-0 lg:grid-cols-[0.8fr_1.2fr_0.8fr]">
        <ParallaxImage image={manual.imagery.detail} alt="Close de cabelo" className="min-h-[280px] lg:min-h-0" sizes="30vw" position="40% 50%" />
        <ParallaxImage image={manual.imagery.hero} alt="Cabelo em contraluz" className="min-h-[320px] lg:min-h-0" sizes="42vw" position="54% 48%" />
        <ParallaxImage image={manual.imagery.editorial} alt="Editorial de cabelo" className="min-h-[280px] lg:min-h-0" sizes="30vw" position="68% 50%" />
      </div>
      <ul className="flex flex-wrap gap-2">
        {manual.photography.tags.map((tag) => <li key={tag} className="eyebrow rounded-full border border-(--slide-line) px-4 py-2">{tag}</li>)}
      </ul>
    </SafeArea>
  );
}

export function VoiceSlide() {
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Heading eyebrow={manual.voice.eyebrow} title={manual.voice.title} text={manual.voice.text} />
        <ol className="border-t border-[#F8F3EC]/20">
          {manual.voice.examples.map((e, i) => (
            <li key={e} className="grid grid-cols-[3rem_1fr] items-center border-b border-[#F8F3EC]/20 py-7">
              <span className="numeral text-sm text-[#D4B483]">0{i + 1}</span>
              <span className="font-essencia text-[clamp(1.45rem,2.2vw,2.6rem)] leading-tight">{e}</span>
            </li>
          ))}
        </ol>
      </div>
    </SafeArea>
  );
}

function CardMockup() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[820px]">
      <motion.div className="absolute right-[4%] top-[9%] h-[47%] w-[70%] rotate-[4deg] bg-[#6B2E2E] shadow-2xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 1.2, ease: EASE }}>
        <ArcGraphic className="absolute -right-6 top-0 w-[42%] text-[#D4B483] opacity-75" />
      </motion.div>
      <motion.div className="absolute bottom-[5%] left-[2%] flex h-[58%] w-[72%] -rotate-[3deg] items-center justify-center bg-[#F8F3EC] p-10 shadow-2xl" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 1.2, delay: 0.12, ease: EASE }}>
        <BrandImage image={manual.logo.primary} alt="Aplicação em cartão" width="82%" sizes="480px" />
      </motion.div>
    </div>
  );
}

export function CardApplicationSlide() {
  const c = manual.applications.card;
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <CardMockup />
      </div>
    </SafeArea>
  );
}

function BoxMockup() {
  return (
    <div className="relative mx-auto aspect-[5/3] w-full max-w-[900px] [perspective:1400px]">
      <motion.div className="absolute inset-[8%_2%_8%_6%]" initial={{ opacity: 0, y: 30, rotateY: -12 }} whileInView={{ opacity: 1, y: 0, rotateY: -6 }} viewport={VIEWPORT} transition={{ duration: 1.4, ease: EASE }}>
        <div className="absolute inset-0 overflow-hidden bg-[#4F1720] shadow-[0_40px_80px_rgba(62,40,37,0.28)]">
          <ArcGraphic className="absolute -right-[8%] -top-[12%] w-[48%] text-[#D4B483] opacity-70" />
          <HairLines className="absolute -bottom-[10%] -left-[4%] w-[72%] text-[#D4B483] opacity-55" />
          <div className="absolute inset-0 flex items-center justify-center p-[8%]">
            <BrandImage image={manual.logo.negative} alt="Aplicação da marca na caixa" width="58%" sizes="480px" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function BoxApplicationSlide() {
  const c = manual.applications.box;
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <BoxMockup />
      </div>
    </SafeArea>
  );
}

function TagCard({ dark = false, rotate = "" }: { dark?: boolean; rotate?: string }) {
  return (
    <div className={`relative h-[420px] w-[235px] rounded-sm shadow-2xl ${rotate}`} style={{ backgroundColor: dark ? bordo : ivory }}>
      <span className="absolute left-1/2 top-5 size-4 -translate-x-1/2 rounded-full border-2 border-[#D4B483]" />
      <span className="absolute left-1/2 top-[-80px] h-[100px] w-px -translate-x-1/2 bg-[#B89B86]" />
      <div className="absolute inset-0 flex items-center justify-center p-7">
        <BrandImage image={dark ? manual.logo.negative : manual.logo.primary} alt="Tag SUN Brazilian Hair" width="100%" sizes="220px" />
      </div>
    </div>
  );
}

export function TagsApplicationSlide() {
  const c = manual.applications.tags;
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} />
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
            {[
              ["Cor", "1B"],
              ["Comprimento", "60 cm"],
              ["Peso", "100 g"],
              ["Lote", "SUN 026"],
            ].map(([a, b]) => (
              <div key={a} className="border-t border-(--slide-line) pt-3">
                <dt className="eyebrow text-(--slide-muted)">{a}</dt>
                <dd className="mt-2 text-lg">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative flex min-h-[620px] items-center justify-center gap-8 overflow-hidden bg-[#D9C6B4]/30 pt-20">
          <HairLines className="absolute bottom-0 left-0 w-full text-[#B89B86] opacity-65" />
          <TagCard dark rotate="-rotate-[5deg]" />
          <TagCard rotate="rotate-[4deg]" />
        </div>
      </div>
    </SafeArea>
  );
}

function BagMockup() {
  return (
    <div className="relative mx-auto h-[620px] w-full max-w-[720px]">
      <div className="absolute inset-x-[12%] bottom-[6%] h-[72%] bg-[#4F1720] shadow-[0_40px_80px_rgba(62,40,37,0.28)]">
        <div className="absolute -top-[20%] left-[31%] h-[28%] w-[38%] rounded-t-[50%] border-[3px] border-b-0 border-[#D4B483]" />
        <div className="absolute inset-0 flex items-center justify-center p-[15%]">
          <BrandImage image={manual.logo.negative} alt="Sacola SUN Brazilian Hair" width="74%" sizes="420px" />
        </div>
      </div>
      <div className="absolute left-[19%] top-[17%] h-28 w-24 rotate-[-8deg] bg-[#F8F3EC]" />
      <div className="absolute right-[18%] top-[12%] h-36 w-28 rotate-[9deg] bg-[#EFE4D8]" />
    </div>
  );
}

export function UnboxingApplicationSlide() {
  const c = manual.applications.unboxing;
  return (
    <SafeArea className="justify-center">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <BagMockup />
      </div>
    </SafeArea>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto h-[700px] w-[345px] rounded-[3rem] bg-[#151312] p-[10px] shadow-2xl">
      <div className="relative h-full overflow-hidden rounded-[2.45rem]">
        <Image src={manual.imagery.hero.src} alt="Aplicação mobile SUN Brazilian Hair" fill sizes="345px" className="object-cover" />
        <div className="absolute inset-0 bg-[#4F1720]/45" />
        <div className="absolute inset-x-7 top-10">
          <BrandImage image={manual.logo.negative} alt="SUN Brazilian Hair" width="80%" sizes="260px" />
        </div>
        <div className="absolute inset-x-8 bottom-20 text-[#F8F3EC]">
          <p className="font-display text-4xl font-light leading-tight">Cabelo brasileiro.<br />Sem exceção.</p>
          <span className="mt-7 block h-px w-16 bg-[#D4B483]" />
          <span className="eyebrow mt-7 inline-block border border-[#D4B483] px-6 py-3">Conheça</span>
        </div>
      </div>
    </div>
  );
}

export function DigitalApplicationSlide() {
  const c = manual.applications.digital;
  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-[52%_48%]">
      <SafeArea className="justify-center">
        <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} />
      </SafeArea>
      <div className="relative flex min-h-[820px] items-center justify-center overflow-hidden bg-[#6B2E2E] lg:min-h-0">
        <Image src={manual.imagery.editorial.src} alt="Editorial SUN" fill sizes="48vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[#4F1720]/35" />
        <PhoneMockup />
      </div>
    </div>
  );
}

export function RealisticApplicationSlide() {
  const { id } = useSlide();
  const item = manual.realisticApplications[id as keyof typeof manual.realisticApplications];
  if (!item) return null;
  const contain = item.fit === "contain";

  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-[34%_66%]">
      <SafeArea className="justify-center">
        <Heading eyebrow={item.eyebrow} title={item.title} text={item.text} />
        <Reveal delay={0.4}>
          <p className="eyebrow mt-10 text-(--slide-muted)">Simulação de aplicação</p>
        </Reveal>
      </SafeArea>
      <div className="relative min-h-[62svh] overflow-hidden bg-[#EDE2D6] lg:h-full">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.025 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className={contain ? "object-contain p-6 lg:p-[3vw]" : "object-cover"}
            style={{ objectPosition: item.position }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function CorrectUseSlide() {
  const c = manual.guidelines.correct;
  return (
    <SafeArea className="justify-center gap-12">
      <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
        <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <ul className="space-y-3 lg:justify-self-end">
          {c.rules.map((r) => (
            <li key={r} className="flex items-center gap-4 text-sm sm:text-base">
              <span className="grid size-7 place-items-center rounded-full border border-[#6B2E2E] text-[#6B2E2E]">✓</span>{r}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid flex-1 gap-4 lg:min-h-0 lg:grid-cols-2">
        <div className="flex min-h-[300px] items-center justify-center bg-[#F8F3EC] p-10">
          <BrandImage image={manual.logo.primary} alt="Uso correto em fundo claro" width="min(74%, 520px)" sizes="520px" />
        </div>
        <div className="flex min-h-[300px] items-center justify-center bg-[#4F1720] p-10">
          <BrandImage image={manual.logo.negative} alt="Uso correto em fundo bordô" width="min(74%, 520px)" sizes="520px" />
        </div>
      </div>
    </SafeArea>
  );
}

function WrongCard({
  label,
  mode,
}: {
  label: string;
  mode: "stretch" | "rotate" | "shadow" | "color";
}) {
  const styles =
    mode === "stretch"
      ? "scale-x-[1.28] scale-y-[0.72]"
      : mode === "rotate"
        ? "rotate-[13deg]"
        : mode === "shadow"
          ? "drop-shadow-[10px_12px_6px_rgba(107,46,46,0.5)]"
          : "hue-rotate-[115deg] saturate-[1.5]";
  return (
    <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden border border-(--slide-line) bg-[#F5F0E8] p-6">
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <BrandImage image={manual.logo.primary} alt={label} width="76%" sizes="320px" className={styles} />
      </div>
      <span aria-hidden className="absolute left-[10%] top-[12%] h-[2px] w-[112%] origin-left rotate-[38deg] bg-[#A43A3A]" />
      <p className="eyebrow text-[#6B2E2E]">{label}</p>
    </div>
  );
}

export function WrongUseSlide() {
  const c = manual.guidelines.wrong;
  const modes = ["stretch", "rotate", "shadow", "color"] as const;
  return (
    <SafeArea className="justify-center gap-12">
      <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} />
      <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:min-h-0 lg:grid-cols-4">
        {c.items.map((item, i) => <WrongCard key={item} label={item} mode={modes[i]} />)}
      </div>
    </SafeArea>
  );
}

export function ClosingSlide() {
  return (
    <SafeArea className="items-center justify-center text-center">
      <MaskReveal from="bottom" duration={2}>
        <BrandImage image={manual.logo.negative} alt="SUN Brazilian Hair" width="min(84vw, 680px)" sizes="680px" />
      </MaskReveal>
      <Reveal delay={0.55}>
        <p className="mt-10 text-[clamp(1.3rem,1.8vw,2rem)] font-light">Cabelo brasileiro. Sem exceção.</p>
      </Reveal>
      <Reveal delay={0.9}>
        <p className="eyebrow mt-14 text-(--slide-accent)">{manual.closing.label}</p>
      </Reveal>
    </SafeArea>
  );
}
