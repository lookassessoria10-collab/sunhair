"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Asset } from "@/data/assets";
import { EASE } from "./motion";

type Props = {
  image: Asset;
  alt: string;
  sizes: string;
  className?: string;
  /** Amplitude do parallax em % da altura (extremamente sutil por padrão) */
  strength?: number;
  position?: string;
  grain?: boolean;
  preload?: boolean;
};

/**
 * Fotografia com parallax quase imperceptível e um assentamento de escala
 * muito pequeno quando entra na tela.
 */
export function ParallaxImage({
  image,
  alt,
  sizes,
  className = "",
  strength = 4,
  position = "center",
  grain = true,
  preload = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${grain ? "photo-grain" : ""} ${className}`}>
      <motion.div
        className="absolute -inset-y-[6%] inset-x-0"
        style={{ y }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1.02 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.8, ease: EASE }}
      >
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </div>
  );
}
