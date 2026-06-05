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
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#090815]/58 px-4 pb-4 backdrop-blur-[3px] sm:items-center sm:py-8"
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
            className="relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.35] bg-[rgba(20,10,35,0.35)] shadow-glass backdrop-blur-[4px]"
            style={{
              WebkitBackdropFilter: "blur(4px) saturate(120%)",
              boxShadow: `0 24px 70px rgba(0, 0, 0, 0.32), 0 0 34px ${accent}18`,
            }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:pt-8">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.1]"
                  style={{ color: accent }}
                >
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white sm:text-3xl">
                    Focus Insights
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                    Daily progress
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.1] text-white/78 transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close stats"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[66vh] overflow-y-auto px-5 pb-5 sm:px-8 sm:pb-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
