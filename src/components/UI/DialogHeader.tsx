"use client";

import type { DialogHeaderProps } from "@/types/components";
import DialogHeaderCast from "./DialogHeaderCast";
import SimpleDialogHeader from "./DialogHeaderSimple";

export default function DialogHeader({
  title,
  onClose,
  onBack,
  showBackButton = false,
  backdropUrl,
  variant = "default",
  isLoading = false,
  verified,
  gender,
}: DialogHeaderProps) {
  if (variant === "cast") {
    return (
      <DialogHeaderCast
        title={title}
        onClose={onClose}
        onBack={onBack}
        showBackButton={showBackButton}
        backdropUrl={backdropUrl || ""}
        isLoading={isLoading}
        verified={verified}
        gender={gender}
      />
    );
  }

  if (variant === "info") {
    return <SimpleDialogHeader title={title} onClose={onClose} />;
  }

  return (
    <div className="flex items-center justify-center py-32 px-6 sticky top-0 bg-zinc-900 z-10">
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

      <h2 className="text-white text-5xl font-bold text-center">{title}</h2>

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
