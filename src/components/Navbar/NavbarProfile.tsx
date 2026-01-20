"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

interface NavbarProfileProps {
  showAccountMenu: boolean;
  onMenuEnter: () => void;
  onMenuLeave: () => void;
  AccountMenu: React.ComponentType<{ visible: boolean }>;
}

export default function NavbarProfile({
  showAccountMenu,
  onMenuEnter,
  onMenuLeave,
  AccountMenu,
}: NavbarProfileProps) {
  const accountMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={accountMenuRef}
      onMouseEnter={onMenuEnter}
      onMouseLeave={onMenuLeave}
      className="relative"
    >
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            height={40}
            width={40}
            src="/img/default-blue.png"
            alt="avatar"
            className="w-full h-full object-cover hover:opacity-90 transition"
          />
        </div>
        <Icon
          name="chevronDown"
          className={`text-white transition-transform duration-300 ${
            showAccountMenu ? "rotate-180" : "rotate-0"
          } group-hover:text-white`}
        />
      </div>
      <AccountMenu visible={showAccountMenu} />
    </div>
  );
}
