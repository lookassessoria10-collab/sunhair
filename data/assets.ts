import manifest from "./brandAssets.json";

/**
 * Manifesto gerado por `npm run extract-assets` (scripts/extract-brand-assets.mjs).
 * Cada chave aponta para um arquivo em /public com largura e altura reais,
 * usadas pelo next/image para reservar espaço e evitar saltos de layout.
 */
export type AssetKey = keyof typeof manifest;

export type Asset = {
  src: string;
  width: number;
  height: number;
};

export function asset(key: AssetKey): Asset {
  return manifest[key];
}
