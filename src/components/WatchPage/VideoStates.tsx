interface VideoStatesProps {
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}

export function LoadingState() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-white text-xl">Loading video...</div>
    </div>
  );
}

export function ErrorState({
  error,
  onBack,
  showBackButton = true,
}: {
  error: string;
  onBack: () => void;
  showBackButton?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="alert"
    >
      <div className="text-center max-w-xl px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Playback Error
        </h1>
        <p className="text-zinc-300 text-base md:text-lg mb-2">
          We could not start this stream right now.
        </p>
        <p className="text-zinc-500 text-sm md:text-base mb-6">{error}</p>
        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}

export function ErrorPage({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black"
      role="alert"
    >
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">Error</h1>
        <p className="text-gray-400 mb-6">Failed to load video</p>
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
