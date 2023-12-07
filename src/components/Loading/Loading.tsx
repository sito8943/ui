// providers
import { useStyle } from "providers/StyleProvider";

// types
import { LoadingProps } from "./types";

// styles
import { makeStyles } from "./styles";

const Loading = (props: LoadingProps) => {
  const {
    color = "primary",
    colorInverted = false,
    loaderClass = "",
    strokeWidth = "4",
    ...rest
  } = props;

  const { colors } = useStyle();
  const styles = makeStyles(colors, color, colorInverted);

  return (
    <div {...rest} className={`loading ${styles} ${rest.className}`}>
      <div className="loader-container">
        <div className={`loader ${loaderClass}`}>
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className={`path`}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth={strokeWidth}
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loading;
