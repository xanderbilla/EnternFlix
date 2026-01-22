import Button from "@/components/Button/Button";
import DeviceIcon from "./DeviceIcon";
import { DeviceItemProps } from "@/types/account";

export default function DeviceItem({
  type,
  name,
  browser,
  lastActive,
  location,
  isCurrent = false,
}: DeviceItemProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg ${
        isCurrent ? "bg-zinc-700/50" : "bg-zinc-700/30 border border-zinc-700"
      }`}
    >
      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
        <DeviceIcon type={type} />
      </div>
      <div className="flex-1">
        <div className={`font-medium ${isCurrent ? "text-lg" : ""}`}>
          {name}
        </div>
        <div className="text-zinc-400 text-sm">
          {browser} • Last active: {lastActive}
        </div>
        <div className="text-zinc-400 text-sm">{location}</div>
      </div>
      {!isCurrent && <Button variant="danger">Sign Out</Button>}
    </div>
  );
}
