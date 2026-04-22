import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext"; 
import CartDrawer from "@/components/layout/CartDrawer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />
        {/* El contenido de tus páginas (como page.tsx) se renderizará aquí */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
}