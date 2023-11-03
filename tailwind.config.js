/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
    },
    color: {
      dark: { default: "#262220", alter: "#222333" },
      light: { default: "#fbfbfb", alter: "#eaeaea" },

      primary: {
        default: "#ef476f",
        200: "#cc1f54",
        300: "#a9003a",
        400: "#870023",
        500: "#650009"
      },
      secondary: {
        default: "#06d6a0",
        200: "#00ab78",
        300: "#008153",
        400: "#005930",
        500: "#00340f"
      },
      ternary: {
        default: "#118ab2",
        200: "#006f95",
        300: "#00557a",
        400: "#003c5f",
        500: "#002545"

      }
    },
    extend: {},
  },
  plugins: [],
}