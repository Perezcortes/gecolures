"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1'); // Si ordenas, regresamos a la página 1
    
    // Cambiamos la URL sin recargar la página
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative group">
      <select 
        value={currentSort}
        onChange={handleChange}
        className="appearance-none bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white text-xs font-bold uppercase tracking-widest py-2 pl-4 pr-10 cursor-pointer hover:border-orange-500 outline-none transition-colors rounded-sm shadow-sm"
      >
        <option value="newest">Lanzamientos</option>
        <option value="alpha_asc">A - Z</option>
        <option value="alpha_desc">Z - A</option>
        <option value="price_asc">Precio: Menor</option>
        <option value="price_desc">Precio: Mayor</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-orange-500">
        <FiChevronLeft className="w-4 h-4 -rotate-90" />
      </div>
    </div>
  );
}