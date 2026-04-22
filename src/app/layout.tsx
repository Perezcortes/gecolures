import { ThemeProvider } from 'next-themes';
import "./globals.css";
import { Inter, Space_Grotesk, Rye } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const rye = Rye({ weight: "400", subsets: ["latin"], variable: "--font-rye" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://gecolures.com'),
  
  title: "GECO LURES | Arsenal de Élite para la Pesca",
  description: "Con 28 años de experiencia, Geco Lures diseña y fabrica plásticos suaves de grado táctico desde Ciudad Victoria, Tamaulipas. Especialistas en Lobina.",
  
  keywords: [
    "señuelos de pesca", "geco lures", "pesca de lobina", "plásticos suaves", 
    "señuelos mexicanos", "tamaulipas", "craws", "sticks"
  ],
  
  openGraph: {
    title: "GECO LURES | Señuelos de Alto Rendimiento",
    description: "Ingeniería mexicana para la pesca deportiva. Descubre nuestro arsenal.",
    url: "https://gecolures.com",
    siteName: "Geco Lures",
    images: [
      {
        // Logo de respaldo oficial
        url: "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776844048/logo_geco_rn0pwl.png",
        width: 1200,
        height: 630,
        alt: "Geco Lures Logo Oficial",
      },
    ],
    locale: "es_MX",
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