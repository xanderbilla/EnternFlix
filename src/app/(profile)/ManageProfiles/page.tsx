"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    router.back();
  };

  const onCancel = () => {
    setShowProfile(false);
  };

  const onReset = () => {
    setShowProfile(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-900">
    <Link href="/" className="absolute h-16 md:h-24 top-6 lg:left-6 lg:top-6">
      <Image
        className="rounded-sm"
        src="/logo.png"
        alt="Logo"
        height={70}
        width={80}
      />
    </Link>
      {!showProfile && (
        <div className="flex flex-col items-center justify-center gap-14 md:gap-10 h-4/5 md:mt-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-5xl tracking-wide mb-2">
            Manage Profiles:
          </h1>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center
         lg:grid-cols-5 gap-8"
          >
            <div
              className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer"
              onClick={() => setShowProfile(true)}
            >
              <div className="relative">
                <Image
                  className="rounded-sm opacity-50"
                  src="/img/default-blue.png"
                  alt="Default Profile"
                  height={100}
                  width={100}
                />
                <div className="absolute bottom-9 right-9 text-md font-medium text-white">
                  <PiPencilSimpleLineLight size={28} className="opacity-80" />
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-400">
                John Doe
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer"
              onClick={() => setShowProfile(true)}
            >
              <div className="relative">
                <Image
                  className="rounded-sm opacity-50"
                  src="/img/default-green.png"
                  alt="Default Profile"
                  height={100}
                  width={100}
                />
                <div className="absolute bottom-9 right-9 text-md font-medium text-white">
                  <PiPencilSimpleLineLight size={28} className="opacity-80" />
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-400">Kids</span>
            </div>
            <div
              className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer"
              onClick={() => {}}
            >
              <Image
                className="rounded-md bg-zinc-900"
                src="/img/add.png"
                alt="Default Profile"
                height={100}
                width={100}
              />
              <span className="text-sm font-medium text-neutral-400">
                Add Profile
              </span>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="bg-white text-black font-medium px-6 py-2 rounded border-2 border-opacity-25 border-gray-400 tracking-widest mt-6 md:mt-2 hover:bg-neutral-200 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      )}
      {showProfile && (
        <div className="w-[350px] lg:w-[900px] md:w-[700px] sm:w-[600px]">
          <h1 className="text-white text-4xl lg:text-5xl pb-4 border-b-2 border-neutral-800">
            Edit Profile
          </h1>
          <div className="flex py-6 flex-col md:flex-row lg:flex-row text-white min-h-[50vh] w-full border-b-2 border-neutral-800">
            <div className="flex flex-1 justify-center h-[100px]">
              <div className="relative">
                <Image
                  className="rounded-sm opacity-50"
                  src="/img/default-blue.png"
                  alt="Default Profile"
                  height={100}
                  width={100}
                />
                <div className="absolute bottom-9 right-9 text-md font-medium text-white">
                  <PiPencilSimpleLineLight size={28} className="opacity-80" />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-[4] w-full gap-8">
              <div className="text-neutral-300 gap-5">
                <h2 className="text-md px-4 font-medium py-2 w-full h-10 bg-gray-600">
                  John Doe
                </h2>
                <div className="flex items-center gap-2 text-md mt-2">
                  <input
                    title="Name"
                    type="checkbox"
                    name=""
                    id=""
                    className="h-4 w-4 border"
                  />
                  Kid?
                </div>
              </div>
              <div className="flex flex-col text-gray-400 gap-2">
                Language
                <select
                  title="Language"
                  name=""
                  id=""
                  className="text-white w-40 py-2 px-4 
            bg-transparent border border-solid border-zinc-600 focus:outline-none"
                >
                  <option value="" className="text-black">
                    English
                  </option>
                  <option value="" className="text-black">
                    Other
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex my-6 gap-6 text-white w-full">
            <button
              onClick={handleSave}
              className="bg-white text-black font-medium px-6 py-2 rounded border-2 border-opacity-25 border-gray-400 tracking-widest hover:bg-neutral-200 transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="text-gray-400 border-2 font-light text-base border-opacity-25 border-gray-400 tracking-widest px-6 py-2 rounded hover:border-white hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onReset}
              className="bg-gray-600 text-white font-light px-6 py-2 rounded border-2 border-opacity-25 border-gray-400 tracking-widest hover:bg-gray-500 transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
