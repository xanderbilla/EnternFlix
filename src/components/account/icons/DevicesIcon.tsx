interface IconProps {
  filled: boolean;
  className?: string;
}

export default function DevicesIcon({
  filled,
  className = "w-5 h-5",
}: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path
          fillRule="evenodd"
          d="M0 3.73C0 2.77.77 2 1.73 2h18.54c.96 0 1.73.77 1.73 1.73V7h-5a4 4 0 0 0-4 4v5H1.73C.77 16 0 15.23 0 14.27zM13 19.3v-2a73 73 0 0 0-8.07.12l.14 2A70 70 0 0 1 13 19.3m2-8.3c0-1.1.9-2 2-2h5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2zm5.25 6.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M0 3.73C0 2.77.77 2 1.73 2h18.54c.96 0 1.73.77 1.73 1.73V7h-2V4H2v10h11v2H1.73C.77 16 0 15.23 0 14.27zM13 17.3a73 73 0 0 0-8.07.12l.14 2A70 70 0 0 1 13 19.3zm9-6.3h-5v9h5zm-5-2a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2h5a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm2.5 9.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
        clipRule="evenodd"
      />
    </svg>
  );
}
