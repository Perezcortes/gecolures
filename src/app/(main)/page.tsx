import HeroCarousel from "@/components/home/HeroCarousel";
import Image from "next/image"; // <-- Importamos Image de Next.js

export default function Home() {
  return (
    <main className="pt-20 overflow-x-hidden">
      
      {/* 1. Carrusel Principal (Hero) */}
      <HeroCarousel />

      {/* 2. Sección de Nuevos Lanzamientos */}
      <section className="pt-12 pb-24 px-6 md:px-12 bg-white dark:bg-[#0e0e0e] relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              NUEVOS LANZAMIENTOS
            </h2>
            <div className="h-2 w-32 bg-orange-500 mt-4"></div>
          </div>
          <a href="/catalogo" className="font-display font-black text-orange-500 uppercase tracking-widest hover:underline decoration-4">
            VER CATÁLOGO COMPLETO
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Producto Destacado (Grande) */}
          <div className="md:col-span-7 bg-zinc-100 dark:bg-zinc-900 group cursor-pointer overflow-hidden relative border border-gray-200 dark:border-zinc-800 flex flex-col">
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              <span className="bg-orange-500 text-white px-3 py-1 font-display font-bold uppercase text-xs">
                NUEVO COLOR
              </span>
            </div>
            
            <div className="w-full h-[500px] bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
              {/* Imagen del Craw con sombra 3D y efecto hover */}
              <Image 
                src="/craw.png" 
                alt="Geco Craw 4 pulgadas" 
                width={600} 
                height={600} 
                className="object-contain w-[80%] h-[80%] drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 z-10"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/90 dark:from-black dark:via-black/90 to-transparent z-20">
              <h3 className="text-4xl font-display font-black uppercase tracking-tighter mb-2 text-gray-900 dark:text-white">
                GECO CRAW 4"
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm">
                DOMINIO EN COBERTURA DENSA
              </p>
            </div>
          </div>

          {/* Productos Secundarios (Lado derecho) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Secundario 1 (Stick) */}
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 group cursor-pointer flex items-center relative p-6 overflow-hidden">
              <div className="w-1/2 z-20 relative">
                <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-1 text-gray-900 dark:text-white">
                  STICK 5"
                </h4>
                <p className="text-orange-500 font-bold text-xl">$185.00 MXN</p>
              </div>
              <div className="w-1/2 h-full absolute right-0 bg-zinc-200 dark:bg-zinc-800 transform -skew-x-12 group-hover:skew-x-0 transition-transform duration-500 flex items-center justify-center z-10">
                {/* Contra-inclinación (skew-x-12) para que el señuelo no se deforme */}
                <Image 
                  src="/stick.png" 
                  alt="Stick 5 pulgadas" 
                  width={300} 
                  height={300} 
                  className="object-contain w-[80%] h-[80%] drop-shadow-xl transform skew-x-12 group-hover:skew-x-0 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Secundario 2 (Swim Bait) */}
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 group cursor-pointer flex items-center relative p-6 overflow-hidden">
              <div className="w-1/2 z-20 relative">
                <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-1 text-gray-900 dark:text-white">
                  RING SWIM BAIT
                </h4>
                <p className="text-orange-500 font-bold text-xl">$165.00 MXN</p>
              </div>
              <div className="w-1/2 h-full absolute right-0 bg-zinc-200 dark:bg-zinc-800 transform skew-x-12 group-hover:skew-x-0 transition-transform duration-500 flex items-center justify-center z-10">
                {/* Contra-inclinación (-skew-x-12) */}
                <Image 
                  src="/swimbait.png" 
                  alt="Ring Swim Bait" 
                  width={300} 
                  height={300} 
                  className="object-contain w-[80%] h-[80%] drop-shadow-xl transform -skew-x-12 group-hover:skew-x-0 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Cinta Inferior Animada (Marquee) */}
      <section className="py-10 border-y border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden whitespace-nowrap flex group">
        <div className="flex gap-20 animate-marquee items-center text-gray-300 dark:text-zinc-700">
          <span className="text-4xl font-display font-black uppercase flex items-center gap-6">DISEÑADO EN MÉXICO •</span>
          <span className="text-4xl font-display font-black uppercase flex items-center gap-6">THE SQUAD IS HERE •</span>
          <span className="text-4xl font-display font-black uppercase flex items-center gap-6">CALIDAD PREMIUM •</span>
          <span className="text-4xl font-display font-black uppercase flex items-center gap-6">GECO LURES •</span>
          <span className="text-4xl font-display font-black uppercase flex items-center gap-6">DISEÑADO EN MÉXICO •</span>
          <span className="text-4xl font-display font-black uppercase flex items-center gap-6">THE SQUAD IS HERE •</span>
        </div>
      </section>

    </main>
  );
}