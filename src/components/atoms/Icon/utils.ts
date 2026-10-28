import { isValidElement, type ReactNode } from "react";

const isElement = (value: unknown) =>
  isValidElement<Record<string, unknown>>(value);

const isSameValue = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) return true;

  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length && a.every((item, i) => isSameValue(item, b[i]))
    );
  }

  if (isElement(a) && isElement(b)) {
    if (a.type !== b.type || a.key !== b.key) return false;

    const aProps = a.props;
    const bProps = b.props;
    const aKeys = Object.keys(aProps);

    return (
      aKeys.length === Object.keys(bProps).length &&
      aKeys.every((key) => isSameValue(aProps[key], bProps[key]))
    );
  }

  return false;
};

/**
 * Compares two glyphs by content, not by reference: elements match when their
 * type, key and props (deeply, through nested elements) match, so re-rendering
 * the same icon is not a swap.
 * @param a Previous glyph.
 * @param b Next glyph.
 * @returns Whether both render the same glyph.
 */
export const isSameIcon = (a: ReactNode, b: ReactNode) => isSameValue(a, b);
