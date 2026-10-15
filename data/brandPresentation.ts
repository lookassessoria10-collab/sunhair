/**
 * Conteúdo central da apresentação SUN Brazilian Hair.
 *
 * Textos, cores, conceitos, imagens e a ordem das telas vivem aqui.
 * Os componentes apenas leem este arquivo: para trocar um título, uma cor
 * ou a ordem das telas, edite somente este arquivo.
 *
 * Marcas: `mark()` / `markPart()` leem data/marks.json, gerado por
 * `npm run build-marks` a partir dos PNGs oficiais em /public/brand/logos.
 * Fotos e grafismos: `asset()` lê data/brandAssets.json (`npm run extract-assets`).
 */
import { asset, mark, markPart, type Asset } from "./assets";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Tone = "light" | "dark";
export type ConceptId = "essencia" | "solar" | "origem";
export type ChapterId = "inicio" | "marca" | "identidade" | "sistema" | "aplicacoes" | "diretrizes" | "introducao" | ConceptId | "comparativo";

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

export type GalleryItem = {
  label: string;
  caption?: string;
  image: Asset;
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
// Base neutra da apresentação (não pertence a nenhum conceito)
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
  closing: { bg: "#3D0F18", fg: neutral.paper, accent: neutral.stone, tone: "dark" },

  essencia: { bg: "#F8F3EC", fg: "#3E2825", accent: "#D4B483", tone: "light" },

  solarIvory: { bg: "#F8EDE1", fg: "#5A0E1A", accent: "#D4AF7C", tone: "light" },
  solarBordo: { bg: "#5A0E1A", fg: "#F8EDE1", accent: "#D4AF7C", tone: "dark" },

  origemBordo: { bg: "#5A0E1A", fg: "#F8EFE4", accent: "#C9A968", tone: "dark" },
  origemIvory: { bg: "#F8EFE4", fg: "#5A0E1A", accent: "#C9A968", tone: "light" },
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
  challenge: {
    eyebrow: "O desafio",
    title: ["Uma marca premium", "sem parecer distante."],
    paragraphs: [
      "A SUN precisa comunicar qualidade e desejo sem perder proximidade.",
      "Precisa funcionar no produto, no salão, no digital e na relação com profissionais.",
      "Por isso, desenvolvemos três caminhos visuais distintos.",
    ],
    touchpoints: ["Produto", "Salão", "Digital", "Profissionais"],
    figures: [
      { value: "03", label: "conceitos" },
      { value: "01", label: "mesma essência" },
    ],
  },
  paths: {
    eyebrow: "Escolha um caminho",
    title: "Três caminhos criativos.",
    hint: "Selecione um conceito ou continue rolando.",
  },
};

// ---------------------------------------------------------------------------
// Conceitos
// ---------------------------------------------------------------------------

