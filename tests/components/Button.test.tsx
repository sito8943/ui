import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentPropsWithoutRef, createRef, forwardRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../src/main";

// Minimal stand-in for a router link: takes `to`, renders an anchor.
const RouterLink = forwardRef<
  HTMLAnchorElement,
  Omit<ComponentPropsWithoutRef<"a">, "href"> & { to: string }
>(function RouterLink({ to, ...rest }, ref) {
  return <a ref={ref} href={to} {...rest} />;
});

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

  describe("as a link", () => {
    it("renders an anchor with the same classes and anchor attributes", () => {
      render(
        <Button
          as="a"
          href="/report.pdf"
          download
          target="_blank"
          rel="noreferrer"
          color="primary"
          variant="outlined"
          size="sm"
        >
          Download
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Download" });

      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/report.pdf");
      expect(link).toHaveAttribute("download");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
      expect(link).toHaveAttribute("data-sito-ui", "button");
      expect(link).not.toHaveAttribute("type");
      expect(link).not.toHaveAttribute("disabled");
      expect(link).toHaveClass(
        "sito-ui-button",
        "sito-ui-button--outlined",
        "sito-ui-button--primary",
        "sito-ui-button--sm",
      );
    });

    it("renders a custom link component and forwards its ref", () => {
      const ref = createRef<HTMLAnchorElement>();

      render(
        <Button as={RouterLink} to="/" ref={ref} variant="submit">
          Exit
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Exit" });

      expect(link).toHaveAttribute("href", "/");
      expect(link).toHaveClass("sito-ui-button", "sito-ui-button--submit");
      expect(ref.current).toBe(link);
    });

    it("marks a disabled link aria-disabled, untabbable and inert", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button as="a" href="/" disabled onClick={handleClick}>
          Exit
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Exit" });

      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("tabindex", "-1");
      expect(link).not.toHaveAttribute("disabled");

      await user.click(link);
      expect(handleClick).not.toHaveBeenCalled();

      expect(fireEvent.click(link)).toBe(false);
      expect(
        fireEvent(
          link,
          new MouseEvent("auxclick", {
            bubbles: true,
            cancelable: true,
            button: 1,
          }),
        ),
      ).toBe(false);
    });

    it("keeps links interactive when enabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn((event: { preventDefault: () => void }) =>
        event.preventDefault(),
      );

      render(
        <Button as="a" href="/" onClick={handleClick}>
          Home
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Home" });

      expect(link).not.toHaveAttribute("aria-disabled");
      expect(link).not.toHaveAttribute("tabindex");
      await user.click(link);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("treats a loading link as busy and disabled", () => {
      render(
        <Button as="a" href="/report.pdf" loading loadingLabel="Preparing">
          Download
        </Button>,
      );

      const link = screen.getByRole("link", { name: "PreparingDownload" });

      expect(link).toHaveAttribute("aria-busy", "true");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("tabindex", "-1");
    });
  });
});
