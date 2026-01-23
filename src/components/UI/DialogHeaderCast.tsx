"use client";

import Image from "next/image";

interface CastDialogHeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  backdropUrl: string;
}

export default function CastDialogHeader({
  title,
  onClose,
  onBack,
  showBackButton = false,
  backdropUrl,
}: CastDialogHeaderProps) {
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
          <h2 className="text-white text-7xl text-white0 font-bold leading-none tracking-tight">
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
