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
  },
};
