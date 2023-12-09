// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

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
  const rootStyles: CSSInterpolation = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: ["100vh", "100svh"],
  };
  const logoContainerStyles: CSSInterpolation = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };
  const imgStyles: CSSInterpolation = {
    width: "100px",
    height: "100px",
    borderRadius: "100%",
  };
  const brandStyles: CSSInterpolation = {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& p": {
      fontSize: "14px",
    },
  };
  const brandName: CSSInterpolation = {
    display: "flex",
    alignItems: "flex-end",
    "& p": {
      fontSize: "1.25rem !important",
    },
    "& h1": {
      fontWeight: 700,
      lineHeight: "40px",
      fontSize: "2.3rem",
    },
  };
  const sitoLogoStyles = {
    width: "100px",
    height: "60px",
    backgroundColor: colors[color].default,
    WebkitMask: `url('${sitoLogo}') no-repeat center`,
    mask: `url('${sitoLogo}') no-repeat center`,
    maskSize: "100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    maskPosition: "center",
  };
  return {
    root: css(rootStyles),
    logoContainer: css(logoContainerStyles),
    img: css(imgStyles),
    brand: css(brandStyles),
    sitoLogo: css(sitoLogoStyles),
  };
};
