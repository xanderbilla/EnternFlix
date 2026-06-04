"use client";

import type { SimpleDialogHeaderProps } from "@/types/components";

export default function SimpleDialogHeader({
  title,
  onClose,
}: SimpleDialogHeaderProps) {
  return (
    <div className="flex items-center justify-center py-10 sm:py-16 md:py-20 px-4 sm:px-6 sticky top-0 bg-zinc-900 z-10">
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
        {title}
      </h2>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors p-1.5 sm:p-2 absolute right-4 top-4 sm:right-6 sm:top-6"
        aria-label="Close"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
