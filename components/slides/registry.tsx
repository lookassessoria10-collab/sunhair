import type { ComponentType } from "react";
import { AppliedSlide, ClosingSlide, ThreeMarksSlide, ThreePathsSlide } from "./comparison";
import {
  EssenciaApplications,
  EssenciaColors,
  EssenciaConstruction,
  EssenciaDefense,
  EssenciaLanguage,
  EssenciaOpening,
  EssenciaTypography,
} from "./essencia";
import { BrandSlide, ChallengeSlide, CoverSlide, PathsSlide, PositioningSlide } from "./intro";
import {
  OrigemApplications,
  OrigemConstruction,
  OrigemDefense,
  OrigemMarks,
  OrigemOpening,
  OrigemSystem,
} from "./origem";
import { SolarApplications, SolarContrast, SolarDefense, SolarOpening, SolarSymbol, SolarSystem } from "./solar";

/**
 * Liga cada `id` de data/brandPresentation.ts (lista `slides`) ao seu componente.
 * Para reordenar telas, altere apenas a ordem em `slides`.
 */
export const slideComponents: Record<string, ComponentType> = {
  inicio: CoverSlide,
  "a-marca": BrandSlide,
  posicionamento: PositioningSlide,
  "o-desafio": ChallengeSlide,
  caminhos: PathsSlide,

  essencia: EssenciaOpening,
  "essencia-defesa": EssenciaDefense,
  "essencia-construcao": EssenciaConstruction,
  "essencia-cores": EssenciaColors,
  "essencia-tipografia": EssenciaTypography,
  "essencia-linguagem": EssenciaLanguage,
  "essencia-aplicacoes": EssenciaApplications,

  solar: SolarOpening,
  "solar-defesa": SolarDefense,
  "solar-simbolo": SolarSymbol,
  "solar-contraste": SolarContrast,
  "solar-sistema": SolarSystem,
  "solar-aplicacoes": SolarApplications,

  origem: OrigemOpening,
  "origem-defesa": OrigemDefense,
  "origem-construcao": OrigemConstruction,
  "origem-marcas": OrigemMarks,
  "origem-sistema": OrigemSystem,
  "origem-aplicacoes": OrigemApplications,

  comparativo: ThreePathsSlide,
  "as-tres-marcas": ThreeMarksSlide,
  aplicadas: AppliedSlide,
  encerramento: ClosingSlide,
};
