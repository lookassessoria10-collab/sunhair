/**
 * Conteúdo central da apresentação SUN Brazilian Hair.
 *
 * Textos, cores, imagens e a ordem das telas vivem aqui.
 * Os componentes apenas leem este arquivo: para trocar um título, uma cor
 * ou a ordem das telas, edite somente este arquivo.
 *
 * Marcas: `mark()` lê data/marks.json, gerado por
 * `npm run build-marks` a partir dos PNGs oficiais em /public/brand/logos.
 * Fotos e grafismos: `asset()` lê data/brandAssets.json (`npm run extract-assets`).
 */
import { asset, mark, type Asset } from "./assets";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Tone = "light" | "dark";
export type ChapterId = "inicio" | "marca" | "identidade" | "sistema" | "aplicacoes" | "diretrizes";

export type Theme = {
  /** Fundo da tela */
  bg: string;
  /** Texto principal */
  fg: string;
  /** Cor de destaque (linhas, números, detalhes) */
  accent: string;
  /** Tom do fundo: define a cor da navegação fixa */
  tone: Tone;
};

export type Swatch = {
  name: string;
  hex: string;
  role: string;
};

export type ApplicationMockup = {
  eyebrow: string;
  title: string[];
  text: string;
  /** Mockup final aprovado em /public/simulations, na resolução original e sem perdas. */
  image: Asset;
  alt: string;
  /** Alinhamento do mockup dentro da área da imagem no desktop (object-position). */
  position: string;
};

// ---------------------------------------------------------------------------
// Base neutra da apresentação
// ---------------------------------------------------------------------------

export const neutral = {
  paper: "#F5F0E8",
  ink: "#281E1B",
  night: "#2A1717",
  stone: "#BDB2A8",
} as const;

export const themes = {
  paper: { bg: neutral.paper, fg: neutral.ink, accent: neutral.stone, tone: "light" },
  night: { bg: neutral.night, fg: neutral.paper, accent: neutral.stone, tone: "dark" },
  essencia: { bg: "#F8F3EC", fg: "#3E2825", accent: "#D4B483", tone: "light" },
  origemBordo: { bg: "#5A0E1A", fg: "#F8EFE4", accent: "#C9A968", tone: "dark" },
} satisfies Record<string, Theme>;

// ---------------------------------------------------------------------------
// Marca
// ---------------------------------------------------------------------------

export const brand = {
  name: "SUN",
  descriptor: "Brazilian Hair",
  tagline: "Cabelo brasileiro. Sem exceção.",
  presentationLabel: "Manual de Identidade Visual",
};

export const meta = {
  title: "SUN Brazilian Hair | Manual de Identidade Visual",
  description: "Manual de identidade visual da SUN Brazilian Hair, com marca aprovada, sistema visual, aplicações e diretrizes de uso.",
};

// ---------------------------------------------------------------------------
// Capítulos e telas
// ---------------------------------------------------------------------------

export const chapters: { id: ChapterId; number: string; label: string }[] = [
  { id: "inicio", number: "00", label: "Início" },
  { id: "marca", number: "01", label: "Marca" },
  { id: "identidade", number: "02", label: "Identidade" },
  { id: "sistema", number: "03", label: "Sistema visual" },
  { id: "aplicacoes", number: "04", label: "Aplicações" },
  { id: "diretrizes", number: "05", label: "Diretrizes" },
];

type Chrome = Partial<Record<"tl" | "tr" | "bl" | "br", Tone>>;

export type SlideDef = {
  /** Âncora da URL (#id) e chave do componente em components/slides/registry.tsx */
  id: string;
  chapter: ChapterId;
  label: string;
  theme: Theme;
  /**
   * Tom por canto da navegação fixa, para telas divididas
   * (tl = topo esquerdo, tr = topo direito, bl = base esquerda, br = base direita).
   */
  chrome?: Chrome;
};

