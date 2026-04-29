import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiImage, FiGrid, FiList } from "react-icons/fi";
import { createClient } from "@/utils/supabase/server";
import { calcularPrecioYPiezas } from "@/utils/calculadoraGeco";
import SortSelect from "./SortSelect";

type ProductGridProps = {
  currentPage?: number;
  categoria?: string;
  talla?: string;
  color?: string;
  modelo?: string;
  sort?: string; 
  view?: string; 
};

export default async function ProductGrid({ 
  currentPage = 1, 
  categoria = "", 
  talla = "", 
  color = "",
  modelo = "",
  sort = "newest",
  view = "grid"
}: ProductGridProps) {
  const supabase = await createClient();

  const ITEMS_PER_PAGE = 12;
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let terminoLimpio = modelo.toLowerCase().trim();
  const diccionario: { [key: string]: string } = {
    "senko": "stick", "zenko": "stick", "cenko": "stick", "sticks": "stick",
    "craws": "craw", "lizards": "lizard", "worms": "worm", "lombriz": "worm", "lombrices": "worm"
  };
  if (diccionario[terminoLimpio]) terminoLimpio = diccionario[terminoLimpio];

  let query = supabase
    .from("productos")
    .select(`
      id, nombre, precio_base, slug, squad_tip, created_at,
      categorias!inner(nombre),
      producto_variantes!inner(
        imagen_principal_url,
        especificaciones!inner(valor),
        colores!inner(id, nombre, swatch_url, clasificacion)
      )
    `, { count: "exact" });

  if (categoria) query = query.eq('categorias.nombre', categoria);
  if (talla) query = query.eq('producto_variantes.especificaciones.valor', talla);
  if (color) query = query.eq('producto_variantes.colores.nombre', color);
  if (terminoLimpio) query = query.ilike('nombre', `%${terminoLimpio}%`); 

  // 🚀 LÓGICA DE ORDENAMIENTO (SORTING)
  switch(sort) {
    case "price_asc": query = query.order('precio_base', { ascending: true }); break;
    case "price_desc": query = query.order('precio_base', { ascending: false }); break;
    case "alpha_asc": query = query.order('nombre', { ascending: true }); break;
    case "alpha_desc": query = query.order('nombre', { ascending: false }); break;
    default: query = query.order('created_at', { ascending: false }); break; // newest
  }

  const { data: rawProducts, count } = await query
    .eq('is_active', true)
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  const productosFormateados = (rawProducts || []).map((prod: any) => {
    const coloresUnicos = new Map();
    let imagenPrincipal: string | null = null;
    let tallaMuestra = "5\""; 

    prod.producto_variantes?.forEach((variante: any) => {
      if (!imagenPrincipal && variante.imagen_principal_url) imagenPrincipal = variante.imagen_principal_url;
      if (variante.especificaciones && variante.especificaciones.valor) tallaMuestra = variante.especificaciones.valor;
      if (variante.colores && !coloresUnicos.has(variante.colores.id)) coloresUnicos.set(variante.colores.id, variante.colores);
    });

    const coloresArray = Array.from(coloresUnicos.values());
    const colorObj = coloresArray.length > 0 ? (coloresArray[0] as any) : null;
    const colorMuestra = colorObj ? colorObj.nombre : "";
    const clasificacionMuestra = colorObj && colorObj.clasificacion ? colorObj.clasificacion : "Sólido";
    const calculo = calcularPrecioYPiezas(prod.nombre, tallaMuestra, colorMuestra, clasificacionMuestra);

    return {
      id: prod.id, slug: prod.slug, name: prod.nombre, price: calculo.precioFormateado, 
      piezas: calculo.textoPaquete, description: prod.squad_tip || "Arsenal de Élite",
      image: imagenPrincipal, category: prod.categorias?.nombre || "", colores: coloresArray
    };
  });

  const getUrlBuilder = () => {
    const params = new URLSearchParams();
    if (categoria) params.set('categoria', categoria);
    if (talla) params.set('talla', talla);
    if (color) params.set('color', color);
    if (modelo) params.set('modelo', modelo);
    return params;
  };

  const getPaginationUrl = (page: number) => {
    const params = getUrlBuilder();
    params.set('page', page.toString());
    params.set('sort', sort);
    params.set('view', view);
    return `/catalogo?${params.toString()}`;
  };

  const getControlUrl = (key: string, value: string) => {
    const params = getUrlBuilder();
    params.set('page', '1');
    params.set('sort', key === 'sort' ? value : sort);
    params.set('view', key === 'view' ? value : view);
    return `/catalogo?${params.toString()}`;
  };

  const generarPaginacion = (current: number, total: number) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, '...', total];
    if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  const paginasMostradas = generarPaginacion(currentPage, totalPages);
  const isList = view === 'list';

  return (
    <div className="flex-grow w-full">
      
      {/* 🚀 BARRA SUPERIOR (SORT & VIEW) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800 gap-4">
        <span className="font-bold text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-400">
          {count === 0 ? "Sin resultados" : `${count} SEÑUELOS`}
        </span>

        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* SORT BY DROPDOWN */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden sm:block">
              Ordenar:
            </label>
            <SortSelect currentSort={sort} />
          </div>

          {/* VIEW TOGGLES (Grid vs List) */}
          <div className="flex items-center bg-gray-100 dark:bg-zinc-900 rounded p-1">
            <Link 
              href={getControlUrl('view', 'grid')} scroll={false}
              className={`p-2 rounded transition-colors ${!isList ? 'bg-white dark:bg-[#222] text-orange-500 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <FiGrid className="w-4 h-4" />
            </Link>
            <Link 
              href={getControlUrl('view', 'list')} scroll={false}
              className={`p-2 rounded transition-colors ${isList ? 'bg-white dark:bg-[#222] text-orange-500 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <FiList className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {productosFormateados.length === 0 && (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-lg">
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-4">No hay señuelos con estos filtros.</p>
          <Link href="/catalogo" className="inline-block px-6 py-3 bg-orange-500 text-white font-black text-xs uppercase hover:bg-orange-600 transition-colors rounded-sm">Limpiar Filtros</Link>
        </div>
      )}

      {/* 🚀 RENDERIZADO CONDICIONAL: GRID vs LIST */}
      <div className={isList ? "flex flex-col gap-4" : "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8"}>
        {productosFormateados.map((product) => (
          <Link 
            href={`/catalogo/${product.slug}`} 
            key={product.id} 
            className={`group bg-zinc-50 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 hover:border-orange-500 transition-colors overflow-hidden ${isList ? 'flex flex-row items-center h-32 sm:h-40' : 'relative flex flex-col'}`}
          >
            {/* Imagen */}
            <div className={`relative bg-zinc-200/50 dark:bg-[#0a0a0a] flex items-center justify-center p-4 ${isList ? 'w-32 sm:w-48 h-full flex-shrink-0 border-r border-zinc-800/50' : 'aspect-square w-full'}`}>
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="p-4 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 z-10" />
              ) : (
                <FiImage className="w-10 h-10 text-zinc-800 z-10" />
              )}
            </div>
            
            {/* Contenido */}
            <div className={`flex flex-col flex-grow ${isList ? 'p-4 sm:p-6 justify-center' : 'p-4 md:p-6'}`}>
              <div className={isList ? "flex justify-between items-start w-full" : ""}>
                <div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest truncate mb-1">
                    {product.category}
                  </p>
                  <h3 className={`font-display font-black uppercase text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors leading-tight ${isList ? 'text-sm sm:text-xl max-w-lg' : 'text-sm md:text-xl mb-3'}`}>
                    {product.name}
                  </h3>
                </div>
                {isList && (
                  <div className="hidden sm:block text-right">
                    <p className="text-orange-500 font-display font-black text-2xl">{product.price}</p>
                    <p className="text-[9px] font-black uppercase text-zinc-500 bg-zinc-800 px-2 py-1 mt-1 rounded-sm inline-block">{product.piezas}</p>
                  </div>
                )}
              </div>

              {/* Precio Móvil en Lista / Desktop en Grid */}
              <div className={`flex flex-wrap items-center gap-2 ${isList ? 'sm:hidden mt-2' : 'mb-4'}`}>
                <p className="text-orange-500 font-display font-bold text-sm md:text-lg">{product.price}</p>
                <span className="text-[9px] font-black uppercase text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-sm">
                  {product.piezas}
                </span>
              </div>

              {/* Colores Footer */}
              <div className={`flex items-center justify-between ${isList ? 'mt-3 sm:mt-4' : 'mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50'}`}>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  {product.colores.length === 1 ? "COLOR ÚNICO" : `${product.colores.length} COLORES`}
                </p>
                <div className="flex -space-x-1.5">
                  {product.colores.slice(0, 3).map((color: any, idx: number) => (
                    <div key={color.id} title={color.nombre} className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-zinc-50 dark:border-[#121212]" style={{ backgroundImage: `url(${color.swatch_url})`, backgroundSize: 'cover', zIndex: 3 - idx }} />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 🚀 UI DE PAGINACIÓN REDISEÑADA */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          {currentPage > 1 ? (
            <Link href={getPaginationUrl(currentPage - 1)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white hover:text-orange-500 transition-colors rounded-sm shadow-sm"><FiChevronLeft className="w-5 h-5" /></Link>
          ) : (
            <span className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 text-gray-400 rounded-sm opacity-50"><FiChevronLeft className="w-5 h-5" /></span>
          )}

          {paginasMostradas.map((page, index) => {
            if (page === '...') return <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500 font-black">...</span>;
            return (
              <Link key={page} href={getPaginationUrl(page as number)} className={`w-10 h-10 flex items-center justify-center font-black text-sm border transition-colors rounded-sm ${currentPage === page ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-zinc-800 hover:text-orange-500'}`}>
                {page}
              </Link>
            );
          })}

          {currentPage < totalPages ? (
            <Link href={getPaginationUrl(currentPage + 1)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white hover:text-orange-500 transition-colors rounded-sm shadow-sm"><FiChevronRight className="w-5 h-5" /></Link>
          ) : (
            <span className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 text-gray-400 rounded-sm opacity-50"><FiChevronRight className="w-5 h-5" /></span>
          )}
        </div>
      )}
    </div>
  );
}