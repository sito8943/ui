import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../../src/main";

describe("Button", () => {
  it("renders a native button with default type and style hooks", () => {
    render(
      <Button color="primary" variant="outlined">
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-sito-ui", "button");
    expect(button).toHaveClass(
      "sito-ui-button",
      "sito-ui-button--outlined",
      "sito-ui-button--primary",
      "sito-ui-button--md",
    );
  });

  it("applies size classes independently from variant and color", () => {
    render(
      <Button color="secondary" size="sm" variant="submit">
        Compact
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Compact" });

    expect(button).toHaveClass(
      "sito-ui-button--secondary",
      "sito-ui-button--sm",
      "sito-ui-button--submit",
    );
  });

  it("disables the button and exposes busy state while loading", () => {
    render(
      <Button loading loadingLabel="Saving">
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "SavingSave" });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Saving")).toBeInTheDocument();
    expect(
      button.querySelector('[data-sito-ui="button-spinner"]'),
    ).toBeInTheDocument();
  });

  it("renders a custom loading indicator when one is provided", () => {
    render(
      <Button
        loading
        loadingIndicator={<span data-testid="custom-loader">...</span>}
      >
        Send
      </Button>,
    );

    expect(screen.getByTestId("custom-loader")).toBeInTheDocument();
    expect(
      document.querySelector('[data-sito-ui="button-spinner"]'),
    ).not.toBeInTheDocument();
  });
});
