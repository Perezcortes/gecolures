"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiImage, FiZoomIn } from "react-icons/fi";

export default function ProductGallery({ imagenes }: { imagenes: string[] }) {
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  // Estados para la lupa
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (imagenes.length > 0) {
      setMainImage(imagenes[0]);
    }
  }, [imagenes]);

  // Calcula la posición del mouse en porcentaje para hacer el zoom en el lugar correcto
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  if (!mainImage) {
    return <div className="h-[500px] bg-zinc-100 dark:bg-[#121212] rounded-lg flex items-center justify-center"><FiImage className="w-12 h-12 text-zinc-500"/></div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Contenedor Principal con Lupa */}
      <div 
        className="relative bg-zinc-50 dark:bg-[#121212] flex items-center justify-center p-8 border border-gray-200 dark:border-zinc-800/50 rounded-lg h-[450px] md:h-[550px] overflow-hidden cursor-crosshair group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent z-0"></div>
        
        {/* Icono de Lupa que desaparece al hacer hover */}
        <div className="absolute top-4 right-4 z-20 bg-zinc-900/50 text-white p-2 rounded-full opacity-50 group-hover:opacity-0 transition-opacity pointer-events-none">
          <FiZoomIn className="w-4 h-4" />
        </div>

        <Image 
          src={mainImage} 
          alt="Geco Lure" 
          fill
          // Si está en hover, hacemos scale-250 (2.5x), si no, lo dejamos normal. 
          // Redujimos la duración de la transición para que se sienta más "ágil" al seguir el mouse.
          className={`p-12 object-contain drop-shadow-xl z-10 transition-transform duration-100 ease-out ${isHovering ? 'scale-[2.5]' : 'scale-100'}`}
          style={{
            transformOrigin: isHovering ? `${mousePos.x}% ${mousePos.y}%` : 'center center'
          }}
          priority
        />
      </div>

      {/* Miniaturas */}
      {imagenes.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-2">
          {imagenes.map((thumb, index) => (
            <button 
              key={index}
              onClick={() => setMainImage(thumb)}
              className={`relative bg-zinc-50 dark:bg-[#121212] aspect-square w-20 md:w-24 p-2 border-2 rounded-md transition-all flex items-center justify-center overflow-hidden ${mainImage === thumb ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-transparent hover:border-gray-400 dark:border-zinc-800/50'}`}
            >
              <Image src={thumb} alt="Thumbnail" fill className="p-2 object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}