export const slides: SlideDef[] = [
  { id: "inicio", chapter: "inicio", label: "Capa", theme: themes.paper },
  { id: "a-marca", chapter: "marca", label: "A marca", theme: themes.paper },
  { id: "posicionamento", chapter: "marca", label: "Posicionamento", theme: themes.night },

  { id: "marca-aprovada", chapter: "identidade", label: "Marca aprovada", theme: themes.essencia, chrome: { tr: "dark", br: "dark" } },
  { id: "conceito", chapter: "identidade", label: "Conceito", theme: themes.paper },
  { id: "arquitetura", chapter: "identidade", label: "Arquitetura da assinatura", theme: themes.essencia },
  { id: "variacoes", chapter: "identidade", label: "Variações cromáticas", theme: themes.paper },
  { id: "protecao", chapter: "identidade", label: "Área de proteção", theme: themes.essencia },

  { id: "paleta", chapter: "sistema", label: "Paleta oficial", theme: themes.paper },
  { id: "tipografia", chapter: "sistema", label: "Tipografia", theme: themes.essencia },
  { id: "sistema-grafico", chapter: "sistema", label: "Sistema gráfico", theme: themes.paper },
  { id: "fotografia", chapter: "sistema", label: "Direção fotográfica", theme: themes.essencia },
  { id: "voz", chapter: "sistema", label: "Tom de voz", theme: themes.origemBordo },

  { id: "aplicacao-landing", chapter: "aplicacoes", label: "Landing page", theme: themes.essencia },
  { id: "aplicacao-embalagem-real", chapter: "aplicacoes", label: "Embalagem", theme: themes.paper },
  { id: "aplicacao-balcao", chapter: "aplicacoes", label: "Balcão e showroom", theme: themes.essencia },
  { id: "aplicacao-panfletos", chapter: "aplicacoes", label: "Panfletos", theme: themes.paper },
  { id: "aplicacao-cartoes", chapter: "aplicacoes", label: "Cartões", theme: themes.essencia },
  { id: "aplicacao-mostruario", chapter: "aplicacoes", label: "Mostruário de cores", theme: themes.paper },
  { id: "aplicacao-expositor", chapter: "aplicacoes", label: "Expositor de salão", theme: themes.essencia },
  { id: "aplicacao-unboxing-real", chapter: "aplicacoes", label: "Unboxing", theme: themes.paper },
  { id: "aplicacao-kit-profissional", chapter: "aplicacoes", label: "Kit profissional", theme: themes.essencia },

  { id: "uso-correto", chapter: "diretrizes", label: "Uso correto", theme: themes.paper },
  { id: "nao-fazer", chapter: "diretrizes", label: "Usos incorretos", theme: themes.essencia },
  { id: "encerramento", chapter: "diretrizes", label: "Encerramento", theme: themes.origemBordo },
];

// ---------------------------------------------------------------------------
// Capítulo 00 — Introdução
// ---------------------------------------------------------------------------

export const intro = {
  cover: {
    explore: "Explore",
  },
  brand: {
    eyebrow: "A marca",
    title: ["O cabelo brasileiro", "como protagonista."],
    paragraphs: [
      "SUN Brazilian Hair nasce com uma proposta direta: valorizar a origem, a qualidade e a diversidade do cabelo brasileiro.",
      "Uma marca criada para transformar um produto de beleza em uma experiência de escolha, identidade e expressão.",
    ],
    image: asset("images/editorial-01"),
    imageAlt: "Close editorial de cabelo longo iluminado pelo sol sobre o ombro",
  },
  positioning: {
    eyebrow: "Posicionamento",
    title: ["Brasileiro.", "Sem exceção."],
    words: ["Origem", "Naturalidade", "Movimento", "Qualidade"],
  },
};

// ---------------------------------------------------------------------------
// Manual da marca aprovada
// ---------------------------------------------------------------------------

