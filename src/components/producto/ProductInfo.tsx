"use client";

import { useState, useEffect } from "react";
import { FiShoppingBag, FiShare2 } from "react-icons/fi";
import { calcularPrecioYPiezas } from "@/utils/calculadoraGeco";
import ProductAccordion from "./ProductAccordion"; 

type ProductInfoProps = {
  producto: any;
  colores: any[];
  tallas: string[];
};

export default function ProductInfo({ producto, colores, tallas }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const tallasOrdenadas = [...tallas].sort((a, b) => {
    const numA = parseFloat(a.replace(/[^0-9.]/g, ''));
    const numB = parseFloat(b.replace(/[^0-9.]/g, ''));
    if (isNaN(numA) && isNaN(numB)) return a.localeCompare(b);
    if (isNaN(numA)) return 1;
    if (isNaN(numB)) return -1;
    return numA - numB;
  });

  useEffect(() => {
    if (tallasOrdenadas.length > 0) setSelectedSize(tallasOrdenadas[0]);
    if (colores.length > 0) setSelectedColor(colores[0].nombre);
  }, [tallas, colores]);

  const handleShare = async () => {
    const shareData = {
      title: `${producto.nombre} | Geco Lures`,
      text: `Mira este ${producto.nombre} en Geco Lures. Arsenal de Élite.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } 
      catch (err) { console.log("Compartir cancelado"); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  const colorSeleccionadoObj = colores.find(c => c.nombre === selectedColor);
  const clasificacionActual = colorSeleccionadoObj?.clasificacion || "Sólido";

  const calculo = calcularPrecioYPiezas(
    producto.nombre, 
    selectedSize || "5\"", 
    selectedColor || "",
    clasificacionActual
  );

  return (
    <div className="flex flex-col">
      <header className="mb-6 border-b border-gray-200 dark:border-zinc-800 pb-5">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
            {producto.categorias?.nombre || "EQUIPO TÁCTICO"}
          </p>
          <button onClick={handleShare} className="text-gray-500 dark:text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1.5 text-xs md:text-sm font-black uppercase tracking-widest">
            <FiShare2 className="w-4 h-4 md:w-5 md:h-5" /> COMPARTIR
          </button>
        </div>

        <h1 className="font-display font-black text-4xl md:text-5xl leading-[0.9] uppercase tracking-tighter text-gray-900 dark:text-white mb-4">
          {producto.nombre}
        </h1>
        
        <div className="flex flex-col gap-2">
          <span className="text-3xl md:text-4xl font-display font-black text-orange-500 tracking-tighter leading-none">
            {calculo.precioFormateado}
          </span>
          <div className="w-fit">
            <span className="text-[10px] md:text-xs font-black uppercase text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 rounded-sm tracking-widest">
              {calculo.textoPaquete}
            </span>
          </div>
        </div>
      </header>

      <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5 flex items-center gap-2 w-fit">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-[9px] font-black uppercase tracking-widest text-green-600 dark:text-green-500 mt-0.5">
          EN STOCK
        </span>
      </div>

      {colores.length === 1 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">Color Único:</h3>
            <span className="text-[10px] font-bold text-orange-500">{colores[0].nombre}</span>
          </div>
          <div title={colores[0].nombre} className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-200 dark:border-zinc-700 shadow-sm bg-zinc-800 cursor-default" style={{ backgroundImage: `url(${colores[0].swatch_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
      )}

      {colores.length > 1 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">Color:</h3>
            <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-400">{selectedColor}</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {colores.map((color) => (
              <button key={color.id} onClick={() => setSelectedColor(color.nombre)} title={color.nombre} style={{ backgroundImage: `url(${color.swatch_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className={`w-8 h-8 md:w-9 md:h-9 rounded-full border transition-all shadow-sm bg-zinc-800 ${selectedColor === color.nombre ? 'border-white dark:border-zinc-900 ring-2 ring-orange-500 scale-110' : 'border-gray-200 dark:border-zinc-700 hover:scale-105'}`} />
            ))}
          </div>
        </div>
      )}

      {tallasOrdenadas.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-3">Tamaño</h3>
          <div className="flex flex-wrap gap-2.5">
            {tallasOrdenadas.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)} className={`min-w-[3.5rem] px-4 py-2 font-display font-black text-sm md:text-base transition-all rounded border ${selectedSize === size ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-zinc-700 hover:border-orange-500'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-8">
        <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 font-display font-black text-lg uppercase tracking-widest transition-colors hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white rounded flex items-center justify-center gap-3 shadow-md">
          <FiShoppingBag className="w-5 h-5" />
          AGREGAR AL CARRITO
        </button>
      </div>

      {producto.squad_tip && (
        <div className="bg-zinc-50 dark:bg-[#121212] p-5 border border-gray-200 dark:border-zinc-800 rounded mb-8">
          <h4 className="font-display font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5 text-orange-500">
            <span className="material-symbols-outlined text-sm">military_tech</span>
            GECO TIP
          </h4>
          <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed font-medium italic">
            "{producto.squad_tip}"
          </p>
        </div>
      )}

      <ProductAccordion 
        descripcion={producto.descripcion} 
        piezas={calculo.piezas} 
      />
      
    </div>
  );
}