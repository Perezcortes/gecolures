import { ThemeProvider } from 'next-themes';
export { ThemeProvider };
import "./globals.css";
import { Inter, Space_Grotesk, Rye } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
// Fuente rústica similar al logo de GECO
const rye = Rye({ weight: "400", subsets: ["latin"], variable: "--font-rye" });

export const metadata = {
  // Título agresivo y en español
  title: "GECO LURES | Arsenal de Élite para la Pesca",
  
  // Descripción enriquecida para Google
  description: "Con 28 años de experiencia, Geco Lures diseña y fabrica plásticos suaves de grado táctico desde Ciudad Victoria, Tamaulipas. Especialistas en Lobina con más de 300 colores personalizables.",
  
  // Palabras clave ocultas para el buscador
  keywords: [
    "señuelos de pesca", "geco lures", "pesca de lobina", "plásticos suaves", 
    "señuelos mexicanos", "tamaulipas", "craws", "sticks", "wacky", "drop shot"
  ],
  
  // OpenGraph: Así se verá cuando compartan el link por WhatsApp o Facebook
  openGraph: {
    title: "GECO LURES | Señuelos de Alto Rendimiento",
    description: "Ingeniería mexicana para la pesca deportiva. Descubre nuestro arsenal.",
    url: "https://gecolures.com", // IMPORTANTE: Cambiar por el dominio final
    siteName: "Geco Lures",
    images: [
      {
        url: "/logo_geco.png", // La imagen que saldrá en la vista previa
        width: 800,
        height: 600,
        alt: "Geco Lures Logo Oficial",
      },
    ],
    locale: "es_MX", // Especifica que es contenido para México
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${rye.variable} bg-geco-gray-light dark:bg-geco-black text-gray-900 dark:text-white transition-colors duration-300 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}