/** Luminância relativa (WCAG) de uma cor hexadecimal. */
export function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Escolhe entre duas cores de texto a que contrasta melhor com o fundo. */
export function readableOn(hex: string, dark: string, light: string) {
  // 0.18 ≈ ponto em que o contraste com preto e com branco se equivale.
  return luminance(hex) > 0.18 ? dark : light;
}
