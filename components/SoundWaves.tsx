"use client";

import { motion } from "framer-motion";

export default function SoundWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d6a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff4d6a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d90429" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[
          { d: "M0,450 Q400,300 800,450 T1600,450", color: "url(#waveGrad)", dur: 12 },
          { d: "M0,500 Q400,650 800,500 T1600,500", color: "url(#waveGrad2)", dur: 14 },
          { d: "M0,400 Q400,250 800,400 T1600,400", color: "url(#waveGrad)", dur: 16 },
          { d: "M0,550 Q400,700 800,550 T1600,550", color: "url(#waveGrad2)", dur: 18 },
        ].map((w, i) => (
          <motion.path
            key={i}
            d={w.d}
            stroke={w.color}
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              y: [0, -8, 0, 8, 0],
            }}
            transition={{
              pathLength: { duration: 2, delay: i * 0.3 },
              opacity: { duration: 1.2, delay: i * 0.3 },
              y: {
                duration: w.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              },
            }}
          />
        ))}
      </svg>

      {/* Radial pulse rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-red/20"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.6], opacity: [0.5, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
