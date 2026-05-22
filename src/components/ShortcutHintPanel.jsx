import { AnimatePresence, motion } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { useState } from "react";

const shortcuts = [
  ["L", "Lock-in Mode"],
  ["F", "Fullscreen"],
  ["T", "12/24 Time"],
  ["Space", "Start/Pause Pomodoro"],
  ["R", "Reset Pomodoro"],
];

export default function ShortcutHintPanel({ accent, isLockedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  if (isLockedIn) {
    return null;
  }

  return (
    <div className="shortcut-ui fixed bottom-4 left-4 z-50 hidden lg:block">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Open keyboard shortcuts"
        className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-black/25 px-3 text-xs font-bold text-white/70 shadow-glow backdrop-blur-xl transition hover:bg-white/[0.09] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25"
      >
        <Keyboard size={16} style={{ color: accent }} />
        Shortcuts
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-12 left-0 w-72 rounded-lg border bg-zinc-950/82 p-3 shadow-glass backdrop-blur-2xl"
            style={{ borderColor: `${accent}70` }}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/48">
                Shortcuts
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/58 hover:bg-white/[0.08] hover:text-white"
                aria-label="Close shortcuts"
              >
                <X size={15} />
              </button>
            </div>
            <div className="space-y-1.5">
              {shortcuts.map(([key, label]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 rounded-md bg-white/[0.045] px-2.5 py-2 text-xs text-white/68"
                >
                  <span>{label}</span>
                  <kbd
                    className="rounded border border-white/10 bg-black/30 px-2 py-0.5 font-bold"
                    style={{ color: accent }}
                  >
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
