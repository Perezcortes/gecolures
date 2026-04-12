import { FiTarget } from "react-icons/fi"; // Usaremos una mira táctica como separador

const PALABRAS_CLAVE = [
  "DISEÑADO EN MÉXICO",
  "STICKS",
  "GECO LURES",
  "CRAWS",
  "CALIDAD PREMIUM",
  "SWIMBAITS",
  "GECO NATION",
  "LIZARDS",
  "TAMAULIPAS",
];

export default function AnimatedMarquee() {
  // Duplicamos el arreglo para crear el efecto visual de "Loop Infinito" sin cortes
  const itemsInfinitos = [...PALABRAS_CLAVE, ...PALABRAS_CLAVE];

  return (
    <section className="relative py-8 border-y border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden flex group cursor-default">
      
      {/* Sombras difuminadas a los lados para que el texto aparezca y desaparezca suavemente */}
      <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-zinc-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-zinc-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

      {/* Contenedor animado */}
      <div className="flex w-max animate-marquee group-hover:pause-marquee items-center">
        {itemsInfinitos.map((item, idx) => {
          // Detectamos si es una palabra principal para darle color naranja
          const esPrincipal = item === "GECO LURES" || item === "DISEÑADO EN MÉXICO" || item === "CALIDAD PREMIUM";

          return (
            <div key={idx} className="flex items-center">
              <span 
                className={`text-5xl md:text-7xl font-display font-black uppercase whitespace-nowrap transition-all duration-500 ${
                  esPrincipal 
                    ? "text-orange-500 drop-shadow-none group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]" 
                    : "text-transparent stroke-text group-hover:text-gray-900 dark:group-hover:text-white group-hover:stroke-none"
                }`}
              >
                {item}
              </span>
              
              {/* Separador: Mira táctica */}
              <span className="mx-8 md:mx-12 text-orange-500/50 group-hover:text-orange-500 transition-colors duration-500">
                <FiTarget className="w-8 h-8 md:w-10 md:h-10" />
              </span>
            </div>
          );
        })}
      </div>

      {/* CSS Inyectado para la animación y el contorno del texto */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Clase para hacer el texto transparente con borde */
        .stroke-text {
          -webkit-text-stroke: 2px #d4d4d8; /* text-zinc-300 para modo claro */
        }
        
        /* Ajuste del borde para modo oscuro */
        :is(.dark .stroke-text) {
          -webkit-text-stroke: 2px #3f3f46; /* text-zinc-700 para modo oscuro */
        }

        /* Animación del carrusel */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        .pause-marquee {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}