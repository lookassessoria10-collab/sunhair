"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { usePresentation } from "@/components/presentation/PresentationContext";
import type { GalleryItem } from "@/data/brandPresentation";

type Props = {
  items: GalleryItem[];
  index: number;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  position?: string;
  fit?: "cover" | "contain";
  label?: boolean;
};

/** Recorte de aplicação clicável: abre a lightbox no item correspondente. */
export function GalleryTile({ items, index, sizes, className = "", style, position = "center", fit = "cover", label = true }: Props) {
  const { openLightbox } = usePresentation();
  const item = items[index];
  return (
    <button
      type="button"
      onClick={() => openLightbox(items, index)}
      aria-label={`Ampliar: ${item.label}`}
      className={`group photo-grain relative block overflow-hidden ${className}`}
      style={style}
    >
      <Image
        src={item.image.src}
        alt={item.label}
        fill
        sizes={sizes}
        className={`${fit === "cover" ? "object-cover" : "object-contain"} transition-[scale] duration-[1400ms] ease-(--ease-editorial) group-hover:scale-[1.035]`}
        style={{ objectPosition: position }}
      />
      {label && (
        <span className="eyebrow absolute bottom-3 left-3 z-10 bg-(--slide-bg) px-3 py-2 text-(--slide-fg)">{item.label}</span>
      )}
      <span className="absolute right-3 top-3 z-10 grid size-9 place-items-center bg-(--slide-bg) text-(--slide-fg) opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="size-3.5" strokeWidth={1.25} aria-hidden />
      </span>
    </button>
  );
}
