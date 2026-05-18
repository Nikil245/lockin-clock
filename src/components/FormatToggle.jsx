import { Clock3 } from "lucide-react";

export default function FormatToggle({ is24Hour, onToggle, accent }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.075] px-3 text-sm font-semibold text-white/82 backdrop-blur-xl transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
      aria-pressed={is24Hour}
      aria-label={`Switch to ${is24Hour ? "12-hour" : "24-hour"} time`}
      title="Toggle time format"
    >
      <Clock3 size={17} style={{ color: accent }} />
      <span>{is24Hour ? "24H" : "12H"}</span>
    </button>
  );
}
