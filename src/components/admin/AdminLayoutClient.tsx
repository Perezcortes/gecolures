"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiBox, FiShoppingBag, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";

export default function AdminLayoutClient({ 
  children, 
  userName 
}: { 
  children: React.ReactNode;
  userName: string;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Resumen", href: "/dashboard", icon: FiHome },
    { name: "Catálogo", href: "/dashboard/catalogo", icon: FiBox },
    { name: "Órdenes", href: "/dashboard/ordenes", icon: FiShoppingBag },
    { name: "Clientes", href: "/dashboard/clientes", icon: FiUsers },
    { name: "Configuración", href: "/dashboard/configuracion", icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex">
      
      {/* Sidebar Fija */}
      <aside className="w-64 bg-white dark:bg-[#121212] border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col fixed h-full z-10">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800">
          <span className="font-display font-black italic text-2xl tracking-tighter text-orange-500">
            GECO <span className="text-gray-900 dark:text-white">ADMIN</span>
          </span>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-bold uppercase tracking-widest text-xs transition-colors ${
                  isActive 
                    ? "bg-orange-500 text-white shadow-md" 
                    : "text-gray-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-orange-500"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-3 text-gray-900 dark:text-white">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-black">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold truncate w-32">{userName}</span>
              <span className="text-[10px] uppercase tracking-widest text-orange-500">Admin</span>
            </div>
          </div>
          <button className="w-full mt-2 flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors">
            <FiLogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}