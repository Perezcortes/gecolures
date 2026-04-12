import Image from "next/image";
import Link from "next/link";

// Datos de prueba: Imágenes de acción y el producto que venden
const ACTION_CARDS = [
  {
    id: 1,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024691/494115252_18273861784264524_2139705703168034097_n_n0phpv.jpg", // Foto de lobina
    subtitle: "Favorito del Cliente",
    title: "PROVOCA ATAQUES AGRESIVOS",
    productName: "DROP SHOT WORM 5.5\"",
    price: "$185.00",
    productThumb: "https://images.unsplash.com/photo-1551228522-895c1055f1df?q=80&w=150&auto=format&fit=crop", // Reemplazar con foto real de tu Craw
    link: "/catalogo/drop-shot-worm-5.5"
  },
  {
    id: 2,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024691/494115252_18273861784264524_2139705703168034097_n_n0phpv.jpg", // Foto de pescador amarrando
    subtitle: "Recién Llegado",
    title: "DOMINA EN AGUAS SOMERAS",
    productName: "STICK 5\"",
    price: "$165.00",
    productThumb: "https://images.unsplash.com/photo-1516575334481-ee2cbcc86a9f?q=80&w=150&auto=format&fit=crop", // Reemplazar con tu Stick
    link: "/catalogo/stick-5"
  },
  {
    id: 3,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024691/494115252_18273861784264524_2139705703168034097_n_n0phpv.jpg", // Foto bajo el agua / cobertura
    subtitle: "Siente la vibración",
    title: "PENETRA CUALQUIER COBERTURA",
    productName: "RING SWIM BAIT",
    price: "$175.00",
    productThumb: "https://images.unsplash.com/photo-1504280529555-5f11e9f45c92?q=80&w=150&auto=format&fit=crop", // Reemplazar con tu Swimbait
    link: "/catalogo/ring-swim-bait"
  },
  {
    id: 4,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024691/494115252_18273861784264524_2139705703168034097_n_n0phpv.jpg", // Foto de equipo / caja de pesca
    subtitle: "Arsenal Táctico",
    title: "PARA EL PESCADOR EXIGENTE",
    productName: "GECO LIZARD 6\"",
    price: "$155.00",
    productThumb: "https://images.unsplash.com/photo-1544605481-9b16f3162391?q=80&w=150&auto=format&fit=crop", // Reemplazar con tu Lizard
    link: "/catalogo/geco-lizard"
  }
];

export default function FeaturedActionCards() {
  return (
    <section className="py-2 bg-white dark:bg-[#0e0e0e] w-full">
      {/* GRID DE 4 COLUMNAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-6 max-w-[1600px] mx-auto">
        
        {ACTION_CARDS.map((card) => (
          <Link 
            key={card.id} 
            href={card.link}
            className="group flex flex-col bg-zinc-900 overflow-hidden cursor-pointer shadow-lg"
          >
            {/* PARTE SUPERIOR: FOTO DE ACCIÓN Y TEXTOS */}
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-black">
              {/* Imagen de fondo */}
              <Image 
                src={card.bgImage} 
                alt={card.title} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
              />
              
              {/* Gradiente oscuro inferior para que resalte el texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

              {/* Textos sobre la imagen */}
              <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full z-10">
                <p className="font-display font-bold text-[10px] md:text-xs text-orange-500 uppercase tracking-widest mb-1.5 drop-shadow-md">
                  {card.subtitle}
                </p>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase leading-[1.1] tracking-tighter drop-shadow-lg">
                  {card.title}
                </h3>
              </div>
            </div>

            {/* PARTE INFERIOR: BARRA DE PRODUCTO (ESTILO GOOGAN) */}
            <div className="bg-[#1a1a1a] border-t border-zinc-800 p-3 md:p-4 flex items-center justify-between">
              
              {/* Info del producto (Thumbnail + Nombre + Precio) */}
              <div className="flex items-center gap-3">
                {/* Cuadrito blanco/gris con la miniatura del señuelo */}
                <div className="w-10 h-10 bg-white rounded-sm overflow-hidden relative flex-shrink-0 border border-zinc-700 p-0.5">
                  <Image 
                    src={card.productThumb} 
                    alt={card.productName} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-white font-display font-black uppercase text-xs md:text-sm tracking-tight">
                    {card.productName}
                  </span>
                  <span className="text-zinc-400 font-bold text-[10px] md:text-xs">
                    {card.price}
                  </span>
                </div>
              </div>

              {/* Botón de Comprar */}
              {/* Usamos un div en lugar de button porque ya estamos dentro de un Link */}
              <div className="bg-white text-black font-display font-black uppercase text-[10px] md:text-xs px-4 py-2 rounded-sm tracking-widest group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                Comprar
              </div>

            </div>
          </Link>
        ))}
        
      </div>
    </section>
  );
}