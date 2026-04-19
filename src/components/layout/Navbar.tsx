"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiSearch, FiShoppingCart, FiMenu, FiUser, FiX } from "react-icons/fi";
import SearchModal from "@/components/SearchModal"; 

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 

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
    <>
      <nav
        // 🚀 EFECTO GLASSMORPHISM PRINCIPAL
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isScrolled || isMobileMenuOpen
            ? "bg-white/60 dark:bg-black/50 backdrop-blur-lg border-b border-gray-200/50 dark:border-zinc-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-0"
            : "bg-transparent border-transparent py-2"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 relative">

            {/* 1. LADO IZQUIERDO */}
            <div className="flex-1 flex items-center justify-start">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>

              <div className="hidden md:flex items-center gap-6 font-display font-bold text-sm tracking-widest uppercase">
                <Link href="/catalogo" className="text-orange-500 border-b-2 border-orange-500 pb-1 transition-colors">Catálogo</Link>
                <Link href="/novedades" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors drop-shadow-sm">Novedades</Link>
                <Link href="/team" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors drop-shadow-sm">Team GECO</Link>
              </div>
            </div>

            {/* 2. CENTRO (Logo) */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link href="/" className="flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
                <Image src="/geco_letras.png" alt="GECO Lures Logo" width={150} height={60} className="w-auto h-10 sm:h-12 md:h-16 object-contain drop-shadow-md" priority />
              </Link>
            </div>

            {/* 3. LADO DERECHO */}
            <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">

              <button
                onClick={() => setIsSearchOpen(true)}
                // Hacemos el botón de búsqueda un poco más cristalino también
                className="group flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-sm border border-transparent dark:border-white/10 rounded-full px-2 py-2 lg:px-4 lg:py-2 transition-all duration-300"
              >
                <FiSearch className="w-5 h-5 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors" />
                <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-gray-700 dark:text-zinc-300 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                  ¿Qué estás buscando?
                </span>
              </button>

              <button className="hidden md:block text-gray-900 dark:text-white hover:text-orange-500 transition-colors drop-shadow-sm">
                <FiUser className="w-5 h-5" />
              </button>

              <div className="w-5 h-5 flex items-center justify-center">
                {mounted && (
                  <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-gray-900 dark:text-white hover:text-orange-500 transition-colors drop-shadow-sm" aria-label="Cambiar tema">
                    {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                  </button>
                )}
              </div>

              <button className="relative text-gray-900 dark:text-white hover:text-orange-500 transition-colors group drop-shadow-sm ml-1">
                <FiShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-md group-hover:scale-110 transition-transform">3</span>
              </button>
            </div>
          </div>
        </div>

        {/* 🚀 MENÚ MÓVIL CON GLASSMORPHISM */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
        >
          <div className="flex flex-col px-6 gap-6 font-display font-bold text-sm tracking-widest uppercase">
            <Link
              href="/catalogo"
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-orange-500 transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/novedades"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
            >
              Novedades
            </Link>
            <Link
              href="/team"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
            >
              Team GECO
            </Link>

            <div className="w-full h-px bg-black/10 dark:bg-white/10 my-2"></div>

            <button className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-orange-500 transition-colors w-fit">
              <FiUser className="w-5 h-5" /> Mi Cuenta
            </button>
          </div>
        </div>

      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}