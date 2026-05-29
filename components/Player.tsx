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
  const [streamUrl, setStreamUrl] = useState(STREAM_URL);
  const [tracks, setTracks] = useState<Track[]>(ROTATING_TRACKS);

  const currentTrack = tracks[trackIndex] || { title: "Cargando...", artist: "Radio Navidad" };

  // Cargar configuraciones del localStorage al montar
  useEffect(() => {
    const savedStream = localStorage.getItem("radio_navidad_stream_url");
    const savedTracks = localStorage.getItem("radio_navidad_tracks");
    if (savedStream) setStreamUrl(savedStream);
    if (savedTracks) {
      try {
        setTracks(JSON.parse(savedTracks));
      } catch (e) {
        // Ignorar errores de parseo
      }
    }
  }, []);

  // Rotate fake "now playing" every 18s when playing
  useEffect(() => {
    if (!playing || tracks.length <= 1) return;
    const t = setInterval(() => {
      setTrackIndex((i) => (i + 1) % tracks.length);
    }, 18000);
    return () => clearInterval(t);
  }, [playing, tracks.length]);

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
      className="relative mx-auto w-full max-w-[340px] md:max-w-md lg:max-w-none"
    >
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        crossOrigin="anonymous"
      />

      {/* Glow halo */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-red/40 via-brand-redGlow/20 to-transparent blur-3xl" />

      <div className="glass-strong relative overflow-hidden rounded-[2rem] p-4 md:p-6 shadow-premium">
        {/* Live badge (Desktop only) */}
        <div className="hidden md:flex mb-4 items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            <span className="live-dot" />
            En Vivo
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/55">
            <span>FM 98.7</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Stream HD · 320kbps</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 md:gap-4 md:items-stretch">
          {/* Cover with equalizer overlay */}
          <div className="relative shrink-0">
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
              className="relative h-16 w-16 overflow-hidden rounded-xl ring-1 ring-white/15 md:h-28 md:w-28"
            >
              <Image
                src="/logo-radio-navidad.jpg"
                alt="Radio Navidad"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-redDark/30 via-transparent to-transparent" />
            </motion.div>
            {/* Equalizer (Desktop only) */}
            <div className="absolute -bottom-2 left-1/2 hidden md:flex h-8 -translate-x-1/2 items-end rounded-full bg-black/70 px-2.5 backdrop-blur">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <span
                  key={i}
                  className="eq-bar h-5"
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
          <div className="flex flex-1 flex-col justify-center md:justify-between min-w-0">
            <div className="text-left">
              <div className="flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-white">
                <span>Reproduciendo ahora</span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-redGlow animate-pulse md:hidden" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={trackIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-0.5 md:mt-1 min-w-0"
                >
                  <h3 className="font-display text-base md:text-xl font-bold text-white truncate">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/65 truncate">{currentTrack.artist}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Audio visualizer (Desktop only) */}
            <div className="hidden md:flex mt-3 h-6 items-end justify-start gap-0.5">
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

        {/* Large Controls (Desktop only) */}
        <div className="hidden md:flex mt-4 items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            onClick={togglePlay}
            disabled={loading}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-redGlow via-brand-red to-brand-redDark text-white shadow-glow md:h-16 md:w-16"
            aria-label={playing ? "Pausar" : "Reproducir"}
          >
            <span className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-red/40 blur-xl" />
            {playing && (
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-redGlow/40 opacity-75" />
            )}
            {loading ? (
              <span className="relative h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : playing ? (
              <Pause className="relative h-6 w-6 md:h-8 md:w-8" fill="currentColor" />
            ) : (
              <Play className="relative ml-0.5 h-6 w-6 md:h-8 md:w-8" fill="currentColor" />
            )}
          </motion.button>
        </div>

        {/* Bottom row: volume + mobile controls + desktop-only actions */}
        <div className="mt-3 md:mt-4 pt-3 md:pt-0 border-t border-white/5 md:border-none flex items-center w-full md:justify-between">
          
          {/* Column 1 (30%): Play button (mobile only) centered */}
          <div className="w-[30%] flex md:hidden items-center justify-center shrink-0">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={togglePlay}
              disabled={loading}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-redGlow via-brand-red to-brand-redDark text-white shadow-glow"
              aria-label={playing ? "Pausar" : "Reproducir"}
            >
              <span className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-red/40 blur-lg" />
              {playing && (
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-redGlow/40 opacity-75" />
              )}
              {loading ? (
                <span className="relative h-4 w-4 animate-spin rounded-full border border-white/40 border-t-white" />
              ) : playing ? (
                <Pause className="relative h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="relative ml-0.5 h-5 w-5" fill="currentColor" />
              )}
            </motion.button>
          </div>

          {/* Column 2 (70%): Volume slider (aligned left on mobile, normal flow on desktop) */}
          <div className="w-[70%] flex md:w-auto md:max-w-[240px] md:flex-1 items-center justify-start gap-2 min-w-0">
            <button
              onClick={() => setMuted(!muted)}
              className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Mute"
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-4.5 w-4.5 md:h-5 md:w-5" />
              ) : (
                <Volume2 className="h-4.5 w-4.5 md:h-5 md:w-5" />
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
              className="volume-slider flex-1 w-full min-w-0"
              aria-label="Volumen"
              style={{
                background: `linear-gradient(to right, #d90429 ${
                  (muted ? 0 : volume) * 100
                }%, rgba(255,255,255,0.15) ${(muted ? 0 : volume) * 100}%)`,
              }}
            />
          </div>

          {/* Desktop-only Actions (Heart & Share) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLiked(!liked)}
              className={`rounded-full p-2 transition ${
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
              className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
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
