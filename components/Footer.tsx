"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-transparent via-black/30 to-black">
      {/* Glow background */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-[80%] -translate-x-1/2 bg-brand-red/20 blur-[120px]" />

      {/* Decorative wave line */}
      <svg
        className="absolute inset-x-0 top-0 w-full opacity-30"
        viewBox="0 0 1600 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 Q200 0 400 40 T800 40 T1200 40 T1600 40"
          fill="none"
          stroke="url(#footerGrad)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d90429" stopOpacity="0" />
            <stop offset="50%" stopColor="#d90429" stopOpacity="1" />
            <stop offset="100%" stopColor="#d90429" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 md:grid-cols-3"
        >
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-brand-red/40 shadow-glow">
                <Image
                  src="/logo-radio-navidad.jpg"
                  alt="Radio Navidad"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-display text-xl font-bold">
                  Radio <span className="text-gradient-red">Navidad</span>
                </div>
                <div className="text-xs text-white/55">
                  Música Cristiana en Cada Temporada
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Un espacio para que tu corazón descanse, adore y se llene de
              esperanza, todos los días del año.
            </p>
          </div>

          {/* Christian phrase */}
          <div className="flex flex-col justify-center text-center">
            <p className="font-display text-lg italic leading-relaxed text-white/85 md:text-xl">
              “Cantad alegres a Dios, habitantes de toda la tierra.”
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-redGlow">
              Salmos 100:1
            </p>
          </div>

          {/* Links */}
          <div className="text-sm text-white/65 md:text-right">
            <div className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Navegación
            </div>
            <ul className="mt-4 space-y-2">
              {[
                { l: "Inicio", h: "#hero" },
                { l: "Sobre nosotros", h: "#about" },
                { l: "Programación", h: "#schedule" },
                { l: "Versículos", h: "#verses" },
                { l: "Contacto", h: "#social" },
              ].map((it) => (
                <li key={it.h}>
                  <a
                    href={it.h}
                    className="transition-colors hover:text-brand-redGlow"
                  >
                    {it.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/45 md:flex-row">
          <p>
            © {new Date().getFullYear()} Radio Navidad. Todos los derechos
            reservados.
          </p>
          <p className="flex items-center gap-1.5">
            Hecho con <Heart className="h-3.5 w-3.5 text-brand-red" fill="currentColor" />{" "}
            para glorificar Su nombre.
          </p>
        </div>
      </div>
    </footer>
  );
}
