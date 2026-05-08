import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDialogManager } from "./useDialogManager";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useDialogManager", () => {
  it("starts with a closed/empty dialog state", () => {
    const { result } = renderHook(() => useDialogManager());
    expect(result.current.dialogState).toEqual({
      type: null,
      isOpen: false,
      title: "",
      movies: [],
    });
    expect(result.current.dialogStack).toHaveLength(0);
    expect(result.current.hasBackNavigation).toBe(false);
  });

  it("opens an explore dialog immediately", () => {
    const { result } = renderHook(() => useDialogManager());
    act(() => {
      result.current.openExploreDialog("Action", []);
    });
    expect(result.current.dialogState.type).toBe("explore");
    expect(result.current.dialogState.isOpen).toBe(true);
    expect(result.current.dialogState.title).toBe("Action");
  });

  it("opens an info dialog immediately when stack is empty", () => {
    const { result } = renderHook(() => useDialogManager());
    act(() => {
      result.current.openInfoDialog("title-123");
    });
    expect(result.current.dialogState.type).toBe("info");
    expect(result.current.dialogState.titleId).toBe("title-123");
    expect(result.current.dialogState.isOpen).toBe(true);
  });

  it("stacks an info dialog on top of an explore dialog after the transition delay", () => {
    const { result } = renderHook(() => useDialogManager());

    act(() => {
      result.current.openExploreDialog("Trending", []);
    });
    act(() => {
      result.current.openInfoDialog("title-9");
    });

    // Mid-transition: previous dialog closing, info not yet pushed.
    expect(result.current.isTransitioning).toBe(true);
    expect(result.current.dialogState.type).toBe("explore");
    expect(result.current.dialogState.isOpen).toBe(false);

    act(() => {
      vi.advanceTimersByTime(560);
    });

    expect(result.current.dialogState.type).toBe("info");
    expect(result.current.dialogState.isOpen).toBe(true);
    expect(result.current.dialogStack).toHaveLength(2);
    expect(result.current.hasBackNavigation).toBe(true);
    expect(result.current.isTransitioning).toBe(false);
  });

  it("pops the top dialog when goBack is called", () => {
    const { result } = renderHook(() => useDialogManager());

    act(() => {
      result.current.openExploreDialog("Trending", []);
    });
    act(() => {
      result.current.openInfoDialog("title-9");
    });
    act(() => {
      vi.advanceTimersByTime(560);
    });
    expect(result.current.dialogStack).toHaveLength(2);

    act(() => {
      result.current.goBack();
    });
    act(() => {
      vi.advanceTimersByTime(510);
    });

    expect(result.current.dialogStack).toHaveLength(1);
    expect(result.current.dialogState.type).toBe("explore");
    expect(result.current.dialogState.isOpen).toBe(true);
  });

  it("clears the entire stack when closeDialog is called", () => {
    const { result } = renderHook(() => useDialogManager());

    act(() => {
      result.current.openExploreDialog("Trending", []);
    });
    act(() => {
      result.current.openInfoDialog("title-9");
    });
    act(() => {
      vi.advanceTimersByTime(560);
    });

    act(() => {
      result.current.closeDialog();
    });
    act(() => {
      vi.advanceTimersByTime(510);
    });

    expect(result.current.dialogStack).toHaveLength(0);
    expect(result.current.dialogState.isOpen).toBe(false);
  });

  it("is a no-op when openInfoDialog is called during a transition", () => {
    const { result } = renderHook(() => useDialogManager());
    act(() => {
      result.current.openExploreDialog("Trending", []);
    });
    act(() => {
      result.current.openInfoDialog("title-1");
    });
    // Second call during transition should be ignored.
    act(() => {
      result.current.openInfoDialog("title-2");
    });
    act(() => {
      vi.advanceTimersByTime(560);
    });

    expect(result.current.dialogState.titleId).toBe("title-1");
  });
});
