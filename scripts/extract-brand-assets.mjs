/**
 * Extrai os recortes usados na apresentação a partir dos três brandboards
 * originais em /public/brand. Nada é redesenhado: os pixels vêm dos PNGs.
 *
 * - "crop": recorte simples (fotos, mockups, painéis), reamostrado 2x com
 *   lanczos para exibir com mais suavidade em telas grandes.
 * - "logo": recorte com fundo removido. O fundo local é estimado e cada pixel
 *   é separado em tinta + transparência, preservando o antialiasing original.
 *   Variantes "recolor" trocam apenas a cor de uma das tintas (ex.: versão
 *   negativa para o comparativo em fundo bordô).
 *
 * Uso: npm run extract-assets
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/brand/crops");

const SOURCES = {
  essencia: "public/brand/concept-01.png",
  solar: "public/brand/concept-02.png",
  origem: "public/brand/concept-03.png",
};

/** Recortes simples: [left, top, width, height] em pixels do PNG original. */
const CROPS = {
  essencia: {
    "photo-hero": [498, 0, 530, 494],
    "photo-01": [599, 722, 191, 163],
    "photo-02": [798, 722, 176, 163],
    "photo-03": [982, 722, 195, 163],
    "app-tag": [0, 931, 323, 357],
    "app-card": [328, 931, 320, 357],
    "app-box": [653, 931, 314, 357],
    "app-mobile": [970, 904, 214, 386],
    "panel-elements": [0, 695, 575, 200],
    "panel-type": [655, 505, 525, 175],
  },
  solar: {
    "photo-hero": [436, 0, 585, 371],
    "photo-01": [302, 586, 292, 273],
    "photo-02": [812, 586, 359, 273],
    "lines": [852, 442, 190, 140],
    "app-tag": [0, 918, 246, 317],
    "app-card": [251, 918, 294, 317],
    "app-box": [549, 888, 324, 347],
    "app-mobile": [903, 864, 228, 382],
    "detail-print": [598, 1000, 165, 140],
  },
  origem: {
    "photo-hero": [798, 0, 455, 411],
    "panel-elements": [0, 648, 381, 438],
    "app-box": [383, 672, 340, 414],
    "app-tag": [726, 648, 207, 438],
    "app-card": [936, 648, 287, 438],
    "app-mobile": [1226, 648, 222, 438],
    "detail-seal": [512, 846, 142, 122],
  },
};

/**
 * Logos e elementos com fundo removido.
 * rect: área de trabalho. inks: cores sólidas de referência (amostradas).
 * exclude: retângulos (coordenadas absolutas) forçados a fundo — fios de
 * cabelo da fotografia que invadem a área da logo.
 * parts: sub-recortes [left, top, width, height] gerados a partir da logo limpa.
 * inkZones: limita onde cada tinta pode existir (evita reflexos da foto).
 * maxResidual: descarta pixels que não se explicam por nenhuma tinta.
 * recolor: variantes com a tinta de índice N trocada por outra cor da paleta.
 */
