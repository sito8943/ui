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
  const stylesMap = {
    filled: () => {
      preStyles.color = colors[color].text;
      preStyles.backgroundColor = colors[color].default;
      preStyles["&:hover"] = {
        backgroundColor: colors[color].light,
      };
    },
    outlined: () => {
      preStyles.color = colors[color].default;
      preStyles.borderColor = colors[color].default;
      preStyles["&:hover"] = {
        color: colors[color].text,
        borderColor: colors[color].light,
        backgroundColor: colors[color].light,
      };
    },
    text: () => {
      preStyles.color = colors[color].text;
      preStyles["&:hover"] = {
        color: colors[color].text,
        backgroundColor: `${colors[color].light}2f`,
      };
    },
  };

  (stylesMap[shape] || stylesMap.text)();

  return { root: css({ ...preStyles }) };
};
