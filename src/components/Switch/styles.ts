// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

// styles
import { ColorPalette, ColorVariants } from "providers/StyleProvider/types";

export const makeStyles = (
  colors: ColorPalette,
  activeColor: ColorVariants,
  inactiveColor: ColorVariants
) => {
  const createStyles = (color: ColorVariants): CSSInterpolation => ({
    backgroundColor: colors[color].default,
    "& .ball": {
      backgroundColor: colors[color].text,
    },
  });

  return {
    root: css({
      ".s-active": createStyles(activeColor),
      ".s-inactive": createStyles(inactiveColor),
    }),
  };
};
