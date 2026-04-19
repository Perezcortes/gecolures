import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag, FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";
import { createClient } from "@/utils/supabase/server";
import { calcularPrecioYPiezas } from "@/utils/calculadoraGeco";

type ProductGridProps = {
  currentPage?: number;
  categoria?: string;
  talla?: string;
  color?: string;
  modelo?: string;
};

export default async function ProductGrid({ 
  currentPage = 1, 
  categoria = "", 
  talla = "", 
  color = "",
  modelo = ""
}: ProductGridProps) {
  const supabase = await createClient();

  const ITEMS_PER_PAGE = 12;
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("productos")
    .select(`
      id, 
      nombre, 
      precio_base, 
      slug, 
      squad_tip,
      categorias!inner(nombre),
      producto_variantes!inner(
        imagen_principal_url,
        especificaciones!inner(valor),
        colores!inner(id, nombre, swatch_url, clasificacion)
      )
    `, { count: "exact" });

  if (categoria) {
    query = query.eq('categorias.nombre', categoria);
  }
  if (talla) {
    query = query.eq('producto_variantes.especificaciones.valor', talla);
  }
  if (color) {
    query = query.eq('producto_variantes.colores.nombre', color);
  }
  if (modelo) {
    // Poner el % en ambos lados significa "Que CONTENGA esta palabra en cualquier parte"
    query = query.ilike('nombre', `%${modelo}%`); 
  }

  const { data: rawProducts, count } = await query
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  const productosFormateados = (rawProducts || []).map((prod: any) => {
    const coloresUnicos = new Map();
    let imagenPrincipal: string | null = null;
    let tallaMuestra = "5\""; 

    prod.producto_variantes?.forEach((variante: any) => {
      if (!imagenPrincipal && variante.imagen_principal_url) {
        imagenPrincipal = variante.imagen_principal_url;
      }
      
      if (variante.especificaciones && variante.especificaciones.valor) {
        tallaMuestra = variante.especificaciones.valor;
      }

      if (variante.colores && !coloresUnicos.has(variante.colores.id)) {
        coloresUnicos.set(variante.colores.id, variante.colores);
      }
    });

    const coloresArray = Array.from(coloresUnicos.values());
    const colorObj = coloresArray.length > 0 ? (coloresArray[0] as any) : null;
    
    const colorMuestra = colorObj ? colorObj.nombre : "";
    const clasificacionMuestra = colorObj && colorObj.clasificacion ? colorObj.clasificacion : "Sólido";

    const calculo = calcularPrecioYPiezas(prod.nombre, tallaMuestra, colorMuestra, clasificacionMuestra);

    return {
      id: prod.id,
      slug: prod.slug,
      name: prod.nombre,
      price: calculo.precioFormateado, 
      piezas: calculo.textoPaquete,    
      description: prod.squad_tip || "Arsenal de Élite",
      image: imagenPrincipal,
      tag: prod.categorias?.nombre || "",
      tagStyle: "bg-zinc-800 text-orange-500",
      colores: coloresArray
    };
  });

  const getPaginationUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (categoria) params.set('categoria', categoria);
    if (talla) params.set('talla', talla);
    if (color) params.set('color', color);
    if (modelo) params.set('modelo', modelo);
    return `/catalogo?${params.toString()}`;
  };

  return (
    <div className="flex-grow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800 gap-4">
        <span className="font-bold text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-400">
          {count === 0 ? "Sin resultados" : `Mostrando ${from + 1} - ${Math.min(to + 1, count || 0)} de ${count} señuelos`}
        </span>
      </div>

      {productosFormateados.length === 0 && (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-lg">
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
            No hay señuelos con estos filtros en el arsenal.
          </p>
          <Link href="/catalogo" className="mt-4 inline-block text-orange-500 font-black text-xs uppercase hover:underline">
            Limpiar Filtros
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
        {productosFormateados.map((product) => (
          <Link 
            href={`/catalogo/${product.slug}`} 
            key={product.id} 
            className="group relative bg-zinc-50 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 flex flex-col hover:border-orange-500 transition-colors"
          >
            <div className="relative aspect-square overflow-hidden bg-zinc-200/50 dark:bg-[#0a0a0a] p-6 flex items-center justify-center">
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="p-6 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 z-10" />
              ) : (
                <FiImage className="w-12 h-12 text-zinc-800 z-10" />
              )}
            </div>
            
            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <h3 className="font-display font-black text-sm md:text-xl uppercase tracking-tighter text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-1">
                {product.name}
              </h3>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <p className="text-orange-500 font-display font-bold text-sm md:text-lg">{product.price}</p>
                <span className="text-[9px] font-black uppercase text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-sm">
                  {product.piezas}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50 flex items-center justify-between">
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

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link 
              key={page} 
              href={getPaginationUrl(page)}
              className={`w-10 h-10 flex items-center justify-center font-black text-sm border ${currentPage === page ? 'bg-orange-500 text-white border-orange-500' : 'bg-zinc-100 dark:bg-[#121212] border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white'}`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}