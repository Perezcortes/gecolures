import { FiFilter } from "react-icons/fi";
import { createClient } from "@/utils/supabase/server";

export default async function ProductFilters() {
  const supabase = await createClient();

  // Hacemos las 3 consultas al mismo tiempo para que cargue a la velocidad del rayo
  const [
    { data: categorias },
    { data: tallas },
    { data: colores }
  ] = await Promise.all([
    supabase.from("categorias").select("id, nombre").order("nombre"),
    supabase.from("especificaciones").select("id, valor").eq("tipo", "talla"),
    supabase.from("colores").select("id, nombre, swatch_url").order("nombre")
  ]);

  // Aplicamos la misma magia matemática para ordenar las pulgadas (3", 3.5", 4", etc.)
  const tallasOrdenadas = (tallas || []).sort((a, b) => {
    const numA = parseFloat(a.valor.replace(/[^0-9.]/g, ''));
    const numB = parseFloat(b.valor.replace(/[^0-9.]/g, ''));
    if (isNaN(numA) && isNaN(numB)) return a.valor.localeCompare(b.valor);
    if (isNaN(numA)) return 1;
    if (isNaN(numB)) return -1;
    return numA - numB;
  });

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-10">
      <div className="lg:hidden flex items-center gap-2 mb-4 bg-zinc-100 dark:bg-zinc-900 p-4 font-bold uppercase">
        <FiFilter className="text-orange-500" />
        <span>Mostrar Filtros</span>
      </div>

      {/* CATEGORÍAS REALES */}
      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-6">Categoría</h3>
        <div className="space-y-4">
          {categorias?.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 bg-zinc-100 dark:bg-[#121212] border-gray-300 dark:border-zinc-700 text-orange-500 focus:ring-orange-500 rounded-sm" 
              />
              <span className="uppercase font-bold tracking-widest text-xs text-gray-700 dark:text-zinc-300 group-hover:text-orange-500 transition-colors">
                {cat.nombre}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* TAMAÑOS REALES Y ORDENADOS */}
      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-6">Tamaño</h3>
        <div className="grid grid-cols-2 gap-2">
          {tallasOrdenadas.map((talla) => (
            <button 
              key={talla.id}
              className="bg-zinc-100 dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:border-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors text-gray-900 dark:text-white"
            >
              {talla.valor}
            </button>
          ))}
        </div>
      </div>

      {/* COLORES CON TEXTURAS REALES */}
      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-6">Color</h3>
        <div className="flex flex-wrap gap-2.5">
          {colores?.map((color) => (
            <button 
              key={color.id}
              title={color.nombre}
              className="w-8 h-8 rounded border border-gray-300 dark:border-zinc-700 hover:border-orange-500 hover:scale-110 transition-all shadow-sm bg-zinc-800"
              style={{ 
                backgroundImage: `url(${color.swatch_url})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}