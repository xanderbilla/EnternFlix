import { memo } from "react";
import Icon from "@/components/Icon/Icon";
import CircularButton from "@/components/UI/CircularButton";
import { ScrollButtonProps } from "@/types/components";

export default function ScrollButton({
  direction,
  onClick,
  show,
}: ScrollButtonProps) {
  if (!show) return null;

  const isLeft = direction === "left";

  return (
    <div
      className={`absolute ${isLeft ? "left-0 justify-start pl-4" : "right-0 justify-end pr-4"} top-0 bottom-0 z-[60] w-36 
      bg-gradient-to-${isLeft ? "r" : "l"} from-zinc-900 via-zinc-900/90 to-transparent
      items-center flex group/scroll`}
    >
      <CircularButton
        onClick={onClick}
        variant="muted"
        size="md"
        aria-label={`Scroll ${direction}`}
        className="group-hover/scroll:bg-white/10 !border-0"
        icon={
          <Icon
            name={isLeft ? "chevronLeft" : "chevronRight"}
            size={24}
            className="text-white"
          />
        }
      />
    </div>
  );
}
