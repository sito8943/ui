import { useState, useCallback, useEffect } from "react";

// fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// utils
import { scrollTo } from "some-javascript-utils/browser";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// components
import IconButton from "../IconButton/IconButton";

// styles
import "./style.css";

const ToTop = () => {
  const [visible, setVisible] = useState(false);

  const { languageState } = useLanguage();

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
      icon={faArrowUp}
      onClick={handleToTop}
      {...props}
      style={{
        zIndex: visible ? 10 : -1,
        transform: visible ? "scale(1)" : "scale(0)",
      }}
      className={`to-top fixed bottom-5 right-5 rounded-circle w-9 h-9 pt-1 dark:text-primary  dark:hover:bg-primary hover:bg-primary transition hover:text-white dark:hover:text-white ${className}`}
    >
      <FontAwesomeIcon className="external" />
    </IconButton>
  );
};

export default ToTop;
