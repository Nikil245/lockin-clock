import { Clock3, Timer } from "lucide-react";

const modes = [
  { key: "clock", label: "Clock", icon: Clock3 },
  { key: "pomodoro", label: "Pomodoro", icon: Timer },
];

export default function ModeToggle({ mode, onChange, accent }) {
  return (
    <div className="flex rounded-full border border-white/12 bg-white/[0.1] p-1 shadow-glow backdrop-blur-md">
      {modes.map(({ key, label, icon: Icon }) => {
        const isActive = mode === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-label={`Switch to ${label}`}
            className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold text-white/64 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25 sm:h-9 sm:px-4 sm:text-sm"
            style={{
              backgroundColor: isActive ? `${accent}55` : "transparent",
              color: isActive ? "#ffffff" : undefined,
              boxShadow: isActive ? `0 0 22px ${accent}2f` : undefined,
            }}
            aria-pressed={isActive}
          >
            <Icon size={15} style={{ color: isActive ? "#ffffff" : undefined }} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
