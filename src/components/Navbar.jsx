import { BarChart3, Sparkles } from "lucide-react";
import CategorySelector from "./CategorySelector.jsx";
import FormatToggle from "./FormatToggle.jsx";
import FullscreenButton from "./FullscreenButton.jsx";
import LockInToggle from "./LockInToggle.jsx";
import ModeToggle from "./ModeToggle.jsx";

export default function Navbar({
  categories,
  selectedCategory,
  onCategoryChange,
  mode,
  onModeChange,
  is24Hour,
  onFormatToggle,
  isLockedIn,
  onToggleLockIn,
  onOpenStats,
  accent,
}) {
  return (
    <header className="flex w-full flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <nav className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] shadow-glow backdrop-blur-xl"
            style={{ color: accent }}
          >
            <Sparkles size={19} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-normal text-white sm:text-xl">
              LockIn Clock
            </h1>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/42">
              Focus display
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ModeToggle mode={mode} onChange={onModeChange} accent={accent} />
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={onCategoryChange}
            accent={accent}
          />
          {mode === "clock" && (
            <FormatToggle
              is24Hour={is24Hour}
              onToggle={onFormatToggle}
              accent={accent}
            />
          )}
          <LockInToggle
            isLockedIn={isLockedIn}
            onToggle={onToggleLockIn}
            accent={accent}
          />
          <button
            type="button"
            onClick={onOpenStats}
            aria-label="Open focus stats"
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.075] px-3 text-sm font-bold text-white/82 backdrop-blur-xl transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <BarChart3 size={17} style={{ color: accent }} />
            Stats
          </button>
          <FullscreenButton accent={accent} />
        </div>
      </nav>
    </header>
  );
}
