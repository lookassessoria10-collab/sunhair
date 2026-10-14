import type { ComponentType } from "react";
import { BrandSlide, CoverSlide, PositioningSlide } from "./intro";
import {
  ApprovedBrandSlide,
  ArchitectureSlide,
  BoxApplicationSlide,
  CardApplicationSlide,
  ClosingSlide,
  ConceptSlide,
  CorrectUseSlide,
  DigitalApplicationSlide,
  GraphicSystemSlide,
  PaletteSlide,
  PhotographySlide,
  ProtectionSlide,
  RealisticApplicationSlide,
  TagsApplicationSlide,
  TypographySlide,
  UnboxingApplicationSlide,
  VersionsSlide,
  VoiceSlide,
  WrongUseSlide,
} from "./manual";

export const slideComponents: Record<string, ComponentType> = {
  inicio: CoverSlide,
  "a-marca": BrandSlide,
  posicionamento: PositioningSlide,

  "marca-aprovada": ApprovedBrandSlide,
  conceito: ConceptSlide,
  arquitetura: ArchitectureSlide,
  variacoes: VersionsSlide,
  protecao: ProtectionSlide,

  paleta: PaletteSlide,
  tipografia: TypographySlide,
  "sistema-grafico": GraphicSystemSlide,
  fotografia: PhotographySlide,
  voz: VoiceSlide,

  cartao: CardApplicationSlide,
  caixa: BoxApplicationSlide,
  tags: TagsApplicationSlide,
  unboxing: UnboxingApplicationSlide,
  digital: DigitalApplicationSlide,

  "aplicacao-landing": RealisticApplicationSlide,
  "aplicacao-embalagem-real": RealisticApplicationSlide,
  "aplicacao-balcao": RealisticApplicationSlide,
  "aplicacao-panfletos": RealisticApplicationSlide,
  "aplicacao-mostruario": RealisticApplicationSlide,
  "aplicacao-expositor": RealisticApplicationSlide,
  "aplicacao-unboxing-real": RealisticApplicationSlide,
  "aplicacao-kit-profissional": RealisticApplicationSlide,

  "uso-correto": CorrectUseSlide,
  "nao-fazer": WrongUseSlide,
  encerramento: ClosingSlide,
};
