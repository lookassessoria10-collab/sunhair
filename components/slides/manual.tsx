"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
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
    <div className={`relative h-[310px] w-[174px] rounded-sm shadow-2xl sm:h-[360px] sm:w-[202px] lg:h-[420px] lg:w-[235px] ${rotate}`} style={{ backgroundColor: dark ? bordo : ivory }}>
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
        <div className="relative flex min-h-[470px] items-center justify-center gap-4 overflow-hidden bg-[#D9C6B4]/30 pt-16 sm:min-h-[560px] sm:gap-7 sm:pt-20 lg:min-h-[620px]">
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
    <div className="relative mx-auto h-[460px] w-full max-w-[720px] sm:h-[560px] lg:h-[620px]">
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
    <div className="relative mx-auto h-[540px] w-[270px] rounded-[2.4rem] bg-[#151312] p-[8px] shadow-2xl sm:h-[620px] sm:w-[305px] sm:rounded-[2.7rem] lg:h-[700px] lg:w-[345px] lg:rounded-[3rem] lg:p-[10px]">
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
      <div className="relative flex min-h-[620px] items-center justify-center overflow-hidden bg-[#6B2E2E] sm:min-h-[720px] lg:min-h-0">
        <Image src={manual.imagery.editorial.src} alt="Editorial SUN" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[#4F1720]/35" />
        <PhoneMockup />
      </div>
    </div>
  );
}


function MockupStage({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className="relative h-full min-h-[360px] overflow-hidden sm:min-h-[440px] lg:min-h-0"
      style={{
        background: dark
          ? "radial-gradient(circle at 72% 18%, rgba(212,180,131,.18), transparent 28%), linear-gradient(145deg, #35151A 0%, #5A2028 52%, #2E1718 100%)"
          : "radial-gradient(circle at 22% 14%, rgba(255,255,255,.9), transparent 30%), linear-gradient(145deg, #F8F3EC 0%, #E8D9C9 58%, #CDB49E 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(115deg, transparent 0 46%, rgba(255,255,255,.55) 48%, transparent 50% 100%)" }} />
      {children}
    </div>
  );
}

function HairSample({ color, label, compact = false }: { color: string; label?: string; compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={compact ? "h-24 w-7 rounded-b-[55%] shadow-lg sm:h-32 sm:w-9" : "h-32 w-9 rounded-b-[55%] shadow-lg sm:h-44 sm:w-12"}
        style={{
          background: color,
          boxShadow: "inset 8px 0 16px rgba(255,255,255,.08), inset -7px 0 12px rgba(0,0,0,.16), 0 14px 22px rgba(47,28,22,.13)",
        }}
      />
      {label ? <span className="text-[9px] font-medium tracking-[0.18em] text-[#6B5A51] sm:text-[10px]">{label}</span> : null}
    </div>
  );
}

