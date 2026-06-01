"use client";

import { motion } from "framer-motion";
import { Music2, HandHeart, BookOpen, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: Music2,
    title: "Alabanza",
    text: "Cánticos que elevan el espíritu y celebran la fidelidad de Dios cada día.",
    color: "from-rose-500/30 to-brand-red/10",
  },
  {
    icon: HandHeart,
    title: "Adoración",
    text: "Una atmósfera de reverencia donde tu corazón se encuentra con Su presencia.",
    color: "from-brand-redGlow/30 to-rose-300/10",
  },
  {
    icon: BookOpen,
    title: "Reflexión",
    text: "Palabras, devocionales y mensajes que renuevan tu fe a cualquier hora.",
    color: "from-amber-400/25 to-brand-red/10",
  },
  {
    icon: Sparkles,
    title: "Esperanza",
    text: "Música que ilumina cada temporada, recordándote que no caminas solo.",
    color: "from-sky-400/25 to-brand-red/10",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Sobre la emisora"
          title={
            <>
              Música que toca el alma,{" "}
              <span className="text-gradient-red">temporada tras temporada</span>
            </>
          }
          subtitle="Radio Navidad es más que una emisora: es un refugio sonoro de paz y esperanza, transmitiendo lo mejor de la música cristiana las 24 horas del día."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:border-brand-red/30 hover:bg-white/[0.05] hover:shadow-glowSoft"
              >
                {/* Hover gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${f.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {f.text}
                </p>

                {/* Decorative wave */}
                <svg
                  className="absolute -bottom-2 -right-2 h-20 w-20 text-brand-red/10 transition-colors group-hover:text-brand-red/25"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    d="M0 70 Q25 40 50 70 T100 70"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M0 80 Q25 50 50 80 T100 80"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
