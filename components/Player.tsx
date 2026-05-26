"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Image from "next/image";

// Radio Navidad — stream oficial
const STREAM_URL = "https://castlive.stream/8200/stream";

interface Track {
  title: string;
  artist: string;
}

const ROTATING_TRACKS: Track[] = [
  { title: "Mil Mares de Amor", artist: "Marcos Witt" },
  { title: "Renuévame", artist: "Marcela Gándara" },
  { title: "Levanto Mis Manos", artist: "Jesús Adrián Romero" },
  { title: "Tu Presencia Es El Cielo", artist: "Christine D'Clario" },
  { title: "Aleluya (Tu Presencia)", artist: "Miel San Marcos" },
];

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const currentTrack = ROTATING_TRACKS[trackIndex];

  // Rotate fake "now playing" every 18s when playing
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setTrackIndex((i) => (i + 1) % ROTATING_TRACKS.length);
    }, 18000);
    return () => clearInterval(t);
  }, [playing]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        setLoading(true);
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      // ignore autoplay failures
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      id="player"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="none"
        crossOrigin="anonymous"
      />

      {/* Glow halo */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-red/40 via-brand-redGlow/20 to-transparent blur-3xl" />

      <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 shadow-premium md:p-8">
        {/* Live badge */}
        <div className="mb-5 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            <span className="live-dot" />
            En Vivo
          </div>
          <div className="hidden items-center gap-1.5 text-xs text-white/55 md:flex">
            <span>FM 98.7</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Stream HD · 320kbps</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
          {/* Cover with equalizer overlay */}
          <div className="relative">
            <motion.div
              animate={
                playing
                  ? { rotate: 360 }
                  : { rotate: 0 }
              }
              transition={{
                duration: 22,
                repeat: playing ? Infinity : 0,
                ease: "linear",
              }}
              className="relative h-32 w-32 overflow-hidden rounded-2xl ring-1 ring-white/15 md:h-36 md:w-36"
            >
              <Image
                src="/logo-radio-navidad.jpg"
                alt="Radio Navidad"
                fill
                sizes="144px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-redDark/30 via-transparent to-transparent" />
            </motion.div>
            {/* Equalizer */}
            <div className="absolute -bottom-3 left-1/2 flex h-9 -translate-x-1/2 items-end rounded-full bg-black/70 px-3 backdrop-blur">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <span
                  key={i}
                  className="eq-bar h-6"
                  style={{
                    animationDelay: `${i * 0.12}s`,
                    animationPlayState: playing ? "running" : "paused",
                    opacity: playing ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Track info + visualizer */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="text-center md:text-left">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-redGlow">
                Reproduciendo ahora
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={trackIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-1"
                >
                  <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                    {currentTrack.title}
                  </h3>
                  <p className="text-sm text-white/65">{currentTrack.artist}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Audio visualizer (decorative) */}
            <div className="mt-4 flex h-8 items-end justify-center gap-0.5 md:justify-start">
              {Array.from({ length: 32 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-brand-redDark via-brand-red to-brand-redGlow"
                  animate={
                    playing
                      ? {
                          height: [
                            `${Math.random() * 60 + 10}%`,
                            `${Math.random() * 90 + 10}%`,
                            `${Math.random() * 40 + 10}%`,
                          ],
                        }
                      : { height: "12%" }
                  }
                  transition={{
                    duration: 0.9 + Math.random() * 0.6,
                    repeat: playing ? Infinity : 0,
                    repeatType: "reverse",
                    delay: i * 0.04,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() =>
              setTrackIndex(
                (i) => (i - 1 + ROTATING_TRACKS.length) % ROTATING_TRACKS.length
              )
            }
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Anterior"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            onClick={togglePlay}
            disabled={loading}
            className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-redGlow via-brand-red to-brand-redDark text-white shadow-glow md:h-20 md:w-20"
            aria-label={playing ? "Pausar" : "Reproducir"}
          >
            <span className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-red/40 blur-xl" />
            {loading ? (
              <span className="relative h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : playing ? (
              <Pause className="relative h-7 w-7 md:h-9 md:w-9" fill="currentColor" />
            ) : (
              <Play className="relative ml-1 h-7 w-7 md:h-9 md:w-9" fill="currentColor" />
            )}
          </motion.button>

          <button
            onClick={() => setTrackIndex((i) => (i + 1) % ROTATING_TRACKS.length)}
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Siguiente"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom row: volume + actions */}
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex w-full max-w-[260px] items-center gap-3">
            <button
              onClick={() => setMuted(!muted)}
              className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Mute"
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setMuted(false);
              }}
              className="volume-slider flex-1"
              aria-label="Volumen"
              style={{
                background: `linear-gradient(to right, #d90429 ${
                  (muted ? 0 : volume) * 100
                }%, rgba(255,255,255,0.15) ${(muted ? 0 : volume) * 100}%)`,
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`rounded-full p-2.5 transition ${
                liked
                  ? "bg-brand-red/20 text-brand-redGlow"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Favorito"
            >
              <Heart
                className="h-5 w-5"
                fill={liked ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: "Radio Navidad",
                      text: "Escucha Radio Navidad — Música Cristiana en Vivo",
                      url: typeof window !== "undefined" ? window.location.href : "",
                    })
                    .catch(() => {});
                }
              }}
              className="rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Compartir"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
