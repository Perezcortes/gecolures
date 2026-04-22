"use client";

import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactoPage() {
  const whatsappUrl = "https://wa.me/5218341218524?text=Hola%20Gerardo,%20tengo%20una%20duda%20sobre%20el%20arsenal%20de%20Geco%20Lures.";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO */}
        <div className="mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 rounded-sm border border-orange-500/20">
            Soporte Directo
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4 leading-none">
            Comunícate con <br className="hidden md:block" />
            <span className="text-orange-500">El Cuartel General</span>
          </h1>
          <p className="text-gray-600 dark:text-zinc-400 text-sm md:text-base font-medium max-w-2xl">
            ¿Dudas sobre un pedido, envíos o quieres armar un color personalizado para tu próximo torneo? Estamos aquí para equiparte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* LADO IZQUIERDO: INFORMACIÓN DIRECTA */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-zinc-50 dark:bg-[#151515] p-6 rounded-md border border-gray-200 dark:border-zinc-800">
              <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiMessageSquare className="text-orange-500" />
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                  <div className="bg-white dark:bg-black p-3 rounded border border-gray-200 dark:border-zinc-800 text-gray-400 group-hover:text-[#25D366] group-hover:border-[#25D366] transition-colors">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 mb-0.5">WhatsApp Directo</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#25D366] transition-colors">+52 1 834 121 8524</p>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1">Con Gerardo Garza</p>
                  </div>
                </a>

                <a href="mailto:gecolures@hotmail.com" className="flex items-start gap-4 group cursor-pointer">
                  <div className="bg-white dark:bg-black p-3 rounded border border-gray-200 dark:border-zinc-800 text-gray-400 group-hover:text-orange-500 group-hover:border-orange-500 transition-colors">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 mb-0.5">Correo Electrónico</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">gecolures@hotmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-black p-3 rounded border border-gray-200 dark:border-zinc-800 text-orange-500">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 mb-0.5">Ubicación Base</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Ciudad Victoria, Tamaulipas</p>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1">Envíos a todo México por DHL, FedEx y Estafeta</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-black p-3 rounded border border-gray-200 dark:border-zinc-800 text-orange-500">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 mb-0.5">Horarios de Atención</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Lunes a Viernes</p>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AVISO TÁCTICO SOBRE PEDIDOS ESPECIALES */}
            <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-md">
              <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">Colores Personalizados</h4>
              <p className="text-xs text-gray-700 dark:text-zinc-300 font-medium leading-relaxed">
                ¿Tienes en mente un color ganador que no está en el catálogo? Lo fabricamos para ti. Requerimos un <strong>pedido mínimo de 6 a 8 bolsas</strong>. Mándanos un WhatsApp para cotizar tu diseño exclusivo.
              </p>
            </div>

          </div>

          {/* LADO DERECHO: FORMULARIO */}
          <div className="lg:col-span-3">
            <form className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8 rounded-md border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    placeholder="Ej. Juan Pérez"
                    className="bg-zinc-50 dark:bg-[#151515] border border-gray-200 dark:border-zinc-800 rounded px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors font-medium placeholder-gray-400 dark:placeholder-zinc-600"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="telefono" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">Teléfono / WhatsApp</label>
                  <input 
                    type="tel" 
                    id="telefono" 
                    placeholder="Tu número a 10 dígitos"
                    className="bg-zinc-50 dark:bg-[#151515] border border-gray-200 dark:border-zinc-800 rounded px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors font-medium placeholder-gray-400 dark:placeholder-zinc-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="correo" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="correo" 
                  placeholder="tucorreo@ejemplo.com"
                  className="bg-zinc-50 dark:bg-[#151515] border border-gray-200 dark:border-zinc-800 rounded px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors font-medium placeholder-gray-400 dark:placeholder-zinc-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensaje" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">Mensaje</label>
                <textarea 
                  id="mensaje" 
                  rows={5}
                  placeholder="¿En qué te podemos ayudar?"
                  className="bg-zinc-50 dark:bg-[#151515] border border-gray-200 dark:border-zinc-800 rounded px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors font-medium placeholder-gray-400 dark:placeholder-zinc-600 resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="group flex items-center justify-center gap-2 bg-orange-500 text-white font-display font-black uppercase text-xs md:text-sm px-6 py-4 rounded hover:bg-orange-600 transition-colors tracking-widest mt-2"
              >
                <span>Enviar Mensaje</span>
                <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[9px] text-center text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-2">
                Al enviar este mensaje, aceptas nuestra política de privacidad.
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}