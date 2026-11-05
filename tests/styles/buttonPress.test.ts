/// <reference types="node" />
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

// Read from disk: vitest does not process CSS, so a `?raw` import is empty.
const css = readFileSync(
  `${process.cwd()}/src/components/atoms/Button/styles.css`,
  "utf8",
);

const activeRules = [
  ...css.matchAll(/\.sito-ui-button[^{]*:active\s*\{([^}]*)\}/g),
].map((match) => match[1]);

describe("Button press feedback", () => {
  it("scales with the standalone scale property", () => {
    expect(activeRules.length).toBeGreaterThan(0);
    for (const rule of activeRules) {
      expect(rule).toMatch(/\bscale:/);
    }
  });

  // A transform here would replace the consumer's own transform (for
  // example translateY(-50%) on an icon button centred in an input).
  it("never sets transform while pressed", () => {
    for (const rule of activeRules) {
      expect(rule).not.toMatch(/\btransform\s*:/);
    }
  });
});
