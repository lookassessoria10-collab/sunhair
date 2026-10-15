import crops from "./brandAssets.json";
import marks from "./marks.json";

/**
 * Manifestos gerados pelos scripts:
 * - data/marks.json        ← npm run build-marks     (marcas oficiais e suas partes)
 * - data/brandAssets.json  ← npm run extract-assets  (fotos e grafismos dos brandboards)
 * Cada chave aponta para um arquivo em /public com largura e altura reais.
 */
export type AssetKey = keyof typeof crops;
export type MarkKey = keyof typeof marks;

export type Asset = {
  src: string;
  width: number;
  height: number;
};

export function asset(key: AssetKey): Asset {
  return crops[key];
}

export function mark(key: MarkKey): Asset {
  const { src, width, height } = marks[key];
  return { src, width, height };
}
