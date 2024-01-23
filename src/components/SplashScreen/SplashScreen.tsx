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
    <div
      className={`splash-screen ${styles.root} ${
        visible ? "splash-loading-show " : "splash-loading-hide"
      }`}
    >
      <div className="logo-container">
        {typeof logo === "string" ? (
          <img
            alt={appName}
            className={`puff-in-center splash-image ${logoClass}`}
          />
        ) : (
          <div className={`puff-in-center ${logoClass}`}>{logo}</div>
        )}
        <div
          className={`splash-loading ${
            showLoading ? "splash-loading-show" : "splash-loading-hide"
          } pointer-events-none`}
        >
          <Loading
            colorInverted
            className="splash-loading"
            color={color}
            strokeWidth="6"
          />
        </div>
      </div>

      <div className={`animated slideInUp brand`}>
        <p>made width</p>
        <div className={`splash-sito-logo sito-logo`} />
      </div>
    </div>
  ) : null;
}

export default SplashScreen;
