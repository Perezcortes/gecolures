import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag, FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";
import { createClient } from "@/utils/supabase/server";

export default async function ProductGrid({ currentPage = 1 }: { currentPage?: number }) {
  const supabase = await createClient();

  // === LÓGICA DE PAGINACIÓN ===
  const ITEMS_PER_PAGE = 12; // Cantidad de señuelos por página
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // 1. Traemos los productos usando .range() para el corte, y pedimos el conteo total { count: "exact" }
  const { data: rawProducts, count, error } = await supabase
    .from("productos")
    .select(`
      id, 
      nombre, 
      precio_base, 
      slug, 
      squad_tip,
      categorias (nombre),
      producto_variantes (
        imagen_principal_url,
        colores (id, nombre, swatch_url)
      )
    `, { count: "exact" })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to); // <-- AQUÍ SE HACE EL CORTE EN LA BASE DE DATOS

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  // 2. Procesamos la data
  const productosFormateados = (rawProducts || []).map((prod: any) => {
    const coloresUnicos = new Map();
    let imagenPrincipal: string | null = null;

    prod.producto_variantes?.forEach((variante: any) => {
      if (!imagenPrincipal && variante.imagen_principal_url) {
        imagenPrincipal = variante.imagen_principal_url;
      }
      if (variante.colores && !coloresUnicos.has(variante.colores.id)) {
        coloresUnicos.set(variante.colores.id, variante.colores);
      }
    });

    return {
      id: prod.id,
      slug: prod.slug,
      name: prod.nombre,
      price: `$${prod.precio_base} MXN`,
      description: prod.squad_tip || "Arsenal de Élite",
      image: imagenPrincipal,
      tag: prod.categorias?.nombre || "",
      tagStyle: "bg-zinc-800 text-orange-500",
      colores: Array.from(coloresUnicos.values())
    };
  });

  return (
    <div className="flex-grow">
      {/* Barra de Ordenamiento */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800 gap-4">
        <span className="font-bold text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-400">
          Mostrando {from + 1} - {Math.min(to + 1, count || 0)} de {count} señuelos
        </span>
        <div className="flex items-center gap-3">
          <span className="font-bold text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-400">Ordenar Por:</span>
          <select className="bg-transparent border-none font-bold uppercase text-sm focus:ring-0 p-0 text-orange-500 cursor-pointer outline-none">
            <option className="bg-white dark:bg-zinc-900">Más Recientes</option>
            <option className="bg-white dark:bg-zinc-900">Precio: Menor a Mayor</option>
            <option className="bg-white dark:bg-zinc-900">Más Populares</option>
          </select>
        </div>
      </div>

      {productosFormateados.length === 0 && (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-lg">
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
            No hay señuelos disponibles en este momento.
          </p>
        </div>
      )}

      {/* Grid de Productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
        {productosFormateados.map((product) => (
          <Link 
            href={`/catalogo/${product.slug}`} 
            key={product.id} 
            className="group relative bg-zinc-50 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 flex flex-col hover:border-orange-500 dark:hover:border-orange-500 transition-colors duration-300"
          >
            {product.tag && (
              <div className="absolute top-0 left-0 z-20">
                <span className={`px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-black uppercase tracking-tighter ${product.tagStyle}`}>
                  {product.tag}
                </span>
              </div>
            )}
            
            <div className="relative aspect-square overflow-hidden bg-zinc-200/50 dark:bg-[#0a0a0a] p-6 flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="p-6 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 z-10" />
              ) : (
                <FiImage className="w-12 h-12 text-zinc-800 z-10" />
              )}
              <button className="absolute z-20 bottom-2 right-2 md:bottom-4 md:right-4 bg-orange-500 text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300 hover:bg-orange-600 shadow-lg">
                <FiShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <div className="flex flex-col items-start mb-2 gap-1">
                <h3 className="font-display font-black text-sm md:text-xl uppercase tracking-tighter leading-none text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  {product.name}
                </h3>
                <span className="font-display font-bold text-sm md:text-lg text-orange-500 whitespace-nowrap">
                  {product.price}
                </span>
              </div>
              
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-4 flex-grow line-clamp-2">
                {product.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50 flex items-center justify-between">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  {product.colores.length === 1 ? "COLOR ÚNICO" : `${product.colores.length} COLORES`}
                </p>
                
                {product.colores.length > 0 && (
                  <div className="flex -space-x-1.5">
                    {product.colores.slice(0, 3).map((color: any, idx: number) => (
                      <div 
                        key={color.id} title={color.nombre}
                        className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-zinc-50 dark:border-[#121212] shadow-sm relative bg-zinc-800"
                        style={{ backgroundImage: `url(${color.swatch_url})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 3 - idx }}
                      />
                    ))}
                    {product.colores.length > 3 && (
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-zinc-50 dark:border-[#121212] bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-500 relative" style={{ zIndex: 0 }}>
                        +{product.colores.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* === PAGINACIÓN REAL (ESTILO PROFESIONAL CON PUNTOS SUSPENSIVOS) === */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          
          {/* Botón Anterior */}
          {currentPage > 1 ? (
            <Link href={`/catalogo?page=${currentPage - 1}`} scroll={false} className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-orange-500 transition-colors">
              <FiChevronLeft className="w-5 h-5" />
            </Link>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-100/50 dark:bg-[#121212]/50 border border-gray-200/50 dark:border-zinc-800/50 text-gray-300 dark:text-zinc-700 cursor-not-allowed">
              <FiChevronLeft className="w-5 h-5" />
            </div>
          )}

          {/* Números Dinámicos */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Lógica para mostrar la primera, la última, la actual y las adyacentes
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <Link 
                  key={page} 
                  href={`/catalogo?page=${page}`}
                  scroll={false} 
                  className={`w-10 h-10 flex items-center justify-center transition-colors font-black text-sm border ${
                    currentPage === page 
                      ? 'bg-orange-500 text-white border-orange-500' 
                      : 'bg-zinc-100 dark:bg-[#121212] border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white hover:text-orange-500'
                  }`}
                >
                  {page}
                </Link>
              );
            }
            // Puntos suspensivos para los saltos
            if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
              return <div key={`dots-${page}`} className="w-10 flex items-center justify-center text-gray-400">...</div>;
            }
            return null;
          })}

          {/* Botón Siguiente */}
          {currentPage < totalPages ? (
            <Link href={`/catalogo?page=${currentPage + 1}`} scroll={false} className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-orange-500 transition-colors">
              <FiChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-100/50 dark:bg-[#121212]/50 border border-gray-200/50 dark:border-zinc-800/50 text-gray-300 dark:text-zinc-700 cursor-not-allowed">
              <FiChevronRight className="w-5 h-5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}