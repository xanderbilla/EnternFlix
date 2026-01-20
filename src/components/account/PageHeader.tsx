import Image from "next/image";
import Link from "next/link";

interface PageHeaderProps {
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            className="h-8 md:h-10 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>
    </header>
  );
};

export default PageHeader;
