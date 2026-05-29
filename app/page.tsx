import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Verses from "@/components/Verses";
import Social from "@/components/Social";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full max-w-full overflow-hidden text-white">
      <Navbar />
      <Hero />
      <About />
      <Schedule />
      <Verses />
      <Social />
      <Footer />
      <MiniPlayer />
    </main>
  );
}
