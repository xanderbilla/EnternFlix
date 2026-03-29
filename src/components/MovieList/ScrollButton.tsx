import { memo } from "react";
import {
  DynamicIcon as Icon,
  DynamicCircularButton as CircularButton,
} from "@/utils/dynamicImports";
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
      className={`absolute ${isLeft ? "left-0 justify-start pl-4" : "right-0 justify-end pr-4"} top-0 bottom-0 z-[60] w-32 
      bg-gradient-to-${isLeft ? "r" : "l"} from-black/80 via-black/60 to-transparent
      items-center flex group/scroll cursor-pointer`}
      onClick={onClick}
    >
      <CircularButton
        onClick={(e) => {
          e.stopPropagation(); // Prevent double-click
          onClick();
        }}
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