function LandingScene() {
  return (
    <MockupStage>
      <div className="absolute bottom-[7%] left-[8%] right-[8%] top-[9%] sm:left-[7%] sm:right-[7%]">
        <div className="relative h-[82%] overflow-hidden border-[7px] border-[#201E1C] bg-[#F8F3EC] shadow-[0_34px_70px_rgba(62,40,37,.28)] sm:border-[10px]">
          <Image src={manual.imagery.hero.src} alt="" fill sizes="(min-width:1024px) 54vw, 88vw" className="object-cover object-[68%_50%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F3EC] via-[#F8F3EC]/85 to-transparent" />
          <div className="absolute left-[7%] top-[8%] w-[34%] min-w-[120px]">
            <BrandImage image={manual.logo.primary} alt="SUN Brazilian Hair" width="100%" sizes="240px" />
          </div>
          <div className="absolute left-[8%] top-[39%] max-w-[44%] text-[#3E2825]">
            <p className="font-display text-[clamp(1.25rem,2.8vw,3rem)] leading-[1.02]">Cabelo brasileiro.<br />Sem exceção.</p>
            <p className="mt-3 hidden max-w-[28ch] text-xs leading-5 text-[#6B5B54] sm:block">Extensões selecionadas para movimento, textura e acabamento natural.</p>
            <span className="eyebrow mt-5 inline-block border border-[#6B2E2E] px-4 py-2 text-[#6B2E2E]">Conheça</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-[12%] items-center justify-between border-t border-[#6B2E2E]/15 bg-[#F8F3EC]/95 px-[6%]">
            <span className="eyebrow text-[#6B2E2E]">Origem</span>
            <span className="eyebrow text-[#6B2E2E]">Tonalidades</span>
            <span className="eyebrow hidden text-[#6B2E2E] sm:inline">Profissionais</span>
          </div>
        </div>
        <div className="mx-auto h-[4%] w-[84%] rounded-b-[50%] bg-[#B8AEA4] shadow-lg" />
      </div>
    </MockupStage>
  );
}

function OpenBoxScene() {
  return (
    <MockupStage>
      <div className="absolute inset-[9%_7%_8%] [perspective:1200px]">
        <div className="absolute left-[10%] right-[10%] top-[7%] h-[34%] origin-bottom [transform:rotateX(-48deg)] overflow-hidden bg-[#4F1720] shadow-[0_22px_45px_rgba(62,40,37,.22)]">
          <ArcGraphic className="absolute -right-[4%] -top-[25%] w-[38%] text-[#D4B483] opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <BrandImage image={manual.logo.negative} alt="SUN Brazilian Hair" width="48%" sizes="260px" />
          </div>
        </div>
        <div className="absolute bottom-[5%] left-[4%] right-[4%] h-[57%] overflow-hidden bg-[#5A2028] shadow-[0_34px_70px_rgba(62,40,37,.28)]">
          <div className="absolute inset-[5%] bg-[#F4E8DC] shadow-inner" />
          <div className="absolute inset-x-[12%] bottom-[10%] top-[17%] overflow-hidden rounded-[45%_45%_18%_18%]">
            <Image src={manual.imagery.detail.src} alt="" fill sizes="34vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#5B3125]/18 via-transparent to-[#2E1B16]/20" />
          </div>
          <div className="absolute bottom-[8%] right-[8%] w-[26%] rotate-[3deg] bg-[#F8F3EC] p-3 shadow-lg sm:p-4">
            <BrandImage image={manual.logo.primary} alt="Cartão SUN" width="100%" sizes="160px" />
          </div>
        </div>
      </div>
    </MockupStage>
  );
}

function ShowroomScene() {
  const shades = [
    "linear-gradient(90deg,#251713,#5B3425,#251713)",
    "linear-gradient(90deg,#392218,#84533D,#392218)",
    "linear-gradient(90deg,#5E3928,#B07A58,#5E3928)",
    "linear-gradient(90deg,#7B553D,#D3A171,#7B553D)",
    "linear-gradient(90deg,#9A7656,#E4C18F,#9A7656)",
  ];
  return (
    <MockupStage>
      <div className="absolute inset-x-[5%] bottom-[8%] top-[7%] overflow-hidden bg-[#EADBCB] shadow-[0_34px_70px_rgba(62,40,37,.20)]">
        <div className="absolute inset-x-0 top-0 h-[76%] bg-gradient-to-b from-[#EFE3D6] to-[#D6BDA6]" />
        <div className="absolute left-[7%] top-[8%] w-[25%]">
          <BrandImage image={manual.logo.primary} alt="SUN Brazilian Hair" width="100%" sizes="220px" />
        </div>
        <div className="absolute left-[7%] right-[7%] top-[34%] flex items-start justify-between border-y border-[#7A5A49]/25 py-[4%]">
          {shades.map((tone, i) => <HairSample key={i} color={tone} compact />)}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[27%] bg-[#8B6B54]" />
        <div className="absolute bottom-[6%] left-[11%] h-[19%] w-[56%] bg-[#E9E1D7] shadow-[0_18px_28px_rgba(62,40,37,.18)]" />
        <div className="absolute bottom-[6%] right-[8%] h-[23%] w-[17%] bg-[#4F1720] shadow-[0_18px_28px_rgba(62,40,37,.18)]">
          <div className="absolute inset-4 flex items-center justify-center"><BrandImage image={manual.logo.negative} alt="" width="85%" sizes="120px" /></div>
        </div>
      </div>
    </MockupStage>
  );
}

function FlyersScene() {
  return (
    <MockupStage>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[78%] w-[78%]">
          <div className="absolute left-[8%] top-[10%] h-[70%] w-[42%] -rotate-[8deg] overflow-hidden bg-[#4F1720] shadow-2xl">
            <Image src={manual.imagery.detail.src} alt="" fill sizes="24vw" className="object-cover opacity-65" />
            <div className="absolute inset-0 bg-[#4F1720]/35" />
            <div className="absolute inset-x-[12%] top-[12%]"><BrandImage image={manual.logo.negative} alt="" width="100%" sizes="220px" /></div>
            <p className="absolute bottom-[12%] left-[12%] font-display text-[clamp(1.1rem,2vw,2rem)] leading-tight text-[#F8F3EC]">Origem que<br />se vê nos fios.</p>
          </div>
          <div className="absolute right-[5%] top-[16%] h-[70%] w-[45%] rotate-[6deg] bg-[#F8F3EC] p-[8%] shadow-2xl">
            <BrandImage image={manual.logo.primary} alt="" width="88%" sizes="220px" />
            <div className="mt-[14%] h-px w-12 bg-[#D4B483]" />
            <p className="mt-[10%] text-xs leading-5 text-[#6B5A51] sm:text-sm">Cabelo brasileiro selecionado por textura, movimento e acabamento.</p>
            <div className="absolute bottom-[9%] left-[17%] right-[17%] space-y-2">
              <div className="h-px bg-[#6B2E2E]/20" /><div className="h-px bg-[#6B2E2E]/20" /><div className="h-px bg-[#6B2E2E]/20" />
            </div>
          </div>
          <div className="absolute bottom-[4%] left-[31%] h-[34%] w-[38%] -rotate-[1deg] bg-[#D9C6B4] shadow-xl">
            <HairLines className="absolute inset-x-0 bottom-0 w-full text-[#6B2E2E] opacity-60" />
          </div>
        </div>
      </div>
    </MockupStage>
  );
}

function SwatchScene() {
  const shades = [
    { label: "1B", color: "linear-gradient(90deg,#17100E,#3B241C,#17100E)" },
    { label: "2", color: "linear-gradient(90deg,#2A1813,#5A3327,#2A1813)" },
    { label: "4", color: "linear-gradient(90deg,#4A2A20,#83543E,#4A2A20)" },
    { label: "6", color: "linear-gradient(90deg,#6B4633,#B27D5A,#6B4633)" },
    { label: "8", color: "linear-gradient(90deg,#8C684D,#D1A578,#8C684D)" },
    { label: "10", color: "linear-gradient(90deg,#AF8A62,#E8C996,#AF8A62)" },
  ];
  return (
    <MockupStage dark>
      <div className="absolute inset-[7%_6%] bg-[#F8F3EC] p-[6%] shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="w-[28%]"><BrandImage image={manual.logo.primary} alt="SUN Brazilian Hair" width="100%" sizes="180px" /></div>
          <p className="eyebrow text-[#6B2E2E]">Color range</p>
        </div>
        <div className="absolute inset-x-[7%] bottom-[9%] top-[28%] grid grid-cols-6 items-end gap-[3%]">
          {shades.map((item) => <HairSample key={item.label} color={item.color} label={item.label} />)}
        </div>
      </div>
    </MockupStage>
  );
}

function DisplayScene() {
  const shades = [
    { label: "1B", color: "linear-gradient(90deg,#21120F,#493028,#21120F)" },
    { label: "2", color: "linear-gradient(90deg,#382019,#68483A,#382019)" },
    { label: "4", color: "linear-gradient(90deg,#533026,#90644D,#533026)" },
    { label: "6", color: "linear-gradient(90deg,#744B38,#BB8B68,#744B38)" },
    { label: "8", color: "linear-gradient(90deg,#9D7252,#D4B18A,#9D7252)" },
  ];
  return (
    <MockupStage>
      <div className="absolute inset-x-[9%] bottom-[7%] top-[6%] overflow-hidden bg-[#F3E8DD] shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-[23%] bg-[#4F1720]">
          <div className="absolute left-[7%] top-1/2 w-[28%] -translate-y-1/2"><BrandImage image={manual.logo.negative} alt="SUN Brazilian Hair" width="100%" sizes="220px" /></div>
          <p className="eyebrow absolute right-[7%] top-1/2 hidden -translate-y-1/2 text-[#D4B483] sm:block">Tonalidades e comprimentos</p>
        </div>
        <div className="absolute inset-x-[7%] bottom-[8%] top-[31%] grid grid-cols-5 gap-[4%] border-t border-[#6B2E2E]/20 pt-[5%]">
          {shades.map((item) => (
            <div key={item.label} className="relative">
              <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-[#D4B483]" />
              <div className="mx-auto mt-4 h-[76%] w-[70%] rounded-b-[48%]" style={{ background: item.color, boxShadow: "inset 6px 0 12px rgba(255,255,255,.08), inset -6px 0 12px rgba(0,0,0,.16)" }} />
              <p className="eyebrow mt-3 text-center text-[#6B5A51]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </MockupStage>
  );
}

function UnboxingSceneReal() {
  return (
    <MockupStage>
      <div className="absolute inset-[6%] [perspective:1300px]">
        <div className="absolute left-[9%] right-[9%] top-[4%] h-[31%] origin-bottom [transform:rotateX(-52deg)] bg-[#4F1720] shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center"><BrandImage image={manual.logo.negative} alt="" width="42%" sizes="200px" /></div>
        </div>
        <div className="absolute bottom-[7%] left-[5%] right-[5%] h-[58%] bg-[#6B2E2E] shadow-2xl">
          <div className="absolute inset-[5%] overflow-hidden bg-[#F5EEE7]">
            <div className="absolute -left-[10%] top-[18%] h-[58%] w-[70%] rotate-[-8deg] rounded-[50%] bg-[#E7D8CA]" />
            <div className="absolute left-[10%] top-[14%] h-[62%] w-[48%] overflow-hidden rounded-[45%_45%_22%_22%]">
              <Image src={manual.imagery.detail.src} alt="" fill sizes="28vw" className="object-cover" />
            </div>
            <div className="absolute right-[8%] top-[13%] w-[31%] bg-white p-[7%] shadow-xl">
              <BrandImage image={manual.logo.primary} alt="SUN Brazilian Hair" width="100%" sizes="150px" />
              <div className="mt-5 h-px w-8 bg-[#D4B483]" />
              <p className="mt-4 hidden text-[10px] leading-4 text-[#6B5A51] sm:block">Obrigada por escolher cabelo brasileiro.</p>
            </div>
          </div>
        </div>
      </div>
    </MockupStage>
  );
}

function ProKitScene() {
  const shades = [
    { label: "1B", color: "#21120F" },
    { label: "2", color: "#382019" },
    { label: "4", color: "#533026" },
    { label: "6", color: "#744B38" },
    { label: "8", color: "#9D7252" },
    { label: "10", color: "#C6A176" },
  ];
  return (
    <MockupStage dark>
      <div className="absolute inset-[7%] bg-[#3E2825] p-[2.5%] shadow-2xl">
        <div className="relative h-full bg-[#EDE2D6]">
          <div className="absolute left-[5%] top-[5%] w-[24%]"><BrandImage image={manual.logo.primary} alt="SUN Brazilian Hair" width="100%" sizes="180px" /></div>
          <p className="eyebrow absolute right-[5%] top-[7%] hidden text-[#6B2E2E] sm:block">Professional kit</p>
          <div className="absolute bottom-[9%] left-[5%] top-[26%] grid w-[55%] grid-cols-3 gap-[5%]">
            {shades.map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-end rounded-sm bg-[#F8F3EC] p-2 shadow-md">
                <div className="h-[75%] w-[46%] rounded-b-[50%]" style={{ background: item.color, boxShadow: "inset 5px 0 10px rgba(255,255,255,.07), inset -5px 0 10px rgba(0,0,0,.14)" }} />
                <span className="mt-2 text-[9px] tracking-[0.15em] text-[#6B5A51]">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-[9%] right-[5%] top-[26%] w-[31%] space-y-[8%]">
            <div className="relative h-[44%] overflow-hidden bg-[#4F1720] p-[12%] shadow-lg"><BrandImage image={manual.logo.negative} alt="" width="100%" sizes="150px" /></div>
            <div className="h-[22%] bg-[#F8F3EC] p-[9%] shadow-lg"><p className="eyebrow text-[#6B2E2E]">Guia de aplicação</p></div>
            <div className="h-[20%] bg-[#D9C6B4] p-[8%] shadow-lg"><HairLines className="h-full w-full text-[#6B2E2E] opacity-60" /></div>
          </div>
        </div>
      </div>
    </MockupStage>
  );
}

function ApplicationScene({ id }: { id: string }) {
  switch (id) {
    case "aplicacao-landing":
      return <LandingScene />;
    case "aplicacao-embalagem-real":
      return <OpenBoxScene />;
    case "aplicacao-balcao":
      return <ShowroomScene />;
    case "aplicacao-panfletos":
      return <FlyersScene />;
    case "aplicacao-mostruario":
      return <SwatchScene />;
    case "aplicacao-expositor":
      return <DisplayScene />;
    case "aplicacao-unboxing-real":
      return <UnboxingSceneReal />;
    case "aplicacao-kit-profissional":
      return <ProKitScene />;
    default:
      return null;
  }
}

export function RealisticApplicationSlide() {
  const { id } = useSlide();
  const item = manual.realisticApplications[id as keyof typeof manual.realisticApplications];
  if (!item) return null;

  return (
    <div className="grid min-h-svh lg:h-full lg:min-h-0 lg:grid-cols-[38%_62%]">
      <SafeArea className="justify-center pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pb-[13vh] lg:pt-[15vh] [&_h2]:text-[clamp(2rem,3.35vw,4.5rem)]">
        <Heading eyebrow={item.eyebrow} title={item.title} text={item.text} />
        <Reveal delay={0.4}>
          <p className="eyebrow mt-6 text-(--slide-muted) sm:mt-8">Simulação de aplicação</p>
        </Reveal>
      </SafeArea>
      <div className="mx-4 mb-20 min-h-[380px] overflow-hidden sm:mx-8 sm:mb-24 sm:min-h-[480px] lg:m-0 lg:h-full lg:min-h-0">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, scale: 1.01 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <ApplicationScene id={id} />
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
