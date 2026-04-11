"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiSearch, FiShoppingCart, FiMenu, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-[#0e0e0e]/95 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shadow-sm py-0" 
          : "bg-transparent border-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          
          {/* 1. LADO IZQUIERDO */}
          <div className="flex-1 flex items-center justify-start">
            <button className="md:hidden text-gray-900 dark:text-white hover:text-orange-500 transition-colors">
              <FiMenu className="w-6 h-6" />
            </button>

            <div className="hidden md:flex items-center gap-6 font-display font-bold text-sm tracking-widest uppercase">
              <Link href="/catalogo" className="text-orange-500 border-b-2 border-orange-500 pb-1 transition-colors">
                Catálogo
              </Link>
              <Link href="/novedades" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors drop-shadow-sm">
                Novedades
              </Link>
              <Link href="/equipo" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors drop-shadow-sm">
                Team GECO
              </Link>
            </div>
          </div>

          {/* 2. CENTRO (Logo) */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
              <Image
                src="/geco_letras.png"
                alt="GECO Lures Logo"
                width={150} 
                height={60} 
                className="w-auto h-10 sm:h-12 md:h-16 object-contain drop-shadow-md"
                priority 
              />
            </Link>
          </div>

          {/* 3. LADO DERECHO */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
            
            {/* NUEVA BARRA DE BÚSQUEDA (Cápsula) */}
            <button className="group flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent dark:border-zinc-800 rounded-full px-2 py-2 lg:px-4 lg:py-2 transition-all duration-300">
              <FiSearch className="w-5 h-5 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors" />
              {/* Este texto solo aparece en pantallas grandes (lg:block) */}
              <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                ¿Qué estás buscando?
              </span>
            </button>

            <button className="hidden md:block text-gray-900 dark:text-white hover:text-orange-500 transition-colors drop-shadow-sm">
              <FiUser className="w-5 h-5" />
            </button>
            
            {/* Theme Toggle */}
            <div className="w-5 h-5 flex items-center justify-center">
              {mounted && (
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-gray-900 dark:text-white hover:text-orange-500 transition-colors drop-shadow-sm"
                  aria-label="Cambiar tema"
                >
                  {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                </button>
              )}
            </div>

            {/* Tackle Box / Cart */}
            <button className="relative text-gray-900 dark:text-white hover:text-orange-500 transition-colors group drop-shadow-sm ml-1">
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold group-hover:scale-110 transition-transform">
                3
              </span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}