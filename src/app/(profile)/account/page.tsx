"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AccountForm from "./components/AccountForm";
import Notifications from "./components/Notifications";
import Subscriptions from "./components/Subscriptions";
import Devices from "./components/Devices";

const Page = () => {
  const [isKid, setIsKid] = useState(false);
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("user@email.com");
  const [activeSidebar, setActiveSidebar] = useState("account");

  const onReset = () => {
    setEmail("user@email.com");
    setLanguage("English");
    setIsKid(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-900">
      {/* Logo */}
      <Link href="/" className="absolute h-16 md:h-24 top-6 lg:left-6 lg:top-6">
        <Image
          className="rounded-sm"
          src="/logo.png"
          alt="Logo"
          height={70}
          width={80}
        />
      </Link>
      {/* Main Content */}
      <div className="w-[350px] lg:w-[900px] md:w-[700px] sm:w-[600px] h-[70vh]">
        <h1 className="text-white text-4xl md:text-5xl lg:text-5xl tracking-wide mb-2">
          Account Settings
        </h1>
        <div className="flex py-6 flex-col md:flex-row lg:flex-row gap-x-12 text-white min-h-full w-full border-b-2 border-neutral-800">
          <Sidebar
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
          />
          <div className="flex flex-col flex-[4] w-full gap-6">
            {/* Back button for non-account tabs */}
            {activeSidebar !== "account" && (
              <button
                className="flex items-center gap-2 bg-white text-black font-medium px-3 py-1 text-sm rounded border border-opacity-25 border-gray-400 tracking-widest hover:bg-neutral-200 transition-colors duration-200 w-fit mb-2"
                onClick={() => setActiveSidebar("account")}
              >
                <span className="text-lg">&#8592;</span> Back
              </button>
            )}
            {/* Main content based on activeSidebar */}
            {activeSidebar === "notifications" && <Notifications />}
            {activeSidebar === "subscriptions" && <Subscriptions />}
            {activeSidebar === "devices" && <Devices />}
            {activeSidebar === "account" && (
              <AccountForm
                name={name}
                email={email}
                language={language}
                isKid={isKid}
                setLanguage={setLanguage}
                setIsKid={setIsKid}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
