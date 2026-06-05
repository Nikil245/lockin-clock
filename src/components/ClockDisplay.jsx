import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { useClock } from "../hooks/useClock.js";

const AnimatedClockPart = memo(function AnimatedClockPart({ value }) {
  return (
    <span className="inline-flex min-w-[2ch] justify-center align-baseline bg-transparent shadow-none">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={value}
          initial={{ y: 8, opacity: 0.55 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-block bg-transparent shadow-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

export default function ClockDisplay({ is24Hour, accent, isLockedIn = false }) {
  const time = useClock(is24Hour);
  const displayTime = `${time.hours}:${time.minutes}:${time.seconds}`;

  return (
    <section
      className={`modern-clock-display flex w-full flex-col items-center text-center ${
        isLockedIn ? "max-w-6xl gap-4" : "max-w-5xl gap-3 sm:gap-4"
      }`}
    >
      <time
        dateTime={displayTime}
        className={`timer-display select-none font-display font-black leading-none tracking-normal text-white ${
          isLockedIn
            ? "text-[clamp(4rem,16vw,12rem)]"
            : "text-[clamp(3.45rem,10.4vw,8.25rem)]"
        }`}
        style={{
          textShadow: `0 0 34px ${accent}44, 0 16px 68px rgba(0, 0, 0, 0.5)`,
        }}
        aria-live="polite"
        aria-label={displayTime}
      >
        <AnimatedClockPart value={time.hours} />
        <span aria-hidden="true">:</span>
        <AnimatedClockPart value={time.minutes} />
        <span aria-hidden="true">:</span>
        <AnimatedClockPart value={time.seconds} />
      </time>

      <div
        className={`timer-meta flex min-h-6 flex-wrap items-center justify-center gap-2 font-semibold uppercase tracking-[0.18em] text-white/74 ${
          isLockedIn ? "text-xs sm:text-sm" : "text-[0.7rem] sm:text-sm"
        }`}
      >
        <span>{isLockedIn ? time.compactDate : time.date}</span>
        <span className="h-1 w-1 rounded-full bg-white/45" />
        <span>{is24Hour ? "24H" : time.meridiem}</span>
      </div>
    </section>
  );
}
