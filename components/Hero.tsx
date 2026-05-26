"use client";

import { motion } from "framer-motion";
import { Play, CalendarDays, Sparkles } from "lucide-react";
import SoundWaves from "./SoundWaves";
import Particles from "./Particles";
import Player from "./Player";
import AdsCarousel from "./AdsCarousel";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20"
    >
      {/* Ambient background */}
      <div className="hero-aurora absolute inset-0 -z-20" />
      <div className="dot-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <SoundWaves />
      <Particles count={40} />

      {/* Glow blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-brand-red/30 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 top-60 -z-10 h-[460px] w-[460px] rounded-full bg-brand-redGlow/25 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* === LEFT COLUMN (7/12) — Text + CTAs + Carousel === */}
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
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
              className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              <span className="text-gradient-soft">Radio </span>
              <span className="text-gradient-red">Navidad</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl lg:mx-0"
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
              className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start lg:justify-start"
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

            {/* Stats compactos inline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-white/55 lg:justify-start"
            >
              <span className="inline-flex items-center gap-2">
                <span className="font-display text-base font-bold text-white">24/7</span>
                En vivo
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="inline-flex items-center gap-2">
                <span className="font-display text-base font-bold text-white">+500</span>
                Canciones
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="inline-flex items-center gap-2">
                <span className="font-display text-base font-bold text-white">HD</span>
                Streaming
              </span>
            </motion.div>

            {/* === Carrusel publicitario === */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="mt-10"
            >
              <AdsCarousel />
            </motion.div>
          </div>

          {/* === RIGHT COLUMN (5/12) — Player reducido === */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <Player />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"
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
