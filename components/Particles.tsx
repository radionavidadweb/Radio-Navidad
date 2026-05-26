"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticleDef {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Particles({ count = 40 }: { count?: number }) {
  const [particles, setParticles] = useState<ParticleDef[]>([]);

  useEffect(() => {
    const generated: ParticleDef[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
