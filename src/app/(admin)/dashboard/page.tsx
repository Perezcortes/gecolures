import { FiBox, FiDollarSign, FiUsers, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

export default function DashboardResumen() {
  const stats = [
    { name: "Ventas del Mes", value: "$0.00", icon: FiDollarSign, color: "text-green-500" },
    { name: "Órdenes Activas", value: "0", icon: FiTrendingUp, color: "text-blue-500" },
    { name: "Total Productos", value: "0", icon: FiBox, color: "text-orange-500" },
    { name: "Nuevos Clientes", value: "0", icon: FiUsers, color: "text-purple-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Cabecera */}
      <div>
        <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">
          Cuartel General
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mt-1">
          Bienvenido de vuelta. Aquí está el resumen de tu arsenal.
        </p>
      </div>

      {/* Grid de Estadísticas */}
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

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white dark:bg-[#121212] p-8 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center items-start">
          <h2 className="text-xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-2">
            Gestión de Inventario
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mb-6">
            Agrega nuevos señuelos, ajusta precios o actualiza el stock de tus variantes.
          </p>
          <Link 
            href="/dashboard/catalogo" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded transition-colors"
          >
            Ir al Catálogo
          </Link>
        </div>
      </div>

    </div>
  );
}