import { HTMLProps } from "react";

export interface LoadingProps extends HTMLProps<HTMLDivElement> {
  color?: "primary" | "secondary"  | "basics" | undefined;
  loaderClass?: "string" | undefined;
  strokeWidth?: "string" | undefined;
}

const Loading = (props: LoadingProps) => {
  const {
    color = "primary",
    loaderClass = "",
    strokeWidth = "4",
    ...rest
  } = props;

  return (
    <div {...rest} className={`loading ${color} ${rest.className}`}>
      <div className="loader-container">
        <div className={`loader ${loaderClass}`}>
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className={`path ${color}`}
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
