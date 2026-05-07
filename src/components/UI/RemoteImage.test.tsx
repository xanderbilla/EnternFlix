import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RemoteImage from "./RemoteImage";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="next-image" {...rest} />
  ),
}));

describe("RemoteImage", () => {
  it("renders fallback element when src is missing", () => {
    render(<RemoteImage src={null} alt="poster" />);
    expect(screen.getByText(/image not available/i)).toBeInTheDocument();
    expect(screen.queryByTestId("next-image")).not.toBeInTheDocument();
  });

  it("renders custom fallback text and class when provided", () => {
    render(
      <RemoteImage
        src={undefined}
        alt="poster"
        fallbackText="No poster"
        fallbackClassName="custom-fallback"
      />,
    );
    const fallback = screen.getByText("No poster");
    expect(fallback).toHaveClass("custom-fallback");
  });

  it("renders next/image when src is provided", () => {
    render(
      <RemoteImage
        src="https://cdn.test/poster.jpg"
        alt="movie poster"
        width={100}
        height={150}
      />,
    );
    const img = screen.getByTestId("next-image");
    expect(img).toHaveAttribute("src", "https://cdn.test/poster.jpg");
    expect(img).toHaveAttribute("alt", "movie poster");
  });
});
