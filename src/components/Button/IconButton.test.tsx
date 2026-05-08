import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./IconButton";

describe("IconButton", () => {
  it.each([
    ["add", "Add to My List"],
    ["like", "Like"],
    ["check", "Added"],
  ] as const)(
    "applies the default aria-label for the %s variant",
    (variant, expectedLabel) => {
      render(<IconButton variant={variant} />);
      expect(
        screen.getByRole("button", { name: expectedLabel }),
      ).toBeInTheDocument();
    },
  );

  it("uses a custom ariaLabel when provided", () => {
    render(<IconButton variant="add" ariaLabel="Save title" />);
    expect(
      screen.getByRole("button", { name: "Save title" }),
    ).toBeInTheDocument();
  });

  it("invokes onClick when clicked", () => {
    const onClick = vi.fn();
    render(<IconButton variant="like" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
