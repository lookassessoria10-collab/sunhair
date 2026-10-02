import type { Metadata, Viewport } from "next";
import { Italiana, Jost, Montserrat, Open_Sans } from "next/font/google";
import { meta, neutral } from "@/data/brandPresentation";
import "./globals.css";

// Voz da apresentação: uma única família, sem serifa, em pesos leves.
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Referências web aproximadas da tipografia do conceito Essência
// (usadas apenas na tela de tipografia desse conceito).
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

// Tipografia secundária indicada no brandboard Origem (texto do selo).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500"],
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
      className={`${openSans.variable} ${italiana.variable} ${jost.variable} ${montserrat.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
