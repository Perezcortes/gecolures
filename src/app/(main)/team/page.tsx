import TeamGrid from "@/components/team/TeamGrid";
import TeamHeroCarousel from "@/components/team/TeamHeroCarousel"; // 🚀 IMPORTAMOS EL CARRUSEL
import Link from "next/link";
import { FiMail, FiTarget } from "react-icons/fi";

export const metadata = {
  title: "Team Geco | La Élite del Agua",
  description: "Conoce al escuadrón oficial de Geco Lures. Pescadores forjados en la competencia.",
};

export default function TeamPage() {
  return (
    <main className="pt-20 min-h-screen bg-zinc-50 dark:bg-[#0e0e0e]">
      
      {/* 1. HERO SECTION (GRITO DE GUERRA) */}
      {/* 🚀 Ajustamos altura y alineación: Más alto en móvil y alineado abajo (items-end pb-12) */}
      <section className="relative w-full h-[65vh] md:h-[50vh] min-h-[550px] md:min-h-[400px] flex items-end md:items-center pb-12 md:pb-0 overflow-hidden bg-geco-grayLight dark:bg-geco-black">
        
        {/* EL NUEVO CARRUSEL DE FONDO */}
        <TeamHeroCarousel />

        {/* 🚀 OVERLAYS ADAPTABLES */}
        {/* En móvil: Gradiente vertical. Transparente arriba (se ve la foto), sólido abajo (se lee el texto) */}
        <div className="absolute inset-0 bg-gradient-to-t from-geco-grayLight via-geco-grayLight/95 to-transparent dark:from-geco-black dark:via-geco-black/95 md:hidden z-10 pointer-events-none"></div>
        
        {/* En PC: Gradiente horizontal. Fuerte a la izquierda, transparente a la derecha */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-geco-grayLight via-geco-grayLight/50 to-transparent dark:from-geco-black dark:via-geco-black/50 z-10 pointer-events-none"></div>
        
        {/* Gradiente inferior extra para PC para fusionar suavemente con la siguiente sección */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-geco-grayLight dark:from-geco-black via-transparent to-transparent z-10 pointer-events-none"></div>

        {/* CONTENEDOR DE TEXTO */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col items-center text-center md:items-start md:text-left">
          <span className="bg-geco-orange text-white font-display font-black px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] skew-x-[-12deg] mb-4 md:mb-6 inline-block shadow-lg">
            PRO STAFF OFICIAL
          </span>
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-geco-black dark:text-geco-white uppercase tracking-tighter leading-[0.9] drop-shadow-xl mb-4 md:mb-6 transition-colors">
            LA ÉLITE DEL <br className="hidden md:block" /><span className="text-transparent border-text-orange">AGUA</span>
          </h1>
          <p className="text-gray-800 dark:text-zinc-300 font-medium text-xs sm:text-sm md:text-base uppercase tracking-widest max-w-lg md:mx-0 leading-relaxed border-l-2 border-geco-orange pl-4 transition-colors">
            Pescadores forjados en la competencia, unidos por un solo objetivo: dominar cualquier cobertura. Ellos son los encargados de llevar nuestro arsenal al límite.
          </p>
        </div>
      </section>

      {/* 2. EL ESCUADRÓN (FICHAS TÁCTICAS) */}
      <section className="w-full max-w-[1400px] mx-auto px-6 xl:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              EL TEAM GECO 
            </h2>
            <div className="h-2 w-24 bg-orange-500 mt-4"></div>
          </div>
        </div>
        
        <TeamGrid />
      </section>

    </main>
  );
}