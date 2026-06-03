import { getConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Sitemap con namespace de imágenes (Google Image sitemap) para que las
// imágenes de los anuncios del carrusel sean descubiertas e indexadas.
export async function GET() {
  const config = await getConfig();

  const images = (config.slides ?? [])
    .filter((s) => s.image && s.image.startsWith("http"))
    .map((s) => {
      const caption = [s.title, s.subtitle, s.tag].filter(Boolean).join(" — ");
      return `    <image:image>
      <image:loc>${escapeXml(s.image)}</image:loc>
      <image:title>${escapeXml(s.title || s.tag || "Radio Navidad")}</image:title>${
        caption ? `\n      <image:caption>${escapeXml(caption)}</image:caption>` : ""
      }
    </image:image>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
${images}
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
