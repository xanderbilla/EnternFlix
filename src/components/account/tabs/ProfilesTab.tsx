"use client";

import Image from "next/image";
import Toggle from "@/components/Toggle/Toggle";

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
      <div className="bg-zinc-800/50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Profile Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-700 last:border-b-0">
            <div>
              <div className="font-medium">Maximum profiles allowed</div>
              <div className="text-zinc-400 text-sm">
                Current limit for your account
              </div>
            </div>
            <span className="text-zinc-300 font-medium">5</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-zinc-700 last:border-b-0">
            <div>
              <div className="font-medium">Kids profiles</div>
              <div className="text-zinc-400 text-sm">
                Profiles with parental controls
              </div>
            </div>
            <span className="text-zinc-300 font-medium">1</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium">Auto-play next episode</div>
              <div className="text-zinc-400 text-sm">
                Automatically play the next episode
              </div>
            </div>
            <Toggle defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
