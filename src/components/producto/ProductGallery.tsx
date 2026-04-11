"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery() {
  const [mainImage, setMainImage] = useState("/craw.png");
  const thumbnails = ["/craw.png", "/stick.png", "/swimbait.png"];

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen Principal - Ajustes Clave */}
      {/* Quitamos aspect-square forzado y le damos una altura controlada */}
      <div className="relative bg-zinc-50 dark:bg-[#121212] flex items-center justify-center p-8 border border-gray-200 dark:border-zinc-800/50 rounded-lg h-[500px] md:h-[600px]">
        <Image 
          src={mainImage} 
          alt="Geco Lure" 
          width={800} 
          height={800} 
          // Redujimos el tamaño al 85% para darle respiro y quitamos el drop-shadow extremo
          className="w-[85%] h-[85%] object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
          priority
        />
        <div className="absolute top-6 left-6">
          <span className="bg-orange-500 text-white font-display font-black px-4 py-1.5 text-xs uppercase tracking-widest skew-x-[-12deg] inline-block shadow-md">
            NUEVO COLOR
          </span>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-4 mt-2">
        {thumbnails.map((thumb, index) => (
          <button 
            key={index}
            onClick={() => setMainImage(thumb)}
            // Ajustamos las miniaturas para que sean sutiles
            className={`bg-zinc-50 dark:bg-[#121212] aspect-square w-24 p-2 border-2 rounded-md transition-all flex items-center justify-center ${mainImage === thumb ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-transparent hover:border-gray-400 dark:border-zinc-800/50'}`}
          >
            <Image src={thumb} alt="Thumbnail" width={100} height={100} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}