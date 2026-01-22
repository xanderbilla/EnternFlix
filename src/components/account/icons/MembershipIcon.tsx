interface IconProps {
  filled: boolean;
  className?: string;
}

export default function MembershipIcon({
  filled,
  className = "w-5 h-5",
}: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3 3a3 3 0 0 0-3 3v2h24V6a3 3 0 0 0-3-3zM0 18v-8h24v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3m16-2h4v-2h-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}
