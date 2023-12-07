import {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  ForwardedRef,
  useMemo,
} from "react";

// fortawesome
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// utils
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { scrollTo } from "some-javascript-utils/browser";

// components
import { IconButton } from "components/IconButton/";

// types
import { ToTopProps } from "./types";

const ToTop = forwardRef(function (
  props: ToTopProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { className, position, style, ...rest } = props;
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    let top = 0;
    top = window.pageYOffset || document.documentElement.scrollTop;
    if (top > 100) setVisible(true);
    else setVisible(false);
  }, [setVisible]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const handleToTop = () => scrollTo(0);

  const validatedPosition = useMemo(() => {
    switch (position) {
      case "bottom-left":
        return "bottom-1 left-1";
      case "top-left":
        return "top-1 left-1";
      case "top-right":
        return "top-1 right-1";
      default:
        return "bottom-1 right-1";
    }
  }, [position]);

  return (
    <IconButton
      {...rest}
      onClick={handleToTop}
      icon={faArrowUp}
      ref={ref}
      style={{
        ...style,
        zIndex: visible ? 10 : -1,
        transform: visible ? "scale(1)" : "scale(0)",
      }}
      className={`fixed ${validatedPosition} ${className}`}
    />
  );
});

export default ToTop;
