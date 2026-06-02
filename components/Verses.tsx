"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

const verses = [
  {
    text: "El Señor es mi pastor, nada me faltará.",
    ref: "Salmos 23:1",
  },
  {
    text: "Todo lo puedo en Cristo que me fortalece.",
    ref: "Filipenses 4:13",
  },
  {
    text: "Cantad alegres a Dios, habitantes de toda la tierra.",
    ref: "Salmos 100:1",
  },
  {
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito.",
    ref: "Juan 3:16",
  },
  {
    text: "Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
    ref: "Josué 1:9",
  },
  {
    text: "En la casa de mi Padre muchas moradas hay.",
    ref: "Juan 14:2",
  },
];

interface VersesProps {
  verses?: typeof verses;
}

export default function Verses({ verses: versesProp }: VersesProps) {
  const verseList = versesProp && versesProp.length > 0 ? versesProp : verses;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (verseList.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % verseList.length);
    }, 6000);
    return () => clearInterval(t);
  }, [verseList.length]);

  const currentVerse = verseList[index] || { text: "El Señor es mi pastor, nada me faltará.", ref: "Salmos 23:1" };

  return (
    <section id="versiculos" className="relative overflow-hidden py-24 md:py-32">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/3 -z-10 h-72 w-72 rounded-full bg-brand-red/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-brand-redGlow/15 blur-[100px]" />

      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Palabra inspiradora"
          title={
            <>
              Versículos que{" "}
              <span className="text-gradient-red">renuevan tu fe</span>
            </>
          }
        />

        <div className="relative mt-14">
          <div className="glass-strong relative mx-auto overflow-hidden rounded-[2rem] p-10 text-center shadow-premium md:p-16">
            <Quote
              className="mx-auto h-10 w-10 text-brand-redGlow/70"
              strokeWidth={1.5}
            />

            <div className="relative mx-auto mt-6 min-h-[160px] max-w-3xl md:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="font-display text-2xl font-medium leading-snug text-white md:text-3xl lg:text-4xl">
                    “{currentVerse.text}”
                  </p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-brand-redGlow">
                    {currentVerse.ref}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="mt-10 flex justify-center gap-2">
              {verseList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Versículo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-brand-red"
                      : "w-1.5 bg-white/25 hover:bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
