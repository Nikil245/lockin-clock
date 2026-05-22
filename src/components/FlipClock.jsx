import { AnimatePresence, motion } from "framer-motion";
import ClockSeparator from "./ClockSeparator.jsx";
import FlipUnit from "./FlipUnit.jsx";
import { useClock } from "../hooks/useClock.js";

function UnitLabel({ children }) {
  return (
    <span className="mobile-landscape-unit-label w-[5.4rem] shrink-0 text-center text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/52 sm:w-40 sm:text-xs md:w-52 xl:w-72">
      {children}
    </span>
  );
}

function MobileLockInFlipCard({ label, value, accent, seconds }) {
  return (
    <div className="mobile-lockin-flip-card perspective-clock relative flex w-full max-w-[360px] flex-col overflow-hidden rounded-lg border border-white/10 bg-black/35 px-4 py-3 shadow-glass backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.11] via-transparent to-black/35" />
      <div
        className="absolute inset-x-0 top-0 h-px opacity-80"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-black/60" />
      <div className="absolute left-0 right-0 top-[calc(50%-1px)] h-px bg-white/10" />
      <div className="relative z-10 mb-1 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/48">
        {label}
      </div>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={value}
          initial={{ rotateX: -70, opacity: 0.35, filter: "brightness(1.35)" }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 70, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="backface-hidden relative z-10 flex flex-1 origin-center items-center justify-center"
        >
          <span className="mobile-lockin-flip-value select-none font-mono text-[4.9rem] font-black leading-none tracking-normal text-white drop-shadow-2xl">
            {value}
          </span>
        </motion.div>
      </AnimatePresence>
      {seconds && (
        <div
          className="absolute bottom-3 right-4 z-20 rounded-md border border-white/10 bg-black/35 px-2 py-1 font-mono text-lg font-black leading-none text-white/86"
          style={{ color: accent }}
          aria-label={`Seconds ${seconds}`}
        >
          {seconds}
        </div>
      )}
    </div>
  );
}

export default function FlipClock({ is24Hour, accent, isLockedIn = false }) {
  const time = useClock(is24Hour);

  return (
    <>
      {isLockedIn && (
        <section className="mobile-lockin-portrait-clock hidden w-full flex-col items-center gap-2">
          <MobileLockInFlipCard
            label="Hours"
            value={time.hours}
            accent={accent}
          />
          <MobileLockInFlipCard
            label="Minutes"
            value={time.minutes}
            seconds={time.seconds}
            accent={accent}
          />
          <div className="mobile-lockin-date-row flex min-h-5 flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/64">
            <span>{time.compactDate}</span>
            {!is24Hour && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span style={{ color: accent }}>{time.meridiem}</span>
              </>
            )}
          </div>
        </section>
      )}

      <section className={`mobile-landscape-flip-clock flex w-full flex-col items-center gap-2 sm:gap-3 md:gap-6 ${isLockedIn ? "mobile-lockin-standard-clock" : ""}`}>
      <div className="mobile-landscape-flip-inner flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
        <div className="mobile-landscape-flip-row flex items-center justify-center gap-1.5 sm:gap-4 md:gap-5">
          <FlipUnit value={time.hours} accent={accent} />
          <ClockSeparator accent={accent} />
          <FlipUnit value={time.minutes} accent={accent} />
          <div className="contents">
            <ClockSeparator accent={accent} />
            <FlipUnit value={time.seconds} accent={accent} />
          </div>
        </div>

        <div className="mobile-landscape-label-row flex items-center justify-center gap-1.5 sm:gap-4 md:gap-5">
          <UnitLabel>Hours</UnitLabel>
          <div className="mobile-landscape-label-spacer w-3 shrink-0 sm:w-6 md:w-8 xl:w-10" />
          <UnitLabel>Minutes</UnitLabel>
          <div className="contents">
            <div className="mobile-landscape-label-spacer w-3 shrink-0 sm:w-6 md:w-8 xl:w-10" />
            <UnitLabel>Seconds</UnitLabel>
          </div>
        </div>
      </div>

      <div className="mobile-landscape-date-row flex min-h-6 flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/64 sm:min-h-8 sm:gap-3 sm:text-base">
        <span>{time.date}</span>
        {!is24Hour && (
          <>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span style={{ color: accent }}>{time.meridiem}</span>
          </>
        )}
      </div>
    </section>
    </>
  );
}
