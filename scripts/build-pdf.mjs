/**
 * Gera o PDF da apresentação: uma página 16:9 (1920 × 1080) por tela,
 * em vetor (texto nítido e selecionável), com as imagens em alta.
 *
 * - Abre o site no Chrome sem interface, no layout de desktop.
 * - Percorre todas as telas para disparar as animações de entrada e o
 *   carregamento das imagens.
 * - Esconde a navegação fixa, o grão de papel e o que tiver `data-pdf-hide`;
 *   mostra o que tiver `data-pdf-only` (ex.: o aviso das simulações).
 *
 * Uso, com o site rodando (npm run build && npm run start):
 *   npm run build-pdf
 * Variáveis opcionais: BASE_URL (padrão http://localhost:3000) e CHROME_PATH.
 * Requer Google Chrome ou Microsoft Edge e Node 22 ou superior.
 *
 * Saída: o arquivo de `downloads.pdf.href` em data/brandPresentation.ts.
 */
import { execSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/downloads/sun-brazilian-hair-manual-de-identidade-visual.pdf");
const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const WIDTH = 1920;
const HEIGHT = 1080;

const PDF_CSS = `
  @page { margin: 0; }
  html { scroll-snap-type: none !important; }
  .chrome, .paper-grain, [data-pdf-hide] { display: none !important; }
  [data-pdf-only] { display: block !important; }
  /* Filtros que, impressos, viram imagem e travam a geração: o grão das fotos
     (ruído SVG com mescla) e o blur(0) que as animações de entrada deixam. */
  .photo-grain::after { content: none !important; }
  [style*="blur(0px)"] { filter: none !important; }
  .slide { height: ${HEIGHT}px !important; min-height: 0 !important; break-after: page; break-inside: avoid; }
  .slide:last-child { break-after: auto; }
`;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fail(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}

if (typeof WebSocket === "undefined") fail("Este script precisa do Node 22 ou superior.");
const chromePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chromePath) fail("Chrome/Edge não encontrado. Defina CHROME_PATH com o caminho do executável.");
try {
  await fetch(BASE_URL);
} catch {
  fail(`O site não respondeu em ${BASE_URL}. Rode "npm run build && npm run start" antes.`);
}

// Chrome sem interface, com perfil temporário; a porta é escolhida por ele.
const profile = mkdtempSync(path.join(os.tmpdir(), "sun-pdf-"));
const chrome = spawn(chromePath, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run", "--hide-scrollbars", "about:blank"], {
  stdio: "ignore",
});

function cleanup() {
  try {
    if (process.platform === "win32") execSync(`taskkill /F /T /PID ${chrome.pid}`, { stdio: "ignore" });
    else chrome.kill("SIGKILL");
  } catch {}
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  } catch {}
}

try {
  let port;
  for (let i = 0; i < 100 && !port; i++) {
    const file = path.join(profile, "DevToolsActivePort");
    if (existsSync(file)) port = readFileSync(file, "utf8").split("\n")[0].trim();
    else await sleep(100);
  }
  if (!port) throw new Error("o Chrome não abriu a porta de depuração");
  const target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  const handlers = new Map();
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method && listeners.has(msg.method)) {
      listeners.get(msg.method)();
      listeners.delete(msg.method);
    } else if (msg.method && handlers.has(msg.method)) {
      handlers.get(msg.method)(msg.params);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const once = (method) => new Promise((resolve) => listeners.set(method, resolve));
  const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.value;

  // O Chrome embute AVIF/WebP no PDF como pixels sem compressão (centenas de MB).
  // Entregamos as fotos em JPEG de alta qualidade, que vai para o PDF como está.
  // PNGs (marcas com transparência) passam sem alteração.
  handlers.set("Fetch.requestPaused", async ({ requestId, request }) => {
    try {
      const source = new URL(request.url).searchParams.get("url") ?? "";
      if (source.toLowerCase().endsWith(".png")) {
        await send("Fetch.continueRequest", { requestId });
        return;
      }
      const response = await fetch(request.url, { headers: { Accept: "image/webp,image/jpeg,*/*" } });
      const jpeg = await sharp(Buffer.from(await response.arrayBuffer())).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
      await send("Fetch.fulfillRequest", {
        requestId,
        responseCode: 200,
        responseHeaders: [{ name: "Content-Type", value: "image/jpeg" }],
        body: jpeg.toString("base64"),
      });
    } catch {
      await send("Fetch.continueRequest", { requestId }).catch(() => {});
    }
  });
  await send("Fetch.enable", { patterns: [{ urlPattern: "*/_next/image*", requestStage: "Request" }] });

  // Layout de desktop; densidade 2 para o navegador escolher as imagens em alta.
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: false });
  await send("Emulation.setEmulatedMedia", { media: "screen" });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: `${BASE_URL}/?static` });
  await loaded;
  await evaluate("document.fonts.ready.then(() => true)");

  const total = await evaluate("document.querySelectorAll('main > section').length");
  console.log(`Percorrendo ${total} telas...`);
  for (let i = 0; i < total; i++) {
    await evaluate(`window.scrollTo(0, document.querySelectorAll('main > section')[${i}].offsetTop)`);
    await sleep(600);
  }
  const imagesOk = await evaluate(`(async () => {
    const start = Date.now();
    while (Date.now() - start < 60000) {
      if ([...document.images].every((img) => img.complete && img.naturalWidth > 0)) return true;
      await new Promise((r) => setTimeout(r, 250));
    }
    return false;
  })()`);
  if (!imagesOk) throw new Error("algumas imagens não carregaram em 60 s");
  await evaluate("window.scrollTo(0, 0)");
  await evaluate(`(() => { const style = document.createElement("style"); style.textContent = ${JSON.stringify(PDF_CSS)}; document.head.append(style); })()`);
  await sleep(500);

  console.log("Gerando o PDF...");
  // O papel com a largura real (1920 px = 20 pol.) é o que faz a impressão usar o
  // layout de desktop. Não combinar com preferCSSPageSize: juntos, a leitura falha.
  const { stream } = await send("Page.printToPDF", {
    printBackground: true,
    paperWidth: WIDTH / 96,
    paperHeight: HEIGHT / 96,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    transferMode: "ReturnAsStream",
  });
  // Lê o PDF em partes, sem uma única mensagem gigante.
  const chunks = [];
  for (;;) {
    const part = await send("IO.read", { handle: stream, size: 1 << 20 });
    chunks.push(Buffer.from(part.data, part.base64Encoded ? "base64" : "binary"));
    if (part.eof) break;
  }
  await send("IO.close", { handle: stream });
  mkdirSync(path.dirname(OUT), { recursive: true });
  writeFileSync(OUT, Buffer.concat(chunks));
  ws.close();
  console.log(`PDF salvo em ${path.relative(ROOT, OUT)} (${(statSync(OUT).size / 1024 / 1024).toFixed(1)} MB).`);
} catch (error) {
  cleanup();
  fail(`Não foi possível gerar o PDF: ${error.message}`);
}
cleanup();
