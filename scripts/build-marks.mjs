/**
 * Gera as versões e as partes das marcas a partir dos PNGs oficiais
 * (transparentes) em /public/brand/logos.
 *
 * - Remove o véu de pixels quase transparentes ao redor das marcas.
 * - Normaliza a opacidade do núcleo dos traços (vinham com ~92%).
 * - Separa as partes (símbolo, wordmark, descritor, tagline) por
 *   componentes conectados — não por retângulos — e registra a posição de
 *   cada parte em relação à marca completa, para animações precisas.
 * - Cria as versões para fundo claro e para fundo bordô trocando apenas a
 *   cor de cada tinta por outra cor da paleta do próprio conceito.
 *
 * Uso: npm run build-marks   (escreve /public/brand/marks e data/marks.json)
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/brand/marks");

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const luma = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;

/**
 * part(comp): a qual parte pertence cada componente (coordenadas do PNG original).
 * ink(r,g,b): "main" (cor institucional) ou "gold" (detalhe dourado).
 * variants: cor aplicada por tinta ou por parte; null mantém a cor original.
 */
const MARKS = {
  essencia: {
    part: (c) => (c.y0 < 870 ? "sun" : c.y0 < 1010 ? "name" : "tagline"),
    ink: (r, g, b) => (luma(r, g, b) < 80 ? "main" : "gold"),
    variants: {
      light: {},
      dark: { byInk: { main: "#F8F3EC" } },
    },
  },
  solar: {
    part: (c) => (c.y1 <= 522 ? "symbol" : c.y0 < 830 ? "sun" : c.y0 < 960 ? "name" : "tagline"),
    ink: (r, g) => (g < 50 ? "main" : "gold"),
    variants: {
      light: {},
      dark: { byInk: { main: "#F8EDE1" } },
    },
    groups: { body: ["sun", "name", "tagline"] },
  },
  origem: {
    part: (c) => (c.y1 <= 600 && c.y0 < 560 ? "symbol" : c.y0 < 840 ? "wordmark" : c.y0 < 945 ? "descriptor" : "tagline"),
    ink: () => "gold",
    variants: {
      dark: {},
      // Fundo claro: texto em bordô, símbolo no dourado da paleta Origem
      // (mesma lógica da "variação vertical" do brandboard).
      light: { byPart: { symbol: "#C9A968", wordmark: "#5A0E1A", descriptor: "#5A0E1A", tagline: "#5A0E1A" } },
    },
    groups: { body: ["wordmark", "descriptor", "tagline"], name: ["wordmark", "descriptor"] },
  },
};

const FLOOR = 0.06; // abaixo disso o pixel é véu, não traço
const MIN_PEAK = 0.5; // fragmentos sem núcleo sólido são descartados

async function load(concept) {
  const buf = await readFile(path.join(ROOT, `public/brand/logos/${concept}.png`));
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

/** Componentes conectados (8-vizinhança) dos pixels acima do piso. */
function components(data, w, h) {
  const n = w * h;
  const label = new Int32Array(n).fill(-1);
  const comps = [];
  for (let s = 0; s < n; s++) {
    if (label[s] !== -1 || data[s * 4 + 3] / 255 <= FLOOR) continue;
    const id = comps.length;
    const c = { id, x0: Infinity, y0: Infinity, x1: -1, y1: -1, peak: 0, pixels: [] };
    const stack = [s];
    label[s] = id;
    while (stack.length) {
      const i = stack.pop();
      const x = i % w, y = (i / w) | 0;
      c.pixels.push(i);
      c.peak = Math.max(c.peak, data[i * 4 + 3] / 255);
      c.x0 = Math.min(c.x0, x); c.x1 = Math.max(c.x1, x);
      c.y0 = Math.min(c.y0, y); c.y1 = Math.max(c.y1, y);
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          const j = yy * w + xx;
          if (label[j] === -1 && data[j * 4 + 3] / 255 > FLOOR) {
            label[j] = id;
            stack.push(j);
          }
        }
    }
    comps.push(c);
  }
  return comps;
}

