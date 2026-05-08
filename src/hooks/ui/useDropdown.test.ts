import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRef } from "react";
import { useDropdown } from "./useDropdown";

describe("useDropdown", () => {
  it("returns a ref object", () => {
    const { result } = renderHook(() => useDropdown(false, () => {}));
    expect(result.current.dropdownRef).toEqual({ current: null });
  });

  it("invokes onClose when a mousedown occurs outside the ref", () => {
    const onClose = vi.fn();
    const outside = document.createElement("button");
    document.body.appendChild(outside);
    const inside = document.createElement("div");
    document.body.appendChild(inside);

    const { result } = renderHook(() => {
      const { dropdownRef } = useDropdown(true, onClose);
      // Attach the inside element to the ref using a layout effect-like pattern.
      const refSetter = useRef<HTMLDivElement>(null);
      refSetter.current = dropdownRef.current;
      dropdownRef.current = inside;
      return { dropdownRef };
    });

    act(() => {
      outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => {
      inside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalledTimes(1);

    document.body.removeChild(outside);
    document.body.removeChild(inside);
    void result.current;
  });

  it("does not attach a listener when isOpen is false", () => {
    const onClose = vi.fn();
    const outside = document.createElement("button");
    document.body.appendChild(outside);
    const inside = document.createElement("div");
    document.body.appendChild(inside);

    renderHook(() => {
      const { dropdownRef } = useDropdown(false, onClose);
      dropdownRef.current = inside;
      return { dropdownRef };
    });

    act(() => {
      outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(onClose).not.toHaveBeenCalled();

    document.body.removeChild(outside);
    document.body.removeChild(inside);
  });
});
