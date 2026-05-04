"use client"; 

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { 
  FiInstagram, 
  FiFacebook, 
  FiYoutube, 
  FiPlayCircle,
  FiX, 
  FiChevronLeft, 
  FiChevronRight,
  FiExternalLink
} from "react-icons/fi";

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
    username: "J Torres",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776236843/548227689_764398456566162_4922236690723613070_n_mrwxpf.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776236843/WhatsApp_Image_2026-04-15_at_1.06.10_AM_twnrma.jpg",
    link: "https://www.facebook.com/jesustorresart/?locale=es_LA"
  },
  {
    id: 3,
    plataforma: "facebook",
    username: "Fernando Javier Malacara Perales",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776023891/651363139_26240176022283005_4141471570738872256_n_eqqslu.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776021291/WhatsApp_Image_2026-04-12_at_12.21.54_PM_nrnbei.jpg",
    link: "https://www.facebook.com/fernandojavier.malacaraperales/?locale=es_LA"
  },
  {
    id: 4,
    plataforma: "instagram",
    username: "carlosbuonoruiz",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776021066/perfil_carlos_moxl3j.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776020748/WhatsApp_Image_2026-04-12_at_12.49.04_PM_we43pj.jpg",
    link: "https://www.instagram.com/carlosbuonoruiz/"
  },
  {
    id: 5,
    plataforma: "facebook",
    username: "Pescando X Tamaulipas",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776023650/475122128_616861480711601_4563349591646411418_n_zlldwe.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776023650/574544485_826008629796884_7057097202723298576_n_tpy12a.jpg",
    link: "https://www.facebook.com/FiserManSWorld?locale=es_LA"
  },
  {
    id: 6,
    plataforma: "facebook",
    username: "Angel Vazquez",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024014/494362281_18273861775264524_6442468200232604641_n_yw48ql.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024015/654808507_915084578011448_8824781392891325949_n_xhdx9p.jpg",
    link: "https://www.facebook.com/angel.vazquez.939862?locale=es_LA"
  },
  {
    id: 7,
    plataforma: "facebook",
    username: "J Torres",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776236843/548227689_764398456566162_4922236690723613070_n_mrwxpf.jpg",
    postImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776236843/WhatsApp_Image_2026-04-15_at_1.06.09_AM_jfom8j.jpg",
    link: "https://www.facebook.com/jesustorresart/?locale=es_LA"
  },
  {
    id: 8,
    plataforma: "youtube",
    username: "PONCHITO'S BASS CLUB",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834355/channels4_profile_isr7hp.jpg",
    postImage: "https://img.youtube.com/vi/WGswMRJUIgw/maxresdefault.jpg",
    link: "https://youtu.be/WGswMRJUIgw",
    videoId: "WGswMRJUIgw" // 🚀 Añadido videoId
  },
  {
    id: 9,
    plataforma: "youtube",
    username: "Anglers Tv",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834710/unnamed_kp4gc9.jpg",
    postImage: "https://img.youtube.com/vi/lnkMMnhAPhY/maxresdefault.jpg",
    link: "https://youtu.be/lnkMMnhAPhY",
    videoId: "lnkMMnhAPhY" // 🚀 Añadido videoId
  },
  {
    id: 10,
    plataforma: "youtube",
    username: "Anglers Tv",
    userImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834710/unnamed_kp4gc9.jpg",
    postImage: "https://img.youtube.com/vi/dZ2iWb1QU5o/maxresdefault.jpg",
    link: "https://youtu.be/dZ2iWb1QU5o",
    videoId: "dZ2iWb1QU5o" // 🚀 Añadido videoId
  }
];

