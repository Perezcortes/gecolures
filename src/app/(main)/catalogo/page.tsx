import CatalogHero from "@/components/catalogo/CatalogHero";
import ProductFilters from "@/components/catalogo/ProductFilters";
import ProductGrid from "@/components/catalogo/ProductGrid";

export default async function Catalogo({
  searchParams,
}: {
  // 1. Agregamos 'modelo' a la lista de parámetros que esperamos de la URL
  searchParams: Promise<{ 
    page?: string; 
    categoria?: string; 
    talla?: string; 
    color?: string; 
    modelo?: string 
  }>;
}) {
  const params = await searchParams;
  
  const currentPage = Number(params?.page) || 1;
  const categoria = params?.categoria || "";
  const talla = params?.talla || "";
  const color = params?.color || "";
  const modelo = params?.modelo || ""; // <-- Leemos el modelo (ej: STICK)

  return (
    <main className="pt-20 min-h-screen bg-zinc-50 dark:bg-[#0e0e0e]">
      <CatalogHero />

      {/* El contenedor principal con el ancho táctico de 1600px */}
      <section className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 py-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <ProductFilters />
        
        {/* 2. Ahora le pasamos TODO el arsenal de filtros al Grid */}
        <ProductGrid 
          currentPage={currentPage} 
          categoria={categoria}
          talla={talla}
          color={color}
          modelo={modelo} 
        />
      </section>
    </main>
  );
}