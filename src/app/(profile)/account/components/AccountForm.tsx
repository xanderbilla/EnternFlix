import React, { useState } from "react";

interface AccountFormProps {
  name: string;
  email: string;
  language: string;
  isKid: boolean;
  setLanguage: (value: string) => void;
  setIsKid: (value: boolean) => void;
}

const AccountForm = ({
  name,
  email,
  language,
  isKid,
  setLanguage,
  setIsKid,
}: AccountFormProps) => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const handleSaveEmail = () => {
    setShowEmailInput(false);
  };

  const handleSavePassword = () => {
    setTempPassword("");
    setShowPasswordInput(false);
  };

  const handleCancelEmail = () => {
    setTempEmail(email);
    setShowEmailInput(false);
  };

  const handleCancelPassword = () => {
    setTempPassword("");
    setShowPasswordInput(false);
  };

  return (
    <div className="text-neutral-300 gap-4">
      <h2 className="text-md px-4 font-medium py-2 mb-6 w-full h-10 bg-gray-600">
        {name}
      </h2>
      <div className="flex flex-col gap-8 text-md mt-2 px-4">
        <div className="flex flex-col gap-4">
          {!showEmailInput && (
            <div className="flex items-center gap-4">
              <span className="text-zinc-400 w-28 inline-block">Email:</span>
              <span className="text-white">{email}</span>
              <button
                onClick={() => {
                  setTempEmail(email);
                  setShowEmailInput(true);
                  setShowPasswordInput(false);
                }}
                className="text-sm text-gray-400 border border-gray-400 border-opacity-25 tracking-widest px-4 py-1 rounded hover:border-white hover:text-white transition-colors duration-200"
              >
                Change
              </button>
            </div>
          )}
          {showEmailInput && (
            <div className="transition-all duration-300 ease-in-out">
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-zinc-500"
                  placeholder="Enter new email"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCancelEmail}
                  className="text-gray-400 border-2 font-light text-base border-opacity-25 border-gray-400 tracking-widest px-6 py-2 rounded hover:border-white hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEmail}
                  className="bg-white text-black font-medium px-6 py-2 rounded border-2 border-opacity-25 border-gray-400 tracking-widest hover:bg-neutral-200 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {!showPasswordInput && (
            <div className="flex items-center gap-4">
              <span className="text-zinc-400 w-28 inline-block">Password:</span>
              <span className="text-white">********</span>
              <button
                onClick={() => {
                  setShowPasswordInput(true);
                  setShowEmailInput(false);
                }}
                className="text-sm text-gray-400 border border-gray-400 border-opacity-25 tracking-widest px-4 py-1 rounded hover:border-white hover:text-white transition-colors duration-200"
              >
                Change
              </button>
            </div>
          )}
          {showPasswordInput && (
            <div className="transition-all duration-300 ease-in-out">
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-zinc-500"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCancelPassword}
                  className="text-gray-400 border-2 font-light text-base border-opacity-25 border-gray-400 tracking-widest px-6 py-2 rounded hover:border-white hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePassword}
                  className="bg-white text-black font-medium px-6 py-2 rounded border-2 border-opacity-25 border-gray-400 tracking-widest hover:bg-neutral-200 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-400 w-28 inline-block">Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-white w-40 py-2 px-4 bg-transparent border border-solid border-zinc-600 focus:outline-none"
            title="Language"
          >
            <option value="English" className="text-black">
              English
            </option>
            <option value="Other" className="text-black">
              Other
            </option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            title="Kid"
            type="checkbox"
            checked={isKid}
            onChange={() => setIsKid(!isKid)}
            className="h-4 w-4 border accent-red-500"
          />
          <span>Kid?</span>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
