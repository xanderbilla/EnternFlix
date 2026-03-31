import Image from "next/image";
import Link from "next/link";
import { DynamicIcon as Icon } from "@/utils/dynamicImports";

export default function FooterBrand() {
  return (
    <div className="flex flex-col space-y-6">
      <Image
        src="/logo.png"
        height={90}
        width={150}
        alt="EnternFlix Logo"
        className="h-12 object-contain"
      />
      <div className="flex space-x-4">
        <Link
          href="https://x.com/xanderbilla"
          className="hover:text-white transition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
        >
          <Image src="/x.svg" width={20} height={20} alt="X (Twitter)" />
        </Link>
        <Link
          href="https://instagram.com/xander_billa"
          className="hover:text-white transition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Icon name="instagram" size={20} />
        </Link>
        <Link
          href="https://github.com/xanderbilla/EnternFlix"
          className="hover:text-white transition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Icon name="github" size={20} />
        </Link>
      </div>
    </div>
  );
}
