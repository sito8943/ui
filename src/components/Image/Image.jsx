import React, { useState } from "react";

// styles
import "./styles.css";

function LazyImage(props) {
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

export default LazyImage;
