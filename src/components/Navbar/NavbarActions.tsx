"use client";

import Icon from "@/components/Icon/Icon";
import CircularButton from "@/components/UI/CircularButton";
import { NavbarActionsProps } from "@/types/navbar";

export default function NavbarActions({ onSearchClick }: NavbarActionsProps) {
  return (
    <CircularButton
      onClick={onSearchClick}
      variant="ghost"
      size="md"
      aria-label="Search"
      icon={<Icon name="search" size={20} />}
    />
  );
}
