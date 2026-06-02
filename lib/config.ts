import "server-only";
import { Redis } from "@upstash/redis";

const CONFIG_KEY = "radio_navidad_config";

// Soporta tanto las variables que inyecta Vercel KV (KV_REST_API_*)
// como las de Upstash directo (UPSTASH_REDIS_REST_*)
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Cliente lazy: solo se crea si las variables de entorno existen.
// Así el build no falla si KV todavía no está configurado.
let _redis: Redis | null = null;
function getRedis(): Redis | null {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  if (!_redis) _redis = new Redis({ url: REDIS_URL, token: REDIS_TOKEN });
  return _redis;
}

export interface Slide {
  icon: string;
  title: string;
  subtitle: string;
  tag: string;
  gradient: string;
  image: string;
}
export interface Verse {
  text: string;
  ref: string;
}
export interface Program {
  icon: string;
  time: string;
  title: string;
  host: string;
  desc: string;
  tag: string;
}
export interface SocialChannel {
  name: string;
  handle: string;
  href: string;
  iconName: string;
}
export interface SiteConfig {
  streamUrl: string;
  slides: Slide[];
  verses: Verse[];
  schedule: Program[];
  social: SocialChannel[];
}

export const DEFAULT_CONFIG: SiteConfig = {
  streamUrl: "https://castlive.stream/8200/stream",
  slides: [
    {
      icon: "Music2",
      title: "Alabanza 24/7",
      subtitle: "Sin pausa, sin anuncios",
      tag: "En vivo",
      gradient: "from-brand-redDark via-brand-red to-rose-700",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: "HandHeart",
      title: "Adoración en Vivo",
      subtitle: "Domingos · 8:00 PM",
      tag: "Especial",
      gradient: "from-brand-red via-rose-600 to-pink-800",
      image: "",
    },
    {
      icon: "Moon",
      title: "Noches de Esperanza",
      subtitle: "Música suave + oración",
      tag: "Nightly",
      gradient: "from-indigo-900 via-brand-redDark to-brand-red",
      image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: "Sunrise",
      title: "Amanecer con Cristo",
      subtitle: "06:00 — 09:00 AM",
      tag: "Devocional",
      gradient: "from-amber-600 via-brand-red to-rose-800",
      image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: "Sparkles",
      title: "Especial Cristiano",
      subtitle: "Eventos exclusivos",
      tag: "Premium",
      gradient: "from-brand-redGlow via-brand-red to-brand-redDark",
      image: "",
    },
    {
      icon: "BookOpen",
      title: "Versículo del Día",
      subtitle: "Inspiración diaria",
      tag: "Palabra",
      gradient: "from-slate-800 via-brand-redDark to-brand-red",
      image: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: "Heart",
      title: "Familia Navidad",
      subtitle: "Únete a la comunidad",
      tag: "Conecta",
      gradient: "from-rose-600 via-brand-red to-rose-900",
      image: "",
    },
  ],
  verses: [
    { text: "El Señor es mi pastor, nada me faltará.", ref: "Salmos 23:1" },
    { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
    { text: "Cantad alegres a Dios, habitantes de toda la tierra.", ref: "Salmos 100:1" },
    { text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito.", ref: "Juan 3:16" },
    { text: "Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.", ref: "Josué 1:9" },
    { text: "En la casa de mi Padre muchas moradas hay.", ref: "Juan 14:2" },
  ],
  schedule: [
    {
      icon: "Sunrise",
      time: "06:00 — 09:00",
      title: "Amanecer con Cristo",
      host: "Pastora Carla Reyes",
      desc: "Devocional matutino, oración y alabanza para iniciar el día.",
      tag: "Devocional",
    },
    {
      icon: "Sun",
      time: "09:00 — 12:00",
      title: "Tiempo de Adoración",
      host: "Equipo Radio Navidad",
      desc: "Lo mejor de la música cristiana contemporánea sin interrupciones.",
      tag: "En vivo",
    },
    {
      icon: "Music",
      time: "12:00 — 15:00",
      title: "Mediodía de Esperanza",
      host: "DJ Esteban Cruz",
      desc: "Mensajes y testimonios reales que renuevan tu fe.",
      tag: "Mensaje",
    },
    {
      icon: "Mic",
      time: "15:00 — 18:00",
      title: "Voces que Inspiran",
      host: "Diana Montes",
      desc: "Entrevistas y reflexiones con líderes cristianos de la región.",
      tag: "Entrevista",
    },
    {
      icon: "Radio",
      time: "18:00 — 21:00",
      title: "Atardecer de Alabanza",
      host: "Equipo Radio Navidad",
      desc: "Una hora dorada de alabanza, agradecimiento y comunión.",
      tag: "Música",
    },
    {
      icon: "Moon",
      time: "21:00 — 00:00",
      title: "Noche de Paz",
      host: "Pastor Andrés Pérez",
      desc: "Música suave, oración y palabras para descansar en Su presencia.",
      tag: "Reflexión",
    },
  ],
  social: [
    { name: "Facebook", handle: "@christmasradio", href: "https://facebook.com/christmasradio", iconName: "Facebook" },
    { name: "YouTube", handle: "RadioNavidad", href: "https://youtube.com/@RadioNavidad", iconName: "YouTube" },
    { name: "Instagram", handle: "@radionavidad", href: "https://instagram.com/radionavidad", iconName: "Instagram" },
    { name: "WhatsApp", handle: "+1 (000) 000-0000", href: "https://wa.me/10000000000", iconName: "WhatsApp" },
  ],
};

// Lee la configuración desde KV y la combina con los valores por defecto.
// Si KV no está disponible o está vacío, devuelve los defaults.
export async function getConfig(): Promise<SiteConfig> {
  const redis = getRedis();
  if (!redis) return DEFAULT_CONFIG;
  try {
    const stored = await redis.get<Partial<SiteConfig>>(CONFIG_KEY);
    if (!stored) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...stored };
  } catch (err) {
    console.error("[config] Error al leer KV:", err);
    return DEFAULT_CONFIG;
  }
}

// Combina los campos provistos con la config actual y la persiste en KV.
export async function saveConfig(partial: Partial<SiteConfig>): Promise<SiteConfig> {
  const redis = getRedis();
  if (!redis) {
    throw new Error("KV no está configurado. Faltan las variables de entorno de Vercel KV / Upstash.");
  }
  const current = await getConfig();
  const merged = { ...current, ...partial };
  await redis.set(CONFIG_KEY, merged);
  return merged;
}
