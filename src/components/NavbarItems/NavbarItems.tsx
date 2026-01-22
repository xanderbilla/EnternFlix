"use client";

import Link from "next/link";
import React, { memo } from "react";
import { NavbarItemProps } from "@/types/navbar";

const NavbarItems: React.FC<NavbarItemProps> = ({ label, path }) => {
  if (!path) {
    return (
      <div className="text-white cursor-pointer hover:text-gray-300 transition">
        {label}
      </div>
    );
  }

  return (
    <Link
      href={path}
      prefetch={true}
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {label}
    </Link>
  );
};

export default memo(NavbarItems);
