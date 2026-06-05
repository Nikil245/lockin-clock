import { Lock, Unlock } from "lucide-react";

export default function LockInToggle({ isLockedIn, onToggle, accent, compact = false }) {
  const Icon = isLockedIn ? Unlock : Lock;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.1] px-4 text-sm font-bold text-white/86 backdrop-blur-md transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{
        borderColor: isLockedIn ? `${accent}9a` : "rgba(255, 255, 255, 0.12)",
        boxShadow: isLockedIn ? `0 0 30px ${accent}32` : undefined,
      }}
      aria-pressed={isLockedIn}
      aria-label={isLockedIn ? "Exit Lock-in Mode" : "Enter Lock-in Mode"}
      title={isLockedIn ? "Exit Lock-in Mode" : "Enter Lock-in Mode"}
    >
      <Icon size={17} style={{ color: accent }} />
      {!compact && <span>{isLockedIn ? "Exit Lock-in" : "Lock In"}</span>}
    </button>
  );
}
