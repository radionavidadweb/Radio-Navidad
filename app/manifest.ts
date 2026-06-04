import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Radio Navidad",
    short_name: "Radio Navidad",
    description:
      "Emisora cristiana en vivo 24/7. Alabanza, adoración y esperanza.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070b",
    theme_color: "#d90429",
    orientation: "portrait",
    categories: ["music", "lifestyle"],
    lang: "es",
    icons: [
      {
        src: "/logo-radio-navidad.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/logo-radio-navidad.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/banner-radio-navidad.jpg",
        sizes: "800x450",
        type: "image/jpeg",
      },
    ],
  };
}
