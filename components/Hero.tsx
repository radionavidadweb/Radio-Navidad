"use client";

import { motion } from "framer-motion";
import { Play, CalendarDays, Sparkles } from "lucide-react";
import Image from "next/image";
import SoundWaves from "./SoundWaves";
import Particles from "./Particles";
import Player from "./Player";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Ambient background */}
      <div className="hero-aurora absolute inset-0 -z-20" />
      <div className="dot-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <SoundWaves />
      <Particles count={40} />

      {/* Glow blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-brand-red/30 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 top-60 -z-10 h-[460px] w-[460px] rounded-full bg-brand-redGlow/25 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Left column — text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-redGlow" />
              Emisora cristiana premium · 24/7
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              <span className="text-gradient-soft">Radio </span>
              <span className="text-gradient-red">Navidad</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl lg:mx-0"
            >
              Música Cristiana en Cada Temporada.{" "}
              <span className="text-white/90">
                Una experiencia sonora de paz, esperanza y alabanza
              </span>{" "}
              transmitiendo en vivo, todos los días del año.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start lg:justify-start"
            >
              <a href="#player" className="btn-primary group">
                <Play className="h-5 w-5" fill="currentColor" />
                Escuchar En Vivo
              </a>
              <a href="#schedule" className="btn-ghost">
                <CalendarDays className="h-5 w-5" />
                Ver Programación
              </a>
            </motion.div>

            {/* Stats / trust */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-10 grid max-w-md grid-cols-3 gap-4 lg:mx-0"
            >
              {[
                { value: "24/7", label: "En vivo" },
                { value: "+500", label: "Canciones" },
                { value: "HD", label: "Streaming" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur"
                >
                  <div className="font-display text-2xl font-bold text-white">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/55">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Player */}
          <div className="relative">
            <Player />

            {/* Banner integrated subtly below the player */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-6 hidden overflow-hidden rounded-2xl border border-white/10 shadow-premium md:block"
            >
              <div className="relative aspect-[851/315]">
                <Image
                  src="/banner-radio-navidad.jpg"
                  alt="Radio Navidad - Música Cristiana en Cada Temporada"
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  );
}
