"use client";

import { useRef } from 'react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import Link from 'next/link';
import Image from 'next/image';
import { FiImage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
  const { viewedProducts } = useRecentlyViewed();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 🚀 Ampliamos a 10 productos para que las flechas tengan sentido
  const displayProducts = viewedProducts
    .filter(p => p.id !== currentProductId)
    .slice(0, 10);

  if (displayProducts.length === 0) return null;

  // 🚀 Función para mover el carrusel
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Cuántos pixeles se mueve por clic
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="w-full mt-16 pt-12 border-t border-gray-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-display font-black text-xl md:text-2xl uppercase tracking-tighter text-gray-900 dark:text-white">
          VISTO <span className="text-orange-500">RECIENTEMENTE</span>
        </h3>
        
        {/* Controles del Carrusel (Solo aparecen si hay más de 4 productos) */}
        {displayProducts.length > 4 && (
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] text-gray-500 hover:text-orange-500 hover:border-orange-500 transition-colors rounded-sm"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] text-gray-500 hover:text-orange-500 hover:border-orange-500 transition-colors rounded-sm"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 lg:gap-6 pb-6 scrollbar-hide scroll-smooth"
      >
        {displayProducts.map((product) => (
          <Link 
            href={`/catalogo/${product.slug}`} 
            key={product.id} 
            // 🚀 Anchos fijos (min-w y w) para que no se deformen
            className="group block min-w-[180px] w-[180px] md:min-w-[240px] md:w-[240px] flex-shrink-0 snap-start bg-zinc-50 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 hover:border-orange-500 transition-colors flex flex-col rounded-sm"
          >
            {/* 🚀 Aspect-square para que la foto quede igual que en el catálogo */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-200/50 dark:bg-[#0a0a0a] flex items-center justify-center p-4">
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="p-4 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 z-10" />
              ) : (
                <FiImage className="w-8 h-8 text-zinc-800 z-10" />
              )}
            </div>
            
            <div className="p-4 flex flex-col flex-grow border-t border-gray-200 dark:border-zinc-800/50">
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest truncate mb-1">
                {product.category}
              </p>
              <h4 className="font-display font-black text-sm md:text-base uppercase text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
                {product.name}
              </h4>
              <div className="mt-auto pt-3">
                <p className="text-orange-500 font-display font-bold text-sm md:text-lg">
                  {product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}