/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "383px" },
      // => @media (max-width: 383px) { ... }
    },
    colors: {
      dark: { dark: "#101010", default: "#303030", light: "#4e4e4e" },
      light: { dark: "#e1e1e1", default: "#ededed", light: "#f7f7f7" },
      primary: {
        light: "#F74037",
        default: "#E83636", // <---
        dark: "#D62C30",
      },
      secondary: {
        light: "#008CFF",
        default: "#0079F2", // <----
        dark: "#0C67E0",
      },
      error: "#CC0000",
      warning: "#FF8800",
      success: "#007733",
      info: "#0099CC",
    },
    extend: {},
  },
  plugins: [],
};
