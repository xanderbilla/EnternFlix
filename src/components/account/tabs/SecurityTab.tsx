"use client";

import Button from "@/components/Button/Button";
import Toggle from "@/components/Toggle/Toggle";

export default function SecurityTab() {
  return (
    <div className="text-white space-y-8">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      {/* Password Section */}
      <div className="bg-zinc-800/50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Password & Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-700">
            <div>
              <div className="font-medium">Current Password</div>
              <div className="text-zinc-400 text-sm">
                Last changed 3 months ago
              </div>
            </div>
            <Button variant="primary">Change Password</Button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-zinc-700">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-zinc-400 text-sm">
                Add an extra layer of security
              </div>
            </div>
            <Toggle />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium">Login Notifications</div>
              <div className="text-zinc-400 text-sm">
                Get notified of new sign-ins
              </div>
            </div>
            <Toggle defaultChecked />
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-zinc-800/50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-700">
            <div>
              <div className="font-medium">Profile Visibility</div>
              <div className="text-zinc-400 text-sm">
                Control who can see your profile
              </div>
            </div>
            <select
              className="bg-zinc-700 text-white px-3 py-1 rounded border border-zinc-600 focus:outline-none focus:border-red-500"
              aria-label="Profile Visibility"
            >
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
              <option value="public">Public</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-zinc-700">
            <div>
              <div className="font-medium">Activity Tracking</div>
              <div className="text-zinc-400 text-sm">
                Allow tracking for personalized recommendations
              </div>
            </div>
            <Toggle defaultChecked ariaLabel="Activity Tracking" />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium">Data Collection</div>
              <div className="text-zinc-400 text-sm">
                Share usage data to improve service
              </div>
            </div>
            <Toggle ariaLabel="Data Collection" />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6 text-red-400">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-red-800/50">
            <div>
              <div className="font-medium text-red-300">Delete Account</div>
              <div className="text-red-400/70 text-sm">
                Permanently delete your account and all data
              </div>
            </div>
            <Button variant="danger">Delete Account</Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium text-red-300">Export Data</div>
              <div className="text-red-400/70 text-sm">
                Download a copy of your account data
              </div>
            </div>
            <Button variant="secondary">Export Data</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
