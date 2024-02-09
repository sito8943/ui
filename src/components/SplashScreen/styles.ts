// @emotion/css
import { css } from "@emotion/css";

// styles
import { ColorPalette, ColorVariants } from "providers/StyleProvider";

// images
import sitoLogo from "../../assets/images/logo.svg";

/**
 *
 * @param colors
 * @param color
 */
export const makeStyles = (colors: ColorPalette, color: ColorVariants) => {
  const sitoLogoStyles = {
    backgroundColor: colors[color].default,
    WebkitMask: `url('${sitoLogo}') no-repeat center`,
    mask: `url('${sitoLogo}') no-repeat center`,
  };
  const splashScreenStyles = {
    backgroundColor: colors.basics.dark,
  };
  return {
    root: css({
      ...splashScreenStyles,
      ".sito-logo": sitoLogoStyles,
    }),
  };
};
