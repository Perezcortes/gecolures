import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiInstagram, FiYoutube, FiCode } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const whatsappUrl = "https://wa.me/529531447499?text=Hola%20José,%20me%20interesa%20un%20proyecto%20web.";

  return (
    // 🚀 Redujimos el padding inferior del footer (pb-2) para que todo se pegue más abajo
    <footer className="w-full bg-[#0a0a0a] text-white pt-16 pb-2 border-t border-zinc-800">
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

        {/* Links Grid */}
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
            <Link href="/contacto" className="text-xs text-zinc-400 hover:text-white transition-colors">Contacto</Link>
            <Link href="/faq" className="text-xs text-zinc-400 hover:text-white transition-colors">Preguntas Frecuentes</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm tracking-widest text-orange-500 mb-2">LA EMPRESA</h4>
            <Link href="/team" className="text-xs text-zinc-400 hover:text-white transition-colors">Team GECO</Link>
            <Link href="/privacidad" className="text-xs text-zinc-400 hover:text-white transition-colors">Políticas de Privacidad</Link>
            <Link href="/terminos" className="text-xs text-zinc-400 hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>

        {/* Bottom Section - El hogar del Logo Original */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8 border-t border-zinc-800">

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo_geco.png"
                alt="GECO Lures Logo Original"
                width={320}
                height={180}
                className="w-auto h-16 md:h-24 object-contain drop-shadow-lg"
              />
            </Link>

            <span className="text-zinc-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2 md:mt-0 max-w-xs">
              © {new Date().getFullYear()} GECO LURES. All Rights Reserved.
            </span>
          </div>

          <div className="flex gap-8 md:gap-6 mt-2 md:mt-0">
            <a
              href="https://www.facebook.com/gecolures"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-orange-500 transition-colors"
            >
              <FiFacebook className="w-6 h-6 md:w-5 md:h-5" />
            </a>

            {/* <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-500 transition-colors">
              <FiInstagram className="w-6 h-6 md:w-5 md:h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-500 transition-colors">
              <FiYoutube className="w-6 h-6 md:w-5 md:h-5" />
            </a>
            */}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center pb-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-600 hover:text-green-500 transition-colors"
        >
          <FiCode className="w-2.5 h-2.5" />
          <span>Desarrollado por: José Pérez</span>
          <FaWhatsapp className="w-3 h-3 ml-0.5" />
        </a>
      </div>

    </footer>
  );
}