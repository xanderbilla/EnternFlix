"use client";

import type { ShowMoreButtonProps } from "@/types/components";
import CircularButton from "@/components/UI/CircularButton";

export default function ShowMoreButton({
  showAll,
  onClick,
}: ShowMoreButtonProps) {
  return (
    <div className="relative">
      <div className="border-t-2 border-white/20 mt-4" />
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 -mt-5 sm:-mt-6">
          <CircularButton
            size="lg"
            variant="muted"
            onClick={onClick}
            aria-label={showAll ? "Show less episodes" : "Show more episodes"}
            className="!w-10 !h-10 sm:!w-12 sm:!h-12 md:!w-16 md:!h-16"
            icon={
              <div
                className={`transition-transform duration-500 ${showAll ? "rotate-180" : "rotate-0"}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m12 15.586 7.293-7.293 1.414 1.414-8 8a1 1 0 0 1-1.414 0l-8-8 1.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            }
          />
          <span className="text-xs sm:text-sm font-medium">
            {showAll ? "Show less" : "Show more"}
          </span>
        </div>
      </div>
    </div>
  );
}
