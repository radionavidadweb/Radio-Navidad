"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Radio } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Programación", href: "#programacion" },
  { label: "Versículos", href: "#versiculos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-brand-red/40 shadow-glow transition-transform group-hover:scale-105">
            <Image
              src="/logo-radio-navidad.jpg"
              alt="Radio Navidad"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">
              Radio <span className="text-gradient-red">Navidad</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/60">
              <span className="live-dot" /> En Vivo
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => {
            document.getElementById("reproductor")?.scrollIntoView({ behavior: "smooth" });
            window.dispatchEvent(new CustomEvent("radio-play"));
          }}
          className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand-redGlow to-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:scale-[1.03] md:inline-flex"
        >
          <Radio className="h-4 w-4" />
          Escuchar Ahora
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white backdrop-blur md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
          >
            <div className="mx-4 mb-3 rounded-3xl glass-strong p-5">
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#reproductor"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-redGlow to-brand-red px-5 py-3 text-sm font-semibold text-white shadow-glow"
              >
                <Radio className="h-4 w-4" /> Escuchar En Vivo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