const LOGOS = {
  essencia: {
    logo: {
      rect: [40, 48, 422, 284],
      inks: ["#3b2422", "#c4925c"],
      exclude: [
        [405, 48, 70, 45],
        [412, 93, 18, 50],
        [430, 48, 40, 140],
        [445, 48, 30, 284],
      ],
      parts: {
        "logo-sun": [40, 48, 422, 208],
        "logo-name": [40, 256, 422, 38],
        "logo-tagline": [40, 294, 422, 38],
      },
      recolor: { "logo-negative": { 0: "#f8f3ec" } },
    },
    lines: { rect: [0, 714, 375, 180], inks: ["#c4925c"], exclude: [] },
    "type-primary": { rect: [662, 528, 210, 100], inks: ["#4a2626", "#c9a274"], exclude: [] },
    "type-secondary": { rect: [950, 542, 120, 70], inks: ["#1c1414"], exclude: [] },
  },
  solar: {
    logo: {
      rect: [70, 50, 350, 262],
      inks: ["#5c1220", "#c79a68"],
      exclude: [
        [386, 50, 40, 195],
        [350, 50, 36, 92],
        [395, 308, 30, 10],
        [419, 240, 5, 80],
        [416, 245, 6, 35],
        [66, 46, 120, 50],
        [325, 50, 25, 60],
        [290, 46, 60, 22],
      ],
      // O dourado só existe nos raios e no traço sob "SUN".
      inkZones: { 1: [[150, 50, 200, 95], [70, 188, 262, 64]] },
      maxResidual: 0.12,
      parts: {
        "logo-symbol": [168, 50, 182, 92],
        "logo-body": [70, 142, 350, 170],
        "logo-sun": [70, 50, 350, 192],
        "logo-name": [70, 242, 350, 36],
        "logo-tagline": [70, 278, 350, 34],
      },
      recolor: { "logo-negative": { 0: "#f8ede1" } },
    },
  },
  origem: {
    logo: {
      rect: [150, 22, 520, 348],
      inks: ["#e9c597", "#f3d9c6"],
      exclude: [],
      parts: {
        "logo-symbol": [318, 26, 180, 160],
        "logo-body": [150, 184, 520, 186],
        "logo-wordmark": [240, 182, 330, 102],
        "logo-name": [150, 182, 520, 142],
        "logo-tagline": [150, 324, 520, 46],
      },
      recolorParts: {
        // Versão positiva: texto em bordô, símbolo mantém o dourado original
        // (mesma lógica da "variação vertical" presente no brandboard).
        "logo-positive": { below: 184, color: "#5a0e1a" },
      },
    },
    "var-vertical": { rect: [12, 450, 206, 172], inks: ["#5a1420", "#c99a5c"], exclude: [] },
    "var-horizontal": { rect: [226, 500, 172, 70], inks: ["#5a1420", "#c99a5c"], exclude: [] },
    "var-seal": { rect: [418, 446, 156, 172], inks: ["#5a1420", "#c99a5c"], exclude: [] },
    "el-symbol": { rect: [38, 722, 154, 150], inks: ["#e9c597"], exclude: [] },
    "el-lines": { rect: [220, 728, 146, 140], inks: ["#e9c597"], exclude: [] },
  },
};

// ---------------------------------------------------------------------------

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

async function readRaw(file, [left, top, width, height]) {
  const { data, info } = await sharp(await readFile(path.join(ROOT, file)))
    .extract({ left, top, width, height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = new Float32Array(info.width * info.height * 3);
  for (let i = 0; i < px.length; i++) px[i] = data[i] / 255;
  return { px, w: info.width, h: info.height };
}

/** Desfoque box separável aplicado 3x (aproxima um gaussiano). */
function blur(src, w, h, r) {
  let a = Float32Array.from(src);
  let b = new Float32Array(a.length);
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < h; y++) {
      let acc = 0;
      for (let x = -r; x <= r; x++) acc += a[y * w + Math.min(w - 1, Math.max(0, x))];
      for (let x = 0; x < w; x++) {
        b[y * w + x] = acc / (2 * r + 1);
        const add = Math.min(w - 1, x + r + 1);
        const rem = Math.max(0, x - r);
        acc += a[y * w + add] - a[y * w + rem];
      }
    }
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let y = -r; y <= r; y++) acc += b[Math.min(h - 1, Math.max(0, y)) * w + x];
      for (let y = 0; y < h; y++) {
        a[y * w + x] = acc / (2 * r + 1);
        const add = Math.min(h - 1, y + r + 1);
        const rem = Math.max(0, y - r);
        acc += b[add * w + x] - b[rem * w + x];
      }
    }
  }
  return a;
}

function dilate(mask, w, h, r) {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (!mask[y * w + x]) continue;
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < w && yy < h) out[yy * w + xx] = 1;
        }
    }
  return out;
}

const inRects = (x, y, rects) =>
  rects.some(([l, t, rw, rh]) => x >= l && x < l + rw && y >= t && y < t + rh);

