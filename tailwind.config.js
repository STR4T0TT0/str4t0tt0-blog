/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['"orbitron"', 'system-ui', 'sans-serif'],     // Titres
        roboto: ['"roboto"', 'system-ui', 'sans-serif'],          // Corps
        prag: ['"pragmatica"', 'system-ui', 'sans-serif'], // Accents / fallback
      },
    },
  },
  plugins: [],
}