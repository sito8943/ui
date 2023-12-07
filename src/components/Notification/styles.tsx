// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

// styles
import { AlertVariants, ColorPalette } from "providers/StyleProvider/types";

/**
 *
 * @param colors
 * @param color
 */
export const makeStyles = (colors: ColorPalette, color: AlertVariants) => {
  const preStyles: CSSInterpolation = {
    backgroundColor: colors[color],
  };
  return css({ ...preStyles });
};
