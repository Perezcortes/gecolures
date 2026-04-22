"use client";

import { useEffect, useState } from "react";
import { FiX, FiInfo, FiZap } from "react-icons/fi";

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 🚀 Verificamos si ya se mostró en esta sesión para no ser molestos
    const hasBeenShown = sessionStorage.getItem("geco_announcement_shown");
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Aparece 1 segundo después de cargar
      return () => clearTimeout(timer);
    }
  }, []);

  const closeAnnouncement = () => {
    setIsOpen(false);
    sessionStorage.setItem("geco_announcement_shown", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Overlay de cristal */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={closeAnnouncement}
      />

      {/* Modal Táctico */}
      <div className="relative bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        
        {/* Barra superior de estado */}
        <div className="h-1 w-full bg-orange-500" />
        
        <div className="p-8">
          <button 
            onClick={closeAnnouncement}
            className="absolute top-4 right-4 text-zinc-500 hover:text-orange-500 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 border border-orange-500/20">
              <FiZap className="w-8 h-8 text-orange-500" />
            </div>

            <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter text-gray-900 dark:text-white mb-4">
              PÁGINA GECO <br /><span className="text-orange-500">EN CONSTRUCCIÓN</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                Estado del Catálogo:
              </p>
              <div className="p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded">
                <p className="text-xs md:text-sm text-gray-700 dark:text-zinc-300 leading-relaxed italic">
                  "Estamos optimizando nuestra plataforma para ofrecerte la mejor experiencia. Por ahora, el **Catálogo de STICKS** ya está desplegado al 100% y listo para el combate. Muy pronto liberaremos el arsenal completo de modelos faltantes que tanto necesitas."
                </p>
              </div>
            </div>

            <button 
              onClick={closeAnnouncement}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 font-display font-black text-sm uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all shadow-lg"
            >
              ENTENDIDO, VAMOS A PESCAR
            </button>
            
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Geco Lures | +28 años de respaldo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}