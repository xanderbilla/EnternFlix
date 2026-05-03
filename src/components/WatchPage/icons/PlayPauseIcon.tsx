interface PlayPauseIconProps {
  isPlaying: boolean;
}

export default function PlayPauseIcon({ isPlaying }: PlayPauseIconProps) {
  if (isPlaying) {
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
          d="M4.5 3a.5.5 0 0 0-.5.5v17c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5zm10 0a.5.5 0 0 0-.5.5v17c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5z"
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
        d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"
      />
    </svg>
  );
}
