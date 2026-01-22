import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { MobileMenuProps } from "@/types/components";

function MobileMenu({ items, visible }: MobileMenuProps) {
  const renderItem = useCallback(
    (item: { label: string; path: string }) => (
      <Link
        href={item.path}
        key={item.path}
        className="px-3 text-xl text-center text-white hover:underline"
      >
        {item.label}
      </Link>
    ),
    [],
  );

  if (!visible) {
    return null;
  }
  return (
    <div className="relative h-[33vh] md:h-[50vh] w-full flex-col flex items-center justify-center">
      <div className="flex flex-col gap-4 h-full py-14">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={90}
          className="cursor-pointer"
        />
        {items.map(renderItem)}
      </div>
    </div>
  );
}

export default MobileMenu;