/** Estima o fundo local por convolução normalizada, ignorando a tinta. */
function estimateBackground(px, w, h, rect, exclude) {
  const n = w * h;
  const chan = (c) => {
    const a = new Float32Array(n);
    for (let i = 0; i < n; i++) a[i] = px[i * 3 + c];
    return a;
  };
  const ch = [chan(0), chan(1), chan(2)];
  let bg = ch.map((c) => blur(c, w, h, 14));
  for (let iter = 0; iter < 3; iter++) {
    const fg = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      const d = Math.hypot(ch[0][i] - bg[0][i], ch[1][i] - bg[1][i], ch[2][i] - bg[2][i]);
      fg[i] = d > 0.035 ? 1 : 0;
    }
    const m = dilate(fg, w, h, 3);
    const weight = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const excluded = inRects(rect[0] + (i % w), rect[1] + Math.floor(i / w), exclude);
      weight[i] = m[i] || excluded ? 0 : 1;
    }
    const wb = blur(weight, w, h, 10);
    bg = ch.map((c) => {
      const cw = new Float32Array(n);
      for (let i = 0; i < n; i++) cw[i] = c[i] * weight[i];
      const cb = blur(cw, w, h, 10);
      const out = new Float32Array(n);
      for (let i = 0; i < n; i++) out[i] = wb[i] > 1e-3 ? cb[i] / wb[i] : bg[0][i];
      return out;
    });
  }
  return bg;
}

/** Separa tinta e fundo. Retorna RGBA float + índice da tinta dominante. */
function unmix(px, w, h, bg, inks, rect, exclude, { inkZones = {}, maxResidual = Infinity } = {}) {
  const n = w * h;
  const rgba = new Float32Array(n * 4);
  const inkIndex = new Uint8Array(n);
  const ink = inks.map(hex);
  for (let i = 0; i < n; i++) {
    const x = rect[0] + (i % w);
    const y = rect[1] + Math.floor(i / w);
    if (inRects(x, y, exclude)) continue;
    const P = [px[i * 3], px[i * 3 + 1], px[i * 3 + 2]];
    const B = [bg[0][i], bg[1][i], bg[2][i]];
    const d = [P[0] - B[0], P[1] - B[1], P[2] - B[2]];
    // Escolhe a tinta cujo segmento fundo→tinta explica melhor o pixel.
    let best = 0, bestK = 0, bestResidual = Infinity;
    ink.forEach((E, k) => {
      const v = [E[0] - B[0], E[1] - B[1], E[2] - B[2]];
      const vv = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
      if (vv < 1e-4) return;
      if (inkZones[k] && !inRects(x, y, inkZones[k])) return;
      const proj = Math.min(1, Math.max(0, (d[0] * v[0] + d[1] * v[1] + d[2] * v[2]) / vv));
      const residual = Math.hypot(d[0] - proj * v[0], d[1] - proj * v[1], d[2] - proj * v[2]);
      if (residual < bestResidual) { bestResidual = residual; best = proj; bestK = k; }
    });
    if (best < 0.75 && bestResidual > maxResidual) continue;
    let a = Math.min(1, best / 0.82);
    if (a < 0.04) a = 0;
    if (a === 0) continue;
    for (let c = 0; c < 3; c++) rgba[i * 4 + c] = Math.min(1, Math.max(0, B[c] + d[c] / a));
    rgba[i * 4 + 3] = a;
    inkIndex[i] = bestK;
  }
  return { rgba, inkIndex };
}

/**
 * Remove resíduos da fotografia: fragmentos isolados cujo pixel mais forte
 * nunca chega perto de opaco. Traços reais (mesmo os raios finos) têm núcleo
 * quase sólido; reflexos de cabelo no fundo, não.
 */
function cleanNoise(rgba, w, h, { floor = 0.05, minPeak = 0.45 } = {}) {
  const n = w * h;
  const label = new Int32Array(n).fill(-1);
  const stack = [];
  for (let start = 0; start < n; start++) {
    if (label[start] !== -1 || rgba[start * 4 + 3] <= floor) continue;
    const members = [];
    let peak = 0;
    stack.push(start);
    label[start] = start;
    while (stack.length) {
      const i = stack.pop();
      members.push(i);
      peak = Math.max(peak, rgba[i * 4 + 3]);
      const x = i % w, y = (i / w) | 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          const j = yy * w + xx;
          if (label[j] === -1 && rgba[j * 4 + 3] > floor) {
            label[j] = start;
            stack.push(j);
          }
        }
    }
    if (peak < minPeak) for (const i of members) rgba[i * 4 + 3] = 0;
  }
  // Pixels abaixo do piso viram transparência total (sem véu residual).
  for (let i = 0; i < n; i++) if (rgba[i * 4 + 3] <= floor) rgba[i * 4 + 3] = 0;
  return rgba;
}

function toPng(rgba, w, h) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < buf.length; i++) buf[i] = Math.round(rgba[i] * 255);
  return sharp(buf, { raw: { width: w, height: h, channels: 4 } });
}

