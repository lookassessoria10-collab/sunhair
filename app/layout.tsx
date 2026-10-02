import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, Italiana, Jost } from "next/font/google";
import { meta, neutral } from "@/data/brandPresentation";
import "./globals.css";

// Voz da apresentação (neutra, não pertence a nenhum conceito)
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

// Referências web aproximadas da tipografia do conceito Essência
// (usadas apenas nos exemplos da tela de tipografia).
const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: neutral.paper,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${italiana.variable} ${jost.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
