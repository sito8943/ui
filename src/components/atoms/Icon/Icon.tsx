import {
  type ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { classNames, getCssDurationMs, prefersReducedMotion } from "@/utils";
import { DEFAULT_ICON_SWAP_DURATION_MS } from "./constants";
import type { IconProps } from "./types";
import { isSameIcon } from "./utils";

type IconSwap = {
  count: number;
  exiting: IconProps["icon"] | null;
};

const Icon = forwardRef(function (
  props: IconProps,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  const { icon, iconKey, label, className, ...rest } = props;
  const glyphRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState({ icon, iconKey });
  const [swap, setSwap] = useState<IconSwap>({ count: 0, exiting: null });
  const isAccessible = label !== undefined;

  const changed =
    iconKey !== undefined || shown.iconKey !== undefined
      ? iconKey !== shown.iconKey
      : !isSameIcon(icon, shown.icon);

  // Adjusting state during render: the old glyph stays as the exit layer.
  if (changed) {
    setShown({ icon, iconKey });
    setSwap({ count: swap.count + 1, exiting: shown.icon });
  }

  const isExiting = swap.exiting !== null;

  useEffect(() => {
    if (!isExiting) return;

    const duration =
      prefersReducedMotion() || !glyphRef.current
        ? 0
        : getCssDurationMs(
            glyphRef.current,
            "--sito-ui-icon-swap-duration",
            DEFAULT_ICON_SWAP_DURATION_MS,
          );
    const timeout = window.setTimeout(
      () => setSwap((current) => ({ ...current, exiting: null })),
      duration,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isExiting, swap.count]);

  return (
    <span
      data-sito-ui="icon"
      {...rest}
      ref={ref}
      aria-hidden={isAccessible ? undefined : true}
      aria-label={label}
      role={isAccessible ? "img" : undefined}
      className={classNames("sito-ui-icon", className)}
    >
      {isExiting ? (
        <span
          key={swap.count - 1}
          className="sito-ui-icon__glyph sito-ui-icon__glyph--exit"
        >
          {swap.exiting}
        </span>
      ) : null}
      <span
        key={swap.count}
        ref={glyphRef}
        className={classNames(
          "sito-ui-icon__glyph",
          swap.count > 0 && "sito-ui-icon__glyph--enter",
        )}
      >
        {icon}
      </span>
    </span>
  );
});

export default Icon;
