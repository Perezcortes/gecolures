"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

type AccordionProps = {
  descripcion: string;
  paqueteIncluye: string;
};

export default function ProductAccordion({ descripcion, paqueteIncluye }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const specs = [
    {
      title: "ESPECIFICACIONES DEL PRODUCTO",
      content: descripcion || "Diseñado con ingeniería de élite para máximo rendimiento en el agua."
    },
    {
      title: "EL PAQUETE INCLUYE",
      // Si el producto tiene el dato, lo usa. Si no, pone un texto por defecto.
      content: paqueteIncluye || "Señuelos de plástico suave infundidos con sal y nuestra esencia atrayente exclusiva."
    },
    {
      title: "ENVÍOS Y DEVOLUCIONES",
      content: "Envío gratis en pedidos mayores a $899 MXN. Despachamos en 24 horas hábiles desde nuestra base táctica. Tienes 30 días para devoluciones si el producto no ha sido abierto."
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