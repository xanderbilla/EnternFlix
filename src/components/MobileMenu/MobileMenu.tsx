import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MobileMenuProps {
  visible: boolean;
  items: { path: string; label: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items, visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="w-full h-screen flex-col flex items-center justify-center">
      <div className="flex flex-col gap-4 h-full py-14">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={90}
          className="cursor-pointer"
        />
        {items.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className="px-3 text-xl text-center text-white hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
