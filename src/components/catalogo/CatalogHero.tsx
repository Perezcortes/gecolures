export default function CatalogHero() {
  return (
    // 🚀 AJUSTE 1: Eliminamos clases adaptativas. Esta sección es SIEMPRE oscura (bg-black) para look Premium.
    // Aumentamos ligeramente la altura (h-[35vh] md:h-[45vh]) para que la imagen respire.
    <section className="relative h-[35vh] md:h-[45vh] min-h-[300px] flex items-center overflow-hidden bg-black border-b border-zinc-800">
      
      {/* 1. CAPAS DE FONDO (z-0) */}
      <div className="absolute inset-0 z-0">
        {/* 🚀 AJUSTE 2: Imagen 100% visible (opacity-100), a todo color (sin grayscale). ¡Aquí está tu Arsenal! */}
        <div className="absolute inset-0 w-full h-full bg-[url('/slide1.jpg')] bg-cover bg-center bg-no-repeat opacity-100"></div>
        
        {/* 🚀 AJUSTE 3: "El Truco Pro". Un gradiente de negro SÓLIDO a TRANSPARENTE.
            Esto oscurece solo la parte izquierda para garantizar que el texto blanco se lea perfecto,
            mientras revela la imagen nítida a la derecha. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        {/* Patrón táctico sutil de puntitos (Opcional, se ve muy bien sobre negro) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>
      
      {/* 2. CONTENIDO PRINCIPAL (z-10) */}
      <div className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 relative z-10 pt-10">
        
        {/* Etiqueta más corta y limpia */}
        <span className="inline-block px-3 py-1 bg-zinc-900/50 backdrop-blur-md text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 rounded-sm border border-zinc-800">
          Catálogo
        </span>
        
        {/* El título se mantiene rudo e imponente */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter font-display mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          ARSENAL <span className="text-orange-500">DE ÉLITE</span>
        </h1>
        
        {/* 🚀 EL CAMBIO MAGISTRAL: 
            Quitamos las mayúsculas, quitamos el font-bold extremo y acortamos el mensaje. 
            Ahora se lee como una marca de alta gama. */}
        <p className="max-w-xl text-base md:text-lg text-zinc-300 font-medium leading-relaxed drop-shadow-sm">
          Equipamiento táctico para dominar el agua. Plásticos suaves y terminal tackle de grado profesional.
        </p>
      </div>
      
    </section>
  );
}