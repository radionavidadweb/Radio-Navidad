import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#d90429",
          redDark: "#9d031d",
          redGlow: "#ff1f44",
          ink: "#0a0a0f",
          mist: "#f4f6fb",
          steel: "#1a1d29",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(217, 4, 41, 0.55)",
        glowSoft: "0 0 80px -20px rgba(217, 4, 41, 0.35)",
        premium: "0 30px 80px -30px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(217,4,41,0.35), transparent 60%)",
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "pulse-soft": "pulseSoft 3.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        wave: "wave 1.2s ease-in-out infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%,100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wave: {
          "0%,100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
