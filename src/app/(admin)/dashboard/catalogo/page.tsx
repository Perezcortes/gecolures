"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FiPlus, FiSearch, FiBox, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";

export default function CatalogoAdminClient() {
  const supabase = createClient();
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ESTADOS PARA FILTROS Y PAGINACIÓN
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("productos")
      // Aseguramos traer 'created_at' para poder ordenar por los más recientes
      .select(`id, nombre, precio_base, slug, is_active, created_at, categorias (nombre)`)
      .order("created_at", { ascending: false });
    
    if (data) setProductos(data);
    setLoading(false);
  };

  const handleEliminar = async (id: string, nombre: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente el señuelo: ${nombre}? Esta acción destruirá todas sus variantes y no se puede deshacer.`)) {
      const { error } = await supabase.from("productos").delete().eq("id", id);
      if (error) {
        alert("Error al eliminar: " + error.message);
      } else {
        cargarProductos();
      }
    }
  };

  // LÓGICA DE PROCESAMIENTO (Búsqueda + Ordenamiento)
  const processedProducts = useMemo(() => {
    let filtered = [...productos];

    // 1. Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(term) || 
        p.slug.toLowerCase().includes(term) ||
        (p.categorias?.nombre && p.categorias.nombre.toLowerCase().includes(term))
      );
    }

    // 2. Ordenar
    filtered.sort((a, b) => {
      if (sortOption === "price_asc") return a.precio_base - b.precio_base;
      if (sortOption === "price_desc") return b.precio_base - a.precio_base;
      if (sortOption === "name_asc") return a.nombre.localeCompare(b.nombre);
      // Por defecto: newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return filtered;
  }, [productos, searchTerm, sortOption]);

  // LÓGICA DE PAGINACIÓN
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Reiniciar a la página 1 si el usuario busca o cambia el orden
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* CABECERA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">Arsenal Principal</h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mt-1">Gestiona tu inventario, colores y variantes.</p>
        </div>
        <Link href="/dashboard/catalogo/nuevo" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-sm shadow-md transition-all hover:-translate-y-0.5">
          <FiPlus className="w-4 h-4" /> Nuevo Señuelo
        </Link>
      </div>

      {/* BARRA DE CONTROLES (Buscador y Filtros) */}
      <div className="bg-white dark:bg-[#121212] p-4 rounded border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        
        {/* Buscador */}
        <div className="relative w-full sm:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="BUSCAR SEÑUELO O CATEGORÍA..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded pl-10 pr-4 py-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-gray-900 dark:text-white" 
          />
        </div>

        {/* Ordenamiento */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FiFilter className="text-gray-400 hidden sm:block" />
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-auto bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded px-4 py-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-orange-500 text-gray-900 dark:text-white cursor-pointer"
          >
            <option value="newest">Más Recientes</option>
            <option value="name_asc">Alfabético (A-Z)</option>
            <option value="price_desc">Precio (Mayor a Menor)</option>
            <option value="price_asc">Precio (Menor a Mayor)</option>
          </select>
        </div>
      </div>

      {/* CONTENEDOR DE LA TABLA */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded shadow-sm overflow-hidden">
        {loading ? (
           <div className="p-16 text-center flex flex-col items-center">
             <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-zinc-500 uppercase font-bold text-xs tracking-widest">Cargando arsenal...</p>
           </div>
        ) : processedProducts.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
              <FiBox className="w-8 h-8 text-gray-400 dark:text-zinc-600" />
            </div>
            <h3 className="text-xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-2">
              {searchTerm ? "Sin coincidencias" : "Arsenal Vacío"}
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 max-w-sm mb-6">
              {searchTerm ? `No encontramos señuelos que coincidan con "${searchTerm}".` : "Aún no has agregado ningún señuelo al catálogo."}
            </p>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-orange-500 hover:text-orange-600 text-xs font-bold uppercase tracking-widest underline">
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                  <th className="p-4 pl-6">Señuelo</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 pr-6 text-right">Táctica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {currentItems.map((prod: any) => (
                  <tr key={prod.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
                    <td className="p-4 pl-6">
                      <p className="font-display font-black uppercase tracking-tighter text-sm text-gray-900 dark:text-white">{prod.nombre}</p>
                      <p className="text-[10px] font-bold tracking-wider text-gray-500 dark:text-zinc-500">/{prod.slug}</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-300">
                        {prod.categorias?.nombre || 'Sin categoría'}
                      </span>
                    </td>
                    <td className="p-4 font-black text-sm text-gray-900 dark:text-white">${prod.precio_base}</td>
                    <td className="p-4 text-center">
                      {/* BADGE DE ESTADO */}
                      <span className={`inline-block px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                        prod.is_active 
                          ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20' 
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                      }`}>
                        {prod.is_active ? 'Activo' : 'Borrador'}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right flex justify-end gap-2">
                      <Link href={`/dashboard/catalogo/${prod.id}`} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded transition-all" title="Editar y Añadir Variantes">
                        <FiEdit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleEliminar(prod.id, prod.nombre)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all" title="Eliminar Producto">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* CONTROLES DE PAGINACIÓN */}
        {!loading && processedProducts.length > itemsPerPage && (
          <div className="bg-zinc-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-zinc-800 p-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, processedProducts.length)} de {processedProducts.length}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}