"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

type AccordionProps = {
  descripcion: string;
  piezas?: number | string; // <-- Ahora recibe directamente el número de piezas
};

export default function ProductAccordion({ descripcion, piezas }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Lógica automática para el texto del paquete
  const textoPaquete = piezas
    ? `Este empaque contiene ${piezas} piezas.\n\nDesde Ciudad Victoria con 28 años de experiencia. Plásticos de grado profesional con densidad controlada para un movimiento irresistible bajo el agua.`
    : "Desde Ciudad Victoria con 28 años de experiencia. Plásticos de grado profesional con densidad controlada para un movimiento irresistible bajo el agua.";

  const specs = [
    {
      title: "ESPECIFICACIONES DEL PRODUCTO",
      content: descripcion || "Diseñado con ingeniería de élite para máximo rendimiento en el agua."
    },
    {
      title: "EL PAQUETE INCLUYE",
      content: textoPaquete // <-- Usa el texto automático que creamos arriba
    },
    {
      title: "ENVÍOS Y DEVOLUCIONES",
      content: "Enviamos a toda la República vía Estafeta, DHL o FedEx. El costo se calcula según tu C.P. para garantizar la mejor tarifa. Por seguridad y calidad, documentamos fotográficamente cada pedido antes del envío. Solo aceptamos cambios por errores de despacho reportados dentro de las primeras 48 horas con el empaque sellado."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-zinc-800">
      {specs.map((item, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-zinc-800">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
          >
            <span className="font-display font-black text-sm md:text-base uppercase tracking-widest text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
              {item.title}
            </span>
            <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
              {openIndex === index ? <FiMinus className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed font-medium whitespace-pre-line">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}