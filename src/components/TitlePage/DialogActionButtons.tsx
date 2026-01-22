"use client";

import { memo } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import CircularButton from "@/components/UI/CircularButton";
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
        <Button
          onClick={onPlayClick}
          variant="banner-play"
          className="py-2 px-6 w-auto text-base font-semibold flex flex-row items-center"
        >
          <Icon name="playFill" className="mr-2" size={20} /> Play
        </Button>

        <CircularButton
          onClick={onAddToListClick}
          variant="secondary"
          size="md"
          aria-label="Add to list"
          icon={<Icon name="add" size={20} color="white" />}
        />

        <CircularButton
          onClick={onLikeClick}
          variant="secondary"
          size="md"
          aria-label="Like"
          icon={<Icon name="like" size={18} color="white" />}
        />
      </div>
    </div>
  );
}

export default memo(DialogActionButtons);
