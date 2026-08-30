import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useContextMenu } from "../../src/main";

describe("useContextMenu", () => {
  it("opens at a position with a payload and closes explicitly", () => {
    const { result } = renderHook(() => useContextMenu<string>());

    act(() => {
      result.current.openAt(12, 18, "entry");
    });

    expect(result.current.open).toBe(true);
    expect(result.current.position).toEqual({ x: 12, y: 18 });
    expect(result.current.payload).toBe("entry");

    act(() => {
      result.current.close();
    });

    expect(result.current.open).toBe(false);
  });
});
