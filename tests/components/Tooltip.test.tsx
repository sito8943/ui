import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, IconButton, Tooltip } from "../../src/main";

describe("Tooltip", () => {
  it("renders its label as decorative content around a trigger", () => {
    render(
      <Tooltip label="Next slide">
        <IconButton aria-label="Next slide" icon=">" />
      </Tooltip>,
    );

    expect(
      screen.getByRole("button", { name: "Next slide" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Next slide")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("shows a hotkey after the label, hidden from assistive technology", () => {
    render(
      <Tooltip label="Next slide" hotkey="→">
        <IconButton aria-label="Next slide" icon=">" />
      </Tooltip>,
    );

    const hotkey = screen.getByText("→");
    expect(hotkey.tagName).toBe("KBD");
    expect(hotkey.closest("[aria-hidden='true']")).toHaveTextContent(
      "Next slide→",
    );
  });

  it("renders no hotkey when none is given", () => {
    const { container } = render(
      <Tooltip label="Help">
        <Button>Help</Button>
      </Tooltip>,
    );

    expect(container.querySelector("kbd")).toBeNull();
  });

  it("supports side and alignment options", () => {
    render(
      <Tooltip label="Help" side="bottom" align="end">
        <Button>Help</Button>
      </Tooltip>,
    );

    expect(screen.getByRole("button").parentElement).toHaveAttribute(
      "data-side",
      "bottom",
    );
    expect(screen.getByRole("button").parentElement).toHaveAttribute(
      "data-align",
      "end",
    );
  });

  it("can be dismissed with Escape while the trigger has focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip label="Next slide">
        <IconButton aria-label="Next slide" icon=">" />
      </Tooltip>,
    );

    await user.tab();
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button").parentElement).toHaveAttribute(
      "data-dismissed",
      "true",
    );
  });

  it("wraps disabled triggers so their tooltip can receive pointer hover", () => {
    render(
      <Tooltip label="Unavailable">
        <Button disabled>Save</Button>
      </Tooltip>,
    );

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("keeps the same horizontal shift across repeated pointer enters", () => {
    render(
      <Tooltip label="Help">
        <Button>Help</Button>
      </Tooltip>,
    );
    const root = screen.getByRole("button").parentElement;
    if (!(root instanceof HTMLSpanElement)) {
      throw new Error("Tooltip root was not rendered");
    }
    const content = root.querySelector(".sito-ui-tooltip__content");
    if (!(content instanceof HTMLSpanElement)) {
      throw new Error("Tooltip content was not rendered");
    }

    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 100,
    });
    vi.spyOn(root, "getBoundingClientRect").mockReturnValue({
      top: 40,
      bottom: 60,
      left: 20,
      right: 40,
      width: 20,
      height: 20,
      x: 20,
      y: 40,
      toJSON: () => ({}),
    });
    vi.spyOn(content, "getBoundingClientRect").mockImplementation(() => {
      const left =
        -10 +
        Number.parseFloat(
          root.style.getPropertyValue("--sito-ui-tooltip-shift-x") || "0",
        );

      return {
        top: 0,
        bottom: 10,
        left,
        right: left + 40,
        width: 40,
        height: 10,
        x: left,
        y: 0,
        toJSON: () => ({}),
      };
    });

    fireEvent.pointerEnter(root);
    const firstShift = root.style.getPropertyValue("--sito-ui-tooltip-shift-x");
    fireEvent.pointerEnter(root);

    expect(firstShift).toBe("18px");
    expect(root.style.getPropertyValue("--sito-ui-tooltip-shift-x")).toBe(
      firstShift,
    );
  });
});
