import CatalogHero from "@/components/catalogo/CatalogHero";
import ProductFilters from "@/components/catalogo/ProductFilters";
import ProductGrid from "@/components/catalogo/ProductGrid";

// 1. Le decimos a Next.js que esta página leerá la URL (searchParams)
export default async function Catalogo({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // 2. Esperamos a que se resuelva la URL para leer los parámetros
  const params = await searchParams;
  
  // 3. Extraemos el número de página (ej. ?page=2). Si no hay, asumimos que es la página 1.
  const currentPage = Number(params?.page) || 1;

  return (
    <main className="pt-20 min-h-screen bg-zinc-50 dark:bg-[#0e0e0e]">
      
      <CatalogHero />

      {/* Aquí está la magia del ancho: max-w-[1600px] en lugar de max-w-7xl, y gap-12 lg:gap-16 para separar el menú de los productos */}
      <section className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 py-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <ProductFilters />
        
        {/* 4. Le pasamos el número de la página actual al Grid para que haga el corte matemático */}
        <ProductGrid currentPage={currentPage} />
      </section>

    </main>
  );
}