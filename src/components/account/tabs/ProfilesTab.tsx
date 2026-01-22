"use client";

import Image from "next/image";
import Toggle from "@/components/Toggle/Toggle";
import SettingRow from "@/components/UI/SettingRow";
import Card from "@/components/UI/Card";

export default function ProfilesTab() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-8">Profile Management</h2>

      {/* Profiles Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-6 text-zinc-300">
          Current Profiles
        </h3>
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="overflow-hidden">
              <Image
                className="w-[100px] h-[100px] object-cover"
                src="/img/default-blue.png"
                alt="John Doe"
                height={100}
                width={100}
              />
            </div>
            <span className="mt-3 text-base font-medium text-neutral-400 group-hover:text-white transition-colors duration-200">
              John Doe
            </span>
            <button className="mt-2 text-sm text-zinc-400 hover:text-white transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="flex flex-col items-center group cursor-pointer">
            <div className="overflow-hidden">
              <Image
                className="w-[100px] h-[100px] object-cover"
                src="/img/default-green.png"
                alt="Kids"
                height={100}
                width={100}
              />
            </div>
            <span className="mt-3 text-base font-medium text-neutral-400 group-hover:text-white transition-colors duration-200">
              Kids
            </span>
            <button className="mt-2 text-sm text-zinc-400 hover:text-white transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Add New Profile */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="overflow-hidden w-[100px] h-[100px] flex items-center justify-center">
              <Image
                className="w-[100px] h-[100px] object-contain"
                src="/img/add.png"
                alt="Add Profile"
                height={100}
                width={100}
              />
            </div>
            <span className="mt-3 text-base font-medium text-neutral-400 group-hover:text-white transition-colors duration-200">
              Add Profile
            </span>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <Card title="Profile Settings" contentClassName="space-y-4">
        <SettingRow
          label="Maximum profiles allowed"
          description="Current limit for your account"
          action={<span className="text-zinc-300 font-medium">5</span>}
          hasBorder
        />
        <SettingRow
          label="Kids profiles"
          description="Profiles with parental controls"
          action={<span className="text-zinc-300 font-medium">1</span>}
          hasBorder
        />
        <SettingRow
          label="Auto-play next episode"
          description="Automatically play the next episode"
          action={<Toggle defaultChecked />}
          hasBorder={false}
        />
      </Card>
    </div>
  );
}
