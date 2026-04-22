"use client";

import { useCart } from "@/context/CartContext";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiExternalLink } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const router = useRouter();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const phoneNumber = "5218341218524";
    
    let message = `¡Hola! Me interesa armar este arsenal de Geco Lures: %0A%0A`;
    cart.forEach((item) => {
      message += `✅ *${item.cantidad}x ${item.nombre}*%0A`;
      message += `   • Color: ${item.color}%0A`;
      message += `   • Tamaño: ${item.medida}%0A`;
      message += `   • ${item.precioFormateado} c/u (${item.piezas})%0A%0A`;
    });

    message += `--------------------------%0A`;
    message += `*TOTAL ESTIMADO: $${cartTotal.toFixed(2)} MXN*%0A`;
    message += `--------------------------%0A%0A`;
    message += `¿Tienen disponibilidad para coordinar el envío y el pago?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleRemove = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar "${name}" de tu arsenal?`)) {
      removeFromCart(id);
    }
  };

  // 🚀 LA CORRECCIÓN ESTÁ AQUÍ
  const goToProduct = (slug: string, color: string, medida: string) => {
    closeCart();
    // Usamos el slug limpio que viene del item
    router.push(`/catalogo/${slug}?color=${encodeURIComponent(color)}&medida=${encodeURIComponent(medida)}`);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[100] transition-opacity duration-500 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeCart}
      />

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white/90 dark:bg-black/80 backdrop-blur-2xl border-l border-white/20 dark:border-zinc-800/50 z-[101] shadow-[-20px_0_50px_rgba(0,0,0,0.2)] transform transition-all duration-500 ease-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-sm">
              <FiShoppingBag className="text-white w-5 h-5" />
            </div>
            <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-gray-900 dark:text-white">
              TU <span className="text-orange-500">ARSENAL</span>
            </h2>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors group">
            <FiX className="w-6 h-6 text-gray-500 group-hover:text-orange-500 transition-colors" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center">
              <FiShoppingBag className="w-12 h-12 opacity-20 mb-4" />
              <p className="font-display font-black uppercase tracking-widest text-xs opacity-50">
                Tu caja de pesca está vacía
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="group relative flex gap-4 p-3 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-lg hover:border-orange-500/50 transition-all duration-300">
                
                {/* 🚀 USAMOS item.slug EN LUGAR DE SPLITS */}
                <button 
                  onClick={() => goToProduct(item.slug, item.color, item.medida)}
                  className="w-24 h-24 bg-zinc-100 dark:bg-black rounded-md border border-gray-200 dark:border-zinc-800 overflow-hidden relative flex-shrink-0 shadow-inner group/img"
                >
                  <Image src={item.imagen} alt={item.nombre} fill className="object-contain p-2 group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                    <FiExternalLink className="text-white w-6 h-6" />
                  </div>
                </button>
                
                <div className="flex-1 flex flex-col justify-between py-1 text-left">
                  <div className="cursor-pointer" onClick={() => goToProduct(item.slug, item.color, item.medida)}>
                    <h3 className="font-display font-black text-sm md:text-base uppercase leading-tight text-gray-900 dark:text-white line-clamp-1 pr-6 group-hover:text-orange-500 transition-colors">
                      {item.nombre}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mt-1">
                      {item.color} <span className="text-zinc-400 mx-1">|</span> {item.medida}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="font-display font-black text-lg text-gray-900 dark:text-white">
                      {item.precioFormateado}
                    </p>
                    
                    <div className="flex items-center bg-zinc-100 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-md overflow-hidden shadow-sm">
                      <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} className="p-2 text-gray-500 hover:text-orange-500 transition-colors">
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black w-6 text-center text-gray-900 dark:text-white">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} className="p-2 text-gray-500 hover:text-orange-500 transition-colors">
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleRemove(item.id, item.nombre)} 
                  className="absolute top-2 right-2 text-zinc-300 hover:text-red-500 transition-colors p-1"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-gray-50/80 dark:bg-zinc-900/50 backdrop-blur-xl border-t border-gray-200 dark:border-zinc-800">
            <div className="flex justify-between items-end mb-6 text-left">
              <div>
                <p className="font-black uppercase tracking-widest text-[10px] text-zinc-500 mb-1">Subtotal</p>
                <p className="font-display font-black text-3xl text-gray-900 dark:text-white leading-none">
                  ${cartTotal.toFixed(2)} <span className="text-sm text-zinc-400 font-sans">MXN</span>
                </p>
              </div>
              <p className="text-[10px] font-black uppercase text-zinc-400 bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-sm">
                {cart.length} Artículos
              </p>
            </div>
            
            <button 
              onClick={handleWhatsAppCheckout}
              className="group w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 rounded-md font-display font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
            >
              <FaWhatsapp className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Completar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}