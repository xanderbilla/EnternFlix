import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  activeSidebar: string;
  setActiveSidebar: (value: string) => void;
}

const Sidebar = ({ activeSidebar, setActiveSidebar }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className={`flex flex-1 justify-center w-full md:w-80 lg:w-96 lg:border-r-2 border-neutral-800 transition-all duration-300 ${
        isCollapsed ? "md:w-20" : "md:w-80 lg:w-96"
      }`}
    >
      <div className="relative flex flex-col items-center w-full">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full p-4 md:hidden">
          <Image
            className="rounded-sm w-16 h-16"
            src="/img/default-blue.png"
            alt="Default Profile"
            height={100}
            width={100}
          />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-zinc-700 rounded-full"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Profile Section */}
        <div className="hidden md:flex flex-col md:flex-row items-center gap-4 w-full p-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Image
              className="rounded-sm w-16 h-16 md:w-24 md:h-24"
              src="/img/default-blue.png"
              alt="Default Profile"
              height={100}
              width={100}
            />
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden text-white p-2 hover:bg-zinc-700 rounded-full"
            >
              {isCollapsed ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`hidden text-white text-lg font-medium ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Profile
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`w-full md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-2 p-4">
            <div
              className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
                activeSidebar === "notifications"
                  ? "bg-zinc-700 text-white"
                  : "hover:bg-zinc-700 text-white"
              }`}
              onClick={() => {
                setActiveSidebar("notifications");
                setIsMobileMenuOpen(false);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span>Notifications</span>
            </div>
            <div
              className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
                activeSidebar === "subscriptions"
                  ? "bg-zinc-700 text-white"
                  : "hover:bg-zinc-700 text-white"
              }`}
              onClick={() => {
                setActiveSidebar("subscriptions");
                setIsMobileMenuOpen(false);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>Subscriptions</span>
            </div>
            <Link
              href="/history"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
                activeSidebar === "history"
                  ? "bg-zinc-700 text-white"
                  : "hover:bg-zinc-700 text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>History</span>
            </Link>
            <div
              className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
                activeSidebar === "devices"
                  ? "bg-zinc-700 text-white"
                  : "hover:bg-zinc-700 text-white"
              }`}
              onClick={() => {
                setActiveSidebar("devices");
                setIsMobileMenuOpen(false);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Devices</span>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block w-full flex flex-col gap-2 mt-4 md:mt-8 border-t-2 py-4 border-neutral-800">
          <div
            className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
              activeSidebar === "notifications"
                ? "bg-zinc-700 text-white"
                : "hover:bg-zinc-700 text-white"
            }`}
            onClick={() => setActiveSidebar("notifications")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className={`${isCollapsed ? "hidden" : "block"}`}>
              Notifications
            </span>
          </div>
          <div
            className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
              activeSidebar === "subscriptions"
                ? "bg-zinc-700 text-white"
                : "hover:bg-zinc-700 text-white"
            }`}
            onClick={() => setActiveSidebar("subscriptions")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span className={`${isCollapsed ? "hidden" : "block"}`}>
              Subscriptions
            </span>
          </div>
          <Link
            href="/history"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
              activeSidebar === "history"
                ? "bg-zinc-700 text-white"
                : "hover:bg-zinc-700 text-white"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className={`${isCollapsed ? "hidden" : "block"}`}>
              History
            </span>
          </Link>
          <div
            className={`w-full px-4 py-2 text-base rounded cursor-pointer transition-colors flex items-center gap-3 ${
              activeSidebar === "devices"
                ? "bg-zinc-700 text-white"
                : "hover:bg-zinc-700 text-white"
            }`}
            onClick={() => setActiveSidebar("devices")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className={`${isCollapsed ? "hidden" : "block"}`}>
              Devices
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
