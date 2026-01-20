interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-zinc-400 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
