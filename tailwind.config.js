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
        background: "#f5f0e8",
        foreground: "#1f2933",
        brand: {
          DEFAULT: "#c8b18a",
          soft: "#f3e7d8",
          accent: "#3f5143",
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
