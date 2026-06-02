"use client";

import { motion } from "framer-motion";
import { Sun, Sunrise, Moon, Mic, Radio, Music } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sunrise,
  Sun,
  Music,
  Mic,
  Radio,
  Moon,
};

const programs = [
  {
    icon: Sunrise,
    time: "06:00 — 09:00",
    title: "Amanecer con Cristo",
    host: "Pastora Carla Reyes",
    desc: "Devocional matutino, oración y alabanza para iniciar el día.",
    tag: "Devocional",
  },
  {
    icon: Sun,
    time: "09:00 — 12:00",
    title: "Tiempo de Adoración",
    host: "Equipo Radio Navidad",
    desc: "Lo mejor de la música cristiana contemporánea sin interrupciones.",
    tag: "En vivo",
  },
  {
    icon: Music,
    time: "12:00 — 15:00",
    title: "Mediodía de Esperanza",
    host: "DJ Esteban Cruz",
    desc: "Mensajes y testimonios reales que renuevan tu fe.",
    tag: "Mensaje",
  },
  {
    icon: Mic,
    time: "15:00 — 18:00",
    title: "Voces que Inspiran",
    host: "Diana Montes",
    desc: "Entrevistas y reflexiones con líderes cristianos de la región.",
    tag: "Entrevista",
  },
  {
    icon: Radio,
    time: "18:00 — 21:00",
    title: "Atardecer de Alabanza",
    host: "Equipo Radio Navidad",
    desc: "Una hora dorada de alabanza, agradecimiento y comunión.",
    tag: "Música",
  },
  {
    icon: Moon,
    time: "21:00 — 00:00",
    title: "Noche de Paz",
    host: "Pastor Andrés Pérez",
    desc: "Música suave, oración y palabras para descansar en Su presencia.",
    tag: "Reflexión",
  },
];

interface ScheduleProps {
  programs?: any[];
}

export default function Schedule({ programs: programsProp }: ScheduleProps) {
  const scheduleList = programsProp && programsProp.length > 0 ? programsProp : programs;

  return (
    <section id="programacion" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Programación"
          title={
            <>
              Acompañándote{" "}
              <span className="text-gradient-red">a toda hora</span>
            </>
          }
          subtitle="Una grilla pensada para que cada momento del día tenga música, oración y propósito."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {scheduleList.map((p, i) => {
            const Icon = typeof p.icon === "string" ? (ICON_MAP[p.icon] || Radio) : p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-xl transition-all duration-500 hover:border-brand-red/30 hover:shadow-glowSoft"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red/90 to-brand-redDark text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
                    {p.tag}
                  </span>
                </div>

                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-redGlow">
                  {p.time}
                </div>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs text-white/55">con {p.host}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {p.desc}
                </p>

                {/* Listen now indicator (decorative) */}
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-end gap-0.5">
                    {[3, 5, 7, 4, 6].map((h, idx) => (
                      <span
                        key={idx}
                        className="block w-0.5 rounded-full bg-gradient-to-t from-brand-redDark to-brand-redGlow opacity-50 transition-opacity group-hover:opacity-100"
                        style={{ height: `${h * 2}px` }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => document.getElementById("reproductor")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-[11px] font-semibold uppercase tracking-wider text-white/55 transition-colors group-hover:text-brand-redGlow"
                  >
                    Escuchar →
                  </button>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-x-10 -bottom-10 -z-10 h-40 bg-gradient-to-t from-brand-red/0 to-transparent opacity-0 transition-opacity group-hover:from-brand-red/20 group-hover:opacity-100" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
