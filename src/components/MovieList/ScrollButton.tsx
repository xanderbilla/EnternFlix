import Icon from "@/components/Icon/Icon";

interface ScrollButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  show: boolean;
}

export default function ScrollButton({
  direction,
  onClick,
  show,
}: ScrollButtonProps) {
  if (!show) return null;

  const isLeft = direction === "left";

  return (
    <button
      type="button"
      title={`Scroll ${direction}`}
      onClick={onClick}
      className={`absolute ${isLeft ? "left-0 justify-start pl-4" : "right-0 justify-end pr-4"} top-0 bottom-0 z-[30] w-36 
      bg-gradient-to-${isLeft ? "r" : "l"} from-zinc-900 via-zinc-900/90 to-transparent
      items-center flex cursor-pointer group/scroll`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center 
        bg-zinc-900 group-hover/scroll:bg-white/10 transition duration-300"
      >
        <Icon
          name={isLeft ? "chevronLeft" : "chevronRight"}
          size={24}
          className="text-white"
        />
      </div>
    </button>
  );
}
