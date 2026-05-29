"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  Music2,
  HandHeart,
  Moon,
  Sunrise,
  Sparkles,
  BookOpen,
  Heart,
  Music,
  Radio,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Music2,
  HandHeart,
  Moon,
  Sunrise,
  Sparkles,
  BookOpen,
  Heart,
  Music,
  Radio,
};

const getIcon = (name: string) => {
  if (!name || name === "none") return null;
  return ICON_MAP[name] || null;
};

const DEFAULT_SLIDES = [
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
];

const SPEED = 32; // pixels/segundo - velocidad del auto-scroll

const today = new Date().toLocaleDateString("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function AdsCarousel() {
  const [slides, setSlides] = useState<typeof DEFAULT_SLIDES>(DEFAULT_SLIDES);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [halfWidth, setHalfWidth] = useState(0);

  // Cargar anuncios de localStorage si existen
  useEffect(() => {
    const savedSlides = localStorage.getItem("radio_navidad_slides");
    if (savedSlides) {
      try {
        setSlides(JSON.parse(savedSlides));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Medir ancho real (mitad porque duplicamos slides para loop infinito)
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setHalfWidth(trackRef.current.scrollWidth / 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [slides]); // Recalcular si cambian las slides

  useAnimationFrame((_, delta) => {
    if (paused || halfWidth === 0) return;
    const moveBy = (-SPEED * delta) / 1000;
    let next = x.get() + moveBy;
    // Wrap-around módulo para loop perfectamente infinito
    if (next <= -halfWidth) next += halfWidth;
    if (next > 0) next -= halfWidth;
    x.set(next);
  });

  const items = [...slides, ...slides];

  return (
    <div
      className="relative w-full select-none"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-label="Anuncios de Radio Navidad"
    >
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#07070b] via-[#07070b]/70 to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#07070b] via-[#07070b]/70 to-transparent md:w-16" />

      <div className="overflow-hidden py-3">
        <motion.div
          ref={trackRef}
          style={{ x, touchAction: "pan-y" }}
          drag="x"
          dragConstraints={
            halfWidth > 0
              ? { left: -halfWidth, right: 0 }
              : { left: 0, right: 0 }
          }
          dragElastic={0.08}
          dragTransition={{ power: 0.3, timeConstant: 200 }}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          className="flex gap-4 cursor-grab active:cursor-grabbing"
        >
          {items.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.div
                key={`${s.title}-${i}`}
                whileHover={{ scale: 1.025, y: -4 }}
                whileTap={{ scale: 0.96, y: 3 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative aspect-[16/9] w-[290px] shrink-0 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br ${s.gradient} shadow-glowSoft ring-1 ring-white/15 sm:w-[500px] md:w-[540px]`}
              >
                {/* Glow halo external */}
                <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-red/35 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Background Image */}
                {s.image && (
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Wave decorative pattern */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
                  viewBox="0 0 280 175"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0 90 Q70 50 140 90 T280 90"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M0 115 Q70 75 140 115 T280 115"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M0 140 Q70 100 140 140 T280 140"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>

                {/* Dark overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Shine sweep on hover */}
                <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                  {(Icon || s.tag) ? (
                    <div className="flex items-start justify-between">
                      {Icon ? (
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-sm ring-1 ring-white/25 backdrop-blur-md">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      ) : <div />}
                      {s.tag && (
                        <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                          {s.tag}
                        </span>
                      )}
                    </div>
                  ) : <div />}

                  {(s.title || s.subtitle) && (
                    <div>
                      {s.title && (
                        <h3 className="font-display text-xl font-bold leading-tight text-white drop-shadow-md sm:text-2xl md:text-3xl">
                          {s.title}
                        </h3>
                      )}
                      {s.subtitle && (
                        <p className="mt-1.5 text-xs text-white/85 sm:text-sm md:text-base">
                          {s.subtitle}
                        </p>
                      )}
                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/50 sm:text-xs">
                        {today}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Hint */}
      <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <span>Desliza para explorar</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-transparent" />
      </div>
    </div>
  );
}