export const manual = {
  logo: {
    primary: mark("essencia/light"),
    negative: mark("essencia/dark"),
  },
  imagery: {
    hero: asset("essencia/photo-hero"),
    detail: asset("essencia/photo-01"),
    editorial: asset("images/editorial-01"),
  },
  approved: {
    eyebrow: "Marca aprovada",
    statement: "A identidade que seguirá para implementação.",
  },
  concept: {
    eyebrow: "Conceito",
    title: ["O movimento", "encontra a luz."],
    text: "A assinatura une dois gestos sutis: o arco superior sugere luz e presença; o traço inferior acompanha a fluidez natural dos fios.",
    ideas: [
      { title: "Luz", text: "presença" },
      { title: "Movimento", text: "naturalidade" },
      { title: "Respiro", text: "sofisticação" },
    ],
  },
  architecture: {
    eyebrow: "Arquitetura",
    title: ["Três níveis.", "Uma leitura única."],
    text: "A ordem SUN, Brazilian Hair e Cabelo brasileiro. Sem exceção. deve permanecer estável.",
    levels: ["Nome", "Descriptor", "Assinatura verbal"],
  },
  versions: {
    eyebrow: "Versões",
    title: ["A mesma marca", "em quatro situações."],
    text: "O desenho não muda. Apenas a cor se adapta ao suporte.",
    items: ["Principal", "Negativa", "Monocromática bordô", "Monocromática dourada"],
  },
  protection: {
    eyebrow: "Área de proteção",
    title: ["Espaço também", "faz parte da marca."],
    text: "Use como margem mínima a altura do descriptor Brazilian Hair ao redor de toda a assinatura.",
    sizes: [
      { value: "42 mm", label: "impressos com tagline" },
      { value: "220 px", label: "digital com tagline" },
      { value: "150 px", label: "assinatura reduzida" },
    ],
  },
  palette: {
    eyebrow: "Paleta oficial",
    title: ["Pele, papel,", "vinho e luz."],
    text: "A paleta alterna respiro editorial e profundidade.",
    swatches: [
      { name: "Marfim", hex: "#F8F3EC", role: "Base principal" },
      { name: "Areia", hex: "#D9C6B4", role: "Materiais" },
      { name: "Argila", hex: "#B89B86", role: "Apoio" },
      { name: "Bordô", hex: "#6B2E2E", role: "Institucional" },
      { name: "Espresso", hex: "#3E2825", role: "Texto e marca" },
      { name: "Ouro suave", hex: "#D4B483", role: "Detalhes" },
    ] satisfies Swatch[],
  },
  typography: {
    eyebrow: "Tipografia",
    title: "Lettering proprietário + duas famílias de apoio.",
    primary: { name: "Italiana", role: "Títulos editoriais e campanhas" },
    secondary: { name: "Jost", role: "Textos, informações e digital" },
    note: "A marca SUN não deve ser recomposta digitando uma fonte. O logotipo é uma assinatura própria e deve sempre ser usado a partir do arquivo oficial.",
  },
  graphic: {
    eyebrow: "Sistema gráfico",
    title: ["O arco enquadra.", "O fio conduz."],
    text: "Os gestos da marca podem aparecer isolados como elementos de apoio, sempre com pouco peso visual.",
    rules: ["usar como moldura parcial", "dar preferência a linhas finas", "evitar círculos fechados ou ornamentos pesados"],
  },
  photography: {
    eyebrow: "Direção fotográfica",
    title: ["Luz quente.", "Textura real. Movimento."],
    text: "A fotografia precisa fazer o cabelo parecer vivo, não plástico.",
    tags: ["Contraluz", "Closes", "Movimento", "Pele real", "Tons quentes"],
  },
  voice: {
    eyebrow: "Tom de voz",
    title: ["Falar pouco.", "Dizer exatamente."],
    text: "A SUN pode ser sensorial sem exagerar. O texto deve valorizar origem, escolha, movimento e acabamento com frases curtas e específicas.",
    examples: [
      "Cabelo brasileiro. Sem exceção.",
      "Movimento que acompanha você.",
      "Origem que se vê nos fios.",
      "Comprimento, volume e naturalidade em equilíbrio.",
    ],
  },
  /**
   * Aplicações: mockups finais aprovados (imagens em /public/simulations).
   * A chave é o id da tela; a ordem segue a lista `slides`.
   */
  applications: {
    "aplicacao-landing": {
      eyebrow: "Experiência digital",
      title: ["Landing page", "como extensão da marca."],
      text: "Fotografia quente, hierarquia simples e produto em primeiro plano levam a identidade para o ambiente digital sem transformar a marca em um template de e-commerce.",
      image: { src: "/simulations/landing-page-notebook.webp", width: 1536, height: 1024 },
      alt: "Landing page da SUN Brazilian Hair aberta em um notebook",
      position: "50% 50%",
    },
    "aplicacao-embalagem-real": {
      eyebrow: "Produto",
      title: ["A experiência", "começa na caixa."],
      text: "Bordô, marfim e ouro organizam uma abertura que apresenta o cabelo como peça principal. Materiais e acabamento carregam a percepção de qualidade.",
      image: { src: "/simulations/embalagem-caixa.webp", width: 1536, height: 1024 },
      alt: "Caixa bordô da SUN Brazilian Hair com extensão de cabelo, tag e papel de seda",
      position: "50% 50%",
    },
    "aplicacao-balcao": {
      eyebrow: "Ponto de venda",
      title: ["A marca", "ocupa o espaço."],
      text: "No showroom, a identidade precisa orientar sem competir com as mechas. O bordô concentra a assinatura enquanto madeira, pedra e luz quente criam o entorno.",
      image: { src: "/simulations/balcao-recepcao.webp", width: 1536, height: 1024 },
      alt: "Balcão de recepção bordô e parede com a marca SUN Brazilian Hair em showroom",
      position: "50% 50%",
    },
    "aplicacao-panfletos": {
      eyebrow: "Materiais impressos",
      title: ["Informação", "com linguagem editorial."],
      text: "Panfletos e materiais de apoio combinam fotografia de textura, blocos claros e detalhes finos para explicar produto, origem e diferenciais.",
      image: { src: "/simulations/panfletos-editoriais.webp", width: 1312, height: 1199 },
      alt: "Dois panfletos da SUN Brazilian Hair, um bordô e um marfim, sobre pedra clara",
      position: "50% 50%",
    },
    "aplicacao-cartoes": {
      eyebrow: "Papelaria",
      title: ["Cartões", "frente e verso."],
      text: "Marfim como base, bordô como contraponto e ouro apenas nos gestos da marca.",
      image: { src: "/simulations/cartoes-frente-verso.webp", width: 1145, height: 1374 },
      alt: "Cartões da SUN Brazilian Hair em bordô e marfim com fotografia de cabelo",
      position: "50% 50%",
    },
    "aplicacao-mostruario": {
      eyebrow: "Escolha de cor",
      title: ["Cor também", "é experiência."],
      text: "O mostruário transforma uma etapa técnica da venda em ponto de contato com a marca, ajudando cliente e profissional a comparar tonalidades com organização.",
      image: { src: "/simulations/mostruario-cores-argola.webp", width: 1536, height: 1024 },
      alt: "Mostruário de cores da SUN Brazilian Hair com mechas numeradas em argola dourada",
      position: "50% 50%",
    },
    "aplicacao-expositor": {
      eyebrow: "Salão parceiro",
      title: ["Produto visível.", "Sistema organizado."],
      text: "O expositor permite comparar tonalidades e comprimentos mantendo a presença da SUN no ambiente profissional sem sobrecarregar a parede.",
      image: { src: "/simulations/expositor-parede.webp", width: 1374, height: 1145 },
      alt: "Expositor de parede da SUN Brazilian Hair com seis tonalidades de extensões",
      position: "50% 50%",
    },
    "aplicacao-unboxing-real": {
      eyebrow: "E-commerce",
      title: ["Receber o produto", "também é marca."],
      text: "Caixa, seda, tag e cartão trabalham juntos para que a entrega preserve a mesma percepção da experiência presencial.",
      image: { src: "/simulations/unboxing-caixa-aberta.webp", width: 1199, height: 1312 },
      alt: "Caixa aberta da SUN Brazilian Hair com saquinho de cetim, cartão, tag e extensão",
      position: "50% 50%",
    },
    "aplicacao-kit-profissional": {
      eyebrow: "Relacionamento profissional",
      title: ["Uma ferramenta", "para quem aplica."],
      text: "O kit reúne amostras, informações, cuidados e materiais de apoio para extensionistas e salões, reforçando padronização e confiança na indicação.",
      image: { src: "/simulations/kit-profissional-amostras.webp", width: 1536, height: 1024 },
      alt: "Kit profissional da SUN Brazilian Hair com cartela de cores, caixa, panfleto e tags",
      position: "50% 50%",
    },
  } satisfies Record<string, ApplicationMockup>,
  guidelines: {
    correct: {
      eyebrow: "Uso correto",
      title: "Consistência antes de variedade.",
      text: "A marca não precisa mudar para se adaptar. O sistema já oferece versões suficientes.",
      rules: ["Fundo claro + marca principal", "Fundo bordô + versão negativa"],
    },
    wrong: {
      eyebrow: "Não fazer",
      title: "A personalidade está no desenho.",
      text: "Distorcer, adicionar efeitos ou competir com o arco reduz a força da assinatura.",
      items: ["Não distorcer", "Não girar", "Sem sombra", "Sem novas cores"],
    },
  },
  closing: {
    label: "Manual de Identidade Visual",
  },
};

