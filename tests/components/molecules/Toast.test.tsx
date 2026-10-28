import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  type ToastFunction,
  type ToastProviderProps,
  ToastProvider,
  useToast,
} from "../../../src/main";

let toast: ToastFunction;

const Capture = () => {
  toast = useToast();
  return null;
};

const renderProvider = (props: Omit<ToastProviderProps, "children"> = {}) =>
  render(
    <ToastProvider {...props}>
      <Capture />
    </ToastProvider>,
  );

const show = (...args: Parameters<ToastFunction>) => {
  let id = "";
  act(() => {
    id = toast(...args);
  });
  return id;
};

const getViewport = () => {
  const viewport = document.querySelector<HTMLElement>(
    '[data-sito-ui="toast-viewport"]',
  );
  if (!viewport) throw new Error("Expected toast viewport to render.");
  return viewport;
};

describe("ToastProvider", () => {
  it("renders a polite live viewport with the placement", () => {
    renderProvider({ placement: "top-center" });

    const viewport = getViewport();
    expect(viewport).toHaveAttribute("aria-live", "polite");
    expect(viewport).toHaveAttribute("aria-label", "Notifications");
    expect(viewport).toHaveClass("sito-ui-toast-viewport--top-center");
  });

  it("uses status for default and success and alert for errors", () => {
    renderProvider();

    show({ message: "Link copied" });
    show({ message: "Saved", color: "success" });
    show({ message: "Not saved", color: "error" });

    expect(screen.getAllByRole("status")).toHaveLength(2);
    expect(screen.getByRole("alert")).toHaveTextContent("Not saved");
    expect(screen.getByRole("alert")).toHaveAttribute("data-color", "error");
  });

  it("dismisses after the duration and removes after the exit animation", () => {
    vi.useFakeTimers();
    renderProvider({ duration: 1000 });

    show({ message: "Saved" });
    const element = screen.getByRole("status");

    act(() => vi.advanceTimersByTime(999));
    expect(element).toHaveAttribute("data-state", "open");

    act(() => vi.advanceTimersByTime(1));
    expect(element).toHaveAttribute("data-state", "closing");

    act(() => vi.advanceTimersByTime(180));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("keeps errors and zero-duration toasts until dismissed", () => {
    vi.useFakeTimers();
    renderProvider({ duration: 1000 });

    show({ message: "Not saved", color: "error" });
    show({ message: "Uploading", duration: 0 });

    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByRole("alert")).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "open");
  });

  it("pauses the timer on hover and focus", () => {
    vi.useFakeTimers();
    renderProvider({ duration: 1000 });

    show({ message: "Saved" });
    const element = screen.getByRole("status");

    act(() => vi.advanceTimersByTime(500));
    fireEvent.pointerEnter(element);
    act(() => vi.advanceTimersByTime(5000));
    expect(element).toHaveAttribute("data-state", "open");

    fireEvent.pointerLeave(element);
    fireEvent.focus(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    act(() => vi.advanceTimersByTime(5000));
    expect(element).toHaveAttribute("data-state", "open");

    fireEvent.blur(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    act(() => vi.advanceTimersByTime(499));
    expect(element).toHaveAttribute("data-state", "open");
    act(() => vi.advanceTimersByTime(1));
    expect(element).toHaveAttribute("data-state", "closing");
  });

  it("updates a toast in place and restarts its timer", () => {
    vi.useFakeTimers();
    renderProvider();

    const id = show({ message: "Saving…", duration: 0 });
    act(() =>
      toast.update(id, { message: "Saved", color: "success", duration: 1000 }),
    );

    const elements = screen.getAllByRole("status");
    expect(elements).toHaveLength(1);
    expect(elements[0]).toHaveTextContent("Saved");
    expect(elements[0]).toHaveAttribute("data-color", "success");

    act(() => vi.advanceTimersByTime(1000));
    expect(elements[0]).toHaveAttribute("data-state", "closing");
  });

  it("reuses an existing id instead of stacking", () => {
    renderProvider();

    show({ id: "save", message: "Saving…" });
    show({ id: "save", message: "Saved" });

    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });

  it("dismisses with the close button, Escape, and toast.dismiss", () => {
    renderProvider();

    show({ message: "One", duration: 0 });
    const second = show({ message: "Two", duration: 0 });
    show({ message: "Three", duration: 0 });
    const [one, two, three] = screen.getAllByRole("status");

    fireEvent.click(
      screen.getAllByRole("button", { name: "Dismiss notification" })[0],
    );
    expect(one).toHaveAttribute("data-state", "closing");

    act(() => toast.dismiss(second));
    expect(two).toHaveAttribute("data-state", "closing");

    fireEvent.keyDown(three, { key: "Escape" });
    expect(three).toHaveAttribute("data-state", "closing");
  });

  it("runs the action and dismisses unless told otherwise", () => {
    renderProvider();
    const onUndo = vi.fn();
    const onRetry = vi.fn();

    show({ message: "Deleted", action: { label: "Undo", onClick: onUndo } });
    show({
      message: "Offline",
      color: "warning",
      action: { label: "Retry", onClick: onRetry, dismiss: false },
    });

    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));

    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledTimes(1);
    const [deleted, offline] = screen.getAllByRole("status");
    expect(deleted).toHaveAttribute("data-state", "closing");
    expect(offline).toHaveAttribute("data-state", "open");
  });

  it("closes the oldest toast when over the max", () => {
    renderProvider({ max: 2 });

    show({ message: "One" });
    show({ message: "Two" });
    show({ message: "Three" });

    const states = screen
      .getAllByRole("status")
      .map((element) => element.getAttribute("data-state"));
    expect(states).toEqual(["closing", "open", "open"]);
  });

  it("hides the close button when not dismissible and ignores Escape", () => {
    renderProvider();

    show({ message: "Syncing", dismissible: false, duration: 0 });

    expect(
      screen.queryByRole("button", { name: "Dismiss notification" }),
    ).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("status"), { key: "Escape" });
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "open");
  });

  it("throws when useToast is used outside a provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Capture />)).toThrow(
      "useToast must be used inside a ToastProvider.",
    );
  });
  it("uses the accent variant unless a toast or the provider asks for filled", () => {
    renderProvider();

    show({ message: "Saved", color: "success" });
    show({ message: "Not saved", color: "error", variant: "filled" });

    expect(screen.getByRole("status")).toHaveClass("sito-ui-toast--accent");
    expect(screen.getByRole("alert")).toHaveClass("sito-ui-toast--filled");
  });

  it("applies the provider variant to toasts that don't set their own", () => {
    renderProvider({ variant: "filled" });

    show({ message: "Saved", color: "success" });
    show({ message: "Not saved", color: "error", variant: "accent" });

    expect(screen.getByRole("status")).toHaveClass("sito-ui-toast--filled");
    expect(screen.getByRole("alert")).toHaveClass("sito-ui-toast--accent");
  });
});
