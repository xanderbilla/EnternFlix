import { ArrowLeft } from "lucide-react";

interface VideoHeaderProps {
  showControls: boolean;
  onBack: () => void;
  onReport?: () => void;
  forceVisible?: boolean;
  isFullscreen?: boolean;
}

export default function VideoHeader({
  showControls,
  onBack,
  onReport,
  forceVisible = false,
  isFullscreen = false,
}: VideoHeaderProps) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent p-3 sm:p-5 md:p-6 lg:p-8 z-20 transition-opacity duration-300 flex items-center justify-between ${
        showControls || forceVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
        aria-label="Back to Browse"
      >
        <ArrowLeft
          className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ${
            isFullscreen ? "max-md:w-9 max-md:h-9" : ""
          }`}
          color="white"
          strokeWidth={2.5}
        />
      </button>

      {/* Report Button */}
      <button
        onClick={onReport}
        className="transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
        title="Report a playback problem"
        aria-label="Report a playback problem"
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ${
            isFullscreen ? "max-md:w-9 max-md:h-9" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            fill="white"
            fillRule="evenodd"
            d="M3 2a1 1 0 0 0-1 1v19h2V10.579c1.85.029 3.241.142 5 .334v2.658a1 1 0 0 0 .726.962C13.026 15.473 15.873 16 21 16a1 1 0 0 0 1-1V8.429a1 1 0 0 0-1-1c-2.383 0-3.939-.117-6-.342V4.43a1 1 0 0 0-.726-.962C10.974 2.528 8.127 2 3 2m1 6.579c2.257.034 3.859.188 6.113.446l.887.101v3.685c2.616.706 5.052 1.123 9 1.182V9.42c-2.257-.034-3.859-.188-6.113-.446l-.887-.1V5.189c-2.616-.706-5.051-1.123-9-1.182z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
