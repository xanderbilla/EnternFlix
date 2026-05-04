import type { ReactElement } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  errorSpy.mockRestore();
});

function Boom(): ReactElement {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  it("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <span>safe child</span>
      </ErrorBoundary>,
    );
    expect(screen.getByText("safe child")).toBeInTheDocument();
  });

  it("renders the default fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /refresh page/i }),
    ).toBeInTheDocument();
  });

  it("renders a custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<div>custom fallback</div>}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText("custom fallback")).toBeInTheDocument();
  });

  it("invokes onError with the thrown error", () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((onError.mock.calls[0][0] as Error).message).toBe("boom");
  });
});
