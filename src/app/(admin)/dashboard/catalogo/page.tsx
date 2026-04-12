"use client"; // IMPORTANTE: Cambiamos a 'use client' para poder manejar el evento de borrado

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiSearch, FiBox, FiEdit, FiTrash2 } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";

export default function CatalogoAdminClient() {
  const supabase = createClient();
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("productos")
      .select(`id, nombre, precio_base, slug, is_active, categorias (nombre)`)
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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">Catálogo de Productos</h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mt-1">Gestiona tu inventario, colores y tallas.</p>
        </div>
        
        <Link href="/dashboard/catalogo/nuevo" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-md shadow-lg transition-colors">
          <FiPlus className="w-4 h-4" /> Nuevo Producto
        </Link>
      </div>

      <div className="bg-white dark:bg-[#121212] p-4 rounded-lg border border-gray-200 dark:border-zinc-800 flex items-center justify-between shadow-sm">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="BUSCAR..." className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md pl-10 pr-4 py-2 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-orange-500 transition-colors text-gray-900 dark:text-white" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm">
        {loading ? (
           <div className="p-12 text-center text-zinc-500 uppercase font-bold text-xs">Cargando arsenal...</div>
        ) : !productos || productos.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4"><FiBox className="w-8 h-8 text-gray-400 dark:text-zinc-600" /></div>
            <h3 className="text-lg font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-2">No hay productos</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 max-w-sm mb-6">Aún no has agregado ningún señuelo. Comienza a construir el arsenal de élite.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                  <th className="p-4">Producto</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio Base</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {productos.map((prod: any) => (
                  <tr key={prod.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
                    <td className="p-4">
                      <p className="font-display font-black uppercase tracking-tighter text-sm text-gray-900 dark:text-white">{prod.nombre}</p>
                      <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500">{prod.slug}</p>
                    </td>
                    <td className="p-4"><span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-300">{prod.categorias?.nombre || 'Sin categoría'}</span></td>
                    <td className="p-4 font-bold text-sm text-gray-900 dark:text-white">${prod.precio_base}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <Link href={`/dashboard/catalogo/${prod.id}`} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded transition-all" title="Añadir más variantes">
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
      </div>
    </div>
  );
}