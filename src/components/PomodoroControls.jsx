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
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onReset}
        aria-label="Reset Pomodoro session"
        title="Reset"
        className="pomodoro-glass-lite flex h-10 w-10 items-center justify-center rounded-full text-white/82 transition hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-white/30 sm:h-11 sm:w-11"
      >
        <RotateCcw size={18} style={{ color: accent }} />
      </button>

      <button
        type="button"
        onClick={primaryAction.onClick}
        aria-label={primaryAction.label}
        title={primaryAction.label}
        className="pomodoro-glass-lite flex h-14 w-14 items-center justify-center rounded-full text-white shadow-none transition hover:scale-[1.03] hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-white/40 sm:h-[3.75rem] sm:w-[3.75rem]"
      >
        <PrimaryIcon size={25} fill={isRunning ? "none" : "currentColor"} />
      </button>

      <button
        type="button"
        onClick={onSkip}
        aria-label="Skip Pomodoro session"
        title="Skip"
        className="pomodoro-glass-lite flex h-10 w-10 items-center justify-center rounded-full text-white/82 transition hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-white/30 sm:h-11 sm:w-11"
      >
        <SkipForward size={18} style={{ color: accent }} />
      </button>
    </div>
  );
}
