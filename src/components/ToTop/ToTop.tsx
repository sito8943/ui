import {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  ForwardedRef,
  HTMLProps,
} from "react";

// fortawesome
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// utils
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { scrollTo } from "some-javascript-utils/browser";

// components
import IconButton, { IconButtonProps } from "../IconButton/IconButton";

// styles
import "./styles.css";

const ToTop = forwardRef(function (
  props: HTMLProps<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { className, style } = props;
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

  return (
    <IconButton
      onClick={handleToTop}
      {...(props as IconButtonProps)}
      icon={faArrowUp}
      ref={ref}
      style={{
        ...style,
        zIndex: visible ? 10 : -1,
        transform: visible ? "scale(1)" : "scale(0)",
      }}
      className={`to-top ${className}`}
    />
  );
});

export default ToTop;
