"use client";

import Icon from "@/components/Icon/Icon";

interface NavbarActionsProps {
  onSearchClick: () => void;
}

export default function NavbarActions({ onSearchClick }: NavbarActionsProps) {
  return (
    <button
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition text-gray-200 hover:text-white"
      aria-label="Search"
      onClick={onSearchClick}
    >
      <Icon name="search" size={20} />
    </button>
  );
}
