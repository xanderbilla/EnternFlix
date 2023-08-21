import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { GoPerson } from "react-icons/go";
import { LiaUserEditSolid } from "react-icons/lia";
interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const router = useRouter();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800">
      <div className="text-white text-sm flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            height={32}
            width={32}
            src="/img/default-blue.png"
            alt="avatar"
            className="w-8 rounded-md"
          />
          <p className="group-hover/item:underline">Username</p>
        </div>
        <div className="flex flex-col gap-2 my-1">
          <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
            <LiaUserEditSolid size={26} className="w-8" />
            <p
              className="group-hover/item:underline"
              onClick={() => router.push("browse")}
            >
              Manage Profile
            </p>
          </div>
          <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
            <GoPerson size={24} className="w-8" />
            <p className="group-hover/item:underline">Account</p>
          </div>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-2" />
        <div className="px-3 text-center hover:underline">
          Sign Out from Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
