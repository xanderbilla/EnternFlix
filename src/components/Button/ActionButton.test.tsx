import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ActionButton from "./ActionButton";

describe("ActionButton", () => {
  it("renders the label and is accessible by name", () => {
    render(<ActionButton variant="primary" label="Play" />);
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  it("uses ariaLabel when provided", () => {
    render(
      <ActionButton
        variant="secondary"
        label="More Info"
        ariaLabel="Open details dialog"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Open details dialog" }),
    ).toBeInTheDocument();
  });

  it("invokes onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ActionButton variant="primary" label="Retry" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders an icon when icon prop is provided", () => {
    const { container } = render(
      <ActionButton variant="primary" icon="play" label="Play" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not render an icon when icon prop is omitted", () => {
    const { container } = render(
      <ActionButton variant="secondary" label="Plain" />,
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
