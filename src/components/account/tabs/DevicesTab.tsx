"use client";

import Button from "@/components/Button/Button";
import Toggle from "@/components/Toggle/Toggle";
import DeviceItem from "./DeviceItem";
import Card from "@/components/UI/Card";

export default function DevicesTab() {
  return (
    <div className="text-white space-y-8">
      <h2 className="text-2xl font-bold mb-6">Manage Devices</h2>

      {/* Current Session */}
      <Card title="Current Session">
        <DeviceItem
          type="desktop"
          name="Windows PC"
          browser="Chrome Browser"
          lastActive="Now"
          location="IP: 192.168.1.100 • Location: New York, US"
          isCurrent
        />
      </Card>

      {/* Other Devices */}
      <Card
        title="Other Devices"
        subtitle="3 devices"
        contentClassName="space-y-4"
      >
        <DeviceItem
          type="mobile"
          name="iPhone 14"
          browser="iOS App"
          lastActive="Yesterday at 8:30 PM"
          location="Location: New York, US"
        />
        <DeviceItem
          type="tablet"
          name="iPad Pro"
          browser="iOS App"
          lastActive="3 days ago"
          location="Location: New York, US"
        />
        <DeviceItem
          type="desktop"
          name="MacBook Pro"
          browser="Safari Browser"
          lastActive="1 week ago"
          location="Location: San Francisco, US"
        />
      </Card>

      {/* Device Settings */}
      <Card title="Device Settings" contentClassName="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-zinc-700">
          <div>
            <div className="font-medium">Maximum devices allowed</div>
            <div className="text-zinc-400 text-sm">
              Current limit for your account
            </div>
          </div>
          <span className="text-zinc-300 font-medium">5 devices</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-zinc-700">
          <div>
            <div className="font-medium">Auto sign-out inactive devices</div>
            <div className="text-zinc-400 text-sm">
              Sign out devices after 30 days of inactivity
            </div>
          </div>
          <Toggle defaultChecked />
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-medium">Device notifications</div>
            <div className="text-zinc-400 text-sm">
              Get notified when new devices sign in
            </div>
          </div>
          <Toggle defaultChecked />
        </div>
      </Card>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6 text-red-400">
          Device Management
        </h3>
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-medium text-red-300">Sign out all devices</div>
            <div className="text-red-400/70 text-sm">
              Sign out from all devices except this one
            </div>
          </div>
          <Button variant="danger">Sign Out All</Button>
        </div>
      </div>
    </div>
  );
}
