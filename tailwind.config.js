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
      dark: { default: "#101010", alter: "#303030", extra: "#4e4e4e" },
      light: { default: "#f7f7f7", alter: "#ededed", extra: "#e1e1e1" },
      primary: {
        50: "#ffe9ec",
        100: "#ffc7cc",
        200: "#f9908e",
        300: "#f16162",
        400: "#fb3338",
        500: "#ff0112",
        600: "#f10016", // <---
        700: "#df0010",
        800: "#d20006",
        900: "#c50000",
      },
      secondary: {
        50: "#e3f3ff",
        100: "#bbe0ff",
        200: "#8dceff",
        300: "#59baff",
        400: "#29aaff",
        500: "#009bff",
        600: "#008cff",
        700: "#0079f2", // <----
        800: "#0c67e0",
        900: "#1646c1",
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
