"use client";

import Image from "next/image";
import { MovieCardHoverOverlayProps } from "@/types/components";

export default function MovieCardHoverOverlay({
  backdropUrl,
  positionClass,
  viewportPosition = "center",
  data,
  navigateToTitle,
  handleKeyPress,
  children,
}: MovieCardHoverOverlayProps) {
  // Get directional transform classes based on viewport position
  const getDirectionalTransforms = () => {
    switch (viewportPosition) {
      case "left":
        return {
          initial: "md:scale-0 md:translate-x-[-20px] md:translate-y-0",
          hover:
            "md:group-hover/item:scale-110 md:group-hover/item:translate-x-0 md:group-hover/item:translate-y-[5vh]",
        };
      case "right":
        return {
          initial: "md:scale-0 md:translate-x-[20px] md:translate-y-0",
          hover:
            "md:group-hover/item:scale-110 md:group-hover/item:translate-x-0 md:group-hover/item:translate-y-[5vh]",
        };
      default:
        return {
          initial: "md:scale-0 md:translate-y-0",
          hover:
            "md:group-hover/item:scale-110 md:group-hover/item:translate-y-[5vh]",
        };
    }
  };

  const transforms = getDirectionalTransforms();

  return (
    <div
      className={`hidden md:block opacity-0 md:opacity-0 absolute top-0 transition-all duration-300 z-50
        md:invisible md:group-hover/item:visible md:group-hover/item:opacity-100
        ${transforms.initial} ${transforms.hover}
        w-[320px] md:w-[380px] lg:w-[420px] aspect-video
        ${positionClass}`}
    >
      <div
        className="relative w-full h-full rounded-md overflow-hidden cursor-pointer"
        onClick={navigateToTitle}
        onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${data?.title || "this title"}`}
      >
        {/* Show backdrop image only - No Video */}
        {backdropUrl ? (
          <Image
            className="object-contain w-full h-full"
            fill
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
            src={backdropUrl}
            alt={data?.title || "Movie backdrop"}
            unoptimized={!backdropUrl.includes("tmdb.org")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Image not available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none">
          <div className="absolute bottom-0 w-full p-4 flex flex-col pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
