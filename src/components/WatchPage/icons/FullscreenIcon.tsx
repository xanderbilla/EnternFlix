interface FullscreenIconProps {
  isFullscreen: boolean;
}

export default function FullscreenIcon({ isFullscreen }: FullscreenIconProps) {
  if (isFullscreen) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="44"
        height="44"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        role="img"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M24 8h-5V3h-2v7h7zM0 16h5v5h2v-7H0zm7-6H0V8h5V3h2zm12 11v-5h5v-2h-7v7z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="44"
      height="44"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 5c0-1.1.9-2 2-2h7v2H2v4H0zm22 0h-7V3h7a2 2 0 0 1 2 2v4h-2zM2 15v4h7v2H2a2 2 0 0 1-2-2v-4zm20 4v-4h2v4a2 2 0 0 1-2 2h-7v-2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
