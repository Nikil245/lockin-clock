import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

export default function PomodoroControls({
  isRunning,
  hasStarted,
  onStart,
  onPause,
  onReset,
  onSkip,
  accent,
}) {
  const primaryAction = isRunning
    ? { label: "Pause", icon: Pause, onClick: onPause }
    : { label: hasStarted ? "Resume" : "Start", icon: Play, onClick: onStart };
  const PrimaryIcon = primaryAction.icon;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={primaryAction.onClick}
        aria-label={primaryAction.label}
        className="flex h-11 min-w-28 items-center justify-center gap-2 rounded-lg px-4 text-sm font-black text-zinc-950 shadow-glow transition hover:scale-[1.02] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/35"
        style={{ backgroundColor: accent }}
      >
        <PrimaryIcon size={18} />
        {primaryAction.label}
      </button>

      <button
        type="button"
        onClick={onReset}
        aria-label="Reset Pomodoro session"
        className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.075] px-4 text-sm font-bold text-white/82 backdrop-blur-xl transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <RotateCcw size={17} style={{ color: accent }} />
        Reset
      </button>

      <button
        type="button"
        onClick={onSkip}
        aria-label="Skip Pomodoro session"
        className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.075] px-4 text-sm font-bold text-white/82 backdrop-blur-xl transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <SkipForward size={17} style={{ color: accent }} />
        Skip
      </button>
    </div>
  );
}
