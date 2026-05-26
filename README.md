# Radio Navidad — Landing Page Premium

Landing page moderna y emocional para una emisora cristiana, construida con
**Next.js 14 (App Router)**, **TailwindCSS**, **Framer Motion** y **Lucide React**.

> Música Cristiana en Cada Temporada · En vivo 24/7

---

## Características

- **Hero inmersivo** con aurora boreal, ondas musicales animadas, partículas
  flotantes y reproductor visible desde la primera pantalla.
- **Reproductor funcional** estilo Spotify: play/pause, control de volumen,
  visualizador animado, equalizer, badge "EN VIVO" pulsante, favorito y compartir.
- **Glassmorphism premium**, gradientes rojos corporativos, sombras suaves y
  microinteracciones en cada card.
- **Secciones completas**: Sobre la emisora (Alabanza · Adoración · Reflexión ·
  Esperanza), Programación 24h, Slider automático de versículos bíblicos,
  Redes sociales y Footer cristiano.
- **Responsive total** con menú hamburguesa moderno y mini-reproductor flotante
  al hacer scroll.
- **SEO listo** con metadatos OpenGraph y Twitter Card.

---

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 14 + App Router | Framework |
| TypeScript | Tipado |
| TailwindCSS 3 | Estilos utilitarios |
| Framer Motion | Animaciones premium |
| Lucide React | Iconografía |

---

## Instalación

Requisitos: **Node.js 18.17+** y **npm** (o pnpm / yarn).

```bash
# 1) Instalar dependencias
npm install

# 2) Modo desarrollo (http://localhost:3000)
npm run dev

# 3) Build para producción
npm run build
npm run start
```

---

## Estructura

```
app/
  layout.tsx          # Layout raíz + fuentes Inter / Space Grotesk + SEO
  page.tsx            # Composición de la landing
  globals.css         # Glassmorphism, gradientes, animaciones custom
components/
  Navbar.tsx          # Header fijo con menú hamburguesa y CTA
  Hero.tsx            # Hero + reproductor + banner integrado
  Player.tsx          # Reproductor funcional (audio stream)
  SoundWaves.tsx      # Ondas SVG animadas de fondo
  Particles.tsx       # Partículas brillantes flotantes
  About.tsx           # Tarjetas: Alabanza / Adoración / Reflexión / Esperanza
  Schedule.tsx        # Programación 24h en cards estilo streaming
  Verses.tsx          # Slider automático de versículos bíblicos
  Social.tsx          # Facebook / YouTube / Instagram / WhatsApp
  Footer.tsx          # Footer premium con frase cristiana
  MiniPlayer.tsx      # Reproductor flotante al hacer scroll
  SectionHeading.tsx  # Heading reutilizable con animación in-view
public/
  logo-radio-navidad.jpg     # Logo principal (cuadrado rojo)
  banner-radio-navidad.jpg   # Banner promocional con tagline
```

---

## Personalización rápida

### 1. Cambiar el stream de audio

Edita la constante `STREAM_URL` en [`components/Player.tsx`](components/Player.tsx):

```ts
const STREAM_URL = "https://castlive.stream/8200/stream"; // ya configurado
```

> Ya está configurado con el stream oficial de Radio Navidad:
> `https://castlive.stream/8200/stream`

### 2. Editar canciones rotativas

En el mismo archivo, modifica `ROTATING_TRACKS` para mostrar tu propio cartel.
Si más adelante conectas metadata real del stream, simplemente reemplaza el
estado por el feed (la mayoría de plataformas exponen `/status-json.xsl` o
`/api/nowplaying`).

### 3. Cambiar enlaces de redes sociales

En [`components/Social.tsx`](components/Social.tsx) hay un array `channels` con
URL y handle de cada red. También aparecen en `Navbar.tsx` para el botón CTA.

### 4. Programación

Edita `programs` en [`components/Schedule.tsx`](components/Schedule.tsx).

### 5. Versículos del slider

Edita `verses` en [`components/Verses.tsx`](components/Verses.tsx).

### 6. Paleta corporativa

Los colores están centralizados en
[`tailwind.config.ts`](tailwind.config.ts) bajo `colors.brand`:

```ts
brand: {
  red:     "#d90429",
  redDark: "#9d031d",
  redGlow: "#ff1f44",
  ...
}
```

---

## Notas técnicas

- Los autoplay de `<audio>` están bloqueados en la mayoría de navegadores hasta
  que el usuario interactúe — el botón Play del Hero satisface esa interacción.
- Las imágenes corporativas (`/public`) ya están optimizadas vía `next/image`
  (AVIF/WebP automático).
- El `MiniPlayer` aparece tras 900px de scroll y lleva al usuario de vuelta al
  reproductor principal con un click.

---

## Despliegue

Compatible directamente con **Vercel** (recomendado), Netlify, Cloudflare Pages
o cualquier hosting Node. Solo conecta el repositorio y `Build = npm run build`.

---

© Radio Navidad — *Música Cristiana en Cada Temporada*
