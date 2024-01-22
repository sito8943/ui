// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

// styles
import { ColorPalette, ColorVariants } from "providers/StyleProvider/types";

export const makeStyles = (colors: ColorPalette, color: ColorVariants) => {
  const inputStyles: CSSInterpolation = {
    color: colors[color].text,
    backgroundColor: colors[color].default,
    option: {
      color: colors[color].text,
      backgroundColor: colors[color].default,
    },
  };

  return {
    root: css({
      "s-input": inputStyles,
    }),
  };
};
