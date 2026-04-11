import { ThemeProvider } from 'next-themes';
export { ThemeProvider };
import "./globals.css";
import { Inter, Space_Grotesk, Rye } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
// Fuente rústica similar al logo de GECO
const rye = Rye({ weight: "400", subsets: ["latin"], variable: "--font-rye" });

export const metadata = {
  title: "GECO LURES | Engineered for the Strike",
  description: "Señuelos mexicanos de alto rendimiento.",
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