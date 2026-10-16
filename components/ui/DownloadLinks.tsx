import { ArrowUpRight, Download } from "lucide-react";
import { downloads } from "@/data/brandPresentation";

const button =
  "eyebrow inline-flex w-full items-center justify-center gap-3 border border-current/35 px-6 py-3.5 transition-colors duration-500 hover:border-current sm:w-auto";

/** Botões de download: PDF da apresentação e pasta com os arquivos da marca. */
export function DownloadLinks({ className = "", hint = true }: { className?: string; hint?: boolean }) {
  const { pdf, brandFiles } = downloads;
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* data-pdf-hide: o próprio PDF não mostra o botão de baixar o PDF. */}
        <a href={pdf.href} download={pdf.fileName} data-pdf-hide className={button}>
          <Download className="size-4 shrink-0" strokeWidth={1.25} aria-hidden />
          {pdf.label}
        </a>
        <a href={brandFiles.href} target="_blank" rel="noopener noreferrer" className={button}>
          <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.25} aria-hidden />
          {brandFiles.label}
          <span className="sr-only"> (abre o Google Drive em uma nova aba)</span>
        </a>
      </div>
      {hint ? <p className="mt-4 text-sm font-light opacity-60">{brandFiles.hint}</p> : null}
    </div>
  );
}
