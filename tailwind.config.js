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
      dark: { default: "#1b1b1b", alter: "#222222", extra: "#333333" },
      light: { default: "#ffffff", alter: "#f0f0f0", 200: "#e9e9e9" },
      primary: {
        50: "#FDE4EA",
        100: "#FBBCCB",
        200: "#F891A9",
        300: "#F46688",
        400: "#EF476F",
        500: "#EB2E57",
        600: "#DA2955",
        700: "#C52451",
        800: "#B01E4E",
        900: "#8C1548"
      },
      secondary: {
        50: "#D9FCF3",
        100: "#A0F5DE",
        200: "#47EFC8",
        300: "#00E4B1",
        400: "#00D8A0",
        500: "#00CC91",
        600: "#00BD82",
        700: "#00AB71",
        800: "#009A62",
        900: "#007B43"
      },
      ternary: {
        50: "#E0F5FC",
        100: "#B1E5F8",
        200: "#7DD3F4",
        300: "#47C2EF",
        400: "#0DB5ED",
        500: "#00A8EC",
        600: "#009BDE",
        700: "#0088CA",
        800: "#0077B7",
        900: "#005796"
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
