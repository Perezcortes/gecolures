import { FiBox, FiDollarSign, FiUsers, FiTrendingUp, FiTarget } from "react-icons/fi";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardResumen() {
  const supabase = await createClient();

  // 1. Obtener el total exacto de productos activos
  const { count: totalProductos } = await supabase
    .from('productos')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // 2. Obtener solo los nombres de los productos para extraer su modelo base
  const { data: productosData } = await supabase
    .from('productos')
    .select('nombre')
    .eq('is_active', true);

  // 3. Crear diccionario para contar cuántos hay de cada MODELO (Stick, Craw, etc.)
  const conteoModelos: Record<string, number> = {};
  
  if (productosData) {
    productosData.forEach((prod: any) => {
      if (prod.nombre) {
        const modeloBase = prod.nombre.split(' ')[0].toUpperCase();
        
        // Sumamos 1 al contador de este modelo
        conteoModelos[modeloBase] = (conteoModelos[modeloBase] || 0) + 1;
      }
    });
  }

  // Ordenar los modelos alfabéticamente para que se vea limpio
  const modelosOrdenados = Object.entries(conteoModelos).sort((a, b) => a[0].localeCompare(b[0]));

  // Tarjetas principales
  const stats = [
    { name: "Ventas del Mes", value: "$0.00", icon: FiDollarSign, color: "text-green-500" },
    { name: "Órdenes Activas", value: "0", icon: FiTrendingUp, color: "text-blue-500" },
    { name: "Total Productos", value: totalProductos || "0", icon: FiBox, color: "text-orange-500" },
    { name: "Nuevos Clientes", value: "0", icon: FiUsers, color: "text-purple-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Cabecera */}
      <div>
        <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">
          Panel General
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mt-1">
          Bienvenido de vuelta. Aquí está el resumen de tu arsenal.
        </p>
      </div>

      {/* Grid de Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-[#121212] p-6 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mb-1">
                {stat.name}
              </p>
              <h3 className="text-3xl font-display font-black tracking-tighter text-gray-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-full bg-zinc-50 dark:bg-[#0a0a0a] flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#121212] p-6 md:p-8 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-zinc-800 pb-4">
          <h2 className="text-xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white flex items-center gap-3">
            <FiTarget className="text-orange-500 w-6 h-6" /> Inventario por Modelo
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 dark:bg-zinc-900 px-3 py-1 rounded">
            {modelosOrdenados.length} Modelos Distintos
          </span>
        </div>
        
        {modelosOrdenados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {modelosOrdenados.map(([modelo, cantidad]) => (
              <div 
                key={modelo} 
                className="group relative p-4 bg-zinc-50 dark:bg-[#0a0a0a] rounded border border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center text-center transition-all hover:border-orange-500 hover:shadow-md hover:-translate-y-1"
              >
                {/* Indicador visual tipo barra táctica */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-orange-500 transition-colors rounded-t opacity-50 group-hover:opacity-100" />
                
                <span className="text-3xl font-black font-display text-gray-900 dark:text-white mb-2 mt-2">
                  {cantidad}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 group-hover:text-orange-500 transition-colors">
                  {modelo}s
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center py-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded">
            El arsenal está vacío. ¡Agrega tu primer señuelo!
          </p>
        )}
      </div>

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#121212] p-8 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center items-start">
          <h2 className="text-xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-2">
            Gestión Rápida
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mb-6 max-w-sm">
            Agrega nuevos señuelos, ajusta precios o actualiza el stock de tus variantes activas.
          </p>
          <Link 
            href="/dashboard/catalogo" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded transition-colors shadow-sm flex items-center gap-2"
          >
            <FiBox className="w-4 h-4" /> Ir al Catálogo
          </Link>
        </div>
      </div>

    </div>
  );
}