import { memo, useEffect, useState } from "react";
import { PrintAfterProps } from "./types";

function _PrintAfter(props: PrintAfterProps) {
  const { children, delay = 100, animation = "appear" } = props;
  const [see, setSee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSee(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return <div className={see ? animation : "invisible"}>{children}</div>;
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
    oldProps.children === newProps.children
  );
}

export default PrintAfter;
