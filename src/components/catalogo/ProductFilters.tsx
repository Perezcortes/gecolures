"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter, FiChevronDown, FiX } from "react-icons/fi"; // <-- Importamos FiX
import { createClient } from "@/utils/supabase/client";

const parseSize = (val: string) => {
  let str = val.replace(/[^0-9\s\/.]/g, '').trim();
  if (str.includes('/')) {
    const parts = str.split(' ');
    if (parts.length === 2) {
      const whole = parseFloat(parts[0]);
      const [num, den] = parts[1].split('/');
      return whole + (parseFloat(num) / parseFloat(den));
    } else {
      const [num, den] = parts[0].split('/');
      return parseFloat(num) / parseFloat(den);
    }
  }
  return parseFloat(str);
};

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [categorias, setCategorias] = useState<any[]>([]);
  const [tallas, setTallas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [modelosEncontrados, setModelosEncontrados] = useState<string[]>([]);

  const categoriaActual = searchParams.get('categoria') || "";
  const tallaActual = searchParams.get('talla') || "";
  const colorActual = searchParams.get('color') || "";
  const modeloActual = searchParams.get('modelo') || "";

  useEffect(() => {
    async function cargarFiltros() {
      const [{ data: cat }, { data: tal }, { data: col }, { data: prod }] = await Promise.all([
        supabase.from("categorias").select("id, nombre").order("nombre"),
        supabase.from("especificaciones").select("id, valor").eq("tipo", "talla"),
        supabase.from("colores").select("id, nombre, swatch_url").order("nombre"),
        supabase.from("productos").select("nombre").eq('is_active', true)
      ]);

      if (cat) setCategorias(cat);
      if (tal) setTallas(tal);
      if (col) setColores(col);

      if (prod) {
        const tipos = prod.map(p => p.nombre.split(' ')[0].toUpperCase());
        const tiposUnicos = Array.from(new Set(tipos)).sort();
        setModelosEncontrados(tiposUnicos);
      }
    }
    cargarFiltros();
  }, []);

  const tallasOrdenadas = [...tallas].sort((a, b) => {
    const numA = parseSize(a.valor);
    const numB = parseSize(b.valor);
    if (isNaN(numA) && isNaN(numB)) return a.valor.localeCompare(b.valor);
    if (isNaN(numA)) return 1;
    if (isNaN(numB)) return -1;
    return numA - numB;
  });

  const actualizarFiltro = (tipo: string, valor: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(tipo) === valor) {
      params.delete(tipo);
      if (tipo === 'categoria' && valor === 'SEÑUELOS') {
        params.delete('modelo');
      }
    } else {
      params.set(tipo, valor);
    }

    params.set('page', '1');
    router.push(`/catalogo?${params.toString()}`, { scroll: false });
  };

  // Verificamos si la búsqueda actual es texto libre (ej. "black") o si es un modelo oficial (ej. "STICK")
  const esBusquedaLibre = modeloActual && !modelosEncontrados.includes(modeloActual.toUpperCase());

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-10">

      <div className="lg:hidden flex items-center gap-2 mb-4 bg-zinc-100 dark:bg-zinc-900 p-4 font-bold uppercase cursor-pointer text-gray-900 dark:text-white">
        <FiFilter className="text-orange-500" />
        <span>Filtros del Arsenal</span>
      </div>

      {/* 🚀 NUEVO: INDICADOR DE BÚSQUEDA LIBRE */}
      {esBusquedaLibre && (
        <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-md flex items-center justify-between mb-8 animate-in fade-in duration-300">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-0.5">Buscando coincidencia:</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white uppercase truncate max-w-[150px]">"{modeloActual}"</p>
          </div>
          <button 
            onClick={() => actualizarFiltro('modelo', modeloActual)} 
            className="p-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded text-gray-500 hover:text-orange-500 transition-colors"
            title="Limpiar búsqueda"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* CATEGORÍAS */}
      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">
          Categoría
        </h3>
        <div className="space-y-4">
          {categorias.map((cat) => {
            const nombreCategoria = cat.nombre.toUpperCase();
            const esSeñuelos = nombreCategoria === "SEÑUELOS";
            const estaActivo = categoriaActual.toUpperCase() === "SEÑUELOS";

            return (
              <div key={cat.id} className="flex flex-col">
                <div className="flex items-center justify-between group">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categoriaActual.toUpperCase() === nombreCategoria}
                      onChange={() => actualizarFiltro('categoria', cat.nombre)}
                      className="w-4 h-4 bg-zinc-100 dark:bg-[#121212] border-gray-300 dark:border-zinc-700 text-orange-500 focus:ring-orange-500 rounded-sm"
                    />
                    <span className={`uppercase font-bold tracking-widest text-[11px] transition-colors ${estaActivo && esSeñuelos ? 'text-orange-500' : 'text-gray-700 dark:text-zinc-300 group-hover:text-orange-500'}`}>
                      {cat.nombre}
                    </span>
                  </label>

                  {esSeñuelos && (
                    <div className={`transition-transform duration-300 ${estaActivo ? 'rotate-180 text-orange-500' : 'text-zinc-600'}`}>
                      <FiChevronDown />
                    </div>
                  )}
                </div>

                {/* LISTA DESPLEGABLE DE MODELOS (SOLO SI NO ES BÚSQUEDA LIBRE) */}
                {esSeñuelos && estaActivo && (
                  <div className="ml-6 mt-4 space-y-2 border-l border-zinc-200 dark:border-zinc-800 pl-4 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Modelos</p>
                    {modelosEncontrados.length > 0 ? (
                      modelosEncontrados.map((tipo) => (
                        <label key={tipo} className="flex items-center gap-2 cursor-pointer group/item">
                          <input
                            type="checkbox"
                            checked={modeloActual === tipo}
                            onChange={() => actualizarFiltro('modelo', tipo)}
                            className="w-3 h-3 bg-transparent border-zinc-700 text-orange-500 rounded-xs"
                          />
                          <span className={`uppercase font-bold tracking-widest text-[10px] transition-colors ${modeloActual === tipo ? 'text-orange-500' : 'text-zinc-500 group-hover/item:text-zinc-300'}`}>
                            {tipo}S
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="text-[10px] text-zinc-600 italic">Cargando modelos...</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TAMAÑOS */}
      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">
          Tamaño
        </h3>
        <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-2 scrollbar-personalizado">
          {tallasOrdenadas.map((talla) => (
            <button
              key={talla.id}
              onClick={() => actualizarFiltro('talla', talla.valor)}
              className={`border py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors shadow-sm ${tallaActual === talla.valor
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-zinc-100 dark:bg-[#121212] border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white hover:border-orange-500 hover:text-orange-500'
                }`}
            >
              {talla.valor}
            </button>
          ))}
        </div>
      </div>

      {/* COLORES */}
      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">
          Colores Disponibles
        </h3>
        <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-personalizado">
          {colores.map((color) => (
            <button
              key={color.id}
              title={color.nombre}
              onClick={() => actualizarFiltro('color', color.nombre)}
              className={`w-7 h-7 rounded border transition-all shadow-sm flex-shrink-0 ${colorActual === color.nombre
                  ? 'border-white dark:border-zinc-900 ring-2 ring-orange-500 scale-110'
                  : 'border-gray-300 dark:border-zinc-700 hover:border-orange-500 hover:scale-110 bg-zinc-800'
                }`}
              style={{
                backgroundImage: `url(${color.swatch_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-personalizado::-webkit-scrollbar { width: 4px; }
        .scrollbar-personalizado::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-personalizado::-webkit-scrollbar-thumb { background-color: #3f3f46; border-radius: 10px; }
        .dark .scrollbar-personalizado::-webkit-scrollbar-thumb { background-color: #27272a; }
        .scrollbar-personalizado::-webkit-scrollbar-thumb:hover { background-color: #f97316; }
      `}} />
    </aside>
  );
}