export const concepts = {
  essencia: {
    id: "essencia" as const,
    number: "01",
    name: "Essência",
    summary: "Tipográfico, editorial e minimalista.",
    keywords: ["Tipografia", "Movimento", "Editorial"],
    logo: {
      light: mark("essencia/light"),
      dark: mark("essencia/dark"),
    },
    /** Prévia na tela "Escolha um caminho" */
    preview: { bg: "#F8F3EC", logo: mark("essencia/light") },
    opening: {
      title: "Essência",
      subtitle: ["Quando o movimento do cabelo", "se transforma em identidade."],
    },
    defense: {
      title: ["Menos elementos.", "Mais personalidade."],
      paragraphs: [
        "Neste caminho, a força da SUN nasce da própria tipografia.",
        "Linhas delicadas inspiradas no movimento dos fios complementam a composição sem transformar cabelo ou sol em símbolos literais.",
        "O resultado é uma identidade editorial, feminina e contemporânea.",
      ],
      /** Detalhes ampliados da marca: ponto de foco (%) e zoom */
      details: [
        { label: "O gesto do fio", position: "0% 52%", zoom: 2.2 },
        { label: "O arco de luz", position: "100% 0%", zoom: 2 },
      ],
    },
    construction: {
      eyebrow: "Construção",
      parts: [
        markPart("essencia/light-sun"),
        markPart("essencia/light-name"),
        markPart("essencia/light-tagline"),
      ],
      callouts: [
        { title: "Tipografia", text: "Traços finos e proporções alongadas." },
        { title: "Movimento", text: "Curvas discretas remetem ao comportamento natural dos fios." },
        { title: "Respiro", text: "Espaços amplos reforçam a percepção premium." },
      ],
    },
    palette: {
      eyebrow: "Cores",
      title: "Uma paleta de pele, luz e papel.",
      hint: "Passe o cursor sobre as cores.",
      swatches: [
        { name: "Marfim", hex: "#F8F3EC", role: "Base editorial." },
        { name: "Areia", hex: "#D9C6B4", role: "Apoio e materiais." },
        { name: "Argila", hex: "#B89B86", role: "Transição e fotografia." },
        { name: "Bordô", hex: "#6B2E2E", role: "Contraste em impressos." },
        { name: "Espresso", hex: "#3E2825", role: "Cor institucional da assinatura." },
        { name: "Ouro suave", hex: "#D4B483", role: "Uso pontual." },
      ] satisfies Swatch[],
      /** Proporção de uso de cada cor (largura das faixas) */
      weights: [30, 18, 14, 12, 18, 8],
    },
    typography: {
      eyebrow: "Tipografia",
      primary: {
        label: "Tipografia principal",
        traits: ["Elegante", "Moderna", "Feminina"],
      },
      secondary: {
        label: "Tipografia de apoio",
        traits: ["Clean", "Leve", "Atemporal"],
      },
      samples: {
        brand: "SUN Brazilian Hair",
        tagline: ["Cabelo brasileiro.", "Sem exceção."],
        support: "Naturalidade em cada detalhe.",
      },
    },
    language: {
      eyebrow: "Linguagem gráfica",
      title: ["O fio não aparece como ilustração.", "Ele aparece como movimento."],
      line: asset("essencia/lines"),
      photo: asset("essencia/photo-01"),
      /** Composição: marca negativa + linha sobre o bordô da paleta */
      composition: { bg: "#6B2E2E", logo: mark("essencia/dark") },
      labels: ["Linha isolada", "Linha sobre fotografia", "Linha aplicada em composição"],
    },
  },

  solar: {
    id: "solar" as const,
    number: "02",
    name: "Solar",
    summary: "A luz do nome como assinatura.",
    keywords: ["Luz", "Contraste", "Presença"],
    logo: {
      light: mark("solar/light"),
      dark: mark("solar/dark"),
    },
    preview: { bg: "#5A0E1A", logo: mark("solar/dark") },
    opening: {
      title: "Solar",
      subtitle: ["A luz como assinatura."],
    },
    defense: {
      title: ["O nome ganha símbolo."],
      paragraphs: [
        "Neste conceito, SUN assume visualmente a ideia que já carrega no nome.",
        "O sol aparece de maneira reduzida e delicada, sem recorrer à representação literal ou caricata.",
        "O dourado funciona como ponto de luz sobre a profundidade do bordô.",
      ],
      photo: asset("solar/photo-01"),
      photoAlt: "Perfil feminino com fios de cabelo atravessados pela luz",
    },
    symbol: {
      eyebrow: "O símbolo",
      symbol: markPart("solar/light-symbol"),
      body: markPart("solar/light-body"),
      ideas: [
        { title: "Luz", text: "presença" },
        { title: "Calor", text: "proximidade" },
        { title: "Movimento", text: "beleza" },
      ],
    },
    contrast: {
      title: "Contraste como parte da identidade.",
      swatches: [
        { name: "Bordô", hex: "#5A0E1A", role: "Cor institucional." },
        { name: "Vinho", hex: "#7A1F2B", role: "Profundidade e variações." },
        { name: "Dourado", hex: "#D4AF7C", role: "Ponto de luz. Uso pontual." },
        { name: "Ivory", hex: "#F8EDE1", role: "Base e respiro." },
        { name: "Nude", hex: "#D9B7A1", role: "Apoio e materiais." },
        { name: "Espresso", hex: "#2E1B16", role: "Texto e contraste." },
      ] satisfies Swatch[],
    },
    system: {
      eyebrow: "Sistema visual",
      title: ["Raios e arcos", "como sistema."],
      note: "Tudo continua delicado: o sol nunca explode, apenas pontua.",
      items: [
        { title: "Divisores", text: "Raios curtos marcam pausas entre conteúdos." },
        { title: "Molduras", text: "O arco do sol enquadra fotografia e texto." },
        { title: "Detalhes", text: "O símbolo reduzido acompanha assinaturas e selos." },
        { title: "Pequenos grafismos", text: "Fragmentos de raios em papelaria e embalagem." },
      ],
      photo: asset("solar/photo-02"),
      flow: asset("solar/lines"),
      symbol: mark("solar/light-symbol"),
    },
  },

  origem: {
    id: "origem" as const,
    number: "03",
    name: "Origem",
    summary: "Sol e cabelo em um único símbolo.",
    keywords: ["Símbolo", "Reconhecimento", "Exclusividade"],
    logo: {
      light: mark("origem/light"),
      dark: mark("origem/dark"),
    },
    preview: { bg: "#7A1F2B", logo: mark("origem/dark") },
    opening: {
      title: "Origem",
      subtitle: ["Sol e cabelo em um mesmo gesto."],
      symbol: markPart("origem/dark-symbol"),
      body: markPart("origem/dark-body"),
    },
    defense: {
      title: ["Um símbolo que nasce", "do próprio nome."],
      paragraphs: [
        "O terceiro caminho cria uma assinatura própria para a SUN.",
        "O círculo remete ao sol.",
        "As curvas internas remetem ao movimento natural dos fios.",
        "Os dois elementos deixam de existir separadamente e formam um único símbolo.",
        "A proposta cria maior capacidade de reconhecimento mesmo quando o nome SUN não aparece.",
      ],
      photo: asset("origem/photo-hero"),
      photoAlt: "Close de cabelo castanho longo e ondulado em luz quente",
    },
    construction: {
      eyebrow: "Construção do símbolo",
      symbol: markPart("origem/dark-symbol"),
      steps: [
        { title: "O arco", text: "o sol" },
        { title: "As linhas", text: "os fios" },
        { title: "O símbolo", text: "um único gesto" },
      ],
      replay: "Repetir",
    },
    marks: {
      eyebrow: "Símbolo + wordmark",
      dark: [
        { label: "Símbolo isolado", image: mark("origem/dark-symbol") },
        { label: "SUN", image: mark("origem/dark-wordmark") },
        { label: "SUN Brazilian Hair", image: mark("origem/dark-name") },
      ],
      light: {
        symbol: mark("origem/light-symbol"),
        name: mark("origem/light-name"),
        full: mark("origem/light"),
        labels: { horizontal: "Versão horizontal", vertical: "Versão vertical", seal: "Selo" },
        seal: { top: "SUN Brazilian Hair", bottom: "Cabelo brasileiro. Sem exceção" },
      },
    },
    system: {
      eyebrow: "Paleta e sistema",
      title: ["O círculo como", "janela da marca."],
      hint: "Navegue pelas cores.",
      swatches: [
        { name: "Bordô", hex: "#5A0E1A", role: "Cor institucional." },
        { name: "Vinho", hex: "#7A1F2B", role: "Profundidade e embalagens." },
        { name: "Dourado", hex: "#C9A968", role: "Símbolo e detalhes." },
        { name: "Ivory", hex: "#F8EFE4", role: "Base e papelaria." },
        { name: "Nude", hex: "#D9B7A1", role: "Apoio e materiais." },
      ] satisfies Swatch[],
      symbolDark: mark("origem/dark-symbol"),
      symbolLight: mark("origem/light-symbol"),
      words: ["Luz", "Beleza", "Movimento", "Natural", "Brasilidade"],
      sizes: [96, 64, 40, 24, 16],
      scaleNote: "O símbolo mantém a leitura de 96 px a 16 px.",
    },
  },
};

