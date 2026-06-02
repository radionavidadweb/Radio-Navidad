"use client";

import { motion } from "framer-motion";
import { Play, CalendarDays } from "lucide-react";
import SoundWaves from "./SoundWaves";
import Particles from "./Particles";
import Player from "./Player";
import AdsCarousel from "./AdsCarousel";
import type { Slide } from "@/lib/config";

interface HeroProps {
  streamUrl?: string;
  slides?: Slide[];
}

export default function Hero({ streamUrl, slides }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-20 pb-6 md:pt-24 md:pb-10"
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
          {/* === LEFT COLUMN (5/12) — Text === */}
          <div className="order-2 text-center lg:order-1 lg:col-span-5 lg:text-left">
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
              Desde noviembre hasta enero, Radio Navidad se viste de fiesta con los mejores éxitos navideños para celebrar esta época especial.{" "}
              <span className="text-white/90">
                Durante el resto del año, nos enfocamos en nutrir tu espíritu con la mejor música cristiana, acompañándote cada día con mensajes de fe y esperanza.
              </span>
            </motion.p>


          </div>

          {/* === RIGHT COLUMN (7/12) — Player más ancho === */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Player streamUrl={streamUrl} />
          </div>
        </div>
      </div>

      {/* === Banner: Publícitate con nosotros === */}
      <div className="mx-auto mt-5 max-w-7xl px-5 md:px-8">
        <a
          href="https://wa.me/13233385713"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 rounded-xl border border-brand-red/30 bg-white/5 px-4 py-2.5 backdrop-blur-sm transition hover:bg-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📣</span>
            <p className="text-sm font-semibold text-white">
              ¡Anúnciate en Radio Navidad a bajo costo!{" "}
              <span className="hidden font-normal text-white/60 sm:inline">
                Llega a nuestra audiencia cristiana · Reserva tu espacio
              </span>
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-1.5 text-sm font-bold text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </span>
        </a>
      </div>

      {/* === Carrusel publicitario de lado a lado === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.55 }}
        className="mt-6 w-full"
      >
        <AdsCarousel slides={slides} />
      </motion.div>

      {/* === Botones CTA debajo del carrusel === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mx-auto mt-6 flex flex-col items-center gap-3 px-5 sm:flex-row sm:justify-center sm:gap-4 md:px-8"
      >
        <button
          onClick={() => {
            document.getElementById("reproductor")?.scrollIntoView({ behavior: "smooth" });
            window.dispatchEvent(new CustomEvent("radio-play"));
          }}
          className="btn-primary group"
        >
          <Play className="h-5 w-5" fill="currentColor" />
          Escuchar En Vivo
        </button>
        <button
          onClick={() => document.getElementById("programacion")?.scrollIntoView({ behavior: "smooth" })}
          className="btn-ghost"
        >
          <CalendarDays className="h-5 w-5" />
          Ver Programación
        </button>
      </motion.div>

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
