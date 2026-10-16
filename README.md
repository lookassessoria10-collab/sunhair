# SUN Brazilian Hair — Manual de Identidade Visual

Manual interativo, navegável em capítulos, da marca aprovada **SUN Brazilian
Hair — Cabelo brasileiro. Sem exceção.**

- 25 telas em 6 capítulos: Início, Marca, Identidade, Sistema visual,
  Aplicações e Diretrizes
- Composição 16:9 no desktop; blocos verticais no mobile
- Sem backend: site estático pronto para a Vercel

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS 4 |
| Movimento | Framer Motion |
| Ícones | Lucide (apenas nos controles da interface) |
| Imagens | `next/image` (AVIF/WebP, lazy load automático) |

Requisito: **Node.js 20.9 ou superior** (testado com Node 24 LTS).

---

## Instalação

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos |
| `npm run build-marks` | Regera versões e partes das marcas a partir dos PNGs oficiais |
| `npm run extract-assets` | Regera fotos e grafismos a partir dos brandboards |
| `npm run build-pdf` | Gera o PDF da apresentação (com o site rodando, veja **Downloads**) |

---

## Estrutura

```
app/
  layout.tsx            fontes, metadata, idioma
  page.tsx              renderiza <Presentation />
  globals.css           base neutra, scroll snap, grão de papel
  icon.svg              favicon "SUN"
components/
  presentation/         motor da apresentação
    Presentation.tsx    estado, teclado, tela ativa, links diretos
    Chrome.tsx          navegação fixa: capítulos, progresso, 01 / 25, setas
    ChapterMenu.tsx     índice completo em tela cheia
    Slide.tsx           moldura de cada tela (100svh no desktop)
  slides/               as 25 telas
    intro.tsx           Capa, A marca, Posicionamento
    manual.tsx          marca aprovada, sistema visual, aplicações e diretrizes
    registry.tsx        liga cada id de tela ao componente
  ui/                   peças reutilizáveis (Reveal, MaskReveal, ParallaxImage,
                        BrandImage, Layout…)
data/
  brandPresentation.ts  TODO o conteúdo: textos, cores, imagens, ordem das telas
  marks.json            manifesto das marcas e de suas partes (gerado)
  brandAssets.json      manifesto de fotos e grafismos (gerado)
  assets.ts             helpers tipados: mark(), asset()
public/
  brand/logos/          MARCAS OFICIAIS em PNG transparente (fonte única)
  brand/marks/          versões claro/bordô e partes das marcas (geradas)
  brand/concept-0X.png  brandboards originais dos três conceitos
  brand/crops/          fotos e grafismos extraídos dos brandboards (gerados)
  images/               fotografias editoriais
  simulations/          mockups finais das aplicações
  downloads/            PDF da apresentação (gerado)
scripts/
  build-marks.mjs           versões e partes das marcas oficiais
  extract-brand-assets.mjs  fotos e grafismos dos brandboards
  build-pdf.mjs             PDF da apresentação, uma página por tela
```

---

## Como editar o conteúdo

Tudo que é texto, cor ou ordem de telas está em **`data/brandPresentation.ts`**.
Os componentes só leem esse arquivo.

- **Textos:** `intro` (Capa, A marca, Posicionamento) e `manual` (demais telas,
  como `manual.palette` e `manual.applications`). Títulos em várias linhas são
  arrays: cada item é uma linha.
- **Cores da paleta oficial:** `manual.palette.swatches` (nome, hexadecimal e função).
- **Cores de fundo das telas:** objeto `themes`.
- **Ordem das telas:** lista `slides`. O `id` de cada tela é também a âncora da
  URL (`/#paleta`, `/#aplicacao-landing`…) e a chave em `components/slides/registry.tsx`.
- **Rótulos do menu e do contador:** campo `label` de cada item em `slides`.

---

## Marca aprovada e brandboards

A marca aprovada é a do conceito **01 Essência** (`public/brand/logos/essencia.png`).
Os brandboards dos três conceitos apresentados antes da aprovação continuam em
`public/brand/` como fonte de fotos e grafismos:

| Conceito | Arquivo | Imagem enviada | Leitura |
|---|---|---|---|
| 01 Essência | `public/brand/concept-01.png` | 3ª imagem | tipográfico, editorial, linhas finas |
| 02 Solar | `public/brand/concept-02.png` | 2ª imagem | sol com raios delicados, bordô + dourado |
| 03 Origem | `public/brand/concept-03.png` | 1ª imagem | círculo solar + fios, versões horizontal, vertical e selo |

Os brandboards são usados apenas como fonte de fotos, paletas e grafismos.
As marcas vêm dos PNGs oficiais (veja **Marcas**).

### Paletas (hexadecimais impressos nos brandboards)

- **Essência (paleta oficial):** Marfim `#F8F3EC` · Areia `#D9C6B4` · Argila `#B89B86` · Bordô `#6B2E2E` · Espresso `#3E2825` · Ouro suave `#D4B483`

