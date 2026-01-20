import { ReactNode } from "react";

interface ContentLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  sidebar,
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${className}`}>
      {/* Sidebar */}
      <aside className="lg:w-80 flex-shrink-0">{sidebar}</aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="bg-zinc-800/30 rounded-xl p-6 md:p-8 min-h-[500px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ContentLayout;
