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
  const preStyles: CSSInterpolation = {};
  if (inverted) {
    preStyles.backgroundColor = colors[color].text;
    preStyles["& .path"] = {
      stroke: colors[color].default,
    };
  } else {
    preStyles.backgroundColor = colors[color].default
    preStyles["& .path"] = {
      stroke: colors[color].text,
    };
  }
  return { root: css({ ...preStyles }) };
};
