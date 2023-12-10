// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

// styles
import { ColorPalette, ColorVariants } from "providers/StyleProvider/types";

/**
 *
 * @param colors to set background color
 * @param color to set stroke color
 * @param inverted to invert background color with stroke color
 * @returns
 */
export const makeStyles = (
  colors: ColorPalette,
  color: ColorVariants,
  inverted: boolean
) => {
  const preStyles: CSSInterpolation = {
    backgroundColor: colors.basics.default,
  };
  preStyles["& .path"] = {
    stroke: colors[color].default,
  };
  if (inverted) {
    const bridge = preStyles.backgroundColor;
    preStyles.backgroundColor = preStyles["& .path"].stroke;
    preStyles["& .path"] = bridge;
  }
  return { root: css({ ...preStyles }) };
};
