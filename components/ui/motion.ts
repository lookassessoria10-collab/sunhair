/** Curva e tempos únicos para toda a apresentação: lentos e editoriais. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  base: 1.1,
  slow: 1.6,
  reveal: 1.8,
} as const;

/** Porção visível do elemento antes de animar. */
export const VIEWPORT = { once: true, amount: 0.35 } as const;
