"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Importar los estilos de Swiper (Regresamos al slide nativo)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    tag: "ORGULLO MEXICANO",
    titleLine1: "GECO LURES",
    titleLine2: "ESTÁ AQUÍ",
    description: "Ingeniería para el ataque. Nacidos en lo salvaje. Únete a las filas de la pesca táctica con GECO.",
    btnPrimary: "ARMAMENTO",
    btnSecondary: "CONOCE A LOS PROS",
    bgImage: "bg-[url('/slide1.jpg')]", 
  },
  {
    id: 2,
    tag: "NUEVO LANZAMIENTO",
    titleLine1: "DOMINA",
    titleLine2: "EL AGUA",
    description: "Conoce el nuevo GECO Craw 4\". Diseñado específicamente para penetrar la cobertura más densa.",
    btnPrimary: "COMPRAR CRAW",
    btnSecondary: "VER VIDEO",
    bgImage: "bg-[url('/slide3.png')]", 
  },
  {
    id: 3,
    tag: "TEAM GECO",
    titleLine1: "PESCA",
    titleLine2: "COMO PRO",
    description: "Equípate con el terminal tackle que usan los campeones de torneos nacionales.",
    btnPrimary: "VER TACKLE",
    btnSecondary: "UNIRSE AL EQUIPO",
    bgImage: "bg-[url('/slide2.png')]", 
  }
];

export default function HeroCarousel() {
  return (
    // 🚀 AJUSTE 2: h-[100svh] md:h-screen para ocupar toda la pantalla en desktop y móvil
    <section className="relative h-[92vh] min-h-[600px] w-full bg-zinc-900 group">
      
      <style>{`
        /* Flechas de navegación minimalistas */
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          opacity: 0;
          transition: all 0.3s ease;
          transform: scale(0.7);
        }
        
        /* Aparecen al pasar el mouse (solo en desktop) */
        .group:hover .swiper-button-next, 
        .group:hover .swiper-button-prev {
          opacity: 0.8;
        }

        .swiper-button-next:hover, .swiper-button-prev:hover {
          opacity: 1 !important;
          color: #f97316 !important; /* orange-500 */
        }

        /* Paginación (Puntitos) minimalistas */
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5 !important;
          width: 8px !important;
          height: 8px !important;
          transition: all 0.3s ease !important;
          border-radius: 4px !important;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #f97316 !important; /* orange-500 */
          width: 24px !important;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        speed={800} // Transición suave de 0.8 segundos
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center md:justify-start px-6 md:px-16 lg:px-24">
              
              <div className="absolute inset-0 z-0">
                {/* La imagen de fondo */}
                <div className={`w-full h-full absolute inset-0 bg-cover bg-center bg-no-repeat ${slide.bgImage}`} />
                {/* 🚀 AJUSTE 4: Overlay oscuro uniforme sobre toda la imagen para todo el texto blanco */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>
              </div>

              {/* Contenido alineado al centro en móvil, a la izquierda en desktop */}
              <div className="relative z-20 max-w-3xl text-center md:text-left mt-12 md:mt-0 pt-16 pb-8">
                
                <div className="inline-block bg-orange-500 text-white px-3 py-1 font-display font-bold uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6 rounded-sm">
                  {slide.tag}
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase leading-[0.9] tracking-tighter mb-6 text-white">
                  {slide.titleLine1} <br />
                  <span className="text-orange-500">{slide.titleLine2}</span>
                </h1>
                
                <p className="text-base md:text-lg lg:text-xl text-gray-200 font-medium max-w-xl mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed">
                  {slide.description}
                </p>
                
                {/* Botones: Se apilan en móvil, se ponen lado a lado en pantallas grandes */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto px-4 sm:px-0">
                  {/* 🚀 AJUSTE 1: Botones con efecto 3D Sutil */}
                  <button className="w-full sm:w-auto bg-orange-500 text-white px-8 py-3.5 md:py-4 font-display font-black uppercase text-sm md:text-base tracking-widest hover:bg-orange-600 transition-all rounded-sm shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]">
                    {slide.btnPrimary}
                  </button>
                  <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-3.5 md:py-4 font-display font-black uppercase text-sm md:text-base tracking-widest hover:bg-white hover:text-black transition-all rounded-sm backdrop-blur-sm">
                    {slide.btnSecondary}
                  </button>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}