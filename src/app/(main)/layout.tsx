import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* El contenido de tus páginas (como page.tsx) se renderizará aquí */}
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}