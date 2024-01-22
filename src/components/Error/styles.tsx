// @emotion/css
import { css } from "@emotion/css";

// styles
import { ColorPalette } from "providers/StyleProvider/types";

export const makeStyles = (colors: ColorPalette) => ({
  root: css({
    ".dark.s-error-body": {
      color: colors.error.light,
    },
    "s-error-body": {
      color: colors.error.default,
    },
  }),
});
