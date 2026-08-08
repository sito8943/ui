import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "../../src/main";

describe("Spinner", () => {
  it("exposes an accessible status when a label is provided", () => {
    render(<Spinner className="custom-spinner" label="Loading messages" />);

    const spinner = screen.getByRole("status", {
      name: "Loading messages",
    });

    expect(spinner).toHaveAttribute("data-sito-ui", "spinner");
    expect(spinner).toHaveClass("sito-ui-spinner", "custom-spinner");
    expect(spinner).not.toHaveAttribute("aria-hidden");
  });

  it("is decorative when no label is provided", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('[data-sito-ui="spinner"]');

    expect(spinner).toHaveAttribute("aria-hidden", "true");
    expect(spinner).not.toHaveAttribute("role");
  });
});
