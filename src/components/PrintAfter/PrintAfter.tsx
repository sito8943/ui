import { memo, useEffect, useState } from "react";

// @emotion/css
import { css } from "@emotion/css";

interface PrintAfterProps {
  children: React.ReactNode;
  delay?: number | undefined;
  animation?: "string" | undefined;
}

function _PrintAfter(props: PrintAfterProps) {
  const { children, delay = 100, animation = "appear" } = props;
  const [see, setSee] = useState(false);

  useEffect(() => {
    setTimeout(() => setSee(true), delay);
  }, [delay]);

  return (
    <div className={see ? animation : css({ visibility: "hidden" })}>
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
    oldProps.children === newProps.children
  );
}

export default PrintAfter;
