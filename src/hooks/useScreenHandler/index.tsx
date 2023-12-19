import { useCallback, useEffect, useMemo, useState } from "react";

export type Breakpoints = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";

export const useScreenHandler = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const breakpoint = useMemo<Breakpoints>(() => {
    const { width } = windowSize;
    switch (true) {
      case width > 1279:
        return "2xl";
      case width > 1023:
        return "xl";
      case width > 767:
        return "lg";
      case width > 639:
        return "md";
      case width > 383:
        return "sm";
      default:
        return "xs";
    }
  }, [windowSize]);

  const onResize = useCallback(() => {}, [setWindowSize]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return {
    width: windowSize.width,
    height: windowSize.height,
    breakpoint,
  };
};
