interface IconProps {
  filled: boolean;
  className?: string;
}

export default function ProfilesIcon({
  filled,
  className = "w-5 h-5",
}: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path
          fillRule="evenodd"
          d="M15 3H5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2V9a4 4 0 0 1 4-4h8a2 2 0 0 0-2-2m4 2a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4 4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4m-8 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-.84 5.25a1 1 0 1 0-1.32-1.5c-.48.42-1.32.75-2.34.75a3.6 3.6 0 0 1-2.34-.75 1 1 0 1 0-1.32 1.5A5.6 5.6 0 0 0 15.5 18a5.6 5.6 0 0 0 3.66-1.25"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5 3h10a2 2 0 0 1 2 2H9a4 4 0 0 0-4 4v8a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m18 6a4 4 0 0 0-4-4 4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4 4 4 0 0 0 4 4h10a4 4 0 0 0 4-4zm-4-2H9a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m-9.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m.75 2.34a1 1 0 0 1-.1 1.41A5.6 5.6 0 0 1 15.5 18a5.6 5.6 0 0 1-3.66-1.25 1 1 0 1 1 1.32-1.5c.48.42 1.32.75 2.34.75s1.86-.33 2.34-.75a1 1 0 0 1 1.41.1"
        clipRule="evenodd"
      />
    </svg>
  );
}
