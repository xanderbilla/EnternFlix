"use client";

import Button from "@/components/Button/Button";
import Toggle from "@/components/Toggle/Toggle";
import SettingRow from "@/components/UI/SettingRow";
import Card from "@/components/UI/Card";

export default function SecurityTab() {
  return (
    <div className="text-white space-y-8">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      {/* Password Section */}
      <Card title="Password & Authentication" contentClassName="space-y-4">
        <SettingRow
          label="Current Password"
          description="Last changed 3 months ago"
          action={<Button variant="primary">Change Password</Button>}
          hasBorder
        />

        <SettingRow
          label="Two-Factor Authentication"
          description="Add an extra layer of security"
          action={<Toggle />}
          hasBorder
        />

        <SettingRow
          label="Login Notifications"
          description="Get notified of new sign-ins"
          action={<Toggle defaultChecked />}
          hasBorder={false}
        />
      </Card>

      {/* Privacy Section */}
      <Card title="Privacy Settings" contentClassName="space-y-4">
        <SettingRow
          label="Profile Visibility"
          description="Control who can see your profile"
          action={
            <select
              className="bg-zinc-700 text-white px-3 py-1 rounded border border-zinc-600 focus:outline-none focus:border-red-500"
              aria-label="Profile Visibility"
            >
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
              <option value="public">Public</option>
            </select>
          }
          hasBorder
        />

        <SettingRow
          label="Activity Tracking"
          description="Allow tracking for personalized recommendations"
          action={<Toggle defaultChecked ariaLabel="Activity Tracking" />}
          hasBorder
        />

        <SettingRow
          label="Data Collection"
          description="Share usage data to improve service"
          action={<Toggle ariaLabel="Data Collection" />}
          hasBorder={false}
        />
      </Card>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6 text-red-400">Danger Zone</h3>
        <div className="space-y-4">
          <SettingRow
            label="Delete Account"
            description="Permanently delete your account and all data"
            action={<Button variant="danger">Delete Account</Button>}
            hasBorder
            className="border-red-800/50"
          />

          <SettingRow
            label="Export Data"
            description="Download a copy of your account data"
            action={<Button variant="secondary">Export Data</Button>}
            hasBorder={false}
          />
        </div>
      </div>
    </div>
  );
}
