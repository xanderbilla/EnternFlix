import Icon from "@/components/Icon/Icon";

interface MovieCardActionButtonsProps {
  onPlayClick: () => void;
  onAddClick: () => void;
  onLikeClick: () => void;
  onInfoClick: () => void;
  handleKeyPress: (event: React.KeyboardEvent, action: () => void) => void;
}

export default function MovieCardActionButtons({
  onPlayClick,
  onAddClick,
  onLikeClick,
  onInfoClick,
  handleKeyPress,
}: MovieCardActionButtonsProps) {
  return (
    <div className="flex flex-row items-center justify-between">
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
        <button
          className="w-8 h-8 bg-white rounded-full 
          flex justify-center items-center transition hover:bg-neutral-300"
          onClick={onAddClick}
          onKeyDown={(e) => handleKeyPress(e, onAddClick)}
          aria-label="Add to list"
        >
          <Icon name="add" size={22} color="black" />
        </button>
        <button
          className="w-8 h-8 bg-white rounded-full 
          flex justify-center items-center transition hover:bg-neutral-300"
          onClick={onLikeClick}
          onKeyDown={(e) => handleKeyPress(e, onLikeClick)}
          aria-label="Like"
        >
          <Icon name="like" size={18} color="black" />
        </button>
      </div>
      <button
        className="w-8 h-8 bg-white rounded-full 
        flex justify-center items-center transition hover:bg-neutral-300"
        onClick={onInfoClick}
        onKeyDown={(e) => handleKeyPress(e, onInfoClick)}
        aria-label="More information"
      >
        <Icon name="arrowDown" size={22} color="black" />
      </button>
    </div>
  );
}
