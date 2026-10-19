import { useCallback, useRef, useState, type KeyboardEvent } from "react";

import { classNames } from "../../utils";
import type { TooltipProps } from "./types";

export function Tooltip({
  label,
  side = "top",
  align = "center",
  children,
  className,
}: TooltipProps) {
  const [dismissed, setDismissed] = useState(false);
  const [actualSide, setActualSide] = useState(side);
  const rootRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const keepInViewport = useCallback(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;

    root.style.setProperty("--sito-ui-tooltip-shift-x", "0px");
    const rootRect = root.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const margin = 8;
    const gap = 8;
    const spaceAbove = rootRect.top - margin - gap;
    const spaceBelow = viewportHeight - margin - rootRect.bottom - gap;
    let nextSide = side;

    if (
      side === "top" &&
      spaceAbove < contentRect.height &&
      spaceBelow > spaceAbove
    ) {
      nextSide = "bottom";
    } else if (
      side === "bottom" &&
      spaceBelow < contentRect.height &&
      spaceAbove > spaceBelow
    ) {
      nextSide = "top";
    }

    setActualSide(nextSide);
    let shift = 0;

    if (contentRect.left < margin) {
      shift = margin - contentRect.left;
    } else if (contentRect.right > viewportWidth - margin) {
      shift = viewportWidth - margin - contentRect.right;
    }

    root.style.setProperty("--sito-ui-tooltip-shift-x", `${shift}px`);
  }, [side]);

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== "Escape") return;
    setDismissed(true);
  };

  return (
    <span
      ref={rootRef}
      className={classNames("sito-ui-tooltip", className)}
      data-side={actualSide}
      data-align={align}
      data-dismissed={dismissed || undefined}
      onKeyDown={handleKeyDown}
      onPointerEnter={keepInViewport}
      onFocusCapture={keepInViewport}
      onPointerLeave={() => setDismissed(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setDismissed(false);
        }
      }}
    >
      {children}
      <span
        ref={contentRef}
        className="sito-ui-tooltip__content"
        aria-hidden="true"
      >
        {label}
      </span>
    </span>
  );
}
