import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown, { type SortOption } from "./SortDropdown";

const OPTIONS: SortOption[] = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A-Z" },
];

describe("SortDropdown", () => {
  it("shows the selected option label on the trigger", () => {
    render(
      <SortDropdown value="newest" options={OPTIONS} onChange={() => {}} />,
    );
    expect(
      screen.getByRole("button", { name: /select sort/i }),
    ).toHaveTextContent("Newest");
  });

  it("falls back to the buttonLabel when value matches no option", () => {
    render(
      <SortDropdown
        value="unknown"
        options={OPTIONS}
        onChange={() => {}}
        buttonLabel="Sort"
      />,
    );
    expect(
      screen.getByRole("button", { name: /select sort/i }),
    ).toHaveTextContent("Sort");
  });

  it("opens the listbox on trigger click and renders options with selected state", () => {
    render(
      <SortDropdown value="popular" options={OPTIONS} onChange={() => {}} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /select sort/i }));
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAttribute("aria-selected", "true");
    expect(options[1]).toHaveAttribute("aria-selected", "false");
  });

  it("invokes onChange and closes the listbox when an option is chosen", () => {
    const onChange = vi.fn();
    render(
      <SortDropdown value="popular" options={OPTIONS} onChange={onChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /select sort/i }));
    fireEvent.click(screen.getByRole("option", { name: "Newest" }));
    expect(onChange).toHaveBeenCalledWith("newest");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("supports controlled open state via onOpenChange", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <SortDropdown
        value="popular"
        options={OPTIONS}
        onChange={() => {}}
        isOpen={false}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /select sort/i }));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <SortDropdown
        value="popular"
        options={OPTIONS}
        onChange={() => {}}
        isOpen
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });
});
