import { useState, useEffect } from "react";

// providers
import { useStyle } from "providers/StyleProvider";

// components
import Loading from "components/Loading/Loading";

// types
import { SplashScreenProps } from "./types";

// styles
import { makeStyles } from "./styles";

// animation
import "./animations.css";

function SplashScreen(props: SplashScreenProps) {
  const { color = "primary", logo, logoClass, appName, visible = true } = props;

  const { colors } = useStyle();

  const styles = makeStyles(colors, color);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLoading(true), 2500);
  }, []);

  const [reallyShow, setReallyShow] = useState(true);

  useEffect(() => {
    if (visible !== undefined) {
      if (!visible) setTimeout(() => setReallyShow(false), 501);
      else setReallyShow(true);
    }
  }, [visible]);

  return reallyShow ? (
    <div className={`splash-screen ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="logo-container">
        {typeof logo === "string" ? (
          <img
            alt={appName}
            className={`puff-in-center image ${logoClass}`}
          />
        ) : (
          <div className={`puff-in-center ${logoClass}`}>{logo}</div>
        )}
        <div
          className={`transition-all duration-300 ease-in-out ${
            showLoading ? "opacity-100" : "opacity-0"
          } pointer-events-none`}
        >
          <Loading className="splash-loading" color={color} strokeWidth="6" />
        </div>
      </div>

      <div className={`animated slideInUp brand`}>
        <p>made width</p>
        <div className={`splash-sito-logo ${styles.sitoLogo}`} />
      </div>
    </div>
  ) : null;
}

export default SplashScreen;
