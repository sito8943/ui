import { memo, useEffect, useState } from "react";

// hooks
import { useIsElementInViewport } from "../../hooks/useIsElementInViewport";

// types
import { PrintAfterProps } from "./types";

function _PrintAfter(props: PrintAfterProps) {
  const {
    children,
    delay = 100,
    animation = "appear",
    onVisible = false,
  } = props;

  const { elementRef, isElementInViewport } = useIsElementInViewport();
  const [visible, setVisible] = useState(onVisible === true ? false : true);
  const [see, setSee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visible) setSee(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, visible]);

  console.log(isElementInViewport, "isElementInViewport");

  useEffect(() => {
    if (!visible && isElementInViewport) setVisible(true);
  }, [isElementInViewport]);

  return (
    <div ref={elementRef} className={see && visible ? animation : "invisible"}>
      {children}
    </div>
  );
}

const PrintAfter = memo(
  (props: PrintAfterProps) => <_PrintAfter {...props} />,
  arePropsEqual
);
PrintAfter.displayName = "PrintAfter";

function arePropsEqual(oldProps: PrintAfterProps, newProps: PrintAfterProps) {
  return (
    oldProps.delay === newProps.delay &&
    oldProps.animation === newProps.animation &&
    oldProps.children === newProps.children &&
    oldProps.onVisible === newProps.onVisible
  );
}

export default PrintAfter;
