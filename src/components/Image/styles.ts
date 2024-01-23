// @emotion/css
import { css } from "@emotion/css";

// styles
import { ColorPalette } from "providers/StyleProvider";

/**
 *
 * @param colors
 * @param color
 */
export const makeStyles = (colors: ColorPalette) => {
  return {
    root: css({
      backgroundImage: `linear-gradient(to right, ${colors.basics.default} calc(50% - 100px), ${colors.basics.dark} 50%, ${colors.basics.default} calc(50% - 100px));`,
    }),
  };
};
