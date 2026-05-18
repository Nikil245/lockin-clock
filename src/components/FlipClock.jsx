import ClockSeparator from "./ClockSeparator.jsx";
import FlipUnit from "./FlipUnit.jsx";
import { useClock } from "../hooks/useClock.js";

function UnitLabel({ children }) {
  return (
    <span className="w-[5.4rem] shrink-0 text-center text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/52 sm:w-40 sm:text-xs md:w-52 xl:w-72">
      {children}
    </span>
  );
}

export default function FlipClock({ is24Hour, accent }) {
  const time = useClock(is24Hour);

  return (
    <section className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-5">
          <FlipUnit value={time.hours} accent={accent} />
          <ClockSeparator accent={accent} />
          <FlipUnit value={time.minutes} accent={accent} />
          <ClockSeparator accent={accent} />
          <FlipUnit value={time.seconds} accent={accent} />
        </div>

        <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-5">
          <UnitLabel>Hours</UnitLabel>
          <div className="w-3 shrink-0 sm:w-6 md:w-8 xl:w-10" />
          <UnitLabel>Minutes</UnitLabel>
          <div className="w-3 shrink-0 sm:w-6 md:w-8 xl:w-10" />
          <UnitLabel>Seconds</UnitLabel>
        </div>
      </div>

      <div className="flex min-h-8 items-center gap-3 text-sm font-medium text-white/64 sm:text-base">
        <span>{time.date}</span>
        {!is24Hour && (
          <>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span style={{ color: accent }}>{time.meridiem}</span>
          </>
        )}
      </div>
    </section>
  );
}
