import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Icon, IconButton } from "../../../src/main";

const Glyph = (props: { name: string }) => <svg data-name={props.name} />;

const inlineSvg = () => (
  <svg>
    <path d="M0 0" />
  </svg>
);

const exitLayer = (container: HTMLElement) =>
  container.querySelector(".sito-ui-icon__glyph--exit");

describe("Icon", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("is decorative by default and named when labelled", () => {
    const { rerender } = render(<Icon icon="x" />);

    expect(screen.getByText("x").closest(".sito-ui-icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    rerender(<Icon icon="x" label="Close" />);

    expect(screen.getByRole("img", { name: "Close" })).toHaveAttribute(
      "data-sito-ui",
      "icon",
    );
  });

  it("does not animate on mount or when re-rendered with the same glyph", () => {
    const { container, rerender } = render(
      <Icon icon={<Glyph name="star" />} />,
    );

    rerender(<Icon icon={<Glyph name="star" />} />);

    expect(exitLayer(container)).not.toBeInTheDocument();
    expect(
      container.querySelector(".sito-ui-icon__glyph--enter"),
    ).not.toBeInTheDocument();

    const inline = render(<Icon icon={inlineSvg()} />);
    inline.rerender(<Icon icon={inlineSvg()} />);

    expect(exitLayer(inline.container)).not.toBeInTheDocument();
  });

  it("keeps the old glyph as a blur-out layer when the glyph changes", () => {
    const { container, rerender } = render(
      <Icon icon={<Glyph name="star" />} />,
    );

    expect(
      container.querySelector(".sito-ui-icon__glyph--enter"),
    ).not.toBeInTheDocument();

    rerender(<Icon icon={<Glyph name="star-outline" />} />);

    expect(exitLayer(container)?.querySelector("svg")).toHaveAttribute(
      "data-name",
      "star",
    );
    expect(
      container.querySelector(".sito-ui-icon__glyph--enter svg"),
    ).toHaveAttribute("data-name", "star-outline");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(exitLayer(container)).not.toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("uses iconKey as the glyph identity when given", () => {
    const { container, rerender } = render(
      <Icon icon={<Glyph name="a" />} iconKey="on" />,
    );

    rerender(<Icon icon={<Glyph name="b" />} iconKey="on" />);
    expect(exitLayer(container)).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("data-name", "b");

    rerender(<Icon icon={<Glyph name="b" />} iconKey="off" />);
    expect(exitLayer(container)).toBeInTheDocument();
  });

  it("drops the exit layer at once with reduced motion", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    vi.stubGlobal("matchMedia", matchMedia);

    const { container, rerender } = render(<Icon icon="a" />);
    rerender(<Icon icon="b" />);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(exitLayer(container)).not.toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("renders IconButton's icon through Icon", () => {
    const { container, rerender } = render(
      <IconButton aria-label="Star" icon={<Glyph name="star" />} />,
    );

    expect(container.querySelector(".sito-ui-icon")).toHaveClass(
      "sito-ui-icon-button__icon",
    );

    rerender(<IconButton aria-label="Star" icon={<Glyph name="filled" />} />);

    expect(exitLayer(container)).toBeInTheDocument();
  });
});
