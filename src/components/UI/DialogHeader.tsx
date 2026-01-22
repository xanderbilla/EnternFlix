"use client";

import Image from "next/image";

export interface DialogHeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void; // Separate back handler
  showBackButton?: boolean;
  backdropUrl?: string;
  variant?: "default" | "cast" | "info";
  subtitle?: string;
}

export default function DialogHeader({
  title,
  onClose,
  onBack,
  showBackButton = false,
  backdropUrl,
  variant = "default",
  subtitle,
}: DialogHeaderProps) {
  // Cast variant with backdrop banner
  if (variant === "cast" && backdropUrl) {
    return (
      <div className="relative h-[36rem] overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-end justify-start pb-16 pl-16">
          <div>
            <h2 className="text-white text-7xl text-white/90 font-bold leading-none tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Back Button */}
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="absolute left-6 top-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm"
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Close Button - only show if no back button */}
        {!showBackButton && (
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // Info variant (no back button, different styling)
  if (variant === "info") {
    return (
      <div className="flex items-center justify-center py-8 px-6 sticky top-0 bg-zinc-900 z-10">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          {title}
        </h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-2 absolute right-6 top-6"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  // Default variant for explore/detail dialogs
  return (
    <div className="flex items-center justify-center py-32 px-6 sticky top-0 bg-zinc-900 z-10">
      {/* Back Button */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="absolute left-6 top-6 text-gray-400 hover:text-white transition-colors p-2"
          aria-label="Go back"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      <h2 className="text-white text-5xl font-bold text-center">{title}</h2>

      {/* Close Button - only show if no back button */}
      {!showBackButton && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-2 absolute right-6 top-6"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
