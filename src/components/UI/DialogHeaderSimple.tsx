"use client";

import type { SimpleDialogHeaderProps } from "@/types/components";

export default function SimpleDialogHeader({
  title,
  onClose,
}: SimpleDialogHeaderProps) {
  return (
    <div className="flex items-center justify-center py-20 px-6 sticky top-0 bg-zinc-900 z-10">
      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
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
