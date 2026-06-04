"use client";

import type { CastDialogHeaderProps } from "@/types/components";
import Image from "next/image";
import { useState } from "react";
import PerformerIcon from "@/components/Icon/PerformerIcon";
import ContentCreatorIcon from "@/components/Icon/ContentCreatorIcon";
import Tooltip from "@/components/UI/Tooltip";

export default function CastDialogHeader({
  title,
  onClose,
  onBack,
  showBackButton = false,
  backdropUrl,
  isLoading = false,
  verified = false,
  gender,
  roles,
}: CastDialogHeaderProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasMeta =
    verified ||
    !!gender ||
    !!roles?.includes("PERFORMER") ||
    !!roles?.includes("CONTENT_CREATOR");

  return (
    <div className="relative h-[20rem] sm:h-[28rem] md:h-[32rem] lg:h-[36rem] overflow-hidden bg-transparent">
      {/* Backdrop Image. Keying on backdropUrl remounts this subtree when the
          URL changes, which naturally resets `imageLoaded` without an effect. */}
      {backdropUrl && (
        <div
          key={backdropUrl}
          className={`absolute inset-0 transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={backdropUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover object-center"
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      {/* Gradient Overlay - Lighter and cleaner */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-end justify-start pb-8 sm:pb-12 md:pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="w-full max-w-full lg:flex lg:items-center lg:gap-3">
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
            {title}
          </h2>
          {hasMeta && (
            <div className="mt-3 lg:mt-0 flex items-center gap-3">
              {/* Verified Icon */}
              {verified && (
                <Tooltip label="Verified">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-gray-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="-1.7 0 20.4 20.4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-4.105-4.498a.791.791 0 0 0-1.082.29l-3.828 6.63-1.733-2.08a.791.791 0 1 0-1.216 1.014l2.459 2.952a.792.792 0 0 0 .608.285.83.83 0 0 0 .068-.003.791.791 0 0 0 .618-.393L12.6 6.866a.791.791 0 0 0-.29-1.081z" />
                  </svg>
                </Tooltip>
              )}
              {/* Gender Icon */}
              {gender && (
                <>
                  {gender.toLowerCase() === "male" ? (
                    <Tooltip label="Male">
                      <svg
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-300 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="10" cy="14" r="7" />
                        <line x1="14.5" y1="9.5" x2="21" y2="3" />
                        <line x1="15" y1="3" x2="21" y2="3" />
                        <line x1="21" y1="3" x2="21" y2="9" />
                      </svg>
                    </Tooltip>
                  ) : gender.toLowerCase() === "female" ? (
                    <Tooltip label="Female">
                      <svg
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-300 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="8" r="7" />
                        <line x1="12" y1="15" x2="12" y2="23" />
                        <line x1="8" y1="19" x2="16" y2="19" />
                      </svg>
                    </Tooltip>
                  ) : null}
                </>
              )}
              {/* Role Icons */}
              {roles?.includes("PERFORMER") && (
                <Tooltip label="Performer">
                  <PerformerIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-300 flex-shrink-0" />
                </Tooltip>
              )}
              {roles?.includes("CONTENT_CREATOR") && (
                <Tooltip label="Content Creator">
                  <ContentCreatorIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-300 flex-shrink-0" />
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-4 sm:left-6 sm:top-6 text-white hover:text-gray-300 transition-colors p-1.5 sm:p-2 bg-black/30 rounded-full backdrop-blur-sm z-10"
          aria-label="Go back"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Close Button - only show if no back button */}
      {!showBackButton && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 text-white hover:text-gray-300 transition-colors p-1.5 sm:p-2 bg-black/30 rounded-full backdrop-blur-sm z-10"
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
      )}
    </div>
  );
}
