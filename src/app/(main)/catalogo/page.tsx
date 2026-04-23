import CatalogHero from "@/components/catalogo/CatalogHero";
import ProductFilters from "@/components/catalogo/ProductFilters";
import ProductGrid from "@/components/catalogo/ProductGrid";
import RecentlyViewed from "@/components/producto/RecentlyViewed";

export default async function Catalogo({
  searchParams,
}: {
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
  let modelo = params?.modelo || ""; 

  // NORMALIZACIÓN: Si viene "Sticks" o "Senko", mandamos "Stick" al Grid
  const diccionario: { [key: string]: string } = {
    "senko": "stick",
    "zenko": "stick",
    "cenko": "stick",
    "sticks": "stick",
    "craws": "craw",
    "lizards": "lizard",
    "worms": "worm"
  };

  const termLower = modelo.toLowerCase().trim();
  if (diccionario[termLower]) {
    modelo = diccionario[termLower];
  }

  return (
    <main className="pt-20 min-h-screen bg-zinc-50 dark:bg-[#0e0e0e]">
      <CatalogHero />
      <section className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 py-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <ProductFilters />
        <ProductGrid 
          currentPage={currentPage} 
          categoria={categoria}
          talla={talla}
          color={color}
          modelo={modelo} 
        />
      </section>

      <div className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 pb-12">
        <RecentlyViewed />
      </div>
    </main>
  );
}