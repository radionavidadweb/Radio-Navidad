"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Music,
  BookOpen,
  Calendar,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Volume2,
  AlertCircle,
  FileEdit,
  Sparkles,
  Share2,
  Menu,
} from "lucide-react";

// Valores por defecto para inicializar localStorage si no existen
const DEFAULT_STREAM_URL = "https://castlive.stream/8200/stream";

const DEFAULT_SLIDES = [
  {
    icon: "Music2",
    title: "Alabanza 24/7",
    subtitle: "Sin pausa, sin anuncios",
    tag: "En vivo",
    gradient: "from-brand-redDark via-brand-red to-rose-700",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "HandHeart",
    title: "Adoración en Vivo",
    subtitle: "Domingos · 8:00 PM",
    tag: "Especial",
    gradient: "from-brand-red via-rose-600 to-pink-800",
    image: "",
  },
  {
    icon: "Moon",
    title: "Noches de Esperanza",
    subtitle: "Música suave + oración",
    tag: "Nightly",
    gradient: "from-indigo-900 via-brand-redDark to-brand-red",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "Sunrise",
    title: "Amanecer con Cristo",
    subtitle: "06:00 — 09:00 AM",
    tag: "Devocional",
    gradient: "from-amber-600 via-brand-red to-rose-800",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "Sparkles",
    title: "Especial Cristiano",
    subtitle: "Eventos exclusivos",
    tag: "Premium",
    gradient: "from-brand-redGlow via-brand-red to-brand-redDark",
    image: "",
  },
  {
    icon: "BookOpen",
    title: "Versículo del Día",
    subtitle: "Inspiración diaria",
    tag: "Palabra",
    gradient: "from-slate-800 via-brand-redDark to-brand-red",
    image: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "Heart",
    title: "Familia Navidad",
    subtitle: "Únete a la comunidad",
    tag: "Conecta",
    gradient: "from-rose-600 via-brand-red to-rose-900",
    image: "",
  },
];

