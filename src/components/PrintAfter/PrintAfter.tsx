import { memo, useEffect, useState } from "react";
import useIsInViewport from "use-is-in-viewport";
import { PrintAfterProps } from "./types";

function _PrintAfter(props: PrintAfterProps) {
  const {
    children,
    delay = 100,
    animation = "appear",
    onVisible = false,
  } = props;

  const [isInViewport, targetRef] = useIsInViewport({ threshold: 50 });
  const [visible, setVisible] = useState(false);
  const [see, setSee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onVisible) {
        if (isInViewport) setVisible(true);
      } else setSee(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, onVisible]);

  return (
    <div ref={targetRef} className={see && visible ? animation : "invisible"}>
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
