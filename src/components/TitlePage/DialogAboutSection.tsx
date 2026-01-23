"use client";

import { DialogAboutSectionProps } from "@/types/title";

export default function DialogAboutSection({
  title,
  mockCast,
  mockGenres,
  onExploreClick,
}: DialogAboutSectionProps) {
  return (
    <div id="about-section" className="mt-12">
      <h2 className="text-white/80 text-xl mb-6">
        About <span className="font-medium text-2xl">{title}</span>
      </h2>

      <div className="space-y-2">
        <div className="text-sm">
          <span className="text-gray-400">Studio: </span>
          <button
            onClick={() =>
              onExploreClick?.("Netflix Studios", "Netflix Studios", false)
            }
            className="text-white/80 hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
          >
            Netflix Studios
          </button>
        </div>

        <div className="text-sm">
          <span className="text-gray-400">Cast: </span>
          <span className="text-white/80">
            {mockCast.map((cast, index) => (
              <span key={cast}>
                <button
                  onClick={() => onExploreClick?.(cast, cast, true)}
                  className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                >
                  {cast}
                </button>
                {index < mockCast.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>

        <div className="text-sm">
          <span className="text-gray-400">Genres: </span>
          <span className="text-white/80">
            {mockGenres.map((genre, index) => (
              <span key={genre}>
                <button
                  onClick={() =>
                    onExploreClick?.(genre, `${genre} Movies & Shows`, false)
                  }
                  className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                >
                  {genre}
                </button>
                {index < mockGenres.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>

        <div className="text-sm">
          <span className="text-gray-400">This Movie Is: </span>
          <span className="text-white/80">
            <button
              onClick={() =>
                onExploreClick?.("Emotional", "Emotional Content", false)
              }
              className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
            >
              Emotional
            </button>
            ,{" "}
            <button
              onClick={() =>
                onExploreClick?.("Exciting", "Exciting Content", false)
              }
              className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
            >
              Exciting
            </button>
          </span>
        </div>

        <div className="text-sm">
          <span className="text-gray-400">Maturity Rating: </span>
          <div className="inline-flex items-center gap-2 mt-1">
            <span className="border border-white/40 px-2 text-xs text-white/80">
              U/A 16+
            </span>
            <span className="text-white/80 text-xs">suicide</span>
          </div>
          <p className="text-white/90 text-xs mt-2 leading-relaxed">
            Suitable for persons aged 16 and above and under parental guidance
            for people under age of 16
          </p>
        </div>
      </div>
    </div>
  );
}
