import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Flame, TimerReset } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import PomodoroControls from "./PomodoroControls.jsx";

const SESSION_LABELS = {
  focus: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const SESSION_ICONS = {
  focus: Flame,
  shortBreak: Coffee,
  longBreak: TimerReset,
};

const defaultSettings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
};

const validSessionTypes = ["focus", "shortBreak", "longBreak"];

const todayKey = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const minutesToSeconds = (minutes) => Math.max(1, Number(minutes) || 1) * 60;

const getInitialRemainingSeconds = () => {
  if (typeof window === "undefined") {
    return minutesToSeconds(defaultSettings.focus);
  }

  try {
    const storedSession = JSON.parse(
      window.localStorage.getItem("lockin-pomodoro-session-type"),
    );
    const storedSettings = JSON.parse(
      window.localStorage.getItem("lockin-pomodoro-settings"),
    );
    const initialSession = validSessionTypes.includes(storedSession)
      ? storedSession
      : "focus";
    const initialSettings = {
      ...defaultSettings,
      ...(storedSettings && typeof storedSettings === "object"
        ? storedSettings
        : {}),
    };

    return minutesToSeconds(initialSettings[initialSession]);
  } catch {
    return minutesToSeconds(defaultSettings.focus);
  }
};

const getTimeParts = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const nextSeconds = seconds % 60;
  return {
    minutes: String(minutes),
    seconds: String(nextSeconds).padStart(2, "0"),
  };
};