export default function GecoNation() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // 🚀 ESTADO PARA EL LIGHTBOX
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lógica de Auto-Play (Se pausa si el Lightbox está abierto)
  useEffect(() => {
    // Si el carrusel en pantalla completa está abierto, detenemos el auto-scroll de fondo
    if (lightboxIndex !== null) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000); 

    return () => clearInterval(interval); 
  }, [lightboxIndex]);

  // Evitar que la página haga scroll cuando el Lightbox está abierto
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxIndex]);

  // Controles del Lightbox
  const openLightbox = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); 
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % COMMUNITY_POSTS.length);
    }
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + COMMUNITY_POSTS.length) % COMMUNITY_POSTS.length);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0e0e0e] overflow-hidden">
      {/* CABECERA */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4">
          CAPTURAS DE LA FAMILIA GECO
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a 
            href="https://facebook.com/gecolures" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#1877F2] text-white font-display font-bold text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-[#0c5bce] transition-colors"
          >
            <FiFacebook className="w-4 h-4 md:w-4 md:h-4" /> Geco Lures
          </a>
        </div>
      </div>

      {/* CARRUSEL DE FOTOS MIXTAS (Horizontal nativo) */}
      <div 
        ref={scrollRef}
        className="flex gap-4 px-4 md:px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
      >
        {COMMUNITY_POSTS.map((post, index) => (
          <a 
            key={post.id} 
            href={post.link} 
            onClick={(e) => openLightbox(e, index)} // 🚀 Abrir el Lightbox en lugar de ir al link
            className="group relative flex-none w-[75vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw] aspect-[4/5] bg-zinc-200 dark:bg-zinc-900 overflow-hidden snap-center cursor-pointer border border-transparent hover:border-orange-500 transition-colors"
          >
            <Image 
              src={post.postImage} 
              alt={`Captura por ${post.username}`} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            
            {post.plataforma === 'youtube' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <FiPlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300 drop-shadow-md" />
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-30">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden border border-white/20">
                  <Image src={post.userImage} alt={post.username} fill className="object-cover" />
                </div>
                <span className="text-white font-bold text-xs tracking-wide truncate">
                  {post.username}
                </span>
              </div>
              
              <div className="flex-shrink-0 ml-2">
                {post.plataforma === 'instagram' && <FiInstagram className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />}
                {post.plataforma === 'facebook' && <FiFacebook className="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors" />}
                {post.plataforma === 'youtube' && <FiYoutube className="w-5 h-5 text-[#FF0000] group-hover:text-white transition-colors" />}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 🚀 EL LIGHTBOX CINEMÁTICO */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity"
          onClick={closeLightbox}
        >
          {/* Botón de Cerrar */}
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110] p-3 bg-zinc-900/50 rounded-full hover:bg-orange-500"
            onClick={closeLightbox}
          >
            <FiX className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Flecha Izquierda */}
          <button 
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[110] p-2 md:p-4 bg-zinc-900/50 hover:bg-orange-500 rounded-full hover:scale-110"
            onClick={prevSlide}
          >
            <FiChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
          </button>

          {/* Flecha Derecha */}
          <button 
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[110] p-2 md:p-4 bg-zinc-900/50 hover:bg-orange-500 rounded-full hover:scale-110"
            onClick={nextSlide}
          >
            <FiChevronRight className="w-6 h-6 md:w-10 md:h-10" />
          </button>

          {/* Contenido (Foto o Video) */}
          <div 
            className="relative w-full max-w-5xl h-[60vh] md:h-[80vh] flex flex-col items-center justify-center px-12 md:px-24"
            onClick={(e) => e.stopPropagation()} 
          >
            {COMMUNITY_POSTS[lightboxIndex].plataforma === "youtube" ? (
              // 🚀 REPRODUCTOR DE YOUTUBE INTEGRADO
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  className="w-full aspect-video max-h-full rounded-lg shadow-2xl border border-zinc-800"
                  src={`https://www.youtube.com/embed/${COMMUNITY_POSTS[lightboxIndex].videoId}?autoplay=1&mute=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              // 🚀 IMAGEN DE ALTA RESOLUCIÓN
              <div className="relative w-full h-full">
                <Image
                  src={COMMUNITY_POSTS[lightboxIndex].postImage}
                  alt="Captura Geco Lures"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            )}

            {/* Barra de información inferior en el Lightbox */}
            <div className="absolute -bottom-16 md:-bottom-20 left-0 right-0 flex items-center justify-between px-12 md:px-24">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-orange-500 shadow-lg">
                  <Image src={COMMUNITY_POSTS[lightboxIndex].userImage} alt="User" fill className="object-cover" />
                </div>
                <span className="text-white font-bold text-sm md:text-base tracking-widest uppercase">
                  {COMMUNITY_POSTS[lightboxIndex].username}
                </span>
              </div>
              
              <a 
                href={COMMUNITY_POSTS[lightboxIndex].link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-orange-500 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 rounded-sm transition-colors shadow-md"
              >
                Ver <FiExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
      
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