"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; 
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // 🚀 Importamos las flechas

const ACTION_CARDS = [
  {
    id: 1,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1777862672/captura4_ygsitc.jpg", 
    subtitle: "Acción Letal",
    title: "CAÍDA IRRESISTIBLE",
    productName: "STICK PLUM 5\"",
    price: "Disponible", 
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776648039/gecolures/senuelos/ybvrnqyabqi0u06wwazf.png", 
    isAvailable: true,          
    href: "/catalogo/stick-plum?medida=5%22"
  },
  {
    id: 2,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834356/captura2_njtvj0.png", 
    subtitle: "Fluk en acción",
    title: "SEÑUELOS QUE AMAN LAS LOBINAS", 
    productName: "FLUKE Juanito Zimabug",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836059/fluke_uinic5.png", 
    isAvailable: false,
  },
  {
    id: 3,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834355/captura3_bghfir.png", 
    subtitle: "Siente la vibración",
    title: "PARA DÍAS DIFÍCILES",
    productName: "WACKY WORM",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1779057986/gecolures/ropa-gear/ycgxjs0s3834a0rpunue.png", 
    isAvailable: true,
    href: "catalogo?page=1&categoria=Señuelos&modelo=WACKY+WORM"
  },
  {
    id: 4,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834355/captura_z4kcfj.png", 
    subtitle: "Juanito Zimabug",
    title: "Super Hog de Geco Lures",
    productName: "Hog Juanito Zimabug",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836059/hog_btoylw.png", 
    isAvailable: false,
  },
  {
    id: 5,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1779039569/513500806_3889428564535898_3051877589954399293_n_jdrsom.jpg", 
    subtitle: "Acción irresistible",
    title: "Señuelos que ganan torneos",
    productName: "Ribbon Tail de Geco Lures",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836059/hog_btoylw.png", 
    isAvailable: false,
  },
  {
    id: 6,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1779040146/581083712_4060090610803025_7937330716218262422_n_s0vrne.jpg", 
    subtitle: "Provoca la mordida",
    title: "CAÍDA IRRESISTIBLE",
    productName: "STICK BLACK BLUE TAIL 5\"",
    price: "Disponible", 
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776622111/gecolures/senuelos/cdnnxmqzynkeomtltfnu.png", 
    isAvailable: true,          
    href: "/catalogo/stick-black-blue-tail?medida=5%22"
  },
];

export default function FeaturedActionCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // 🚀 ESTADO PARA PAUSAR EL AUTO-SCROLL
  const [isHovered, setIsHovered] = useState(false);

  // Lógica de Auto-Scroll con Pausa Inteligente
  useEffect(() => {
    // Si el mouse está encima, no hacemos auto-scroll
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 4000); 

    return () => clearInterval(interval); 
  }, [isHovered]);

  // 🚀 FUNCIONES PARA FLECHAS MANUALES
  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className="py-2 md:py-6 bg-white dark:bg-[#0e0e0e] w-full overflow-hidden">
      
      {/* 🚀 CONTENEDOR MAESTRO: group/carousel detecta el hover en toda el área para mostrar las flechas */}
      <div 
        className="relative max-w-[1600px] mx-auto group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* FLECHA IZQUIERDA (Aparece en PC al hacer hover) */}
        <button 
          onClick={scrollLeft}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white hover:bg-orange-500 hover:text-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
        >
          <FiChevronLeft className="w-6 h-6 -translate-x-0.5" />
        </button>

        {/* FLECHA DERECHA (Aparece en PC al hacer hover) */}
        <button 
          onClick={scrollRight}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white hover:bg-orange-500 hover:text-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
        >
          <FiChevronRight className="w-6 h-6 translate-x-0.5" />
        </button>

        {/* CONTENEDOR TIPO CARRUSEL HORIZONTAL */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 px-4 md:px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4"
        >
          
          {ACTION_CARDS.map((card) => {
            const cardClassName = `group relative flex-none w-[85vw] sm:w-[45vw] md:w-[35vw] lg:w-[23vw] flex flex-col bg-zinc-900 overflow-hidden shadow-lg border border-transparent transition-colors duration-300 snap-center ${
              card.isAvailable 
                ? 'hover:border-orange-500 cursor-pointer' 
                : 'hover:border-zinc-700 cursor-default'
            }`;

            const cardContent = (
              <>
                {/* PARTE SUPERIOR: FOTO Y TEXTO ANIMADO */}
                <div className="relative flex-grow aspect-square md:aspect-[4/5] overflow-hidden bg-black">
                  <Image 
                    src={card.bgImage} 
                    alt={card.title} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                  />
                  
                  {/* Overlay oscuro */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* ANIMACIÓN DE TEXTO */}
                  <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full z-10">
                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <p className="font-display font-bold text-[10px] md:text-xs text-orange-500 uppercase tracking-widest mb-1.5 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        {card.subtitle}
                      </p>
                      <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase leading-[1.1] tracking-tighter drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* PARTE INFERIOR: DETALLE DEL PRODUCTO Y BOTÓN */}
                <div className="bg-[#1a1a1a] border-t border-zinc-800 p-3 md:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 z-10 overflow-hidden">
                    <div className="w-10 h-10 bg-white rounded-sm overflow-hidden relative flex-shrink-0 border border-zinc-700 p-0.5">
                      <Image 
                        src={card.productThumb} 
                        alt={card.productName} 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-white font-display font-black uppercase text-xs md:text-sm tracking-tight truncate max-w-[100px] md:max-w-[130px]">
                        {card.productName}
                      </span>
                      <span className="text-orange-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                        {card.price}
                      </span>
                    </div>
                  </div>

                  {/* EL EFECTO CORTINA EN LOS BOTONES */}
                  {card.isAvailable ? (
                    <div className="relative overflow-hidden bg-orange-500 text-white font-display font-black uppercase text-[9px] md:text-[10px] px-3 md:px-4 py-2 rounded-sm tracking-widest shadow-md flex items-center gap-1 flex-shrink-0">
                      <div className="absolute inset-0 bg-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                      <span className="relative z-10">COMPRAR</span>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden bg-zinc-800 text-zinc-400 font-display font-black uppercase text-[9px] md:text-[10px] px-2 md:px-3 py-1.5 rounded-sm tracking-widest border border-zinc-700 cursor-default flex-shrink-0">
                      <div className="absolute inset-0 bg-zinc-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                      <span className="relative z-10 group-hover:text-white transition-colors duration-500">Pronto</span>
                    </div>
                  )}
                </div>
              </>
            );

            if (card.isAvailable && card.href) {
              return (
                <Link key={card.id} href={card.href} className={cardClassName}>
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={card.id} className={cardClassName}>
                {cardContent}
              </div>
            );
          })}
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </section>
  );
}