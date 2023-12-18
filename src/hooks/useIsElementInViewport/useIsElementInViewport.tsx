import { useEffect, useRef, useState } from "react";

const useIsElementInViewport = () => {
  const [isElementInViewport, setIsElementInViewport] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsElementInViewport(entry.isIntersecting);
      });
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { elementRef, isElementInViewport };
};

export default useIsElementInViewport;
