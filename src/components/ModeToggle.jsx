import { Clock3, Timer } from "lucide-react";

const modes = [
  { key: "clock", label: "Clock Mode", icon: Clock3 },
  { key: "pomodoro", label: "Pomodoro Mode", icon: Timer },
];

export default function ModeToggle({ mode, onChange, accent }) {
  return (
    <div className="flex rounded-lg border border-white/10 bg-white/[0.065] p-1 shadow-glow backdrop-blur-xl">
      {modes.map(({ key, label, icon: Icon }) => {
        const isActive = mode === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-label={`Switch to ${label}`}
            className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-bold text-white/58 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25 sm:h-9 sm:px-3 sm:text-sm"
            style={{
              backgroundColor: isActive ? `${accent}1f` : "transparent",
              color: isActive ? "#ffffff" : undefined,
              boxShadow: isActive ? `inset 0 0 0 1px ${accent}80` : undefined,
            }}
            aria-pressed={isActive}
          >
            <Icon size={15} style={{ color: isActive ? accent : undefined }} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
