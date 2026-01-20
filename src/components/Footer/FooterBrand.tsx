import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";

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
          href="https://facebook.com/enternflix"
          className="hover:text-white transition"
        >
          <Icon name="facebook" size={20} />
        </Link>
        <Link
          href="https://x.com/enternflix"
          className="hover:text-white transition"
        >
          <Image src="/x.svg" width={20} height={20} alt="X (Twitter)" />
        </Link>
        <Link
          href="https://instagram.com/enternflix"
          className="hover:text-white transition"
        >
          <Icon name="instagram" size={20} />
        </Link>
        <Link
          href="https://github.com/enternflix"
          className="hover:text-white transition"
        >
          <Icon name="github" size={20} />
        </Link>
      </div>
    </div>
  );
}
