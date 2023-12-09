// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

// styles
import { ColorPalette, ColorVariants } from "providers/StyleProvider/types";

export const makeStyles = (
  colors: ColorPalette,
  activeColor: ColorVariants,
  inactiveColor: ColorVariants
) => {
  const preActiveStyles: CSSInterpolation = {
    backgroundColor: colors[activeColor].default,
    "& .ball": {
      backgroundColor: colors[activeColor].text,
    },
  };
  const preInactiveStyles: CSSInterpolation = {
    backgroundColor: colors[inactiveColor].default,
    "& .ball": {
      backgroundColor: colors[inactiveColor].text,
    },
  };
  return {
    active: css(preActiveStyles),
    inactive: css(preInactiveStyles),
  };
};
