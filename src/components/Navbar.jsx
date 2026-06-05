import { BarChart3 } from "lucide-react";
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
  onFullscreenUnavailable,
  onOpenStats,
  accent,
}) {
  return (
    <header className="w-full border-b border-white/10 bg-[#46375c]/18 px-4 py-3 shadow-glow sm:px-6 lg:px-8">
      <nav className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex shrink-0 items-center">
          <h1 className="truncate text-2xl font-black tracking-normal text-white sm:text-3xl">
            LockIn Clock
          </h1>
        </div>

        <div className="flex min-w-0 basis-full flex-wrap items-center justify-start gap-2 sm:flex-1 sm:basis-auto sm:justify-end xl:flex-nowrap">
          <ModeToggle mode={mode} onChange={onModeChange} accent={accent} />
          <button
            type="button"
            onClick={onOpenStats}
            aria-label="Open focus stats"
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.1] px-4 text-sm font-bold text-white/82 backdrop-blur-md transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <BarChart3 size={17} style={{ color: accent }} />
            Stats
          </button>
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
          <FullscreenButton
            accent={accent}
            onFullscreenUnavailable={onFullscreenUnavailable}
          />
        </div>
      </nav>
    </header>
  );
}
