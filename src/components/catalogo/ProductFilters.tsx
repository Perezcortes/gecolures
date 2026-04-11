import { FiFilter } from "react-icons/fi";

export default function ProductFilters() {
  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-10">
      <div className="lg:hidden flex items-center gap-2 mb-4 bg-zinc-100 dark:bg-zinc-900 p-4 font-bold uppercase">
        <FiFilter className="text-orange-500" />
        <span>Mostrar Filtros</span>
      </div>

      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-6">Categoría</h3>
        <div className="space-y-4">
          {['Sticks', 'Craws', 'Swimbaits', 'Terminal Tackle', 'Ropa & Gear'].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 bg-zinc-100 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 text-orange-500 focus:ring-orange-500 rounded-sm" />
              <span className="uppercase font-bold tracking-widest text-xs text-gray-700 dark:text-zinc-300 group-hover:text-orange-500 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-6">Tamaño</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors text-gray-900 dark:text-white">4.0 Inch</button>
          <button className="bg-orange-500 text-white py-3 text-[10px] font-black uppercase tracking-widest">5.0 Inch</button>
          <button className="bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors text-gray-900 dark:text-white">6.0 Inch</button>
          <button className="bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors text-gray-900 dark:text-white">Heavy</button>
        </div>
      </div>

      <div>
        <h3 className="text-orange-500 font-display font-black text-xl uppercase tracking-tighter mb-6">Color</h3>
        <div className="flex flex-wrap gap-3">
          <button className="w-8 h-8 rounded-sm bg-green-800 border-2 border-transparent hover:border-orange-500 transition-all"></button>
          <button className="w-8 h-8 rounded-sm bg-orange-500 border-2 border-white dark:border-zinc-400 ring-2 ring-orange-500"></button>
          <button className="w-8 h-8 rounded-sm bg-blue-900 border-2 border-transparent hover:border-orange-500 transition-all"></button>
          <button className="w-8 h-8 rounded-sm bg-black border-2 border-gray-400 hover:border-orange-500 transition-all"></button>
          <button className="w-8 h-8 rounded-sm bg-[#ffd709] border-2 border-transparent hover:border-orange-500 transition-all"></button>
        </div>
      </div>
    </aside>
  );
}