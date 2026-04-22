"use client";

import { FiTarget, FiShield, FiHexagon } from "react-icons/fi";

export default function HistorySection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0e0e0e] border-y border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LADO IZQUIERDO: EL VIDEO */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative group">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-2xl z-10 bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/4lHTEZ-0e-Y" 
                title="Entrevista GecoLures" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              ></iframe>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-orange-500/30 rounded-lg -z-10 hidden md:block transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-300"></div>
          </div>

          {/* LADO DERECHO (TEXTO E HISTORIA) */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 rounded-sm border border-orange-500/20">
                28 Años de Maestría • 14 Años Geco Lures
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4 leading-tight">
                Ingeniería mexicana <span className="text-orange-500">para la pesca de élite.</span>
              </h2>
              <p className="text-gray-600 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed mb-6">
                Con 28 años de experiencia en el rubro, Geco Lures ha evolucionado desde sus orígenes en el agua salada hasta convertirse en el referente de <strong>señuelos blandos para Lobina</strong>. Nuestra historia es de adaptación y precisión técnica para pescadores de todo el país.
              </p>
            </div>

            <div className="space-y-6">
              {/* Punto 1: Personalización Brutal */}
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md border border-gray-200 dark:border-zinc-800 text-orange-500">
                  <FiHexagon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1">+300 Colores Disponibles</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium leading-relaxed">
                    No solo fabricamos señuelos, forjamos herramientas personalizadas. Casi cualquier modelo de nuestro arsenal puede ser creado en más de 300 combinaciones de color a tu elección.
                  </p>
                </div>
              </div>

              {/* Punto 2: Especialistas en Lobina */}
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md border border-gray-200 dark:border-zinc-800 text-orange-500">
                  <FiTarget className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1">Especialistas en Lobina</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium leading-relaxed">
                    Aunque dominamos el agua salada, nuestro fuerte es el diseño de plásticos suaves para Lobina, probados con éxito en los embalses más exigentes de México.
                  </p>
                </div>
              </div>

              {/* Punto 3: Calidad de Exportación */}
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md border border-gray-200 dark:border-zinc-800 text-orange-500">
                  <FiShield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1">Materiales Premium</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium leading-relaxed">
                    Utilizamos exclusivamente materia prima estadounidense para garantizar texturas, densidades y durabilidad que superan los estándares internacionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
