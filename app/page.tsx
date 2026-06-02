import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Verses from "@/components/Verses";
import Social from "@/components/Social";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import { getConfig } from "@/lib/config";

// Leer siempre la configuración más reciente desde KV en cada visita
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const config = await getConfig();

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-hidden text-white">
      <Navbar />
      <Hero streamUrl={config.streamUrl} slides={config.slides} />
      <About />
      <Schedule programs={config.schedule} />
      <Verses verses={config.verses} />
      <Social channels={config.social} />
      <Footer />
      <MiniPlayer />
    </main>
  );
}
