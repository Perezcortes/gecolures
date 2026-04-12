import TeamGrid from "@/components/team/TeamGrid";
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
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo oscuro/táctico */}
        <div 
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1582233630606-d7a8d05d5e21?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
        ></div>
        {/* Overlays para oscurecer */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent z-10"></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="bg-orange-500 text-white font-display font-black px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] skew-x-[-12deg] mb-6 inline-block shadow-lg">
            PRO STAFF OFICIAL
          </span>
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-[0.9] drop-shadow-2xl mb-6">
            LA ÉLITE DEL <span className="text-transparent border-text-orange">AGUA</span>
          </h1>
          <p className="text-zinc-300 font-medium text-sm md:text-base uppercase tracking-widest max-w-2xl mx-auto leading-relaxed border-l-2 border-orange-500 pl-4 text-left">
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

      {/* 3. RECLUTAMIENTO (CALL TO ACTION) */}
      <section className="bg-zinc-900 py-24 relative overflow-hidden">
        {/* Textura de fondo sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <FiTarget className="w-16 h-16 text-orange-500 mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white mb-6">
            ¿TIENES LO NECESARIO PARA UNIRTE?
          </h2>
          <p className="text-zinc-400 font-bold text-xs md:text-sm uppercase tracking-widest leading-loose mb-10 max-w-2xl">
            Buscamos pescadores comprometidos con el deporte, que cuiden sus embalses y generen contenido de alto impacto. Si crees que tu perfil encaja con el ADN de Geco Lures, queremos escucharte.
          </p>
          <a 
            href="mailto:contacto@gecolures.com" 
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 font-black uppercase tracking-widest text-sm rounded shadow-2xl transition-all hover:-translate-y-1"
          >
            <FiMail className="w-5 h-5" />
            APLICAR AL PRO STAFF
          </a>
        </div>
      </section>

    </main>
  );
}