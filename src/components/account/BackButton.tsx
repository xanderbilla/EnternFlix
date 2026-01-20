interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = "Back",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-white text-zinc-900 font-medium text-sm 
        rounded-md border border-zinc-300 
        hover:bg-zinc-50 hover:border-zinc-400 
        focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2
        transition-all duration-200
        ${className}
      `}
    >
      <span className="text-lg">←</span>
      {label}
    </button>
  );
};

export default BackButton;
