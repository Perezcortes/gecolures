import HeroCarousel from "@/components/home/HeroCarousel";
import NuevosLanzamientos from "@/components/home/NuevosLanzamientos";
import GecoNation from "@/components/home/GecoNation";
import FeaturedActionCards from "@/components/home/FeaturedActionCards";
import AnimatedMarquee from "@/components/home/AnimatedMarquee";
import HistorySection from "@/components/home/HistorySection";
import Image from "next/image"; // <-- Importamos Image de Next.js

export default function Home() {
  return (
    <main className="pt-20 overflow-x-hidden">
      
      {/* 1. Carrusel Principal (Hero) */}
      <HeroCarousel />

      <NuevosLanzamientos />

      <HistorySection />

      <FeaturedActionCards />

      <GecoNation />

      <AnimatedMarquee />

    </main>
  );
}