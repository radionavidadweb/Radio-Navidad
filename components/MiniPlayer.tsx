"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function MiniPlayer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#player"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full glass-strong px-4 py-3 shadow-premium ring-1 ring-white/15 backdrop-blur-2xl"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-red" />
          </span>
          <div className="hidden text-left sm:block">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-redGlow">
              En vivo
            </div>
            <div className="text-xs font-medium text-white">Radio Navidad</div>
          </div>
          <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-redGlow to-brand-redDark text-white shadow-glow">
            <ArrowUp className="h-4 w-4" />
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
