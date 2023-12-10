import { ReactNode } from "react";
import { ColorVariants } from "providers/StyleProvider";

export interface SplashScreenProps {
  color?: ColorVariants;
  appName?: string;
  logo: ReactNode | string;
  logoClass?: string;
  visible?: boolean;
}
