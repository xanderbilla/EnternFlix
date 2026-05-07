import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BaseDialog from "./BaseDialog";
import { VideoProvider } from "@/contexts/VideoContext";

function renderDialog(
  ui: React.ReactNode,
  {
    isOpen = true,
    onClose = vi.fn(),
    onBack,
  }: {
    isOpen?: boolean;
    onClose?: () => void;
    onBack?: () => void;
  } = {},
) {
  return render(
    <VideoProvider>
      <BaseDialog isOpen={isOpen} onClose={onClose} onBack={onBack}>
        {ui}
      </BaseDialog>
    </VideoProvider>,
  );
}

describe("BaseDialog", () => {
  it("renders a dialog with default aria-label when open", () => {
    renderDialog(<button>inside</button>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Dialog");
  });

  it("does not render dialog content when closed", () => {
    renderDialog(<button>inside</button>, { isOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("focuses the first focusable child after opening", () => {
    renderDialog(
      <>
        <button>first</button>
        <button>second</button>
      </>,
    );
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
  });

  it("supports a render-prop child receiving handleClose/handleBack", () => {
    const onClose = vi.fn();
    render(
      <VideoProvider>
        <BaseDialog isOpen onClose={onClose}>
          {({ handleClose }) => <button onClick={handleClose}>close me</button>}
        </BaseDialog>
      </VideoProvider>,
    );
    expect(
      screen.getByRole("button", { name: "close me" }),
    ).toBeInTheDocument();
  });

  it("calls onClose after pressing Escape (post animation)", () => {
    vi.useFakeTimers();
    try {
      const onClose = vi.fn();
      renderDialog(<button>inside</button>, { onClose });
      act(() => {
        fireEvent.keyDown(document, { key: "Escape" });
      });
      act(() => {
        vi.advanceTimersByTime(600);
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it("prefers onBack over onClose when Escape is pressed and onBack is provided", () => {
    vi.useFakeTimers();
    try {
      const onClose = vi.fn();
      const onBack = vi.fn();
      renderDialog(<button>inside</button>, { onClose, onBack });
      act(() => {
        fireEvent.keyDown(document, { key: "Escape" });
      });
      act(() => {
        vi.advanceTimersByTime(600);
      });
      expect(onBack).toHaveBeenCalledTimes(1);
      expect(onClose).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});
