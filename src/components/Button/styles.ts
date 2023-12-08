// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

// styles
import { ColorPalette, ColorVariants } from "providers/StyleProvider/types";

// types
import { ButtonShapes } from "./types";

export const makeStyles = (
  colors: ColorPalette,
  color: ColorVariants,
  shape: ButtonShapes
) => {
  const preStyles: CSSInterpolation = {};
  switch (shape) {
    case "filled":
      preStyles.color = colors[color].text;
      preStyles.backgroundColor = colors[color].default;
      preStyles["&:hover"] = {
        backgroundColor: colors[color].light,
      };
      break;
    case "outlined":
      preStyles.color = colors.basics.text;
      preStyles.borderColor = colors[color].default;
      preStyles["&:hover"] = {
        color: colors[color].text,
        borderColor: colors[color].light,
        backgroundColor: colors[color].light,
      };
      break;
    default: // text
      preStyles.color = colors.basics.text;
      preStyles["&:hover"] = {
        color: colors[color].light,
        backgroundColor: `${colors[color].light}2f`,
      };
      break;
  }
  return { root: css({ ...preStyles }) };
};
