import Image from "next/image";
// Ya no necesitamos 'next/link' porque las tarjetas serán estáticas

// Datos de prueba: Imágenes de acción y el producto que venden
const ACTION_CARDS = [
  {
    id: 1,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776024691/494115252_18273861784264524_2139705703168034097_n_n0phpv.jpg", 
    subtitle: "Lombriz en acción",
    title: "PROVOCA ATAQUES AGRESIVOS",
    productName: "DROP SHOT WORM 5.5\"",
    price: "Próximamente", // En lugar del precio, anunciamos que viene pronto
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836058/worm_tlp65g.png", 
  },
  {
    id: 2,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834356/captura2_njtvj0.png", 
    subtitle: "Fluk en acción",
    title: "SEÑUELOS QUE AMAN LAS LOBINAS", // Ajusté el título para que no repita Zimabug
    productName: "FLUKE Juanito Zimabug",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836059/fluke_uinic5.png", 
  },
  {
    id: 3,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834355/captura3_bghfir.png", 
    subtitle: "Siente la vibración",
    title: "PENETRA CUALQUIER COBERTURA",
    productName: "WACKY WORM",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836058/wacky_rd6dar.png", 
  },
  {
    id: 4,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834355/captura_z4kcfj.png", 
    subtitle: "Juanito Zimabug",
    title: "Super Hog de Geco Lures",
    productName: "Hog Juanito Zimabug",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836059/hog_btoylw.png", 
  }
];

export default function FeaturedActionCards() {
  return (
    <section className="py-2 bg-white dark:bg-[#0e0e0e] w-full">
      {/* GRID DE 4 COLUMNAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-6 max-w-[1600px] mx-auto">
        
        {ACTION_CARDS.map((card) => (
          // 🚀 Cambiamos el <Link> por un <div> y quitamos el cursor-pointer
          <div 
            key={card.id} 
            className="group flex flex-col bg-zinc-900 overflow-hidden shadow-lg border border-transparent hover:border-zinc-700 transition-colors duration-300"
          >
            {/* PARTE SUPERIOR: FOTO DE ACCIÓN Y TEXTOS */}
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-black">
              <Image 
                src={card.bgImage} 
                alt={card.title} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

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
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-sm overflow-hidden relative flex-shrink-0 border border-zinc-700 p-0.5">
                  <Image 
                    src={card.productThumb} 
                    alt={card.productName} 
                    fill 
                    className="object-contain" // Cambiado a object-contain para que los señuelos se vean enteros
                  />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-white font-display font-black uppercase text-xs md:text-sm tracking-tight truncate max-w-[120px] md:max-w-[150px]">
                    {card.productName}
                  </span>
                  <span className="text-orange-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                    {card.price}
                  </span>
                </div>
              </div>

              {/* 🚀 Botón modificado a "Muy Pronto" */}
              <div className="bg-zinc-800 text-zinc-400 font-display font-black uppercase text-[9px] md:text-[10px] px-3 py-1.5 rounded-sm tracking-widest border border-zinc-700 cursor-default">
                Muy Pronto
              </div>

            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
}