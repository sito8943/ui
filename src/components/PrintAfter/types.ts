export interface PrintAfterProps {
  children: React.ReactNode;
  delay?: number | undefined;
  animation?: "appear" | "aGrow" | "aShrink" | string | undefined;
}
