import type { Metadata } from "next";
import Script from "next/script";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans_Condensed,
  Space_Grotesk,
} from "next/font/google";
import { BackgroundTexture } from "@/components/layout/background-texture";

import "./globals.css";

const brandDisplay = IBM_Plex_Sans_Condensed({
  variable: "--font-brand-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const brandMono = IBM_Plex_Mono({
  variable: "--font-brand-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const brandSans = Space_Grotesk({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bryan Vélez — Desarrollo frontend y productos digitales",
  description:
    "Portafolio de Bryan Vélez: desarrollo frontend, sitios web, interfaces de producto y sistemas de diseño.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${brandSans.variable} ${brandDisplay.variable} ${brandMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body>
        <BackgroundTexture />
        {children}
      </body>
    </html>
  );
}
