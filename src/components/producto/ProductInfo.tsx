"use client";

import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";

// Agregué más colores para simular un catálogo extenso y comprobar que el diseño lo soporta
const colors = [
  { name: "June Bug", hex: "#321356" },
  { name: "Green Pumpkin", hex: "#3e4a1f" },
  { name: "Midnight Chrome", hex: "#000000" },
  { name: "Red Shad", hex: "#8b0000" },
  { name: "Safety Orange", hex: "#ff7a2f" },
  { name: "Watermelon Seed", hex: "#4b5320" },
  { name: "Pearl White", hex: "#f0f0f0" },
  { name: "Chartreuse", hex: "#dfff00" },
  { name: "Black Blue", hex: "#000033" },
  { name: "Motor Oil", hex: "#4a4000" },
];

export default function ProductInfo() {
  const [selectedSize, setSelectedSize] = useState("4\"");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  return (
    <div className="flex flex-col">
      {/* Header más compacto */}
      <header className="mb-6 border-b border-gray-200 dark:border-zinc-800 pb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1">
          PLÁSTICOS SUAVES
        </p>
        <h1 className="font-display font-black text-4xl md:text-5xl leading-[0.9] uppercase tracking-tighter text-gray-900 dark:text-white mb-2">
          GECO CRAW
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-display font-black text-gray-900 dark:text-white tracking-tighter">$185.00</span>
          <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mt-1.5">MXN</span>
        </div>
        
        {/* Bullets más sutiles */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Scented
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Heavy Salt
          </span>
        </div>
      </header>

      {/* Selector de Color (Ahora escalable) */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">Color:</h3>
          <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-400">{selectedColor}</span>
        </div>
        {/* Cambiamos gap y tamaño para que quepan muchos más */}
        <div className="flex flex-wrap gap-2 md:gap-2.5">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              // Redujimos de w-12/h-12 a w-8/h-8 (o w-9 en desktop)
              className={`w-8 h-8 md:w-9 md:h-9 rounded-full border transition-all shadow-sm ${selectedColor === color.name ? 'border-white dark:border-zinc-900 ring-2 ring-orange-500 scale-110' : 'border-gray-200 dark:border-zinc-700 hover:scale-105'}`}
            />
          ))}
        </div>
      </div>

      {/* Selector de Tamaño (Compacto) */}
      <div className="mb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-3">Tamaño</h3>
        {/* flex-wrap permite que si hay muchas tallas, pasen al renglón de abajo sin deformarse */}
        <div className="flex flex-wrap gap-2.5">
          {["3\"", "4\"", "5\"", "6\"", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              // Quitamos flex-1, ajustamos padding y fuente a text-sm/base
              className={`min-w-[3.5rem] px-4 py-2 font-display font-black text-sm md:text-base transition-all rounded border ${selectedSize === size ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-zinc-700 hover:border-orange-500'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Botón de Compra (Proporcionado) */}
      <div className="space-y-4 mb-8">
        <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 font-display font-black text-lg uppercase tracking-widest transition-colors hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white rounded flex items-center justify-center gap-3 shadow-md">
          <FiShoppingBag className="w-5 h-5" />
          AGREGAR AL CARRITO
        </button>
      </div>

      {/* Squad Tip (Tipografía más fina) */}
      <div className="bg-zinc-50 dark:bg-[#121212] p-5 border border-gray-200 dark:border-zinc-800 rounded">
        <h4 className="font-display font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5 text-orange-500">
          <span className="material-symbols-outlined text-sm">military_tech</span>
          GECO TIP
        </h4>
        <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed font-medium italic">
          "El Geco Craw está diseñado con patas en forma de V que crean una acción de pataleo agresiva. Móntalo en un Texas Rig ligero para penetrar cobertura densa, o úsalo como tráiler en tu jig favorito para darle extra volumen y vibración."
        </p>
      </div>
    </div>
  );
}