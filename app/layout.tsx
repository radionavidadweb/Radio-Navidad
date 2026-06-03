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
  title: {
    default: "Radio Navidad",
    template: "%s · Radio Navidad",
  },
  applicationName: "Radio Navidad",
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
  creator: "Radio Navidad",
  publisher: "Radio Navidad",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Radio Navidad",
    description:
      "Emisora cristiana en vivo 24/7. Alabanza, adoración y esperanza.",
    type: "website",
    locale: "es_ES",
    siteName: "Radio Navidad",
    url: "/",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    name: "Radio Navidad",
    url: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
    logo: "/logo-radio-navidad.jpg",
    image: "/banner-radio-navidad.jpg",
    description:
      "Emisora cristiana en vivo. Alabanza, adoración, reflexión y esperanza las 24 horas del día.",
    inLanguage: "es",
  };

  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
