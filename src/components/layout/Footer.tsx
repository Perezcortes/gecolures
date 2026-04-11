import Link from "next/link";
import Image from "next/image"; // <-- 1. Importamos Image de Next.js
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Newsletter Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4">
            ÚNETE A GECO
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-md">
            Sé el primero en enterarte de nuevos lanzamientos y ofertas exclusivas.
          </p>
          <form className="flex flex-col sm:flex-row w-full max-w-md gap-2">
            <input 
              type="email" 
              placeholder="Ingresa tu correo" 
              className="w-full sm:flex-1 bg-zinc-900 border border-zinc-700 rounded-none px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors text-center sm:text-left"
            />
            <button className="w-full sm:w-auto bg-white text-black font-bold uppercase px-8 py-3 hover:bg-orange-500 hover:text-white transition-colors">
              Suscribirse
            </button>
          </form>
        </div>

        <div className="h-px w-full bg-zinc-800 mb-16"></div>

        {/* Links Grid - Manteniendo la estructura de 2 columnas para celular */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-8 mb-16 font-display uppercase text-left">
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm tracking-widest text-orange-500 mb-2">TACKLE</h4>
            <Link href="/catalogo" className="text-xs text-zinc-400 hover:text-white transition-colors">Todo el Catálogo</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Plásticos Suaves</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Terminal Tackle</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm tracking-widest text-orange-500 mb-2">ROPA & GEAR</h4>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Playeras</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Gorras</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Accesorios</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm tracking-widest text-orange-500 mb-2">SOPORTE</h4>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Contacto</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Envíos y Entregas</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">WhatsApp Directo</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm tracking-widest text-orange-500 mb-2">LA EMPRESA</h4>
            <Link href="/equipo" className="text-xs text-zinc-400 hover:text-white transition-colors">Team GECO</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Distribuidores</Link>
            <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Políticas de Privacidad</Link>
          </div>
        </div>

        {/* Bottom Section - Donde estaba el texto "GECO" */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            
            {/* 2. Reemplazamos el <span> por el componente <Image> */}
            <Link href="/" className="flex items-center justify-center md:justify-start">
              <Image
                src="/geco_letras.png" // Ruta de la imagen en la carpeta public
                alt="GECO Lures Logo"
                width={120} // Ancho base de referencia
                height={48}  // Alto base de referencia
                // Ajustamos el tamaño responsivo: h-12 en celular, h-10 en escritorio
                className="w-auto h-12 md:h-10 object-contain drop-shadow-md"
              />
            </Link>

            <span className="text-zinc-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2 md:mt-0">
              © {new Date().getFullYear()} GECO LURES. All Rights Reserved.
            </span>
          </div>
          <div className="flex gap-8 md:gap-6 mt-4 md:mt-0">
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors"><FiFacebook className="w-6 h-6 md:w-5 md:h-5" /></a>
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors"><FiInstagram className="w-6 h-6 md:w-5 md:h-5" /></a>
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors"><FiYoutube className="w-6 h-6 md:w-5 md:h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}