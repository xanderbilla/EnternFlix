"use client";

import { memo } from "react";
import ActionButton from "@/components/Button/ActionButton";
import IconButton from "@/components/Button/IconButton";
import { DialogActionButtonsProps } from "@/types/title";

function DialogActionButtons({
  title,
  onPlayClick,
  onAddToListClick,
  onLikeClick,
}: DialogActionButtonsProps) {
  return (
    <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-0 right-0 px-4 md:px-16">
      <h1 className="font-bold text-white mb-6 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h1>

      <div className="flex flex-row items-center gap-3">
        <ActionButton
          variant="primary"
          icon="play"
          label="Play"
          onClick={onPlayClick}
        />
        <IconButton variant="add" onClick={onAddToListClick} />
        <IconButton variant="like" onClick={onLikeClick} />
      </div>
    </div>
  );
}

export default memo(DialogActionButtons);