export const conceptOrder: ConceptId[] = ["essencia", "solar", "origem"];

// ---------------------------------------------------------------------------
// Manual da marca aprovada
// ---------------------------------------------------------------------------

export const manual = {
  logo: {
    primary: mark("essencia/light"),
    negative: mark("essencia/dark"),
    sun: markPart("essencia/light-sun"),
    name: markPart("essencia/light-name"),
    tagline: markPart("essencia/light-tagline"),
  },
  imagery: {
    hero: asset("essencia/photo-hero"),
    detail: asset("essencia/photo-01"),
    editorial: asset("images/editorial-01"),
    lines: asset("essencia/lines"),
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

// ---------------------------------------------------------------------------
// Capítulo 04 — Comparativo e encerramento
// ---------------------------------------------------------------------------

export const comparison = {
  paths: {
    eyebrow: "Comparativo",
    title: "Três formas de traduzir SUN.",
  },
  marks: {
    eyebrow: "As três marcas",
    toggle: { light: "Fundo claro", dark: "Fundo bordô" },
    darkBackground: "#5A0E1A",
    lightBackground: neutral.paper,
    footnote:
      "Versões para fundo claro e fundo bordô derivadas das marcas oficiais, apenas com troca de cor dentro de cada paleta.",
  },
};

export const closing = {
  tagline: ["Cabelo brasileiro.", "Sem exceção."],
  signature: ["Três caminhos.", "Uma mesma origem."],
};