// Toda a escrita passa por buffers do Node: caminhos longos no Windows
// (> 260 caracteres) quebram a escrita nativa do libvips.
async function savePng(img, file, w, h, scale = 2) {
  const flat = await img.png().toBuffer();
  const out = await sharp(flat)
    .resize({ width: w * scale, height: h * scale, kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(file, out);
}

/** Fotografias editoriais neutras usadas nas telas de introdução. */
const EDITORIAL = {
  "editorial-01": "essencia/photo-hero.jpg",
};

const manifest = {};

async function register(key, file) {
  const { width, height } = await sharp(await readFile(file)).metadata();
  const src = "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
  manifest[key] = { src, width, height };
}

function recolorInk(rgba, w, h, inkIndex, map) {
  const out = Float32Array.from(rgba);
  for (let i = 0; i < w * h; i++) {
    const target = map[inkIndex[i]];
    if (!target || out[i * 4 + 3] === 0) continue;
    const [r, g, b] = hex(target);
    out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b;
  }
  return out;
}

function recolorBelow(rgba, w, h, rect, below, color) {
  const out = Float32Array.from(rgba);
  const [r, g, b] = hex(color);
  for (let i = 0; i < w * h; i++) {
    const y = rect[1] + Math.floor(i / w);
    if (y < below || out[i * 4 + 3] === 0) continue;
    out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b;
  }
  return out;
}

async function run() {
  for (const [concept, file] of Object.entries(SOURCES)) {
    const dir = path.join(OUT, concept);
    await mkdir(dir, { recursive: true });
    await register(`${concept}/brandboard`, path.join(ROOT, file));

    const source = await readFile(path.join(ROOT, file));
    for (const [name, [left, top, width, height]] of Object.entries(CROPS[concept] ?? {})) {
      const jpg = await sharp(source)
        .extract({ left, top, width, height })
        .resize({ width: width * 2, kernel: "lanczos3" })
        .sharpen({ sigma: 0.6 })
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();
      const out = path.join(dir, `${name}.jpg`);
      await writeFile(out, jpg);
      await register(`${concept}/${name}`, out);
    }

    for (const [name, cfg] of Object.entries(LOGOS[concept] ?? {})) {
      const { px, w, h } = await readRaw(file, cfg.rect);
      const exclude = cfg.exclude ?? [];
      const bg = estimateBackground(px, w, h, cfg.rect, exclude);
      const { rgba, inkIndex } = unmix(px, w, h, bg, cfg.inks, cfg.rect, exclude, cfg);
      cleanNoise(rgba, w, h);

      // Variante original + variantes recoloridas; todas recebem os mesmos sub-recortes.
      const variants = { [name]: rgba };
      for (const [varName, map] of Object.entries(cfg.recolor ?? {}))
        variants[varName] = recolorInk(rgba, w, h, inkIndex, map);
      for (const [varName, { below, color }] of Object.entries(cfg.recolorParts ?? {}))
        variants[varName] = recolorBelow(rgba, w, h, cfg.rect, below, color);

      for (const [varName, data] of Object.entries(variants)) {
        const out = path.join(dir, `${varName}.png`);
        await savePng(toPng(data, w, h), out, w, h);
        await register(`${concept}/${varName}`, out);

        for (const [partName, [pl, pt, pw, ph]] of Object.entries(cfg.parts ?? {})) {
          const suffix = partName.replace(/^logo-/, "");
          const partFile = path.join(dir, `${varName}-${suffix}.png`);
          const part = toPng(data, w, h).extract({ left: pl - cfg.rect[0], top: pt - cfg.rect[1], width: pw, height: ph });
          await savePng(part, partFile, pw, ph);
          await register(`${concept}/${varName}-${suffix}`, partFile);
        }
      }
    }
    console.log(`✓ ${concept}`);
  }

  const imagesDir = path.join(ROOT, "public/images");
  await mkdir(imagesDir, { recursive: true });
  for (const [name, from] of Object.entries(EDITORIAL)) {
    const out = path.join(imagesDir, `${name}.jpg`);
    await writeFile(out, await readFile(path.join(OUT, from)));
    await register(`images/${name}`, out);
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(
    path.join(ROOT, "data/brandAssets.json"),
    JSON.stringify(sorted, null, 2) + "\n",
  );
  console.log(`✓ manifesto: ${Object.keys(sorted).length} arquivos`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
