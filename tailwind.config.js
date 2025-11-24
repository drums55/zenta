 const { fontFamily } = require("tailwindcss/defaultTheme");

 /** @type {import('tailwindcss').Config} */
 module.exports = {
   darkMode: ["class"],
   content: [
     "./src/app/**/*.{ts,tsx}",
     "./src/components/**/*.{ts,tsx}",
   ],
   theme: {
     container: {
       center: true,
       padding: "1.5rem",
       screens: {
         "2xl": "1200px",
       },
     },
     extend: {
       colors: {
         background: "#020617",
         foreground: "#e2e8f0",
         brand: {
           DEFAULT: "#0f172a",
           soft: "#1e293b",
           accent: "#38bdf8",
         },
       },
       fontFamily: {
         sans: ["var(--font-sarabun)", ...fontFamily.sans],
         sarabun: ["var(--font-sarabun)", ...fontFamily.sans],
       },
     },
   },
   plugins: [],
 };
