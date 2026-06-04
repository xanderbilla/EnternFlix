import { memo } from "react";
import IconButton from "@/components/Button/IconButton";
import Icon from "@/components/Icon/Icon";
import { MovieCardActionButtonsProps } from "@/types/components";
import { useTransition } from "@/contexts/TransitionContext";

export default function MovieCardActionButtons({
  contentId,
  title,
  contentType,
  onAddClick,
  onLikeClick,
  onInfoClick,
  handleKeyPress,
}: MovieCardActionButtonsProps) {
  const { navigateWithTransition } = useTransition();

  const handlePlayClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const type = contentType === "TV" ? "tv" : "movie";
    const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
    const currentParams = typeof window === "undefined" ? "" : window.location.search;

    let watchUrl = `/watch?id=${contentId}&type=${type}&from=${pathname}`;
    if (currentParams) {
      watchUrl += `&${currentParams.substring(1)}`;
    }
    navigateWithTransition(watchUrl);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddClick();
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick();
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <button
        type="button"
        className="w-8 h-8 bg-white rounded-full 
        flex justify-center items-center transition hover:bg-neutral-300"
        onClick={handlePlayClick}
        onKeyDown={(e) => handleKeyPress(e, () => handlePlayClick(e))}
        aria-label={`Play ${title}`}
      >
        <Icon name="playFillLarge" size={22} color="black" />
      </button>
      <IconButton
        variant="add"
        onClick={() => onAddClick()}
        ariaLabel={`Add ${title} to My List`}
        className="!w-8 !h-8 !p-1 !bg-white !border-0 hover:!bg-neutral-300 !text-black"
      />
      <IconButton
        variant="like"
        onClick={() => onLikeClick()}
        ariaLabel={`Like ${title}`}
        className="!w-8 !h-8 !p-1 !bg-white !border-0 hover:!bg-neutral-300 !text-black"
      />
    </div>
  );
}
