// providers
import { useStyle } from "providers/StyleProvider";

// types
import { SplashScreenProps } from "./types";

// styles
import { makeStyles } from "./styles";

// animation
import "./animations.css";

function SplashScreen(props: SplashScreenProps) {
  const { color = "primary", logo, logoClass, appName } = props;

  const { colors } = useStyle();

  const styles = makeStyles(colors, color);

  return (
    <div className={styles.root}>
      <div className={styles.logoContainer}>
        {typeof logo === "string" ? (
          <img
            src={logo}
            alt={appName}
            className={`puff-in-center ${styles.img} ${logoClass}`}
          />
        ) : (
          logo
        )}
      </div>
      <div className={`${styles.brand}`}>
        <p>made width</p>
        <div className={styles.sitoLogo} />
      </div>
    </div>
  );
}

export default SplashScreen;
