import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  CalendarCheck,
  Flame,
  Layers3,
  Target,
  Timer,
  Trophy,
  X,
} from "lucide-react";
import StatCard from "./StatCard.jsx";

export default function StatsPanel({
  isOpen,
  onClose,
  stats,
  streak,
  mostUsedMood,
  accent,
}) {
  const statCards = [
    {
      icon: Target,
      label: "Today Sessions",
      value: stats.todaySessions,
    },
    {
      icon: Timer,
      label: "Today Focus",
      value: `${stats.todayFocusMinutes}m`,
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${streak.currentStreak}d`,
    },
    {
      icon: Trophy,
      label: "Best Streak",
      value: `${streak.bestStreak}d`,
    },
    {
      icon: CalendarCheck,
      label: "Total Sessions",
      value: stats.totalSessions,
    },
    {
      icon: Layers3,
      label: "Top Mood",
      value: mostUsedMood,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-4 pb-4 backdrop-blur-sm sm:items-center sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
            aria-label="Close stats"
          />
          <motion.section
            initial={{ y: 26, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 26, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative max-h-[84vh] w-full max-w-3xl overflow-hidden rounded-lg border bg-zinc-950/82 shadow-glass backdrop-blur-2xl"
            style={{
              borderColor: `${accent}8a`,
              boxShadow: `0 26px 80px rgba(0, 0, 0, 0.58), 0 0 42px ${accent}22`,
            }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/20"
                  style={{ color: accent }}
                >
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Focus Stats</h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                    Daily progress
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white/76 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close stats"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[66vh] overflow-y-auto p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card) => (
                  <StatCard
                    key={card.label}
                    icon={card.icon}
                    label={card.label}
                    value={card.value}
                    accent={accent}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
