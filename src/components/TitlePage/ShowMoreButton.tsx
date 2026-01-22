"use client";

import CircularButton from "@/components/UI/CircularButton";

interface ShowMoreButtonProps {
  showAll: boolean;
  onClick: () => void;
}

export default function ShowMoreButton({
  showAll,
  onClick,
}: ShowMoreButtonProps) {
  return (
    <div className="relative">
      <div className="border-t-2 border-white/20 mt-4" />
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 -mt-6">
          <CircularButton
            size="lg"
            variant="muted"
            onClick={onClick}
            aria-label={showAll ? "Show less episodes" : "Show more episodes"}
            icon={
              <div
                className={`transition-transform duration-500 ${showAll ? "rotate-180" : "rotate-0"}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  className="text-white"
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
          <span className="text-sm font-medium">
            {showAll ? "Show less" : "Show more"}
          </span>
        </div>
      </div>
    </div>
  );
}
