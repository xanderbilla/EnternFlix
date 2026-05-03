interface ControlButtonProps {
  onClick: () => void;
  isActive: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ControlButton({
  onClick,
  isActive,
  title,
  children,
  className = "",
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-white transition-transform duration-200 ease-in-out hover:scale-110 p-2 rounded-full ${
        isActive ? "scale-125" : ""
      } ${className}`}
      title={title}
    >
      {children}
    </button>
  );
}
