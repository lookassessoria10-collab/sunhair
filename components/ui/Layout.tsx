import type { ReactNode } from "react";

/**
 * Área útil de cada tela: respeita a navegação fixa no topo e na base.
 * Desktop: altura exata da viewport. Mobile: bloco vertical de altura livre.
 */
export function SafeArea({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** Margens mínimas, para mosaicos de imagens que ocupam quase toda a tela. */
  wide?: boolean;
}) {
  const spacing = wide ? "lg:px-10 lg:pb-[12vh] lg:pt-[12vh]" : "lg:px-[6vw] lg:pb-[13vh] lg:pt-[15vh]";
  return (
    <div className={`relative flex min-h-svh flex-col px-5 pb-24 pt-24 sm:px-8 lg:h-full lg:min-h-0 ${spacing} ${className}`}>
      {children}
    </div>
  );
}

/** Rótulo pequeno de seção: número + filete + nome. */
export function Eyebrow({ number, children, className = "" }: { number?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-4 text-(--slide-muted) ${className}`}>
      {number && (
        <>
          <span className="numeral text-(--slide-fg)">{number}</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

/** Quebra um título em linhas controladas pelo arquivo de conteúdo. */
export function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </>
  );
}
