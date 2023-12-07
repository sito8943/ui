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
    "& .loading": {
      backgroundColor: colors.basics.default,
    },
  };
  switch (color) {
    case "primary":
      preStyles["& .loading .path"] = {
        stroke: colors.primary.default,
      };
      break;
    case "secondary":
      preStyles["& .loading .path"] = {
        stroke: colors.secondary.default,
      };
      break;
    default:
      preStyles["& .loading .path"] = {
        stroke: colors.basics.text,
      };
      break;
  }
  if (inverted) {
    const bridge = { ...preStyles["& .loading .path"] };
    preStyles["& .loading"] = preStyles["& .loading .path"];
    preStyles["& .loading .path"] = bridge;
  }
  return css({ ...preStyles });
};