const DEFAULT_VERSES = [
  { text: "El Señor es mi pastor, nada me faltará.", ref: "Salmos 23:1" },
  { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
  { text: "Cantad alegres a Dios, habitantes de toda la tierra.", ref: "Salmos 100:1" },
  { text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito.", ref: "Juan 3:16" },
  { text: "Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.", ref: "Josué 1:9" },
  { text: "En la casa de mi Padre muchas moradas hay.", ref: "Juan 14:2" },
];

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

const DEFAULT_PROGRAMS = [
  {
    icon: "Sunrise",
    time: "06:00 — 09:00",
    title: "Amanecer con Cristo",
    host: "Pastora Carla Reyes",
    desc: "Devocional matutino, oración y alabanza para iniciar el día.",
    tag: "Devocional",
  },
  {
    icon: "Sun",
    time: "09:00 — 12:00",
    title: "Tiempo de Adoración",
    host: "Equipo Radio Navidad",
    desc: "Lo mejor de la música cristiana contemporánea sin interrupciones.",
    tag: "En vivo",
  },
  {
    icon: "Music",
    time: "12:00 — 15:00",
    title: "Mediodía de Esperanza",
    host: "DJ Esteban Cruz",
    desc: "Mensajes y testimonios reales que renuevan tu fe.",
    tag: "Mensaje",
  },
  {
    icon: "Mic",
    time: "15:00 — 18:00",
    title: "Voces que Inspiran",
    host: "Diana Montes",
    desc: "Entrevistas y reflexiones con líderes cristianos de la región.",
    tag: "Entrevista",
  },
  {
    icon: "Radio",
    time: "18:00 — 21:00",
    title: "Atardecer de Alabanza",
    host: "Equipo Radio Navidad",
    desc: "Una hora dorada de alabanza, agradecimiento y comunión.",
    tag: "Música",
  },
  {
    icon: "Moon",
    time: "21:00 — 00:00",
    title: "Noche de Paz",
    host: "Pastor Andrés Pérez",
    desc: "Música suave, oración y palabras para descansar en Su presencia.",
    tag: "Reflexión",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"general" | "slides" | "verses" | "programs" | "social">("general");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [streamUrl, setStreamUrl] = useState("");
  const [slides, setSlides] = useState<typeof DEFAULT_SLIDES>([]);
  const [verses, setVerses] = useState<typeof DEFAULT_VERSES>([]);
  const [programs, setPrograms] = useState<typeof DEFAULT_PROGRAMS>([]);
  const [socials, setSocials] = useState<any[]>([]);
  
  // Estados para creación/edición
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // Slide inputs
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideTag, setSlideTag] = useState("");
  const [slideIcon, setSlideIcon] = useState("Music2");
  const [slideGradient, setSlideGradient] = useState("from-brand-redDark via-brand-red to-rose-700");
  const [slideImage, setSlideImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Verse inputs
  const [verseText, setVerseText] = useState("");
  const [verseRef, setVerseRef] = useState("");

  // Program inputs
  const [progTitle, setProgTitle] = useState("");
  const [progTime, setProgTime] = useState("");
  const [progHost, setProgHost] = useState("");
  const [progDesc, setProgDesc] = useState("");
  const [progTag, setProgTag] = useState("");
  const [progIcon, setProgIcon] = useState("Radio");

  const [notif, setNotif] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Evitar hydration errors
  useEffect(() => {
    setMounted(true);
    
    // Cargar datos de localStorage o inicializar por defecto
    const savedStream = localStorage.getItem("radio_navidad_stream_url") || DEFAULT_STREAM_URL;
    const savedSlides = localStorage.getItem("radio_navidad_slides");
    const savedVerses = localStorage.getItem("radio_navidad_verses");
    const savedPrograms = localStorage.getItem("radio_navidad_schedule");
    const savedSocials = localStorage.getItem("radio_navidad_social_links");

    setStreamUrl(savedStream);
    setSlides(savedSlides ? JSON.parse(savedSlides) : DEFAULT_SLIDES);
    setVerses(savedVerses ? JSON.parse(savedVerses) : DEFAULT_VERSES);
    setPrograms(savedPrograms ? JSON.parse(savedPrograms) : DEFAULT_PROGRAMS);

    if (savedSocials) {
      try {
        setSocials(JSON.parse(savedSocials));
      } catch (e) {
        setSocials(DEFAULT_SOCIAL_CHANNELS);
      }
    } else {
      setSocials(DEFAULT_SOCIAL_CHANNELS);
    }
  }, []);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotif({ text, type });
    setTimeout(() => setNotif(null), 3000);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        window.location.reload();
      }
    } catch {
      showNotification("Error al cerrar sesión", "error");
    }
  };

  // Guardar configuración general y redes sociales
  const saveGeneral = () => {
    localStorage.setItem("radio_navidad_stream_url", streamUrl);
    localStorage.setItem("radio_navidad_social_links", JSON.stringify(socials));
    showNotification("Configuración general y redes sociales guardadas");
  };

  // Sube la imagen a Cloudinary directamente desde el navegador (sin backend)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!ALLOWED.includes(file.type)) {
      showNotification("Formato no soportado. Usá PNG, JPG, WEBP o GIF", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification("La imagen supera 5 MB. Usá una imagen más liviana", "error");
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      showNotification("Variables de Cloudinary no configuradas. Reiniciá el servidor.", "error");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
    xhr.timeout = 120000; // 2 minutos

    // Progreso real de la subida
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          setSlideImage(data.secure_url);
          showNotification("Imagen subida a Cloudinary con éxito ✓");
        } catch {
          showNotification("Respuesta inválida de Cloudinary", "error");
        }
      } else {
        let msg = "Error al subir la imagen";
        try {
          msg = JSON.parse(xhr.responseText)?.error?.message || msg;
        } catch {}
        showNotification(msg, "error");
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      showNotification("Error de red al conectar con Cloudinary. Verificá tu conexión.", "error");
    };

    xhr.ontimeout = () => {
      setUploading(false);
      showNotification("Tiempo de espera agotado (2 min). Verificá tu conexión.", "error");
    };

    xhr.send(formData);
  };

  // Quita la imagen del formulario (se guarda en localStorage, no hay archivo en servidor)
  const removeUploadedImage = () => {
    setSlideImage("");
  };

  // Acciones para Anuncios (Slides)
  const addOrUpdateSlide = () => {
    if (!slideTitle && !slideImage) {
      showNotification("Ingresá al menos un título o subí una imagen para crear el anuncio", "error");
      return;
    }
    const updated = [...slides];
    const newSlide = {
      icon: slideIcon,
      title: slideTitle,
      subtitle: slideSubtitle,
      tag: slideTag,
      gradient: slideGradient,
      image: slideImage,
    };
    if (editingIndex !== null) {
      updated[editingIndex] = newSlide;
      setEditingIndex(null);
      showNotification("Anuncio actualizado");
    } else {
      if (slides.length >= 7) {
        showNotification("El carrusel soporta máximo 7 anuncios", "error");
        return;
      }
      updated.push(newSlide);
      showNotification("Anuncio agregado");
    }
    setSlides(updated);
    localStorage.setItem("radio_navidad_slides", JSON.stringify(updated));
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideTag("");
    setSlideIcon("Music2");
    setSlideGradient("from-brand-redDark via-brand-red to-rose-700");
    setSlideImage("");
  };

  const deleteSlide = (idx: number) => {
    const updated = slides.filter((_, i) => i !== idx);
    setSlides(updated);
    localStorage.setItem("radio_navidad_slides", JSON.stringify(updated));
    showNotification("Anuncio eliminado");
  };

  const editSlide = (idx: number) => {
    setEditingIndex(idx);
    setSlideTitle(slides[idx].title);
    setSlideSubtitle(slides[idx].subtitle);
    setSlideTag(slides[idx].tag);
    setSlideIcon(slides[idx].icon);
    setSlideGradient(slides[idx].gradient);
    setSlideImage(slides[idx].image || "");
  };

  // Acciones para Versículos
  const addOrUpdateVerse = () => {
    if (!verseText || !verseRef) {
      showNotification("Completá todos los campos", "error");
      return;
    }
    const updated = [...verses];
    if (editingIndex !== null) {
      updated[editingIndex] = { text: verseText, ref: verseRef };
      setEditingIndex(null);
      showNotification("Versículo actualizado");
    } else {
      updated.push({ text: verseText, ref: verseRef });
      showNotification("Versículo agregado");
    }
    setVerses(updated);
    localStorage.setItem("radio_navidad_verses", JSON.stringify(updated));
    setVerseText("");
    setVerseRef("");
  };

  const deleteVerse = (idx: number) => {
    const updated = verses.filter((_, i) => i !== idx);
    setVerses(updated);
    localStorage.setItem("radio_navidad_verses", JSON.stringify(updated));
    showNotification("Versículo eliminado");
  };

  const editVerse = (idx: number) => {
    setEditingIndex(idx);
    setVerseText(verses[idx].text);
    setVerseRef(verses[idx].ref);
  };

  // Acciones para Programas
  const addOrUpdateProgram = () => {
    if (!progTitle || !progTime || !progHost || !progDesc || !progTag) {
      showNotification("Completá todos los campos", "error");
      return;
    }
    const updated = [...programs];
    const newProg = {
      title: progTitle,
      time: progTime,
      host: progHost,
      desc: progDesc,
      tag: progTag,
      icon: progIcon,
    };
    if (editingIndex !== null) {
      updated[editingIndex] = newProg;
      setEditingIndex(null);
      showNotification("Programa actualizado");
    } else {
      updated.push(newProg);
      showNotification("Programa agregado");
    }
    setPrograms(updated);
    localStorage.setItem("radio_navidad_schedule", JSON.stringify(updated));
    // Resetear inputs
    setProgTitle("");
    setProgTime("");
    setProgHost("");
    setProgDesc("");
    setProgTag("");
    setProgIcon("Radio");
  };

  const deleteProgram = (idx: number) => {
    const updated = programs.filter((_, i) => i !== idx);
    setPrograms(updated);
    localStorage.setItem("radio_navidad_schedule", JSON.stringify(updated));
    showNotification("Programa eliminado");
  };

  const editProgram = (idx: number) => {
    setEditingIndex(idx);
    setProgTitle(programs[idx].title);
    setProgTime(programs[idx].time);
    setProgHost(programs[idx].host);
    setProgDesc(programs[idx].desc);
    setProgTag(programs[idx].tag);
    setProgIcon(programs[idx].icon || "Radio");
  };

  const resetForm = () => {
    setEditingIndex(null);
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideTag("");
    setSlideIcon("Music2");
    setSlideGradient("from-brand-redDark via-brand-red to-rose-700");
    setSlideImage("");
    setVerseText("");
    setVerseRef("");
    setProgTitle("");
    setProgTime("");
    setProgHost("");
    setProgDesc("");
    setProgTag("");
    setProgIcon("Radio");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#07070b] text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -inset-0 -z-10 bg-radial bg-gradient-to-br from-brand-red/10 via-transparent to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand-redDark/5 blur-[120px]" />

      <header className="border-b border-white/10 bg-black/30 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-glow">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight">
                Panel <span className="text-gradient-red">Administrativo</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Radio Navidad</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold transition hover:bg-white/10 md:inline-block"
            >
              Ir a la Web
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-brand-red/20 border border-brand-red/30 px-4 py-1.5 text-xs font-semibold text-brand-redGlow transition hover:bg-brand-red/35"
            >
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        {/* Notification Toast */}
        {notif && (
          <div
            className={`fixed right-5 top-20 z-50 flex items-center gap-2.5 rounded-2xl border px-4 py-3 shadow-premium backdrop-blur-md ${
              notif.type === "success"
                ? "border-green-500/30 bg-green-950/40 text-green-300"
                : "border-brand-red/30 bg-red-950/40 text-brand-redGlow"
            }`}
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs font-medium">{notif.text}</span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none transition hover:bg-white/[0.08]"
            >
              <div className="flex items-center gap-3">
                {activeTab === "general" && <Volume2 className="h-4.5 w-4.5 text-brand-redGlow" />}
                {activeTab === "slides" && <Sparkles className="h-4.5 w-4.5 text-brand-redGlow" />}
                {activeTab === "verses" && <BookOpen className="h-4.5 w-4.5 text-brand-redGlow" />}
                {activeTab === "programs" && <Calendar className="h-4.5 w-4.5 text-brand-redGlow" />}
                <span className="font-semibold capitalize">
                  {activeTab === "general" && "General (Stream y Redes)"}
                  {activeTab === "slides" && "Anuncios (Slider)"}
                  {activeTab === "verses" && "Versículos Bíblicos"}
                  {activeTab === "programs" && "Programación"}
                </span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/80">
                <Menu className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Drawer menu overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                />

                {/* Sidebar drawer content sliding left-to-right */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0f] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-glow">
                          <Radio className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h2 className="font-display text-sm font-bold text-white">Navegación</h2>
                          <p className="text-[9px] uppercase tracking-widest text-white/55">Admin Panel</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setActiveTab("general");
                          setIsMenuOpen(false);
                          resetForm();
                        }}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                          activeTab === "general"
                            ? "bg-brand-red text-white shadow-glow"
                            : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
                        }`}
                      >
                        <Volume2 className="h-4 w-4" />
                        General (Stream y Redes)
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("slides");
                          setIsMenuOpen(false);
                          resetForm();
                        }}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                          activeTab === "slides"
                            ? "bg-brand-red text-white shadow-glow"
                            : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                        Anuncios (Slider)
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("verses");
                          setIsMenuOpen(false);
                          resetForm();
                        }}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                          activeTab === "verses"
                            ? "bg-brand-red text-white shadow-glow"
                            : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
                        }`}
                      >
                        <BookOpen className="h-4 w-4" />
                        Versículos Bíblicos
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("programs");
                          setIsMenuOpen(false);
                          resetForm();
                        }}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                          activeTab === "programs"
                            ? "bg-brand-red text-white shadow-glow"
                            : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
                        }`}
                      >
                        <Calendar className="h-4 w-4" />
                        Programación
                      </button>
                    </nav>
                  </div>

                  {/* Bottom drawer section */}
                  <div className="border-t border-white/5 pt-4">
                    <a
                      href="/"
                      className="flex items-center justify-center gap-2 w-full rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                      Ir a la Web principal
                    </a>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Sidebar Navigation */}
          <aside className="hidden lg:flex lg:flex-col gap-2">
            <button
              onClick={() => { setActiveTab("general"); resetForm(); }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all shrink-0 ${
                activeTab === "general"
                  ? "bg-brand-red text-white shadow-glow"
                  : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              General (Stream)
            </button>
            <button
              onClick={() => { setActiveTab("slides"); resetForm(); }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all shrink-0 ${
                activeTab === "slides"
                  ? "bg-brand-red text-white shadow-glow"
                  : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Anuncios (Slider)
            </button>
            <button
              onClick={() => { setActiveTab("verses"); resetForm(); }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all shrink-0 ${
                activeTab === "verses"
                  ? "bg-brand-red text-white shadow-glow"
                  : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Versículos Bíblicos
            </button>
            <button
              onClick={() => { setActiveTab("programs"); resetForm(); }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all shrink-0 ${
                activeTab === "programs"
                  ? "bg-brand-red text-white shadow-glow"
                  : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
              }`}
            >
              <Calendar className="h-4 w-4" />
              Programación
            </button>
          </aside>

          {/* Configuration Panel */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 sm:p-6 md:p-8 backdrop-blur-xl">
            
            {/* TAB GENERAL */}
            {activeTab === "general" && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-xl font-bold">Configuración de Audio</h2>
                    <p className="text-sm text-white/55">Ajustá la URL de transmisión directa de la radio.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-brand-redGlow">URL del Stream (Icecast / Shoutcast)</label>
                    <input
                      type="url"
                      value={streamUrl}
                      onChange={(e) => setStreamUrl(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none focus:border-brand-red/50 focus:bg-white/[0.08]"
                      placeholder="https://servidor.com/stream"
                    />
                  </div>
                </div>

                <hr className="border-white/10" />

                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-xl font-bold">Configuración de Redes Sociales</h2>
                    <p className="text-sm text-white/55">Modificá los enlaces y nombres de usuario de las redes sociales oficiales.</p>
                  </div>

                  <div className="space-y-6 bg-white/[0.01] border border-white/5 rounded-[1.5rem] p-5">
                    {socials.map((s, idx) => (
                      <div key={s.name} className="space-y-3">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-redGlow">{s.name}</span>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/40 uppercase">Nombre de usuario (Handle / Teléfono)</label>
                            <input
                              type="text"
                              value={s.handle}
                              onChange={(e) => {
                                const updated = [...socials];
                                updated[idx] = { ...updated[idx], handle: e.target.value };
                                setSocials(updated);
                              }}
                              placeholder={s.name === "WhatsApp" ? "Ej: +1 (000) 000-0000" : "Ej: @radionavidad"}
                              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 focus:bg-white/[0.08]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/40 uppercase">Enlace (URL completa)</label>
                            <input
                              type="text"
                              value={s.href}
                              onChange={(e) => {
                                const updated = [...socials];
                                updated[idx] = { ...updated[idx], href: e.target.value };
                                setSocials(updated);
                              }}
                              placeholder={s.name === "WhatsApp" ? "Ej: https://wa.me/10000000000" : `Ej: https://${s.name.toLowerCase()}.com/radionavidad`}
                              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 focus:bg-white/[0.08]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={saveGeneral}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-redGlow to-brand-red px-6 py-3 text-sm font-bold shadow-glow hover:scale-[1.02] transition-all"
                >
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </button>
              </div>
            )}

            {/* TAB SLIDES */}
            {activeTab === "slides" && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-xl font-bold">Gestión de Anuncios (Slider)</h2>
                  <p className="text-sm text-white/55">Personalizá las tarjetas informativas y publicitarias que corren en el carrusel superior.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Título del Anuncio</label>
                      <input
                        type="text"
                        placeholder="Ej: Noches de Esperanza"
                        value={slideTitle}
                        onChange={(e) => setSlideTitle(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 focus:bg-white/[0.08]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Subtítulo / Horario</label>
                      <input
                        type="text"
                        placeholder="Ej: Música suave + oración"
                        value={slideSubtitle}
                        onChange={(e) => setSlideSubtitle(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 focus:bg-white/[0.08]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Etiqueta (Tag)</label>
                      <input
                        type="text"
                        placeholder="Ej: Nightly, En vivo"
                        value={slideTag}
                        onChange={(e) => setSlideTag(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 focus:bg-white/[0.08]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Icono</label>
                      <select
                        value={slideIcon}
                        onChange={(e) => setSlideIcon(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 text-white"
                      >
                        <option value="none" className="bg-[#07070b]">Ninguno (Sin Icono)</option>
                        <option value="Music2" className="bg-[#07070b]">Música (Music2)</option>
                        <option value="HandHeart" className="bg-[#07070b]">Manos Corazón (HandHeart)</option>
                        <option value="Moon" className="bg-[#07070b]">Luna (Moon)</option>
                        <option value="Sunrise" className="bg-[#07070b]">Amanecer (Sunrise)</option>
                        <option value="Sparkles" className="bg-[#07070b]">Estrellas (Sparkles)</option>
                        <option value="BookOpen" className="bg-[#07070b]">Biblia Abierta (BookOpen)</option>
                        <option value="Heart" className="bg-[#07070b]">Corazón (Heart)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Fondo (Gradiente)</label>
                      <select
                        value={slideGradient}
                        onChange={(e) => setSlideGradient(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 text-white"
                      >
                        <option value="from-brand-redDark via-brand-red to-rose-700" className="bg-[#07070b]">Rojo Crimson</option>
                        <option value="from-brand-red via-rose-600 to-pink-800" className="bg-[#07070b]">Rosa Radiante</option>
                        <option value="from-indigo-900 via-brand-redDark to-brand-red" className="bg-[#07070b]">Noche / Índigo</option>
                        <option value="from-amber-600 via-brand-red to-rose-800" className="bg-[#07070b]">Amanecer Dorado</option>
                        <option value="from-brand-redGlow via-brand-red to-brand-redDark" className="bg-[#07070b]">Destello Premium</option>
                        <option value="from-slate-800 via-brand-redDark to-brand-red" className="bg-[#07070b]">Gris Pizarra</option>
                        <option value="from-rose-600 via-brand-red to-rose-900" className="bg-[#07070b]">Calidez Familiar</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-white/40 uppercase block">Imagen de Fondo (Opcional)</label>
                    
                    {!slideImage ? (
                      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-6 text-center transition hover:border-brand-red/40 hover:bg-white/[0.08] cursor-pointer group">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {uploading ? (
                          <div className="flex w-full max-w-xs flex-col items-center gap-3">
                            <span className="text-xs font-semibold text-white/70">
                              {uploadProgress < 100
                                ? `Subiendo imagen... ${uploadProgress}%`
                                : "Procesando en Cloudinary..."}
                            </span>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-brand-redGlow to-brand-red transition-all duration-200"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="rounded-full bg-white/5 p-2.5 text-white/60 group-hover:text-white transition-colors">
                              <Plus className="h-5 w-5" />
                            </div>
                            <p className="text-xs font-semibold text-white/70">Subir imagen</p>
                            <p className="text-[10px] text-white/40">PNG, JPG, WEBP o GIF · Máx. 5 MB (Recomendado 16:9)</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={slideImage}
                            alt="Preview"
                            className="h-12 w-12 rounded-xl object-cover border border-white/10"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white/80 truncate max-w-[200px] sm:max-w-md">
                              {slideImage.startsWith("/uploads/") ? slideImage.substring(9) : slideImage}
                            </p>
                            <p className="text-[10px] text-green-400 font-medium">Imagen seleccionada</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeUploadedImage}
                          className="rounded-xl bg-brand-red/10 p-2 text-brand-redGlow hover:bg-brand-red/20 transition-colors"
                          title="Eliminar imagen"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <p className="text-[10px] text-white/45 leading-relaxed bg-white/[0.01] border border-white/5 rounded-xl p-3 flex items-start gap-2">
                      <span className="text-xs text-brand-redGlow">💡</span>
                      <span>
                        <strong className="text-white/60">Sugerencia técnica:</strong> Usá imágenes en formato <strong className="text-white/60">16:9</strong> (resolución recomendada: <strong className="text-white/60">1280x720</strong> o <strong className="text-white/60">960x540 px</strong>). Las imágenes se almacenan en <strong className="text-white/60">Cloudinary</strong> y persisten entre deploys. Máximo <strong className="text-white/60">5 MB</strong> (preferí WebP o JPG optimizado).
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {editingIndex !== null && (
                      <button
                        onClick={resetForm}
                        className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      onClick={addOrUpdateSlide}
                      className="flex items-center gap-1.5 rounded-2xl bg-brand-red px-6 py-3 text-sm font-bold shadow-glow hover:bg-brand-redGlow transition-colors"
                    >
                      {editingIndex !== null ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {editingIndex !== null ? "Guardar Anuncio" : "Agregar Anuncio"}
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-white/5 border-t border-white/5">
                  {slides.map((s, i) => (
                    <div key={i} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Miniature card preview */}
                        <div className={`h-14 w-24 rounded-lg bg-gradient-to-br ${s.gradient} p-2 flex flex-col justify-between text-[6px] shrink-0 border border-white/10 relative overflow-hidden`}>
                          {s.image && (
                            <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover z-0" />
                          )}
                          <div className="absolute inset-0 bg-black/35 z-10" />
                          {s.tag && (
                            <div className="relative z-20 flex justify-between items-start">
                              <span className="bg-black/60 px-1 py-0.5 rounded-[4px] text-[4px] uppercase text-white font-bold tracking-wider">{s.tag}</span>
                            </div>
                          )}
                          <div className="relative z-20">
                            {s.title && <p className="font-bold text-white leading-tight truncate">{s.title}</p>}
                            {s.subtitle && <p className="text-white/80 leading-none truncate text-[5px]">{s.subtitle}</p>}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{s.title || "Sin título"}</p>
                          <p className="text-xs text-white/50">
                            {s.subtitle || "Sin subtítulo"}
                            {s.tag && ` · ${s.tag}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => editSlide(i)}
                          className="rounded-xl bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteSlide(i)}
                          className="rounded-xl bg-brand-red/10 p-2 text-brand-redGlow hover:bg-brand-red/20"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VERSES */}
            {activeTab === "verses" && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-xl font-bold">Carrusel de Versículos</h2>
                  <p className="text-sm text-white/55">Modificá los versículos que aparecen en el banner dinámico.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <textarea
                    placeholder="Texto del versículo"
                    value={verseText}
                    onChange={(e) => setVerseText(e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm outline-none focus:border-brand-red/50 focus:bg-white/[0.08] resize-none"
                  />
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <input
                      type="text"
                      placeholder="Cita Bíblica (ej: Salmos 23:1)"
                      value={verseRef}
                      onChange={(e) => setVerseRef(e.target.value)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addOrUpdateVerse}
                        className="flex items-center justify-center gap-1.5 rounded-2xl bg-brand-red px-6 py-3 text-sm font-bold shadow-glow hover:bg-brand-redGlow"
                      >
                        {editingIndex !== null ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {editingIndex !== null ? "Guardar" : "Agregar"}
                      </button>
                      {editingIndex !== null && (
                        <button
                          onClick={resetForm}
                          className="flex items-center justify-center rounded-2xl bg-white/10 px-4 py-3 hover:bg-white/15"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-white/5 border-t border-white/5">
                  {verses.map((v, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-start justify-between py-4 gap-4">
                      <div className="flex-1">
                        <p className="font-serif italic text-white/90">“{v.text}”</p>
                        <p className="mt-1 text-xs font-semibold text-brand-redGlow">{v.ref}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => editVerse(i)}
                          className="rounded-xl bg-white/5 p-2 text-white/70 hover:bg-white/10"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteVerse(i)}
                          className="rounded-xl bg-brand-red/10 p-2 text-brand-redGlow hover:bg-brand-red/20"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB PROGRAMS */}
            {activeTab === "programs" && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-xl font-bold">Grilla de Programación</h2>
                  <p className="text-sm text-white/55">Editá o sumá programas a la grilla diaria.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Título del Programa</label>
                      <input
                        type="text"
                        placeholder="Ej: Noche de Paz"
                        value={progTitle}
                        onChange={(e) => setProgTitle(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Horario</label>
                      <input
                        type="text"
                        placeholder="Ej: 21:00 — 00:00"
                        value={progTime}
                        onChange={(e) => setProgTime(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Locutor / Host</label>
                      <input
                        type="text"
                        placeholder="Ej: Pastor Andrés Pérez"
                        value={progHost}
                        onChange={(e) => setProgHost(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Etiqueta / Tag</label>
                      <input
                        type="text"
                        placeholder="Ej: Reflexión, Devocional"
                        value={progTag}
                        onChange={(e) => setProgTag(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/40 uppercase">Icono</label>
                      <select
                        value={progIcon}
                        onChange={(e) => setProgIcon(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 text-white"
                      >
                        <option value="Sunrise" className="bg-[#07070b]">Amanecer (Sunrise)</option>
                        <option value="Sun" className="bg-[#07070b]">Día (Sun)</option>
                        <option value="Music" className="bg-[#07070b]">Música (Music)</option>
                        <option value="Mic" className="bg-[#07070b]">Micrófono (Mic)</option>
                        <option value="Radio" className="bg-[#07070b]">Radio (Radio)</option>
                        <option value="Moon" className="bg-[#07070b]">Noche (Moon)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-white/40 uppercase">Descripción</label>
                    <textarea
                      placeholder="Breve descripción del programa..."
                      value={progDesc}
                      onChange={(e) => setProgDesc(e.target.value)}
                      rows={2}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-red/50 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {editingIndex !== null && (
                      <button
                        onClick={resetForm}
                        className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      onClick={addOrUpdateProgram}
                      className="flex items-center gap-1.5 rounded-2xl bg-brand-red px-6 py-3 text-sm font-bold shadow-glow hover:bg-brand-redGlow"
                    >
                      {editingIndex !== null ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {editingIndex !== null ? "Guardar Programa" : "Agregar Programa"}
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-white/5 border-t border-white/5">
                  {programs.map((p, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-start justify-between py-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-brand-red/10 border border-brand-red/25 px-2 py-0.5 text-[9px] uppercase tracking-wider text-brand-redGlow font-semibold">
                            {p.tag}
                          </span>
                          <span className="text-xs text-white/55 font-semibold">{p.time}</span>
                        </div>
                        <h4 className="mt-1 font-bold text-white text-base">{p.title}</h4>
                        <p className="text-xs text-white/50">con {p.host}</p>
                        <p className="mt-1 text-sm text-white/70">{p.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => editProgram(i)}
                          className="rounded-xl bg-white/5 p-2 text-white/70 hover:bg-white/10"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProgram(i)}
                          className="rounded-xl bg-brand-red/10 p-2 text-brand-redGlow hover:bg-brand-red/20"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}



          </div>
        </div>
      </main>
    </div>
  );
}
