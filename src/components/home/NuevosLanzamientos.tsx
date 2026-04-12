import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { FiImage } from "react-icons/fi";

export default async function NuevosLanzamientos() {
  const supabase = await createClient();

  // 1. Traer los 3 productos más recientes
  const { data: rawProducts } = await supabase
    .from("productos")
    .select(`
      id, 
      nombre, 
      precio_base, 
      slug,
      categorias (nombre),
      producto_variantes (imagen_principal_url)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (!rawProducts || rawProducts.length === 0) return null;

  // 2. Procesar para sacar la imagen principal de cada uno
  const productos = rawProducts.map((prod: any) => {
    let imagenPrincipal: string | null = null;
    prod.producto_variantes?.forEach((v: any) => {
      if (!imagenPrincipal && v.imagen_principal_url) {
        imagenPrincipal = v.imagen_principal_url;
      }
    });
    return { ...prod, imagenPrincipal };
  });

  const destacado = productos[0];
  const secundarios = productos.slice(1, 3);

  return (
    <section className="pt-12 pb-24 px-6 md:px-12 bg-white dark:bg-[#0e0e0e] relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">
            NUEVOS LANZAMIENTOS
          </h2>
          <div className="h-2 w-32 bg-orange-500 mt-4"></div>
        </div>
        <Link href="/catalogo" className="font-display font-black text-orange-500 uppercase tracking-widest hover:underline decoration-4">
          VER CATÁLOGO COMPLETO
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* === PRODUCTO DESTACADO (GRANDE) === */}
        {destacado && (
          <Link href={`/catalogo/${destacado.slug}`} className="md:col-span-7 bg-zinc-100 dark:bg-zinc-900 group cursor-pointer overflow-hidden relative border border-gray-200 dark:border-zinc-800 flex flex-col hover:border-orange-500 transition-colors">
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              <span className="bg-orange-500 text-white px-3 py-1 font-display font-black uppercase tracking-widest text-xs">
                RECIÉN LLEGADO
              </span>
            </div>
            
            <div className="w-full h-[500px] bg-zinc-200 dark:bg-[#0a0a0a] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent z-0"></div>
              {destacado.imagenPrincipal ? (
                <Image 
                  src={destacado.imagenPrincipal} 
                  alt={destacado.nombre} 
                  fill
                  className="object-contain p-12 drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 z-10"
                />
              ) : (
                <FiImage className="w-24 h-24 text-zinc-800 z-10" />
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/90 dark:from-black dark:via-black/90 to-transparent z-20">
              <h3 className="text-4xl font-display font-black uppercase tracking-tighter mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                {destacado.nombre}
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm">
                ${destacado.precio_base} MXN
              </p>
            </div>
          </Link>
        )}

        {/* === PRODUCTOS SECUNDARIOS (DERECHA) === */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {secundarios.map((prod, index) => {
            // Alternamos la dirección del skew para que se vea dinámico (derecha/izquierda)
            const isEven = index % 2 === 0; 
            const bgSkewClass = isEven ? "skew-x-12" : "-skew-x-12";
            const imgSkewClass = isEven ? "-skew-x-12" : "skew-x-12";

            return (
              <Link key={prod.id} href={`/catalogo/${prod.slug}`} className="flex-1 bg-zinc-100 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 group cursor-pointer flex items-center relative p-6 overflow-hidden hover:border-orange-500 transition-colors">
                <div className="w-1/2 z-20 relative">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-orange-500 mb-1">
                    {prod.categorias?.nombre || "EQUIPO TÁCTICO"}
                  </p>
                  <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-1 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    {prod.nombre}
                  </h4>
                  <p className="text-gray-500 dark:text-zinc-400 font-bold text-sm mt-2">${prod.precio_base} MXN</p>
                </div>
                
                <div className={`w-1/2 h-full absolute right-0 bg-zinc-200 dark:bg-[#0a0a0a] transform ${bgSkewClass} group-hover:skew-x-0 transition-transform duration-500 flex items-center justify-center z-10`}>
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent z-0"></div>
                  {prod.imagenPrincipal ? (
                    <Image 
                      src={prod.imagenPrincipal} 
                      alt={prod.nombre} 
                      fill
                      className={`object-contain p-4 drop-shadow-xl transform ${imgSkewClass} group-hover:skew-x-0 group-hover:scale-110 transition-transform duration-500 z-10`}
                    />
                  ) : (
                    <FiImage className="w-10 h-10 text-zinc-800 z-10" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}