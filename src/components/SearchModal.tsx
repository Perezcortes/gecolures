"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiSearch, FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client"; 
import { calcularPrecioYPiezas } from "@/utils/calculadoraGeco"; 

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const topKeywords = ["Sticks", "Craws", "Terminal Tackle", "Watermelon", "Nuevos Lanzamientos"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const supabase = createClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSearchTerm(""); 
      buscarProductosEnSupabase(""); 
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    
    setIsSearching(true);
    const delayDebounceFn = setTimeout(() => {
      buscarProductosEnSupabase(searchTerm);
    }, 400); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, isOpen]);

  const buscarProductosEnSupabase = async (term: string) => {
    try {
      let query = supabase
        .from("productos")
        .select(`
          id, nombre, slug,
          categorias (nombre),
          producto_variantes (
            imagen_principal_url,
            colores (nombre, clasificacion),
            especificaciones (valor)
          )
        `)
        .eq('is_active', true);

      if (term.trim() !== "") {
        // 🚀 NORMALIZACIÓN TÁCTICA DE BÚSQUEDA
        let searchFor = term.toLowerCase().trim();
        
        // Diccionario de sinónimos y correcciones de plurales
        const diccionario: { [key: string]: string } = {
          "senko": "stick",
          "zenko": "stick",
          "cenko": "stick",
          "sticks": "stick",
          "craws": "craw",
          "lizards": "lizard",
          "worms": "worm",
          "lombriz": "worm",
          "lombrices": "worm",
          "criaturas": "craw",
          "paletones": "crankbait"
        };

        // Si la palabra exacta existe en el diccionario, la cambiamos por la raíz
        if (diccionario[searchFor]) {
          searchFor = diccionario[searchFor];
        }

        // Buscamos coincidencias parciales (ilike permite ignorar Mayúsculas/Minúsculas)
        query = query.ilike('nombre', `%${searchFor}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false }).limit(4);

      if (error) throw error;

      const productosFormateados = (data || []).map((prod: any) => {
        let imagenPrincipal = null;
        let tallaMuestra = "5\""; 
        let colorMuestra = "";
        let clasMuestra = "Sólido";

        if (prod.producto_variantes && prod.producto_variantes.length > 0) {
          const varianteConFoto = prod.producto_variantes.find((v: any) => v.imagen_principal_url);
          if (varianteConFoto) imagenPrincipal = varianteConFoto.imagen_principal_url;

          const primeraVar = prod.producto_variantes[0];
          if (primeraVar.especificaciones?.valor) tallaMuestra = primeraVar.especificaciones.valor;
          if (primeraVar.colores) {
            colorMuestra = primeraVar.colores.nombre;
            clasMuestra = primeraVar.colores.clasificacion || "Sólido";
          }
        }

        const calculo = calcularPrecioYPiezas(prod.nombre, tallaMuestra, colorMuestra, clasMuestra);

        return {
          id: prod.id,
          slug: prod.slug,
          name: prod.nombre,
          category: prod.categorias?.nombre || "GECO",
          price: calculo.precioFormateado,
          img: imagenPrincipal || "/geco_letras.png" 
        };
      });

      setResultados(productosFormateados);
    } catch (error) {
      console.error("Error buscando en el arsenal:", error);
    } finally {
      setIsSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col font-display">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative w-full bg-white/85 dark:bg-black/80 backdrop-blur-2xl shadow-2xl border-b border-white/40 dark:border-white/10 animate-in slide-in-from-top-4 duration-300 h-fit max-h-[85vh] flex flex-col">
        
        {/* BARRA DE BÚSQUEDA */}
        <div className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 border-b border-gray-200/50 dark:border-white/10">
          
          <div className="flex-1 flex items-center gap-3 bg-white/50 dark:bg-white/5 px-4 py-3 rounded-md border border-gray-200/50 dark:border-white/10 focus-within:border-orange-500 transition-colors">
            {isSearching ? <FiRefreshCw className="w-5 h-5 text-orange-500 animate-spin" /> : <FiSearch className="w-5 h-5 text-orange-500" />}
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca sticks, craws, senkos..." 
              autoFocus
              className="w-full bg-transparent border-none outline-none text-sm md:text-base font-bold text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button onClick={onClose} className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors bg-white/50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-md">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENIDO DEL MODAL */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* KEYWORDS */}
            <div className="w-full lg:w-1/4 order-1 lg:order-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 mb-4 lg:mb-6">
                Búsquedas Populares
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-4">
                {topKeywords.map((keyword, index) => (
                  <button 
                    key={index}
                    onClick={() => setSearchTerm(keyword)} 
                    className="bg-white/60 dark:bg-white/5 lg:bg-transparent lg:dark:bg-transparent px-3 py-1.5 lg:p-0 rounded text-xs lg:text-sm font-bold text-gray-800 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors uppercase tracking-widest text-left"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-px bg-gray-200/50 dark:bg-white/10 order-none"></div>

            {/* PRODUCTOS */}
            <div className="w-full lg:w-3/4 order-2 lg:order-1">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400">
                  {searchTerm ? `Resultados para "${searchTerm}"` : "Productos Más Buscados"}
                </h3>
              </div>

              {!isSearching && resultados.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <FiAlertCircle className="w-10 h-10 text-gray-400 dark:text-zinc-600 mb-3" />
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-500">No encontramos arsenal para tu búsqueda.</p>
                </div>
              ) : (
                <div className="flex overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-6 lg:pb-0 scrollbar-hide">
                  {resultados.map((prod) => (
                    <Link href={`/catalogo/${prod.slug}`} key={prod.id} onClick={onClose} className="group block min-w-[160px] sm:min-w-[180px] lg:min-w-0 snap-start">
                      <div className="aspect-[4/3] lg:aspect-square bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-md border border-gray-200/50 dark:border-white/10 mb-3 overflow-hidden relative flex items-center justify-center p-4 shadow-sm hover:border-orange-500/50 transition-colors">
                        <Image src={prod.img} alt={prod.name} fill className="object-contain p-2 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <p className="text-[9px] font-bold text-gray-600 dark:text-zinc-400 uppercase tracking-widest truncate">{prod.category}</p>
                      <h4 className="text-xs lg:text-sm font-black text-gray-900 dark:text-white uppercase leading-tight mt-1 group-hover:text-orange-500 transition-colors line-clamp-2">{prod.name}</h4>
                      <p className="text-[10px] lg:text-xs font-bold text-orange-500 mt-1">{prod.price}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
        
        {searchTerm && resultados.length > 0 && (
          <div className="border-t border-gray-200/50 dark:border-white/10 p-4 text-center flex-shrink-0">
            <Link href={`/catalogo?modelo=${searchTerm}`} onClick={onClose} className="text-xs font-black uppercase tracking-widest text-orange-500 hover:text-orange-600">
              Ver todos los resultados en catálogo &rarr;
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}