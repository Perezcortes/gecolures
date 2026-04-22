import Link from "next/link";
import { Metadata } from "next";
import { FiChevronRight } from "react-icons/fi";
import { createClient } from "@/utils/supabase/server";
import ProductGallery from "@/components/producto/ProductGallery";
import ProductInfo from "@/components/producto/ProductInfo";
import { calcularPrecioYPiezas } from "@/utils/calculadoraGeco"; 

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 1. METADATOS DINÁMICOS BASADOS EN URL
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sParams = await searchParams;
  const colorBuscado = typeof sParams.color === 'string' ? sParams.color : null;
  
  const supabase = await createClient();

  const { data: producto } = await supabase
    .from("productos")
    .select(`
      nombre, 
      squad_tip, 
      descripcion, 
      producto_variantes(
        imagen_principal_url,
        colores(nombre)
      )
    `)
    .eq("slug", slug)
    .single();

  if (!producto) {
    return { title: "Producto no encontrado | Geco Lures" };
  }

  // Lógica para buscar la imagen exacta del color seleccionado (si existe)
  let imageUrl = "https://tusitio.com/default-og.jpg";
  if (producto.producto_variantes && producto.producto_variantes.length > 0) {
    // Intentamos encontrar la variante que coincida con el color de la URL
    const varianteEspecifica = colorBuscado 
      ? producto.producto_variantes.find((v: any) => v.colores?.nombre === colorBuscado)
      : null;
    
    // Si la encontramos, usamos su imagen. Si no, usamos la primera que haya.
    imageUrl = varianteEspecifica?.imagen_principal_url 
      || producto.producto_variantes[0].imagen_principal_url 
      || imageUrl;
  }

  const tituloColor = colorBuscado ? ` - Color ${colorBuscado}` : "";

  return {
    title: `${producto.nombre}${tituloColor} | Geco Lures`,
    description: producto.squad_tip || "Arsenal de Élite para pesca táctica.",
    openGraph: {
      title: `${producto.nombre}${tituloColor} | Geco Lures`,
      description: producto.squad_tip || "Arsenal de Élite para pesca táctica.",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${producto.nombre} ${tituloColor}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProductoDetalle({ params, searchParams }: Props) {
  const supabase = await createClient();
  const { slug } = await params;
  const sParams = await searchParams;

  // ATRAPAMOS LOS PARÁMETROS INICIALES DE LA URL
  const colorInicial = typeof sParams.color === 'string' ? sParams.color : undefined;
  const tallaInicial = typeof sParams.medida === 'string' ? sParams.medida : undefined;

  const { data: producto, error } = await supabase
    .from("productos")
    .select(`
      *,
      categorias (nombre),
      producto_variantes (
        imagen_principal_url,
        colores (id, nombre, swatch_url, clasificacion),
        especificaciones (valor)
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !producto) {
    return (
      <main className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-2xl font-black text-red-500 mb-4">Error cargando el producto</h1>
        <p className="text-zinc-500 mb-4">Intentamos buscar el slug: <span className="font-mono text-orange-500">{slug}</span></p>
      </main>
    );
  }

  const imagenesUnicas = new Set<string>();
  const coloresUnicos = new Map();
  const tallasUnicas = new Set<string>();

  producto.producto_variantes?.forEach((v: any) => {
    if (v.imagen_principal_url) imagenesUnicas.add(v.imagen_principal_url);
    if (v.colores) coloresUnicos.set(v.colores.id, v.colores);
    if (v.especificaciones) tallasUnicas.add(v.especificaciones.valor);
  });

  const coloresArray = Array.from(coloresUnicos.values());
  const tallasArray = Array.from(tallasUnicas);

  return (
    <main className="pt-28 pb-16 px-4 md:px-6 max-w-[1400px] mx-auto bg-zinc-50 dark:bg-[#0e0e0e] min-h-screen">
      <div className="flex items-center gap-2 mb-8 font-bold text-[10px] md:text-xs tracking-widest uppercase text-gray-500 dark:text-zinc-500">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <FiChevronRight className="w-3 h-3" />
        <Link href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-900 dark:text-white">{producto.nombre}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductGallery imagenes={Array.from(imagenesUnicas)} />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          {/* PASAMOS LOS PARÁMETROS INICIALES AL COMPONENTE */}
          <ProductInfo
            producto={producto}
            colores={coloresArray}
            tallas={tallasArray}
            colorInicial={colorInicial}
            tallaInicial={tallaInicial}
          />
        </div>
      </div>
    </main>
  );
}