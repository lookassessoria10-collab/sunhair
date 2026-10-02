import Image from "next/image";
import type { CSSProperties } from "react";
import type { Asset } from "@/data/assets";

type Props = {
  image: Asset;
  alt: string;
  /** Largura máxima de exibição em CSS (ex.: "min(42vw, 620px)") */
  width?: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  preload?: boolean;
};

/**
 * Marca ou recorte do brandboard exibido em proporção original.
 * Os PNGs com transparência vêm de scripts/extract-brand-assets.mjs.
 */
export function BrandImage({ image, alt, width, sizes = "(min-width: 1024px) 40vw, 80vw", className = "", style, preload }: Props) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      sizes={sizes}
      preload={preload}
      quality={90}
      draggable={false}
      className={`h-auto select-none ${className}`}
      style={{ width: width ?? "100%", ...style }}
    />
  );
}
