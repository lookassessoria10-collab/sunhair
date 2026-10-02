/**
 * Conteúdo central da apresentação SUN Brazilian Hair.
 *
 * Textos, cores, conceitos, imagens e a ordem das telas vivem aqui.
 * Os componentes apenas leem este arquivo: para trocar um título, uma cor
 * ou a ordem das telas, edite somente este arquivo.
 *
 * Imagens: as chaves de `asset("...")` estão em data/brandAssets.json
 * (gerado por `npm run extract-assets` a partir de /public/brand).
 */
import { asset, type Asset } from "./assets";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Tone = "light" | "dark";
export type ConceptId = "essencia" | "solar" | "origem";
export type ChapterId = "introducao" | ConceptId | "comparativo";

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
  essenciaDark: { bg: "#3E2825", fg: "#F8F3EC", accent: "#D4B483", tone: "dark" },

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
  presentationLabel: "Apresentação de Identidade Visual",
};

export const meta = {
  title: "SUN Brazilian Hair | Apresentação de Identidade Visual",
  description:
    "Três caminhos criativos para a identidade visual da SUN Brazilian Hair — Essência, Solar e Origem.",
};

// ---------------------------------------------------------------------------
// Capítulos e telas
// ---------------------------------------------------------------------------

export const chapters: { id: ChapterId; number: string; label: string }[] = [
  { id: "introducao", number: "00", label: "Introdução" },
  { id: "essencia", number: "01", label: "Essência" },
  { id: "solar", number: "02", label: "Solar" },
  { id: "origem", number: "03", label: "Origem" },
  { id: "comparativo", number: "04", label: "Comparativo" },
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
  { id: "inicio", chapter: "introducao", label: "Capa", theme: themes.paper },
  { id: "a-marca", chapter: "introducao", label: "A marca", theme: themes.paper },
  { id: "posicionamento", chapter: "introducao", label: "Posicionamento", theme: themes.night },
  { id: "o-desafio", chapter: "introducao", label: "O desafio", theme: themes.paper },
  { id: "caminhos", chapter: "introducao", label: "Escolha um caminho", theme: themes.paper },

  { id: "essencia", chapter: "essencia", label: "Abertura", theme: themes.essencia },
  { id: "essencia-defesa", chapter: "essencia", label: "Defesa do conceito", theme: themes.essencia },
  { id: "essencia-construcao", chapter: "essencia", label: "Construção", theme: themes.essencia },
  { id: "essencia-cores", chapter: "essencia", label: "Cores", theme: themes.essencia },
  { id: "essencia-tipografia", chapter: "essencia", label: "Tipografia", theme: themes.essencia },
  { id: "essencia-linguagem", chapter: "essencia", label: "Linguagem gráfica", theme: themes.essencia },
  { id: "essencia-aplicacoes", chapter: "essencia", label: "Aplicações", theme: themes.essenciaDark },

  { id: "solar", chapter: "solar", label: "Abertura", theme: themes.solarBordo },
  { id: "solar-defesa", chapter: "solar", label: "Defesa do conceito", theme: themes.solarIvory },
  { id: "solar-simbolo", chapter: "solar", label: "O símbolo", theme: themes.solarIvory },
  { id: "solar-contraste", chapter: "solar", label: "Bordô + dourado", theme: themes.solarIvory, chrome: { tl: "dark", bl: "dark" } },
  { id: "solar-sistema", chapter: "solar", label: "Sistema visual", theme: themes.solarIvory },
  { id: "solar-aplicacoes", chapter: "solar", label: "Aplicações", theme: themes.solarBordo },

  { id: "origem", chapter: "origem", label: "Abertura", theme: themes.origemBordo },
  { id: "origem-defesa", chapter: "origem", label: "Defesa do conceito", theme: themes.origemBordo },
  { id: "origem-construcao", chapter: "origem", label: "Construção do símbolo", theme: themes.origemBordo },
  { id: "origem-marcas", chapter: "origem", label: "Símbolo + wordmark", theme: themes.origemBordo, chrome: { bl: "light", br: "light" } },
  { id: "origem-sistema", chapter: "origem", label: "Paleta e sistema", theme: themes.origemIvory },
  { id: "origem-aplicacoes", chapter: "origem", label: "Aplicações", theme: themes.origemBordo },

  { id: "comparativo", chapter: "comparativo", label: "Três caminhos", theme: themes.paper },
  { id: "as-tres-marcas", chapter: "comparativo", label: "As três marcas", theme: themes.paper },
  { id: "aplicadas", chapter: "comparativo", label: "Aplicadas ao produto", theme: themes.paper },
  { id: "encerramento", chapter: "comparativo", label: "Encerramento", theme: themes.closing },
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
    brandboard: asset("essencia/brandboard"),
    preview: asset("essencia/app-tag"),
    product: asset("essencia/app-box"),
    logo: {
      light: asset("essencia/logo"),
      dark: asset("essencia/logo-negative"),
    },
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
      /** Detalhes ampliados: recorte da logo (posição em % e zoom) */
      details: [
        { label: "O gesto do fio", position: "4% 50%", zoom: 2.2 },
        { label: "O arco de luz", position: "96% 4%", zoom: 2 },
      ],
    },
    construction: {
      eyebrow: "Construção",
      parts: [
        asset("essencia/logo-sun"),
        asset("essencia/logo-name"),
        asset("essencia/logo-tagline"),
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
        specimen: asset("essencia/type-primary"),
      },
      secondary: {
        label: "Tipografia de apoio",
        traits: ["Clean", "Leve", "Atemporal"],
        specimen: asset("essencia/type-secondary"),
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
      applied: asset("essencia/app-card"),
      labels: ["Linha isolada", "Linha sobre fotografia", "Linha aplicada em composição"],
    },
    applications: {
      eyebrow: "Aplicações",
      title: "Essência aplicada.",
      items: [
        { label: "Embalagem", image: asset("essencia/app-box") },
        { label: "Tag", image: asset("essencia/app-tag") },
        { label: "Cartão", image: asset("essencia/app-card") },
        { label: "Aplicação digital", image: asset("essencia/app-mobile") },
      ] satisfies GalleryItem[],
    },
  },

  solar: {
    id: "solar" as const,
    number: "02",
    name: "Solar",
    summary: "A luz do nome como assinatura.",
    keywords: ["Luz", "Contraste", "Presença"],
    brandboard: asset("solar/brandboard"),
    preview: asset("solar/app-tag"),
    product: asset("solar/app-box"),
    logo: {
      light: asset("solar/logo"),
      dark: asset("solar/logo-negative"),
    },
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
      symbol: asset("solar/logo-symbol"),
      body: asset("solar/logo-body"),
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
    },
    applications: {
      eyebrow: "Aplicações",
      title: "Solar aplicado.",
      items: [
        { label: "Embalagem", image: asset("solar/app-box") },
        { label: "Tag", image: asset("solar/app-tag") },
        { label: "Cartão", image: asset("solar/app-card") },
        { label: "Mobile", image: asset("solar/app-mobile") },
        { label: "Detalhes de impressão", caption: "Assinatura dourada sobre bordô.", image: asset("solar/detail-print") },
      ] satisfies GalleryItem[],
    },
  },

  origem: {
    id: "origem" as const,
    number: "03",
    name: "Origem",
    summary: "Sol e cabelo em um único símbolo.",
    keywords: ["Símbolo", "Reconhecimento", "Exclusividade"],
    brandboard: asset("origem/brandboard"),
    preview: asset("origem/app-tag"),
    product: asset("origem/app-box"),
    logo: {
      light: asset("origem/logo-positive"),
      dark: asset("origem/logo"),
    },
    opening: {
      title: "Origem",
      subtitle: ["Sol e cabelo em um mesmo gesto."],
      symbol: asset("origem/logo-symbol"),
      body: asset("origem/logo-body"),
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
      symbol: asset("origem/logo-symbol"),
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
        { label: "Símbolo isolado", image: asset("origem/logo-symbol") },
        { label: "SUN", image: asset("origem/logo-wordmark") },
        { label: "SUN Brazilian Hair", image: asset("origem/logo-name") },
      ],
      light: [
        { label: "Versão horizontal", image: asset("origem/var-horizontal") },
        { label: "Versão vertical", image: asset("origem/var-vertical") },
        { label: "Selo", image: asset("origem/var-seal") },
      ],
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
      lines: asset("origem/el-lines"),
      symbol: asset("origem/el-symbol"),
      words: ["Luz", "Beleza", "Movimento", "Natural", "Brasilidade"],
    },
    applications: {
      eyebrow: "Aplicações",
      title: ["Reconhecível", "em qualquer tamanho."],
      scaleNote: "O símbolo mantém a leitura de 96 px a 16 px.",
      sizes: [96, 64, 40, 24, 16],
      items: [
        { label: "Caixa", image: asset("origem/app-box") },
        { label: "Tag", image: asset("origem/app-tag") },
        { label: "Selo", caption: "Selo dourado de fechamento.", image: asset("origem/detail-seal") },
        { label: "Cartão", image: asset("origem/app-card") },
        { label: "Mobile", image: asset("origem/app-mobile") },
      ] satisfies GalleryItem[],
    },
  },
};

export const conceptOrder: ConceptId[] = ["essencia", "solar", "origem"];

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
      "Versões positivas e negativas derivadas dos arquivos originais, apenas para comparação em condições iguais.",
  },
  applied: {
    eyebrow: "Aplicadas ao produto",
    title: "Na mão de quem escolhe.",
    hint: "Passe o cursor para ver a embalagem. Clique para abrir o brandboard completo.",
    open: "Ver brandboard",
  },
};

export const closing = {
  tagline: ["Cabelo brasileiro.", "Sem exceção."],
  signature: ["Três caminhos.", "Uma mesma origem."],
};