---

## Marcas

As marcas vêm dos **PNGs oficiais transparentes** em `public/brand/logos/`
(`essencia.png`, `solar.png`, `origem.png`). Nenhuma foi redesenhada.
`scripts/build-marks.mjs` gera a partir delas:

- **Versão limpa** de cada marca, sem o véu de pixels quase transparentes.
- **Partes separadas** (símbolo, wordmark, descritor, tagline) por componentes
  conectados, com a posição exata de cada parte na marca completa. O manual
  atual usa só as marcas completas.
- **Versões para fundo claro e fundo bordô**, trocando apenas a cor de uma tinta
  por outra cor da própria paleta do conceito.

Para trocar uma marca, substitua o PNG em `public/brand/logos/` e rode:

```bash
npm run build-marks
```

Cores das versões e a regra que separa as partes ficam no topo do script.

## Fotografias e grafismos

As fotos e a linha de Essência vêm dos brandboards, extraídas por
`scripts/extract-brand-assets.mjs`, e funcionam como provisórias. Para trocar,
substitua o arquivo em `public/brand/crops/` ou `public/images/` mantendo o
nome. Direção sugerida: mulheres adultas, beleza natural, luz solar quente,
contraluz, movimento, textura real.

**Aplicações (capítulo 04):** as 9 telas usam os mockups finais aprovados,
em `public/simulations/`, na resolução original e sem perdas (WebP lossless
gerado a partir dos PNGs originais). Texto, imagem, alt e alinhamento de cada
tela ficam em `manual.applications` (`data/brandPresentation.ts`). Para trocar
um mockup, substitua o arquivo e atualize largura e altura ali; não recrie
mockups em HTML/CSS.

---

## Downloads

O encerramento e o **Índice** têm dois botões: **Baixar apresentação em PDF** e
**Arquivos da marca** (pasta no Google Drive com vetor, PNG e arquivo aberto).
Textos e links ficam em `downloads` (`data/brandPresentation.ts`).

O PDF não é gerado na Vercel: ele é um arquivo em `public/downloads/` e precisa
ser gerado de novo sempre que o conteúdo mudar (textos, imagens, telas):

```bash
npm run build
npm run start      # deixe rodando
npm run build-pdf  # em outro terminal
```

O script abre o site no Chrome sem interface, no layout de desktop, e salva uma
página 16:9 (1920 × 1080) por tela, em vetor, com as fotos em JPEG de alta
qualidade. A navegação fixa não entra no PDF; o aviso das simulações entra como
texto. Precisa do Google Chrome (ou Edge) e do Node 22+. Para usar outro
endereço: `BASE_URL=https://sunhair.vercel.app npm run build-pdf`.

---

## Tipografia

- **Voz da apresentação:** Open Sans em pesos leves (300 nos títulos, 400 no
  texto, 500 nos rótulos). É uma única família sem serifa, para não competir
  com a marca.
- **Marca aprovada:** **Italiana** (títulos editoriais) e **Jost Light** (apoio)
  como referência web aproximada, porque o brandboard não nomeia as fontes.
  Substitua pelas oficiais quando forem definidas (`app/layout.tsx`).

---

## Navegação

| Ação | Como |
|---|---|
| Próxima / anterior | `↓` `→` `PageDown` `Espaço` / `↑` `←` `PageUp` `Shift+Espaço` |
| Primeira / última | `Home` / `End` |
| Ir a um capítulo | menu superior ou **Índice** |
| Ir a uma tela | **Índice** (todas as 25 telas) |
| Link direto | `/#id-da-tela`, por exemplo `/#paleta` ou `/#aplicacao-landing` |
| Mobile | rolagem/swipe vertical natural |

**Modo estático:** acrescente `?static` à URL (por exemplo `/?static#paleta`)
para desligar todas as animações. Útil para capturas de tela, PDF e revisão.

As animações respeitam `prefers-reduced-motion` do sistema.

---

## Publicar no GitHub

```bash
git remote add origin https://github.com/<usuario>/sun-brazilian-hair.git
git branch -M main
git push -u origin main
```

(O repositório local já vem inicializado com o primeiro commit.)

## Deploy na Vercel

**Pelo painel (recomendado)**

1. Acesse <https://vercel.com/new> e importe o repositório do GitHub.
2. Framework: **Next.js** (detectado automaticamente). Não é preciso alterar
   comando de build nem variáveis de ambiente.
3. Clique em **Deploy**. Cada novo push na `main` gera um novo deploy.

**Pela linha de comando**

```bash
npm i -g vercel
vercel        # primeiro deploy (preview)
vercel --prod # produção
```

A página é gerada como estática e as imagens são otimizadas pela Vercel.
A apresentação está marcada como `noindex` (`app/layout.tsx`) para não aparecer
em buscadores. Remova `robots` da metadata se quiser indexação.
