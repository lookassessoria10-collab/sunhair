import type { Metadata, Viewport } from "next";
import { Italiana, Jost, Open_Sans } from "next/font/google";
import { meta, neutral } from "@/data/brandPresentation";
import "./globals.css";

// Voz da apresentação: uma única família, sem serifa, em pesos leves.
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Referências web aproximadas da tipografia da marca aprovada
// (Italiana nos títulos editoriais, Jost no texto de apoio).
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
      className={`${openSans.variable} ${italiana.variable} ${jost.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
