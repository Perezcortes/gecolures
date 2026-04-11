import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Esto es vital para que next-themes controle la clase 'dark'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        geco: {
          orange: "#FF6B00", // El color principal de la marca
          orangeHover: "#e65c00",
          black: "#0e0e0e", // Fondo oscuro principal
          blackSoft: "#1a1a1a", // Tarjetas en modo oscuro
          white: "#ffffff",
          grayLight: "#f9fafb", // Fondo claro principal
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        // Puedes importar estas fuentes en tu globals.css desde Google Fonts
        headline: ["Space Grotesk", "sans-serif"], 
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;