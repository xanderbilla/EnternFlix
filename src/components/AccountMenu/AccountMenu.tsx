import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import Icon from "@/components/Icon/Icon";
import { AccountMenuProps } from "@/types/navbar";

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const router = useRouter();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black/90 backdrop-blur-sm w-56 absolute top-12 right-0 py-3 flex-col border-2 border-gray-800 z-[70]">
      <div className="text-white text-sm flex flex-col gap-2">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            height={32}
            width={32}
            src="/img/default-blue.png"
            alt="avatar"
            className="w-8 rounded-md"
          />
          <span
            className="group-hover/item:underline cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            Username
          </span>
        </div>
        <div className="flex flex-col gap-2 my-1">
          <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
            <Icon name="userEdit" size={26} className="w-8" />
            <p
              className="group-hover/item:underline cursor-pointer"
              onClick={() => router.push("browse")}
            >
              Manage Profile
            </p>
          </div>
          <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
            <Icon name="user" size={24} className="w-8" />
            <span
              className="group-hover/item:underline cursor-pointer"
              onClick={() => router.push("/account")}
            >
              Account
            </span>
          </div>
          <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
            <Icon name="help" size={24} className="w-8" />
            <span
              className="group-hover/item:underline cursor-pointer"
              onClick={() => router.push("/help-center")}
            >
              Help Center
            </span>
          </div>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-1" />
        <div className="px-3 group/item flex justify-center items-center w-full">
          <span
            className="group-hover/item:underline cursor-pointer"
            onClick={() => router.push("/account")}
          >
            Sign Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(AccountMenu);
