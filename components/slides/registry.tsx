import type { ComponentType } from "react";
import { BrandSlide, CoverSlide, PositioningSlide } from "./intro";
import {
  ApplicationSlide,
  ApprovedBrandSlide,
  ArchitectureSlide,
  ClosingSlide,
  ConceptSlide,
  CorrectUseSlide,
  GraphicSystemSlide,
  PaletteSlide,
  PhotographySlide,
  ProtectionSlide,
  TypographySlide,
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

  "aplicacao-landing": ApplicationSlide,
  "aplicacao-embalagem-real": ApplicationSlide,
  "aplicacao-balcao": ApplicationSlide,
  "aplicacao-panfletos": ApplicationSlide,
  "aplicacao-cartoes": ApplicationSlide,
  "aplicacao-mostruario": ApplicationSlide,
  "aplicacao-expositor": ApplicationSlide,
  "aplicacao-unboxing-real": ApplicationSlide,
  "aplicacao-kit-profissional": ApplicationSlide,

  "uso-correto": CorrectUseSlide,
  "nao-fazer": WrongUseSlide,
  encerramento: ClosingSlide,
};
