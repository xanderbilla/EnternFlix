"use client";

import Image from "next/image";
import { ExploreDialogHeaderProps } from "@/types/components";

export default function ExploreDialogHeader({
  title,
  onClose,
  showBackButton = false,
  backdropUrl,
  isCastDialog = false,
}: ExploreDialogHeaderProps) {
  if (isCastDialog && backdropUrl) {
    return (
      <div className="relative h-80 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-end justify-center pb-8">
          <div className="text-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-2">
              {title}
            </h2>
            <p className="text-white/80 text-lg">Movies & TV Shows</p>
          </div>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={onClose}
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

        {/* Close Button */}
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
      </div>
    );
  }

  // Default header for non-cast dialogs
  return (
    <div className="flex items-center justify-center py-32 px-6 sticky top-0 bg-zinc-900 z-10">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={onClose}
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
