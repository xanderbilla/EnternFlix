const DeviceIcon = ({ type }: { type: "desktop" | "mobile" | "tablet" }) => {
  const icons = {
    desktop: (
      <path
        fillRule="evenodd"
        d="M5 6.5v8.75l-2 .16V5.64a1 1 0 0 1 .84-.98 50 50 0 0 1 16.32 0 1 1 0 0 1 .84.98v9.77l-2-.16V6.5a49 49 0 0 0-14 0M1.12 19.64a92 92 0 0 1 21.76 0l.24-1.99a94 94 0 0 0-22.24 0z"
        clipRule="evenodd"
      />
    ),
    mobile: (
      <path
        fillRule="evenodd"
        d="M6 0a2 2 0 0 0-2 2v20c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 2h12v20H6zm7.5 16.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
        clipRule="evenodd"
      />
    ),
    tablet: (
      <path
        fillRule="evenodd"
        d="M2 3a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 2h20v14H2zm16.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
        clipRule="evenodd"
      />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="text-white"
      fill="currentColor"
    >
      {icons[type]}
    </svg>
  );
};

export default DeviceIcon;
