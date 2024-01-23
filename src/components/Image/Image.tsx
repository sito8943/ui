import { useState } from "react";

// providers
import { useStyle } from "providers";

// types
import { ImageProps } from "./types";

// styles
import { makeStyles } from "./styles";

function Image(props: ImageProps) {
  const { container = {}, ...rest } = props;
  const [loaded, setLoaded] = useState(false);

  const { colors } = useStyle();

  const styles = makeStyles(colors);

  return (
    <div
      {...container}
      className={`${!loaded ? `box ${styles.root}` : null} ${
        container.className
      }`}
    >
      <img onLoad={() => setLoaded(true)} {...rest} />
    </div>
  );
}

export default Image;