const bbox = (list) => ({
  x0: Math.min(...list.map((c) => c.x0)),
  y0: Math.min(...list.map((c) => c.y0)),
  x1: Math.max(...list.map((c) => c.x1)),
  y1: Math.max(...list.map((c) => c.y1)),
});

async function writePng(rgba, w, h, box, file) {
  const width = box.x1 - box.x0 + 1;
  const height = box.y1 - box.y0 + 1;
  const png = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: box.x0, top: box.y0, width, height })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(file, png);
  return { width, height };
}

async function run() {
  const manifest = {};
  for (const [concept, cfg] of Object.entries(MARKS)) {
    const { data, w, h } = await load(concept);
    const comps = components(data, w, h).filter((c) => c.peak >= MIN_PEAK);
    for (const c of comps) c.part = cfg.part(c);

    const parts = {};
    for (const c of comps) (parts[c.part] ??= []).push(c);
    for (const [group, members] of Object.entries(cfg.groups ?? {}))
      parts[group] = members.flatMap((m) => parts[m] ?? []);

    const full = bbox(comps);
    const fullW = full.x1 - full.x0 + 1;
    const fullH = full.y1 - full.y0 + 1;
    const dir = path.join(OUT, concept);
    await mkdir(dir, { recursive: true });

    for (const [variant, rule] of Object.entries(cfg.variants)) {
      // Imagem limpa da variante (apenas pixels dos componentes válidos)
      const rgba = Buffer.alloc(w * h * 4);
      for (const c of comps) {
        const partColor = rule.byPart?.[c.part];
        for (const i of c.pixels) {
          let [r, g, b] = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
          const target = partColor ?? rule.byInk?.[cfg.ink(r, g, b)];
          if (target) [r, g, b] = hex(target);
          const a = Math.min(1, Math.max(0, (data[i * 4 + 3] / 255 - FLOOR) / (0.9 - FLOOR)));
          rgba[i * 4] = r; rgba[i * 4 + 1] = g; rgba[i * 4 + 2] = b;
          rgba[i * 4 + 3] = Math.round(a * 255);
        }
      }

      const key = `${concept}/${variant}`;
      const size = await writePng(rgba, w, h, full, path.join(dir, `${variant}.png`));
      manifest[key] = { src: `/brand/marks/${concept}/${variant}.png`, ...size };

      for (const [partName, list] of Object.entries(parts)) {
        const ids = new Set(list.map((c) => c.id));
        const only = Buffer.alloc(w * h * 4);
        for (const c of comps) if (ids.has(c.id)) for (const i of c.pixels) rgba.copy(only, i * 4, i * 4, i * 4 + 4);
        const box = bbox(list);
        const partSize = await writePng(only, w, h, box, path.join(dir, `${variant}-${partName}.png`));
        manifest[`${key}-${partName}`] = {
          src: `/brand/marks/${concept}/${variant}-${partName}.png`,
          ...partSize,
          // Posição da parte dentro da marca completa (%), para sobreposições exatas
          box: {
            left: +(((box.x0 - full.x0) / fullW) * 100).toFixed(3),
            top: +(((box.y0 - full.y0) / fullH) * 100).toFixed(3),
            width: +((partSize.width / fullW) * 100).toFixed(3),
            height: +((partSize.height / fullH) * 100).toFixed(3),
          },
          // Origem da parte em coordenadas do PNG oficial (para guias SVG)
          origin: { x: box.x0, y: box.y0 },
        };
      }
    }
    console.log(`✓ ${concept}: ${comps.length} componentes, ${Object.keys(parts).join(", ")}`);
  }
  await writeFile(path.join(ROOT, "data/marks.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`✓ manifesto: ${Object.keys(manifest).length} arquivos`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
