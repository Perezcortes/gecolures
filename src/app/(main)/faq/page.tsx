"use client";

import { useState } from "react";
import { FiTruck, FiHelpCircle, FiChevronDown, FiBox } from "react-icons/fi";

// --- DATOS DE LAS PREGUNTAS ---
const FAQS_ENVIOS = [
  {
    pregunta: "¿Por cuáles paqueterías realizan los envíos?",
    respuesta: "Trabajamos con las mejores logísticas del país para asegurar tu arsenal: principalmente Estafeta, DHL y FedEx. Elegimos la opción más rápida y segura dependiendo de tu ubicación."
  },
  {
    pregunta: "¿Cuánto cuesta el envío a mi ciudad?",
    respuesta: "El costo de envío es variable y depende directamente de tu zona o Código Postal. El cálculo exacto se realiza al momento de armar tu cotización o finalizar tu compra."
  },
  {
    pregunta: "¿Cómo puedo rastrear mi pedido?",
    respuesta: "Una vez que tu paquete esté sellado y entregado a la paquetería, te enviaremos por WhatsApp o correo electrónico el número de guía para que puedas monitorear su trayecto en tiempo real."
  },
  {
    pregunta: "¿Cuentan con envíos internacionales?",
    respuesta: "Nuestra base de operaciones principal cubre toda la República Mexicana. Sin embargo, gracias a la calidad de nuestros plásticos, hemos exportado a Estados Unidos e incluso Portugal. Si requieres envío internacional, contáctanos directamente por WhatsApp para cotizar."
  }
];

const FAQS_GENERALES = [
  {
    pregunta: "¿Tienen un mínimo de compra?",
    respuesta: "¡Para nada! Apoyamos a todos los pescadores, desde los de fin de semana hasta los profesionales de torneo. Puedes comprar desde 1 sola bolsa de nuestro catálogo estándar."
  },
  {
    pregunta: "¿Pueden armar cajas personalizadas por técnica?",
    respuesta: "¡Claro que sí! Si necesitas prepararte para un torneo o quieres dominar un estilo, armamos cajas/kits especiales y personalizados con el arsenal exacto para técnicas específicas como Drop Shot, Wacky, Texas, Carolina, entre otras."
  },
  {
    pregunta: "¿Cuál es el mínimo para pedir un color personalizado?",
    respuesta: "Si tienes en mente un color ganador exclusivo que no está en el catálogo, lo fabricamos para ti. Para estos pedidos especiales, requerimos un mínimo de 6 a 8 bolsas del mismo modelo y color."
  },
  {
    pregunta: "¿Sus señuelos sirven para agua salada?",
    respuesta: "Aunque hoy en día nuestro fuerte indiscutible son los plásticos blandos para Lobina (agua dulce), las raíces de Geco Lures están en el agua salada. Nuestros modelos como imitaciones de camarón y sardina siguen teniendo un éxito rotundo en lugares como La Pesca o Barra del Tordo."
  },
  {
    pregunta: "¿De dónde proviene su materia prima?",
    respuesta: "Utilizamos materia prima y tintas 100% hechas en Estados Unidos. Esto nos garantiza ofrecerte plásticos con la textura, densidad y resistencia necesarias para soportar los ataques más agresivos."
  }
];

// --- COMPONENTE INTERNO DEL ACORDEÓN ---
const FaqItem = ({ pregunta, respuesta }: { pregunta: string, respuesta: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-md bg-zinc-50 dark:bg-[#151515] overflow-hidden transition-colors hover:border-orange-500/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <span className="font-display font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white">
          {pregunta}
        </span>
        <FiChevronDown 
          className={`w-5 h-5 text-orange-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : "rotate-0"}`} 
        />
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5 pt-0 text-sm font-medium text-gray-600 dark:text-zinc-400 leading-relaxed border-t border-gray-200/50 dark:border-zinc-800/50 mx-5 mt-2">
          {respuesta}
        </div>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="mb-16 text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 rounded-sm border border-orange-500/20">
            Base de Conocimiento
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4 leading-none">
            Preguntas <span className="text-orange-500">Frecuentes</span>
          </h1>
          <p className="text-gray-600 dark:text-zinc-400 text-sm md:text-base font-medium max-w-2xl">
            Todo lo que necesitas saber sobre envíos, técnicas, pedidos personalizados y cómo operar con el arsenal de Geco Lures.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* SECCIÓN 1: ENVÍOS Y ENTREGAS */}
          <section>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-zinc-800">
              <FiTruck className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-gray-900 dark:text-white">
                Envíos y Entregas
              </h2>
            </div>
            
            <div className="space-y-4">
              {FAQS_ENVIOS.map((faq, index) => (
                <FaqItem key={index} pregunta={faq.pregunta} respuesta={faq.respuesta} />
              ))}
            </div>
          </section>

          {/* SECCIÓN 2: PREGUNTAS GENERALES Y TÉCNICAS */}
          <section>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-zinc-800">
              <FiHelpCircle className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-gray-900 dark:text-white">
                El Arsenal y Compras
              </h2>
            </div>
            
            {/* Destacamos la funcionalidad de Cajas Personalizadas justo arriba de las FAQS generales */}
            <div className="mb-6 bg-orange-500/10 border border-orange-500/20 rounded-md p-5 flex items-start gap-4">
              <div className="bg-orange-500 p-2 rounded text-white flex-shrink-0 mt-1">
                <FiBox className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-orange-500 mb-1">
                  Kits por Técnica de Pesca
                </h3>
                <p className="text-xs text-gray-700 dark:text-zinc-300 font-medium leading-relaxed">
                  ¿Eres nuevo en la pesca o quieres perfeccionar un estilo? Pregúntanos por nuestras <strong>cajas personalizadas</strong> armadas específicamente para técnicas como Texas, Carolina, Drop Shot o Wacky. Te mandamos exactamente lo que necesitas para ser letal en el agua.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {FAQS_GENERALES.map((faq, index) => (
                <FaqItem key={index} pregunta={faq.pregunta} respuesta={faq.respuesta} />
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}