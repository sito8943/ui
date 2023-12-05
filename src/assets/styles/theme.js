module.exports = {
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
        50: "#FFEBEE",
        100: "#FFCDD3",
        200: "#F19A9B",
        300: "#E77274",
        400: "#F25151",
        500: "#F74037",
        600: "#E83636", // <---
        700: "#D62C30",
        800: "#C92429",
        900: "#BA161D",
      },
      secondary: {
        50: "#E3F3FF",
        100: "#BBE0FF",
        200: "#8DCEFF",
        300: "#59BAFF",
        400: "#29AAFF",
        500: "#009BFF",
        600: "#008CFF",
        700: "#0079F2", // <----
        800: "#0C67E0",
        900: "#1646C1",
      },
      error: "#CC0000",
      warning: "#FF8800",
      success: "#007733",
      info: "#0099CC",
    },
  },
};
