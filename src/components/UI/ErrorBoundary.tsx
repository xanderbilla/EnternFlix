"use client";

import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "@/types/components";
import { Component } from "react";
import { logger } from "@/lib/logger/logger";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 sm:p-8 text-center">
          <div className="text-red-500 mb-3 sm:mb-4">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            We&apos;re sorry for the inconvenience. Please try refreshing the
            page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs sm:text-sm transition"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