const AnimatedPomodoroPart = memo(function AnimatedPomodoroPart({ value }) {
  return (
    <span className="inline-flex w-auto align-baseline bg-transparent shadow-none">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="inline-flex w-auto bg-transparent shadow-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

export default function PomodoroTimer({
  accent,
  isLockedIn = false,
  keyboardCommand = null,
  onFocusSessionComplete,
}) {
  const [settings] = useLocalStorage("lockin-pomodoro-settings", defaultSettings);
  const [dailyProgress, setDailyProgress] = useLocalStorage(
    "lockin-pomodoro-daily",
    { date: todayKey(), count: 0 },
  );
  const [sessionType, setSessionType] = useLocalStorage(
    "lockin-pomodoro-session-type",
    "focus",
  );
  const [completedFocusSessions, setCompletedFocusSessions] = useLocalStorage(
    "lockin-pomodoro-cycle-count",
    0,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    getInitialRemainingSeconds,
  );
  const [pulse, setPulse] = useState(0);

  const cleanSettings = {
    focus: settings?.focus ?? defaultSettings.focus,
    shortBreak: settings?.shortBreak ?? defaultSettings.shortBreak,
    longBreak: settings?.longBreak ?? defaultSettings.longBreak,
  };
  const safeSessionType = validSessionTypes.includes(sessionType)
    ? sessionType
    : "focus";
  const cycleCount = Math.min(
    4,
    Math.max(0, Number(completedFocusSessions) || 0),
  );
  const currentDuration = minutesToSeconds(cleanSettings[safeSessionType]);
  const completedToday =
    dailyProgress?.date === todayKey() ? Number(dailyProgress.count) || 0 : 0;
  const progress = Math.min(
    100,
    Math.max(0, ((currentDuration - remainingSeconds) / currentDuration) * 100),
  );
  const hasStarted = hasActiveSession || remainingSeconds < currentDuration;
  const SessionIcon = SESSION_ICONS[safeSessionType];
  const ringRadius = 52;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progress / 100) * ringCircumference;
  const timeParts = getTimeParts(remainingSeconds);

  useEffect(() => {
    const key = todayKey();
    if (dailyProgress?.date !== key) {
      setDailyProgress({ date: key, count: 0 });
      setCompletedFocusSessions(0);
    }
  }, [dailyProgress?.date, setCompletedFocusSessions, setDailyProgress]);

  const switchSession = (nextSession) => {
    setSessionType(nextSession);
    setRemainingSeconds(minutesToSeconds(cleanSettings[nextSession]));
    setIsRunning(false);
    setHasActiveSession(false);
  };

  const notifySessionEnd = () => {
    setPulse((value) => value + 1);
  };

  const finishFocusSession = ({
    shouldTrack = true,
    trackedMinutes = cleanSettings.focus,
  } = {}) => {
    const nextCycleCount = cycleCount + 1;

    if (shouldTrack) {
      const nextTodayCount = completedToday + 1;
      setDailyProgress({ date: todayKey(), count: nextTodayCount });
      onFocusSessionComplete?.(trackedMinutes);
    }

    if (nextCycleCount >= 4) {
      setCompletedFocusSessions(4);
      switchSession("longBreak");
      return;
    }

    setCompletedFocusSessions(nextCycleCount);
    switchSession("shortBreak");
  };

  const completeSession = () => {
    notifySessionEnd();

    if (safeSessionType === "focus") {
      finishFocusSession({
        shouldTrack: true,
        trackedMinutes: cleanSettings.focus,
      });
      return;
    }

    if (safeSessionType === "longBreak") {
      setCompletedFocusSessions(0);
      switchSession("focus");
      return;
    }

    switchSession("focus");
  };

  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          window.setTimeout(completeSession, 0);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [
    isRunning,
    safeSessionType,
    completedToday,
    cycleCount,
    cleanSettings.focus,
    onFocusSessionComplete,
  ]);

  const resetSession = () => {
    setIsRunning(false);
    setHasActiveSession(false);
    setRemainingSeconds(currentDuration);
  };

  const startOrPauseSession = () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }

    setHasActiveSession(true);
    setIsRunning(true);
  };

  const skipSession = () => {
    notifySessionEnd();

    if (safeSessionType === "focus") {
      const spentSeconds = currentDuration - remainingSeconds;
      const meaningfulSeconds = Math.min(60, Math.ceil(currentDuration * 0.25));

      finishFocusSession({
        shouldTrack: spentSeconds >= meaningfulSeconds,
        trackedMinutes: Math.max(1, Math.round(spentSeconds / 60)),
      });
      return;
    }

    if (safeSessionType === "longBreak") {
      setCompletedFocusSessions(0);
      switchSession("focus");
      return;
    }

    switchSession("focus");
  };

  const upcomingSession = useMemo(() => {
    if (safeSessionType !== "focus") return "Focus";
    return cycleCount + 1 >= 4 ? "Long Break" : "Short Break";
  }, [cycleCount, safeSessionType]);

  useEffect(() => {
    if (!keyboardCommand?.id) return;

    if (keyboardCommand.type === "startPause") {
      startOrPauseSession();
      return;
    }

    if (keyboardCommand.type === "reset") {
      resetSession();
    }
  }, [keyboardCommand?.id]);

  return (
    <section
      className={`flex w-full flex-col items-center ${
        isLockedIn
          ? "mobile-lockin-pomodoro max-w-6xl gap-4 sm:gap-5"
          : "max-w-5xl gap-4 sm:gap-5"
      }`}
    >
      {!isLockedIn && (
        <div className="pomodoro-glass-lite flex w-full max-w-[26rem] items-center justify-center rounded-full p-1.5">
          {validSessionTypes.map((type) => {
            const isSelected = safeSessionType === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() => switchSession(type)}
                className={`min-w-0 flex-1 rounded-full border border-transparent px-3 py-2 text-center text-[0.72rem] font-black uppercase tracking-[0.08em] text-white/68 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-xs ${
                  isSelected ? "pomodoro-glass-lite-active text-white" : ""
                }`}
                style={{
                  boxShadow: isSelected
                    ? `inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 18px ${accent}16`
                    : undefined,
                }}
                aria-pressed={isSelected}
              >
                {SESSION_LABELS[type]}
              </button>
            );
          })}
        </div>
      )}

      <motion.div
        key={pulse}
        initial={{ boxShadow: `0 0 0px ${accent}00` }}
        animate={{
          boxShadow: [
            `0 0 0px ${accent}00`,
            `0 0 62px ${accent}55`,
            `0 0 0px ${accent}00`,
          ],
        }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="mobile-landscape-pomodoro-card relative flex w-full flex-col items-center overflow-visible"
      >
        <div className="relative flex w-full flex-col items-center">
          <div
            className={`mobile-lockin-pomodoro-ring relative grid aspect-square place-items-center ${
              isLockedIn
                ? "w-[min(94vw,48rem)]"
                : "w-[min(80vw,21rem)] sm:w-[min(50vw,25rem)]"
            }`}
          >
            {!isLockedIn && (
              <svg
                className="absolute inset-0 h-full w-full -rotate-90 overflow-visible"
                viewBox="0 0 120 120"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="2.6"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  animate={{ strokeDashoffset: ringOffset }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                  style={{
                    filter: `drop-shadow(0 0 18px ${accent}66)`,
                  }}
                />
              </svg>
            )}

            <motion.div
              className={`absolute rounded-full bg-white/[0.035] ${
                isLockedIn
                  ? "inset-[14%] blur-2xl"
                  : "inset-[18%] border border-white/10 backdrop-blur-[2px]"
              }`}
              animate={{
                opacity: isRunning ? 0.74 : 0.48,
                scale: isRunning ? 1.03 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <div
                className={`pomodoro-glass-lite mb-3 flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.12em] text-white/76 ${
                  isLockedIn ? "sm:text-xs" : ""
                }`}
              >
                <SessionIcon size={15} style={{ color: accent }} />
                <span>{SESSION_LABELS[safeSessionType]}</span>
              </div>

              <div
                className={`mobile-landscape-pomodoro-timer timer-display font-display font-black leading-none tracking-normal text-white ${
                  isLockedIn
                    ? "mobile-lockin-pomodoro-timer text-[clamp(5rem,20vw,13.5rem)]"
                    : "text-[clamp(3.8rem,11.5vw,6.2rem)] sm:text-[clamp(4.7rem,7.4vw,6.6rem)]"
                }`}
                style={{
                  textShadow: `0 0 38px ${accent}44, 0 18px 70px rgba(0, 0, 0, 0.55)`,
                }}
                aria-live="polite"
                aria-label={`${timeParts.minutes}:${timeParts.seconds}`}
              >
                <AnimatedPomodoroPart value={timeParts.minutes} />
                <span aria-hidden="true">:</span>
                <AnimatedPomodoroPart value={timeParts.seconds} />
              </div>

              <p className="mt-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/76">
                {safeSessionType === "focus" ? "Focus Time" : "Break Time"}
              </p>
            </div>
          </div>

          {!isLockedIn && (
            <div className="pomodoro-glass-lite mt-3 rounded-full p-1.5 sm:mt-5">
              <PomodoroControls
                isRunning={isRunning}
                hasStarted={hasStarted}
                onStart={startOrPauseSession}
                onPause={() => setIsRunning(false)}
                onReset={resetSession}
                onSkip={skipSession}
                accent={accent}
              />
            </div>
          )}

          {!isLockedIn && (
            <div className="mt-4 grid w-full max-w-3xl gap-3 text-center sm:mt-5 sm:grid-cols-3">
              <div className="pomodoro-glass-lite rounded-full px-4 py-3">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/48">
                  Today
                </p>
                <p className="text-2xl font-black text-white">{completedToday}</p>
              </div>
              <div className="pomodoro-glass-lite rounded-full px-4 py-3">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/48">
                  Next
                </p>
                <p className="text-lg font-black text-white">{upcomingSession}</p>
              </div>
              <div className="pomodoro-glass-lite rounded-full px-4 py-3">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/48">
                  Cycle
                </p>
                <p className="text-lg font-black text-white">{cycleCount} / 4</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
