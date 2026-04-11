export default function CatalogHero() {
  return (
    <section className="relative h-[30vh] md:h-[40vh] flex items-center overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
      <div className="absolute inset-0 bg-[radial-gradient(#ff9159_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.05] dark:opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 dark:from-[#0e0e0e] dark:via-[#0e0e0e]/80 to-transparent z-10"></div>
      <div className="absolute inset-0 w-full h-full bg-[url('/slide1.jpg')] bg-cover bg-center grayscale-[0.3] opacity-30 dark:opacity-40"></div>
      
      {/* Aquí también expandimos el ancho para que el título se alinee con los filtros */}
      <div className="w-full max-w-[1600px] mx-auto px-6 xl:px-12 relative z-20">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-display mb-4 text-gray-900 dark:text-white">
          ARSENAL <span className="text-orange-500">DE ÉLITE</span>
        </h1>
        <p className="max-w-xl text-sm md:text-base font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400">
          INGENIERÍA PARA EL ATAQUE. PLÁSTICOS SUAVES DE GRADO TÁCTICO Y TERMINAL TACKLE.
        </p>
      </div>
    </section>
  );
}