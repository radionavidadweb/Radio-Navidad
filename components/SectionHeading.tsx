"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-redGlow">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
