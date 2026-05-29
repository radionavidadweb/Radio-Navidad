import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#d90429",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  ),
  title: "Radio Navidad · Música Cristiana en Cada Temporada",
  description:
    "Radio Navidad — Emisora cristiana en vivo. Alabanza, adoración, reflexión y esperanza las 24 horas del día. Música cristiana premium para tu corazón.",
  keywords: [
    "radio cristiana",
    "radio navidad",
    "música cristiana",
    "alabanza",
    "adoración",
    "emisora cristiana online",
    "radio en vivo",
  ],
  authors: [{ name: "Radio Navidad" }],
  openGraph: {
    title: "Radio Navidad · Música Cristiana en Cada Temporada",
    description:
      "Emisora cristiana en vivo 24/7. Alabanza, adoración y esperanza.",
    type: "website",
    locale: "es_ES",
    images: ["/banner-radio-navidad.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radio Navidad",
    description: "Música Cristiana en Cada Temporada — En vivo 24/7",
    images: ["/banner-radio-navidad.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
