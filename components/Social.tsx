"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Youtube, Instagram } from "lucide-react";
import SectionHeading from "./SectionHeading";

const SOCIAL_METADATA: Record<string, {
  icon: any;
  gradient: string;
  border: string;
}> = {
  Facebook: {
    icon: Facebook,
    gradient: "from-blue-500/30 to-indigo-500/10",
    border: "hover:border-blue-400/50",
  },
  YouTube: {
    icon: Youtube,
    gradient: "from-rose-500/30 to-brand-red/10",
    border: "hover:border-rose-400/50",
  },
  Instagram: {
    icon: Instagram,
    gradient: "from-fuchsia-500/30 to-amber-400/10",
    border: "hover:border-fuchsia-400/50",
  },
  WhatsApp: {
    icon: null,
    gradient: "from-emerald-500/30 to-green-400/10",
    border: "hover:border-emerald-400/50",
  },
};

const DEFAULT_SOCIAL_CHANNELS = [
  {
    name: "Facebook",
    handle: "@christmasradio",
    href: "https://facebook.com/christmasradio",
    iconName: "Facebook",
  },
  {
    name: "YouTube",
    handle: "RadioNavidad",
    href: "https://youtube.com/@RadioNavidad",
    iconName: "YouTube",
  },
  {
    name: "Instagram",
    handle: "@radionavidad",
    href: "https://instagram.com/radionavidad",
    iconName: "Instagram",
  },
  {
    name: "WhatsApp",
    handle: "+1 (000) 000-0000",
    href: "https://wa.me/10000000000",
    iconName: "WhatsApp",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  );
}

export default function Social() {
  const [channels, setChannels] = useState<any[]>(DEFAULT_SOCIAL_CHANNELS);

  useEffect(() => {
    const saved = localStorage.getItem("radio_navidad_social_links");
    if (saved) {
      try {
        setChannels(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Conéctate"
          title={
            <>
              Mantente cerca de{" "}
              <span className="text-gradient-red">la familia Navidad</span>
            </>
          }
          subtitle="Síguenos en redes y comparte la palabra, la música y la esperanza con quienes amas."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => {
            const meta = SOCIAL_METADATA[c.iconName] || SOCIAL_METADATA["Facebook"];
            const Icon = meta.icon;
            return (
              <motion.a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 ${meta.border}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${meta.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 transition-transform group-hover:scale-110">
                  {Icon ? (
                    <Icon className="h-6 w-6" />
                  ) : (
                    <WhatsAppIcon className="h-6 w-6" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-white/65">{c.handle}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-redGlow opacity-80">
                  Seguir <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
