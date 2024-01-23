// @emotion/css
import { css } from "@emotion/css";

// styles
import { ColorPalette } from "providers/StyleProvider/types";

export const makeStyles = (colors: ColorPalette) => ({
  root: css({
    ".dark .s-error-title": {
      color: colors.error.light,
    },
    ".s-error-title": {
      color: colors.error.default,
    },
  }),
});
