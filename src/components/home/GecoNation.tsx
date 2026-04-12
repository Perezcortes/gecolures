"use client"; // <-- IMPORTANTE: Necesario para usar animaciones en tiempo real en Next.js

import { useRef, useEffect } from "react";
import Image from "next/image";
import { FiInstagram, FiFacebook } from "react-icons/fi";

// Datos de prueba: Mezcla de capturas de Instagram y Facebook
const COMMUNITY_POSTS = [
  {
    id: 1,
    plataforma: "instagram",
    username: "carlosbuonoruiz",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776021066/perfil_carlos_moxl3j.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776020748/WhatsApp_Image_2026-04-12_at_12.53.48_PM_ke3zfl.jpg",
    link: "https://www.instagram.com/carlosbuonoruiz/"
  },
  {
    id: 2,
    plataforma: "facebook",
    username: "Fernando Javier Malacara Perales",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776023891/651363139_26240176022283005_4141471570738872256_n_eqqslu.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776021291/WhatsApp_Image_2026-04-12_at_12.21.54_PM_nrnbei.jpg",
    link: "https://www.facebook.com/fernandojavier.malacaraperales/?locale=es_LA"
  },
  {
    id: 3,
    plataforma: "instagram",
    username: "carlosbuonoruiz",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776021066/perfil_carlos_moxl3j.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776020748/WhatsApp_Image_2026-04-12_at_12.49.04_PM_we43pj.jpg",
    link: "https://www.instagram.com/carlosbuonoruiz/"
  },
  {
    id: 4,
    plataforma: "facebook",
    username: "Pescando X Tamaulipas",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776023650/475122128_616861480711601_4563349591646411418_n_zlldwe.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776023650/574544485_826008629796884_7057097202723298576_n_tpy12a.jpg",
    link: "https://www.facebook.com/FiserManSWorld?locale=es_LA"
  },
  {
    id: 5,
    plataforma: "facebook",
    username: "Angel Vazquez",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024014/494362281_18273861775264524_6442468200232604641_n_yw48ql.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024015/654808507_915084578011448_8824781392891325949_n_xhdx9p.jpg",
    link: "https://www.facebook.com/angel.vazquez.939862?locale=es_LA"
  }
];

export default function GecoNation() {
  // Referencia al contenedor que hace scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lógica de Auto-Play
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Si llegamos al final del carrusel, lo regresamos al inicio
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Si no, avanzamos el ancho de una tarjeta aproximadamente
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000); // 3000 ms = Pasa cada 3 segundos (puedes ajustarlo)

    return () => clearInterval(interval); // Limpiamos el intervalo si sales de la página
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#0e0e0e] overflow-hidden">
      {/* CABECERA */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4">
          CAPTURAS DE LA FAMILIA GECO
        </h2>
        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://instagram.com/gecolures" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-display font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-colors"
          >
            <FiInstagram className="w-4 h-4" /> @GecoLures
          </a>
          <a 
            href="https://facebook.com/gecolures" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#1877F2] text-white font-display font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-[#0c5bce] transition-colors"
          >
            <FiFacebook className="w-4 h-4" /> Geco Lures
          </a>
        </div>
      </div>

      {/* CARRUSEL DE FOTOS MIXTAS (Agregamos el ref aquí) */}
      <div 
        ref={scrollRef}
        className="flex gap-4 px-4 md:px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
      >
        {COMMUNITY_POSTS.map((post) => (
          <a 
            key={post.id} 
            href={post.link} 
            target="_blank" 
            rel="noreferrer"
            className="group relative flex-none w-[75vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw] aspect-[4/5] bg-zinc-200 dark:bg-zinc-900 overflow-hidden snap-center cursor-pointer border border-transparent hover:border-orange-500 transition-colors"
          >
            {/* Foto de la Captura */}
            <Image 
              src={post.postImage} 
              alt={`Captura por ${post.username}`} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            
            {/* Gradiente oscuro inferior */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

            {/* Barra Inferior: Foto de perfil, usuario e ícono Dinámico */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden border border-white/20">
                  <Image 
                    src={post.userImage} 
                    alt={post.username} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <span className="text-white font-bold text-xs tracking-wide truncate">
                  {post.username}
                </span>
              </div>
              
              <div className="flex-shrink-0 ml-2">
                {post.plataforma === 'instagram' ? (
                  <FiInstagram className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                ) : (
                  <FiFacebook className="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors" />
                )}
              </div>
            </div>
          </a>
        ))}
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