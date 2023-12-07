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
    "& .switcher": {
      backgroundColor: colors[activeColor].default,
    },
    "& .ball": {
      color: colors[activeColor].text,
    },
  };
  const preInactiveStyles: CSSInterpolation = {
    "& .switcher": {
      backgroundColor: colors[inactiveColor].default,
    },
    "& .ball": {
      color: colors[activeColor].text,
    },
  };
  return {
    active: css(preActiveStyles),
    inactive: css(preInactiveStyles),
  };
};
