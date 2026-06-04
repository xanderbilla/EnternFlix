"use client";

import { memo } from "react";
import ActionButton from "@/components/Button/ActionButton";
import IconButton from "@/components/Button/IconButton";
import { DialogActionButtonsProps } from "@/types/title";
import { useTransition } from "@/contexts/TransitionContext";

function DialogActionButtons({
  title,
  contentId,
  contentType,
  onClose,
  onAddToListClick,
  onLikeClick,
}: DialogActionButtonsProps) {
  const { navigateWithTransition } = useTransition();

  const handlePlayClick = () => {
    const type = contentType === "TV" ? "tv" : "movie";
    const pathname =
      typeof window === "undefined" ? "/" : window.location.pathname;
    const currentParams =
      typeof window === "undefined" ? "" : window.location.search;

    let watchUrl = `/watch?id=${contentId}&type=${type}&from=${pathname}`;
    if (currentParams) {
      watchUrl += `&${currentParams.substring(1)}`;
    }
    navigateWithTransition(watchUrl);
  };

  return (
    <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 px-4 sm:px-8 md:px-16">
      <h1 className="font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h1>

      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <ActionButton
          variant="primary"
          icon="play"
          label="Play"
          onClick={handlePlayClick}
          className="text-xs sm:text-sm md:text-base lg:text-lg py-1 sm:py-1.5 md:py-2 px-4 sm:px-6 md:px-8"
        />
        <IconButton variant="add" onClick={onAddToListClick} />
        <IconButton variant="like" onClick={onLikeClick} />
      </div>
    </div>
  );
}

export default memo(DialogActionButtons);
