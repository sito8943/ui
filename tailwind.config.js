/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { min: "1537px" },
      // => @media (min-width: 1535px) { ... }

      xl: { max: "1536px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1200px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "900px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "600px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "400px" },
      // => @media (max-width: 383px) { ... }
    },
    colors: {
      dark: { dark: "#101010", default: "#303030", light: "#4e4e4e" },
      light: { dark: "#e1e1e1", default: "#ededed", light: "#f7f7f7" },
    },
    extend: {},
  },
  plugins: [],
};
