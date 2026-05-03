export default function CatalogHero() {
  return (
    // 🚀 Mantenemos la estructura asimétrica, pero forzamos el fondo a oscuro siempre (bg-geco-black)
    <section className="relative h-[45vh] md:h-[45vh] min-h-[350px] flex items-end md:items-center pb-10 md:pb-0 overflow-hidden bg-geco-black border-b border-gray-200 dark:border-zinc-800">
      
      {/* 1. CAPAS DE FONDO (z-0) */}
      <div className="absolute inset-0 z-0">
        
        {/* Imagen del Catálogo */}
        <div className="absolute inset-0 w-full h-full bg-[url('/slide1.jpg')] bg-cover bg-center md:bg-right bg-no-repeat opacity-100"></div>
        
        {/* 🚀 OVERLAYS FIJOS EN NEGRO PARA GARANTIZAR LECTURA */}
        {/* En móvil: Gradiente vertical oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-geco-black via-geco-black/95 to-transparent md:hidden pointer-events-none"></div>
        
        {/* En PC: Gradiente horizontal oscuro */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-geco-black via-geco-black/80 to-transparent pointer-events-none"></div>
        
        {/* Patrón táctico sutil siempre con puntitos claros */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>
      </div>
      
      {/* 2. CONTENIDO PRINCIPAL (z-20) */}
      <div className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 relative z-20 flex flex-col items-center text-center md:items-start md:text-left">
        
        {/* Etiqueta siempre con estilo oscuro/cristal */}
        <span className="inline-block px-3 py-1 bg-zinc-900/50 backdrop-blur-md text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 rounded-sm border border-zinc-800">
          Catálogo
        </span>
        
        {/* 🚀 Título siempre en Blanco (text-white) */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter font-display mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          ARSENAL <span className="text-geco-orange">DE ÉLITE</span>
        </h1>
        
        {/* 🚀 Párrafo siempre en Gris Claro (text-zinc-300) */}
        <p className="max-w-xl text-sm sm:text-base md:text-lg text-zinc-300 font-medium leading-relaxed drop-shadow-sm border-l-2 border-geco-orange pl-4 md:pl-0 md:border-none">
          Equipamiento táctico para dominar el agua. Plásticos suaves y terminal tackle de grado profesional.
        </p>
      </div>
      
    </section>
  );
}