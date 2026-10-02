# SUN Brazilian Hair — Apresentação de Identidade Visual

Apresentação interativa, navegável em capítulos, que apresenta e defende
três caminhos de identidade visual para a marca **SUN Brazilian Hair —
Cabelo brasileiro. Sem exceção.**

- 28 telas em 5 capítulos: Introdução, Essência, Solar, Origem e Comparativo
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
| `npm run extract-assets` | Regera os recortes a partir dos brandboards |

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
    Chrome.tsx          navegação fixa: capítulos, progresso, 01 / 28, setas
    ChapterMenu.tsx     índice completo em tela cheia
    Slide.tsx           moldura de cada tela (100svh no desktop)
  slides/               as 28 telas, uma pasta lógica por capítulo
    intro.tsx           00 — Capa, A marca, Posicionamento, Desafio, Caminhos
    essencia.tsx        01 — Essência
    solar.tsx           02 — Solar
    origem.tsx          03 — Origem
    comparison.tsx      04 — Comparativo e encerramento
    registry.tsx        liga cada id de tela ao componente
  ui/                   peças reutilizáveis (Reveal, MaskReveal, ParallaxImage,
                        BrandImage, GalleryTile, Lightbox, Layout…)
data/
  brandPresentation.ts  TODO o conteúdo: textos, cores, conceitos, ordem das telas
  brandAssets.json      manifesto de imagens (gerado pelo script)
  assets.ts             helper tipado para o manifesto
public/
  brand/concept-0X.png  brandboards originais
  brand/crops/          recortes extraídos dos brandboards (gerados)
  images/               fotografias editoriais da introdução
scripts/
  extract-brand-assets.mjs  extração dos recortes e das marcas com transparência
```

---

## Como editar o conteúdo

Tudo que é texto, cor ou ordem de telas está em **`data/brandPresentation.ts`**.
Os componentes só leem esse arquivo.

- **Textos:** procure o capítulo (`intro`, `concepts.essencia`, `concepts.solar`,
  `concepts.origem`, `comparison`, `closing`) e edite as strings.
  Títulos em várias linhas são arrays: cada item é uma linha.
- **Cores das paletas:** `palette.swatches` / `contrast.swatches` /
  `system.swatches` de cada conceito (nome, hexadecimal e função).
- **Cores de fundo das telas:** objeto `themes`.
- **Ordem das telas:** lista `slides`. O `id` de cada tela é também a âncora da
  URL (`/#solar`, `/#origem-marcas`…) e a chave em `components/slides/registry.tsx`.
- **Rótulos do menu e do contador:** campo `label` de cada item em `slides`.

---

## Os três conceitos

Os brandboards foram analisados visualmente e mapeados pelo conteúdo, não pela
ordem de envio:

| Conceito | Arquivo | Imagem enviada | Leitura |
|---|---|---|---|
| 01 Essência | `public/brand/concept-01.png` | 3ª imagem | tipográfico, editorial, linhas finas |
| 02 Solar | `public/brand/concept-02.png` | 2ª imagem | sol com raios delicados, bordô + dourado |
| 03 Origem | `public/brand/concept-03.png` | 1ª imagem | círculo solar + fios, versões horizontal, vertical e selo |

> O brandboard de Essência traz escrito "CONCEITO 3" no topo, porque é o texto
> original da imagem. Ele aparece quando o brandboard completo é aberto em tela cheia.

### Paletas (hexadecimais impressos nos brandboards)

- **Essência:** Marfim `#F8F3EC` · Areia `#D9C6B4` · Argila `#B89B86` · Bordô `#6B2E2E` · Espresso `#3E2825` · Ouro suave `#D4B483`
- **Solar:** Bordô `#5A0E1A` · Vinho `#7A1F2B` · Dourado `#D4AF7C` · Ivory `#F8EDE1` · Nude `#D9B7A1` · Espresso `#2E1B16`
- **Origem:** Bordô `#5A0E1A` · Vinho `#7A1F2B` · Dourado `#C9A968` · Ivory `#F8EFE4` · Nude `#D9B7A1`

---

## Imagens e marcas

Nenhuma marca foi redesenhada. Todas as logos, símbolos e mockups são **recortes
dos PNGs originais**, gerados por `scripts/extract-brand-assets.mjs`:

- **Recortes simples** (fotos, mockups): reamostrados 2× (lanczos).
- **Marcas com fundo transparente:** o script estima o fundo local e separa
  tinta e transparência pixel a pixel, preservando o antialiasing original.
  Resíduos de cabelo da fotografia são removidos por zonas de exclusão e por
  um filtro de fragmentos isolados.
- **Versões para o comparativo:** a versão negativa de Essência e Solar e a
  positiva de Origem trocam apenas a cor de uma tinta por outra cor da própria
  paleta. Na tela "As três marcas", uma nota informa que são derivadas.

Coordenadas de recorte, cores de tinta e exclusões ficam no topo do script.
Para regerar:

```bash
npm run extract-assets
```

### Trocar pelos arquivos finais (recomendado)

Os brandboards têm cerca de 1200 px de largura, por isso marcas exibidas em
tamanho grande ficam levemente suaves. Quando houver os arquivos finais
(SVG ou PNG em alta), basta substituir o arquivo correspondente em
`public/brand/crops/<conceito>/` mantendo o nome. Se a proporção mudar,
atualize `width` e `height` em `data/brandAssets.json`.

### Fotografias

`public/images/editorial-01.jpg` e as fotos dos capítulos vêm dos próprios
brandboards e funcionam como provisórias. Para trocar, substitua o arquivo
mantendo o nome. Direção sugerida: mulheres adultas, beleza natural, luz solar
quente, contraluz, movimento, textura real.

---

## Tipografia

- **Voz da apresentação (neutra):** Instrument Serif + Instrument Sans, para não
  competir com nenhum conceito.
- **Essência:** o "Aa" da tela de tipografia é o recorte original do brandboard.
  Os exemplos em texto usam **Italiana** (principal) e **Jost Light** (apoio)
  como referência web aproximada, já que o brandboard não nomeia as fontes.
  Substitua pelas fontes oficiais quando forem definidas (`app/layout.tsx`).
- **Origem:** o brandboard indica Playfair Display + Montserrat.

---

## Navegação

| Ação | Como |
|---|---|
| Próxima / anterior | `↓` `→` `PageDown` `Espaço` / `↑` `←` `PageUp` `Shift+Espaço` |
| Primeira / última | `Home` / `End` |
| Ir a um capítulo | menu superior ou **Índice** |
| Ir a uma tela | **Índice** (todas as 28 telas) |
| Link direto | `/#id-da-tela`, por exemplo `/#solar` ou `/#as-tres-marcas` |
| Lightbox | `←` `→` entre imagens, `Esc` fecha |
| Mobile | rolagem/swipe vertical natural |

**Modo estático:** acrescente `?static` à URL (por exemplo `/?static#origem`)
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
