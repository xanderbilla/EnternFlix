interface IconProps {
  filled: boolean;
  className?: string;
}

export default function SecurityIcon({
  filled,
  className = "w-5 h-5",
}: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path
          fillRule="evenodd"
          d="M11.6 1.09a1 1 0 0 1 .8 0l10 4.44a1 1 0 0 1 .6.95c-.11 2.78-.36 6.3-1.8 9.41-1.47 3.18-4.15 5.9-8.96 7.08a1 1 0 0 1-.48 0c-4.8-1.19-7.5-3.9-8.96-7.08C1.36 12.78 1.11 9.26 1 6.5a1 1 0 0 1 .6-.96zm.1 14.62 6-6-1.4-1.42-5.3 5.3-2.3-2.3-1.4 1.42 3 3 .7.7z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.4 1.09a1 1 0 0 0-.8 0l-10 4.44a1 1 0 0 0-.6.95c.11 2.78.36 6.3 1.8 9.41 1.47 3.18 4.15 5.9 8.96 7.08a1 1 0 0 0 .48 0c4.8-1.19 7.5-3.9 8.96-7.08 1.44-3.11 1.69-6.63 1.8-9.4a1 1 0 0 0-.6-.96zM4.63 15.05c-1.16-2.5-1.46-5.37-1.6-7.97L12 3.1l8.97 4c-.13 2.6-.43 5.46-1.59 7.96-1.2 2.6-3.34 4.86-7.38 5.92-4.04-1.06-6.18-3.31-7.38-5.92m7.09.66 6-6-1.42-1.42L11 13.6l-2.3-2.3-1.4 1.42 3 3 .7.7z"
        clipRule="evenodd"
      />
    </svg>
  );
}
