import { HTMLProps, useState } from "react";

// styles
import "./styles.css";

export interface ImageProps extends HTMLProps<HTMLImageElement> {
  container: HTMLProps<HTMLDivElement>;
}

function Image(props: ImageProps) {
  const { container = {}, ...rest } = props;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      {...container}
      className={`${!loaded ? "box" : null} ${container.className}`}
    >
      <img onLoad={() => setLoaded(true)} {...rest} />
    </div>
  );
}

export default Image;
