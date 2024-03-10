import { useCallback, useEffect, useMemo, useState } from "react";

export type Breakpoints = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export const useScreenHandler = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const breakpoint = useMemo<Breakpoints>(() => {
    const { width } = windowSize;
    switch (true) {
      case width <= 400:
        return "xs";
      case width <= 600:
        return "sm";
      case width <= 900:
        return "md";
      case width <= 1200:
        return "lg";
      case width <= 1536:
        return "xl";
      default:
        return "2xl";
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
