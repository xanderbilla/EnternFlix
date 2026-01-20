import Image from "next/image";

interface MovieCardHoverOverlayProps {
  backdropUrl: string | null;
  positionClass: string;
  data: any;
  navigateToTitle: () => void;
  handleKeyPress: (event: React.KeyboardEvent, action: () => void) => void;
  children: React.ReactNode;
}

export default function MovieCardHoverOverlay({
  backdropUrl,
  positionClass,
  data,
  navigateToTitle,
  handleKeyPress,
  children,
}: MovieCardHoverOverlayProps) {
  return (
    <div
      className={`hidden md:block opacity-0 md:opacity-0 absolute top-0 transition duration-300 z-10
        md:invisible md:group-hover/item:visible md:group-hover/item:opacity-100
        md:scale-0 md:group-hover/item:scale-110 
        md:translate-y-0 md:group-hover/item:translate-y-[5vh]
        w-[320px] md:w-[380px] lg:w-[420px] aspect-video
        ${positionClass}`}
    >
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <button
          className="w-full h-full border-0 p-0 cursor-pointer relative"
          onClick={navigateToTitle}
          onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
          aria-label={`View details for ${
            data?.title || data?.name || "this title"
          }`}
        >
          {backdropUrl ? (
            <Image
              className="object-contain transition duration shadow-xl w-full h-full"
              fill
              src={backdropUrl}
              alt={
                data?.title ||
                data?.name ||
                data?.original_name ||
                "Movie backdrop"
              }
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Image not available
            </div>
          )}
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
          <div className="absolute bottom-0 w-full p-4 flex flex-col gap-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
