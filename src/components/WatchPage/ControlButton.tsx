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
      className={`text-white transition-transform duration-200 ease-in-out hover:scale-110 p-1.5 sm:p-2 rounded-full [&>svg]:w-7 [&>svg]:h-7 sm:[&>svg]:w-8 sm:[&>svg]:h-8 md:[&>svg]:w-9 md:[&>svg]:h-9 ${
        isActive ? "scale-125" : ""
      } ${className}`}
      title={title}
    >
      {children}
    </button>
  );
}
