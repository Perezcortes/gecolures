import Image from "next/image";
import Link from "next/link"; 

const ACTION_CARDS = [
  {
    id: 1,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1777862672/captura4_ygsitc.jpg", 
    subtitle: "Acción Letal",
    title: "CAÍDA IRRESISTIBLE",
    productName: "STICK PLUM 5\"",
    price: "Disponible", 
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776648039/gecolures/senuelos/ybvrnqyabqi0u06wwazf.png", 
    isAvailable: true,          
    href: "/catalogo/stick-plum?medida=5%22"
  },
  {
    id: 2,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834356/captura2_njtvj0.png", 
    subtitle: "Fluk en acción",
    title: "SEÑUELOS QUE AMAN LAS LOBINAS", 
    productName: "FLUKE Juanito Zimabug",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836059/fluke_uinic5.png", 
    isAvailable: false,
  },
  {
    id: 3,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834355/captura3_bghfir.png", 
    subtitle: "Siente la vibración",
    title: "PARA DÍAS DIFÍCILES",
    productName: "WACKY WORM",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836058/wacky_rd6dar.png", 
    isAvailable: false,
  },
  {
    id: 4,
    bgImage: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834355/captura_z4kcfj.png", 
    subtitle: "Juanito Zimabug",
    title: "Super Hog de Geco Lures",
    productName: "Hog Juanito Zimabug",
    price: "Próximamente",
    productThumb: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776836059/hog_btoylw.png", 
    isAvailable: false,
  }
];

export default function FeaturedActionCards() {
  return (
    <section className="py-2 bg-white dark:bg-[#0e0e0e] w-full overflow-hidden">
      {/* GRID DE 4 COLUMNAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-6 max-w-[1600px] mx-auto">
        
        {ACTION_CARDS.map((card) => {
          
          // 🚀 La clase "group" es la clave de todo. Al pasar el mouse por la tarjeta, activa todo lo de adentro.
          const cardClassName = `group h-full flex flex-col bg-zinc-900 overflow-hidden shadow-lg border border-transparent transition-colors duration-300 ${
            card.isAvailable 
              ? 'hover:border-orange-500 cursor-pointer' 
              : 'hover:border-zinc-700 cursor-default'
          }`;

          const cardContent = (
            <>
              {/* PARTE SUPERIOR: FOTO Y TEXTO ANIMADO */}
              <div className="relative flex-grow aspect-square md:aspect-[4/5] overflow-hidden bg-black">
                <Image 
                  src={card.bgImage} 
                  alt={card.title} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
                
                {/* Overlay: Se oscurece un poco más al hacer hover para que el texto resalte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* 🚀 ANIMACIÓN DE TEXTO (Sube de abajo hacia arriba) */}
                <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full z-10">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    
                    {/* El subtítulo empieza invisible y aparece al subir */}
                    <p className="font-display font-bold text-[10px] md:text-xs text-orange-500 uppercase tracking-widest mb-1.5 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      {card.subtitle}
                    </p>
                    
                    <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase leading-[1.1] tracking-tighter drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* PARTE INFERIOR: DETALLE DEL PRODUCTO Y BOTÓN */}
              <div className="bg-[#1a1a1a] border-t border-zinc-800 p-3 md:p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 z-10">
                  <div className="w-10 h-10 bg-white rounded-sm overflow-hidden relative flex-shrink-0 border border-zinc-700 p-0.5">
                    <Image 
                      src={card.productThumb} 
                      alt={card.productName} 
                      fill 
                      className="object-contain" 
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

                {/* 🚀 EL EFECTO CORTINA EN LOS BOTONES */}
                {card.isAvailable ? (
                  // Botón COMPRAR
                  <div className="relative overflow-hidden bg-orange-500 text-white font-display font-black uppercase text-[9px] md:text-[10px] px-4 py-2 rounded-sm tracking-widest shadow-md flex items-center gap-1">
                    {/* La Cortina Naranja Oscuro (-translate-x-full la esconde a la izquierda) */}
                    <div className="absolute inset-0 bg-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                    <span className="relative z-10">COMPRAR</span>
                  </div>
                ) : (
                  // Botón MUY PRONTO
                  <div className="relative overflow-hidden bg-zinc-800 text-zinc-400 font-display font-black uppercase text-[9px] md:text-[10px] px-3 py-1.5 rounded-sm tracking-widest border border-zinc-700 cursor-default">
                    {/* La Cortina Gris Oscuro */}
                    <div className="absolute inset-0 bg-zinc-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">Muy Pronto</span>
                  </div>
                )}

              </div>
            </>
          );

          // Renderizado condicional
          if (card.isAvailable && card.href) {
            return (
              <Link key={card.id} href={card.href} className={cardClassName}>
                {cardContent}
              </Link>
            );
          }

          return (
            <div key={card.id} className={cardClassName}>
              {cardContent}
            </div>
          );
        })}
        
      </div>
    </section>
  );
}