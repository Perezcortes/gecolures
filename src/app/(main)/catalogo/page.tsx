import CatalogHero from "@/components/catalogo/CatalogHero";
import ProductFilters from "@/components/catalogo/ProductFilters";
import ProductGrid from "@/components/catalogo/ProductGrid";

export default function Catalogo() {
  return (
    <main className="pt-20 min-h-screen bg-white dark:bg-[#0e0e0e]">
      
      <CatalogHero />

      {/* Aquí está la magia del ancho: max-w-[1600px] en lugar de max-w-7xl, y gap-12 lg:gap-16 para separar el menú de los productos */}
      <section className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 py-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <ProductFilters />
        <ProductGrid />
      </section>

    </main>
  );
}