import { Lock, Unlock } from "lucide-react";

export default function LockInToggle({ isLockedIn, onToggle, accent, compact = false }) {
  const Icon = isLockedIn ? Unlock : Lock;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.075] px-3 text-sm font-bold text-white/82 backdrop-blur-xl transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{
        borderColor: isLockedIn ? `${accent}9a` : "rgba(255, 255, 255, 0.1)",
        boxShadow: isLockedIn ? `0 0 28px ${accent}24` : undefined,
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
