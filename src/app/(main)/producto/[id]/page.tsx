import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import ProductGallery from "@/components/producto/ProductGallery";
import ProductInfo from "@/components/producto/ProductInfo";
import ProductAccordion from "@/components/producto/ProductAccordion";

export default function ProductoDetalle() {
  return (
    <main className="pt-28 pb-16 px-4 md:px-6 max-w-[1400px] mx-auto bg-white dark:bg-[#0e0e0e] min-h-screen">
      
      {/* Breadcrumbs (Migas de pan) */}
      <div className="flex items-center gap-2 mb-8 font-bold text-[10px] md:text-xs tracking-widest uppercase text-gray-500 dark:text-zinc-500">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <FiChevronRight className="w-3 h-3" />
        <Link href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-900 dark:text-white">Geco Craw 4"</span>
      </div>

      {/* Grid Principal del Producto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Columna Izquierda: Galería (7 columnas de ancho en escritorio) */}
        <div className="lg:col-span-7">
          <ProductGallery />
        </div>

        {/* Columna Derecha: Información y Compra (5 columnas de ancho en escritorio) */}
        <div className="lg:col-span-5 flex flex-col">
          <ProductInfo />
          <ProductAccordion />
        </div>
        
      </div>
    </main>
  );
}