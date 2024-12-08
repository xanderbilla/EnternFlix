"use clienyt";

import { useRouter } from "next/navigation";
import React from "react";

interface NavbarItemProps {
  label: string;
  path?: string;
}

const NavbarItems: React.FC<NavbarItemProps> = ({ label, path }) => {
  const router = useRouter();
  return (
    <div
      className="text-white cursor-pointer hover:text-gray-300 transition"
      onClick={() => path && router.push(path)}
    >
      {label}
    </div>
  );
};

export default NavbarItems;
