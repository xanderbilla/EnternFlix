interface IconProps {
  filled: boolean;
  className?: string;
}

export default function OverviewIcon({
  filled,
  className = "w-5 h-5",
}: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path
          fillRule="evenodd"
          d="M12.515 2.143a1 1 0 0 0-1.03 0l-10 6A1 1 0 0 0 1 9v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5h6v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-.485-.857z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M11.486 2.143a1 1 0 0 1 1.028 0l10 6A1 1 0 0 1 23 9v12a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5h-4v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 .486-.857zM3 9.566V20h5v-6h8v6h5V9.566l-9-5.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
