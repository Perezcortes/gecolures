import Link from "next/link";
import { Metadata } from "next";
import { FiChevronRight } from "react-icons/fi";
import { createClient } from "@/utils/supabase/server";
import ProductGallery from "@/components/producto/ProductGallery";
import ProductInfo from "@/components/producto/ProductInfo";
import ProductAccordion from "@/components/producto/ProductAccordion";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  // Buscamos el producto rápido solo para sacar su info básica y su foto
  const { data: producto } = await supabase
    .from("productos")
    .select("nombre, squad_tip, descripcion, producto_variantes(imagen_principal_url)")
    .eq("slug", slug)
    .single();

  if (!producto) {
    return { title: "Producto no encontrado | Geco Lures" };
  }

  // Tratamos de agarrar la primera foto de las variantes para enviarla a WhatsApp/Facebook
  const imageUrl = producto.producto_variantes?.[0]?.imagen_principal_url || "https://tusitio.com/default-og.jpg";

  return {
    title: `${producto.nombre} | Geco Lures`,
    description: producto.squad_tip || "Arsenal de Élite para pesca táctica.",
    openGraph: {
      title: `${producto.nombre} | Geco Lures`,
      description: producto.squad_tip || "Arsenal de Élite para pesca táctica.",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: producto.nombre,
        },
      ],
      type: "website",
    },
  };
}

// 1. Le decimos a TypeScript que params ahora es una Promesa
export default async function ProductoDetalle({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const supabase = await createClient();

  // 2. ¡EL ARREGLO MÁGICO! Esperamos a que la promesa se resuelva
  const { slug } = await params;

  // 3. Hacemos la consulta usando la variable "slug" ya desenvuelta
  const { data: producto, error } = await supabase
    .from("productos")
    .select(`
      *,
      categorias (nombre),
      producto_variantes (
        imagen_principal_url,
        colores (id, nombre, swatch_url),
        especificaciones (valor)
      )
    `)
    .eq("slug", slug)
    .single();

  // === MODO DETECTIVE ===
  if (error || !producto) {
    return (
      <main className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-2xl font-black text-red-500 mb-4">Error cargando el producto</h1>
        <p className="text-zinc-500 mb-4">Intentamos buscar el slug: <span className="font-mono text-orange-500">{slug}</span></p>
        <pre className="bg-zinc-900 text-left p-6 rounded text-xs text-green-400 overflow-auto max-w-2xl mx-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }
  // =======================

  // Extraemos datos únicos de las variantes
  const imagenesUnicas = new Set<string>();
  const coloresUnicos = new Map();
  const tallasUnicas = new Set<string>();

  producto.producto_variantes?.forEach((v: any) => {
    if (v.imagen_principal_url) imagenesUnicas.add(v.imagen_principal_url);
    if (v.colores) coloresUnicos.set(v.colores.id, v.colores);
    if (v.especificaciones) tallasUnicas.add(v.especificaciones.valor);
  });

  return (
    <main className="pt-28 pb-16 px-4 md:px-6 max-w-[1400px] mx-auto bg-zinc-50 dark:bg-[#0e0e0e] min-h-screen">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-8 font-bold text-[10px] md:text-xs tracking-widest uppercase text-gray-500 dark:text-zinc-500">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <FiChevronRight className="w-3 h-3" />
        <Link href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-900 dark:text-white">{producto.nombre}</span>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        <div className="lg:col-span-7">
          <ProductGallery imagenes={Array.from(imagenesUnicas)} />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <ProductInfo
            producto={producto}
            colores={Array.from(coloresUnicos.values())}
            tallas={Array.from(tallasUnicas)}
          />
          <ProductAccordion
            descripcion={producto.descripcion}
            paqueteIncluye={producto.paquete_incluye}
          />
        </div>

      </div>
    </main>
  );
}