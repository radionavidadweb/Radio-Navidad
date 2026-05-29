"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Lock, User, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Completá todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.reload();
      } else {
        setError(data.error || "Credenciales incorrectas.");
      }
    } catch {
      setError("Error de red. Intentá de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#07070b] px-5 py-12 text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial hero-aurora opacity-70" />
      <div className="pointer-events-none absolute -top-40 h-[600px] w-[600px] rounded-full bg-brand-red/15 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-glow">
            <Radio className="h-8 w-8 animate-pulse-soft" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
            Acceso <span className="text-gradient-red">Administrativo</span>
          </h1>
          <p className="mt-2 text-sm text-white/55">
            Ingresá las credenciales para gestionar Radio Navidad
          </p>
        </div>

        {/* Card Form */}
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-8 shadow-premium md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm text-brand-redGlow"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-xs font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Usuario
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/45">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-brand-red/50 focus:bg-white/[0.08]"
                  placeholder="Administrador"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/45">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-brand-red/50 focus:bg-white/[0.08]"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-redGlow via-brand-red to-brand-redDark py-4 text-sm font-bold text-white shadow-glow transition hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-xs font-medium text-white/40 transition hover:text-white"
          >
            ← Volver a la página principal
          </a>
        </div>
      </motion.div>
    </div>
  );
}
