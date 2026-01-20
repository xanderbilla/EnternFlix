"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Toggle from "@/components/Toggle/Toggle";

interface OverviewTabProps {
  name: string;
  email: string;
}

export default function OverviewTab({ name, email }: OverviewTabProps) {
  const [language, setLanguage] = useState("English");
  const [isKid, setIsKid] = useState(false);

  return (
    <div className="text-white space-y-8">
      {/* Account Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Account Overview</h2>

        {/* Profile Card */}
        <div className="bg-zinc-800/50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <Image
              className="rounded-lg w-20 h-20 object-cover"
              src="/img/default-blue.png"
              alt="Profile Avatar"
              width={80}
              height={80}
            />
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-zinc-400">{email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Account Information</h3>
        <div className="bg-zinc-800/50 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-700 last:border-b-0">
            <div>
              <div className="font-medium">Email Address</div>
              <div className="text-zinc-400 text-sm">{email}</div>
            </div>
            <Button variant="primary">Change</Button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-zinc-700 last:border-b-0">
            <div>
              <div className="font-medium">Password</div>
              <div className="text-zinc-400 text-sm">
                Last changed 3 months ago
              </div>
            </div>
            <Button variant="primary">Change</Button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-zinc-700 last:border-b-0">
            <div>
              <div className="font-medium">Language</div>
              <div className="text-zinc-400 text-sm">{language}</div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-zinc-700 text-white px-3 py-1 rounded border border-zinc-600 focus:outline-none focus:border-red-500"
              aria-label="Language Selection"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium">Parental Controls</div>
              <div className="text-zinc-400 text-sm">
                Manage content restrictions
              </div>
            </div>
            <Toggle checked={isKid} onChange={(checked) => setIsKid(checked)} />
          </div>
        </div>
      </div>
    </div>
  );
}
