import { memo } from "react";
import IconButton from "@/components/Button/IconButton";
import Icon from "@/components/Icon/Icon";
import { MovieCardActionButtonsProps } from "@/types/components";

export default function MovieCardActionButtons({
  onPlayClick,
  onAddClick,
  onLikeClick,
  onInfoClick,
  handleKeyPress,
}: MovieCardActionButtonsProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <button
        className="w-8 h-8 bg-white rounded-full 
        flex justify-center items-center transition hover:bg-neutral-300"
        onClick={onPlayClick}
        onKeyDown={(e) => handleKeyPress(e, onPlayClick)}
        aria-label="Play"
      >
        <Icon name="playFillLarge" size={22} color="black" />
      </button>
      <IconButton
        variant="add"
        onClick={onAddClick}
        className="!w-8 !h-8 !p-1 !bg-white !border-0 hover:!bg-neutral-300 !text-black"
      />
      <IconButton
        variant="like"
        onClick={onLikeClick}
        className="!w-8 !h-8 !p-1 !bg-white !border-0 hover:!bg-neutral-300 !text-black"
      />
    </div>
  );
}
