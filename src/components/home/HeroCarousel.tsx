"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Importar los estilos de Swiper
import "swiper/css";
import "swiper/css/effect-fade"; 

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
    // CAMBIO CLAVE: Cambiamos h-[85vh] a h-[95vh] para que el carrusel sea más alto
    <section className="relative h-[90vh] w-full bg-zinc-950 group">
      
      <style>{`
        /* Ocultar elementos predeterminados por si acaso */
        .swiper-button-next::after, .swiper-button-prev::after { content: none !important; }
        
        /* Contenedor de los puntitos */
        .custom-pagination {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        /* Diseño base del puntito (inactivo) */
        .custom-pagination .swiper-pagination-bullet {
          width: 32px;
          height: 4px;
          background: #52525b; 
          border-radius: 2px;
          display: block;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 1;
          margin: 0 !important;
          transition: background 0.3s ease;
        }

        /* Diseño del puntito activo (fondo oscuro, barra naranja llenándose) */
        .custom-pagination .swiper-pagination-bullet-active {
          background: #3f3f46; 
        }
        
        .custom-pagination .swiper-pagination-bullet-active .fill-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: #FF6B00; 
          animation: fill-bullet 5s linear forwards;
          transform-origin: left;
        }

        @keyframes fill-bullet {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}"><span class="fill-bar"></span></span>`;
          },
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center px-6 md:px-12">
              <div className="absolute inset-0 z-0 overflow-hidden">
                {/* 1. Gradiente más suave (solo oscurece/aclara la parte donde va el texto) */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 dark:from-black/90 dark:via-black/40 to-transparent z-10"></div>
                
                {/* 2. La imagen se adaptará mejor ahora que el contenedor es más alto */}
                <div className={`w-full h-full absolute inset-0 bg-cover bg-center bg-no-repeat ${slide.bgImage}`} />
              </div>

              <div className="relative z-20 max-w-4xl">
                <div className="inline-block bg-orange-500 text-white px-4 py-1 font-display font-black uppercase tracking-widest text-sm mb-6 transform -skew-x-12 shadow-lg">
                  {slide.tag}
                </div>
                <h1 className="text-6xl md:text-9xl font-display font-black uppercase leading-[0.85] tracking-tighter mb-8 text-gray-900 dark:text-white drop-shadow-md">
                  {slide.titleLine1} <br />
                  <span className="text-orange-500">{slide.titleLine2}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 dark:text-zinc-300 font-medium max-w-xl mb-10 leading-tight drop-shadow-md">
                  {slide.description}
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <button className="bg-orange-500 text-white px-10 py-5 font-display font-black uppercase text-xl tracking-tighter hover:bg-orange-600 transition-colors shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] active:translate-y-1 active:shadow-none">
                    {slide.btnPrimary}
                  </button>
                  <button className="border-4 border-gray-900 dark:border-white text-gray-900 dark:text-white px-10 py-5 font-display font-black uppercase text-xl tracking-tighter hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors bg-white/10 dark:bg-black/10 backdrop-blur-sm">
                    {slide.btnSecondary}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CAMBIO CLAVE: Cambiamos bottom-8 a bottom-4 para que el control no quede tan volando y aproveche el espacio inferior */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-6 py-3 bg-white/30 dark:bg-black/40 backdrop-blur-md rounded-full border border-gray-300 dark:border-zinc-800 shadow-xl">
        <button className="custom-prev text-gray-900 dark:text-white hover:text-orange-500 transition-colors flex items-center justify-center cursor-pointer">
          <svg className="w-6 h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>

        <div className="custom-pagination"></div>

        <button className="custom-next text-gray-900 dark:text-white hover:text-orange-500 transition-colors flex items-center justify-center cursor-pointer">
          <svg className="w-6 h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}