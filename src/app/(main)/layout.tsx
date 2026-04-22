import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext"; 
import CartDrawer from "@/components/layout/CartDrawer";
import AnnouncementModal from "@/components/layout/AnnouncementModal"; 

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />
        <AnnouncementModal /> {/* INCLUIMOS EL MODAL DE ANUNCIOS */}
        {/* El contenido de tus páginas (como page.tsx) se renderizará aquí */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
}