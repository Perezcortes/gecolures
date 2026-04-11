import Image from "next/image";
import { FiShoppingBag, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const products = [
  { id: 1, name: "GECO CRAW 4\"", price: "$185.00 MXN", description: "DOMINIO EN COBERTURA DENSA", image: "/craw.png", tag: "NUEVO COLOR", tagStyle: "bg-orange-500 text-white", features: ["Scented", "Floating"] },
  { id: 2, name: "STICK 5\"", price: "$185.00 MXN", description: "ELECTRIC SHAD / 8 PACK", image: "/stick.png", tag: "BEST SELLER", tagStyle: "bg-zinc-800 dark:bg-white text-white dark:text-black", features: ["Ribbed", "Tournament Ready"] },
  { id: 3, name: "RING SWIM BAIT", price: "$165.00 MXN", description: "ACCIÓN AGRESIVA / 5 PACK", image: "/swimbait.png", tag: "LOW STOCK", tagStyle: "bg-red-600 text-white", features: ["Ultra-Action"] },
  { id: 4, name: "GECO CRAW 4\"", price: "$185.00 MXN", description: "MIDNIGHT PURPLE / 6 PACK", image: "/craw.png", tag: "", tagStyle: "", features: ["Weedless"] },
  { id: 5, name: "STICK 5\"", price: "$185.00 MXN", description: "WATERMELON RED / 8 PACK", image: "/stick.png", tag: "", tagStyle: "", features: ["Heavy Salt"] },
  { id: 6, name: "RING SWIM BAIT", price: "$165.00 MXN", description: "GHOST GILL / 5 PACK", image: "/swimbait.png", tag: "PRO STAFF CHOICE", tagStyle: "bg-[#ffd709] text-black", features: ["Perfect Swim"] },
  { id: 7, name: "STICK 5\"", price: "$185.00 MXN", description: "GREEN PUMPKIN / 8 PACK", image: "/stick.png", tag: "", tagStyle: "", features: ["Heavy Salt"] },
  { id: 8, name: "GECO CRAW 4\"", price: "$185.00 MXN", description: "BLACK BLUE / 6 PACK", image: "/craw.png", tag: "NUEVO", tagStyle: "bg-orange-500 text-white", features: ["Scented"] }
];

export default function ProductGrid() {
  return (
    <div className="flex-grow">
      {/* Barra de Ordenamiento */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800 gap-4">
        <span className="font-bold text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-400">Mostrando {products.length} productos</span>
        <div className="flex items-center gap-3">
          <span className="font-bold text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-400">Ordenar Por:</span>
          <select className="bg-transparent border-none font-bold uppercase text-sm focus:ring-0 p-0 text-orange-500 cursor-pointer">
            <option className="bg-white dark:bg-zinc-900">Más Recientes</option>
            <option className="bg-white dark:bg-zinc-900">Precio: Menor a Mayor</option>
            <option className="bg-white dark:bg-zinc-900">Más Populares</option>
          </select>
        </div>
      </div>

      {/* Grid: 2 en móvil, 3 en tablet, 4 en desktop (ahora más grandes) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-zinc-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 flex flex-col hover:border-orange-500 dark:hover:border-orange-500 transition-colors duration-300">
            {product.tag && (
              <div className="absolute top-0 left-0 z-20">
                <span className={`px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-black uppercase tracking-tighter ${product.tagStyle}`}>
                  {product.tag}
                </span>
              </div>
            )}
            
            {/* Contenedor de la imagen (Aumenté p-4 a p-6 para que respire más) */}
            <div className="relative aspect-square overflow-hidden bg-zinc-200/50 dark:bg-zinc-800/50 p-6 flex items-center justify-center">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={300} 
                height={300}
                className="w-[95%] h-[95%] object-contain drop-shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500"
              />
              <button className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-orange-500 text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300 hover:bg-orange-600 shadow-lg">
                <FiShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <div className="flex flex-col md:flex-row md:justify-between items-start mb-2 gap-1 md:gap-2">
                <h3 className="font-display font-black text-sm md:text-xl uppercase tracking-tighter leading-none text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  {product.name}
                </h3>
                <span className="font-display font-bold text-sm md:text-lg text-orange-500 whitespace-nowrap">
                  {product.price}
                </span>
              </div>
              
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-4 flex-grow line-clamp-2 md:line-clamp-none">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                {product.features.map((feature, idx) => (
                  <span key={idx} className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 text-[8px] md:text-[9px] font-black text-gray-600 dark:text-zinc-300 uppercase tracking-widest">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-16 flex justify-center items-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-orange-500 transition-colors">
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white font-black text-sm">1</button>
        <button className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white hover:text-orange-500 transition-colors font-black text-sm">2</button>
        <button className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-orange-500 transition-colors">
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}