import { AnimatePresence, motion } from "framer-motion";
import { Bell, Coffee, Flame, TimerReset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const nextSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(nextSeconds).padStart(2, "0")}`;
};

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

  const finishFocusSession = ({ shouldTrack = true, trackedMinutes = cleanSettings.focus } = {}) => {
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
      className={`flex w-full max-w-5xl flex-col items-center ${
        isLockedIn ? "mobile-lockin-pomodoro gap-3 sm:gap-4 md:gap-6" : "gap-6"
      }`}
    >
      <motion.div
        key={pulse}
        initial={{ boxShadow: `0 0 0px ${accent}00` }}
        animate={{ boxShadow: [`0 0 0px ${accent}00`, `0 0 54px ${accent}55`, `0 0 0px ${accent}00`] }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className={`mobile-landscape-pomodoro-card relative w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.075] shadow-glass backdrop-blur-xl ${
          isLockedIn
            ? "mobile-lockin-pomodoro-card max-w-2xl px-4 py-4 sm:px-5 sm:py-5 md:max-w-3xl md:px-8 md:py-8"
            : "max-w-3xl px-5 py-6 sm:px-8 sm:py-8"
        }`}
      >
        <div
          className="absolute inset-x-0 top-0 h-px opacity-80"
          style={{ backgroundColor: accent }}
        />

        <div
          className={`mobile-landscape-pomodoro-header flex flex-wrap items-center justify-between gap-3 ${
            isLockedIn ? "mobile-lockin-pomodoro-header mb-3 sm:mb-4 md:mb-6" : "mb-6"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center rounded-lg border border-white/10 bg-black/20 ${
                isLockedIn ? "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11" : "h-11 w-11"
              }`}
              style={{ color: accent }}
            >
              <SessionIcon size={21} />
            </div>
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/45 sm:text-[0.68rem]">
                Pomodoro Mode
              </p>
              <h2 className="text-lg font-black text-white sm:text-xl md:text-2xl">
                {SESSION_LABELS[safeSessionType]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs font-semibold text-white/72 sm:px-3 sm:py-2 sm:text-sm">
            <Bell size={16} style={{ color: accent }} />
            <span>{isRunning ? "Running" : hasStarted ? "Paused" : "Ready"}</span>
          </div>
        </div>

        <div
          className={`mobile-landscape-pomodoro-body flex flex-col items-center ${
            isLockedIn ? "mobile-lockin-pomodoro-body gap-3 sm:gap-4 md:gap-5" : "gap-5"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${safeSessionType}-${formatTime(remainingSeconds)}`}
              initial={{ y: 12, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -12, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`mobile-landscape-pomodoro-timer font-mono font-black leading-none tracking-normal text-white drop-shadow-2xl ${
                isLockedIn
                  ? "mobile-lockin-pomodoro-timer text-[3.5rem] sm:text-[4.75rem] md:text-[8.5rem]"
                  : "text-[4.5rem] sm:text-[7rem] md:text-[8.5rem]"
              }`}
            >
              {formatTime(remainingSeconds)}
            </motion.div>
          </AnimatePresence>

          <div className="h-2 w-full overflow-hidden rounded-full bg-black/35">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>

          {!isLockedIn && (
            <PomodoroControls
              isRunning={isRunning}
              hasStarted={hasStarted}
              onStart={startOrPauseSession}
              onPause={() => setIsRunning(false)}
              onReset={resetSession}
              onSkip={skipSession}
              accent={accent}
            />
          )}
        </div>
      </motion.div>

      {!isLockedIn && (
      <div className="grid w-full max-w-3xl gap-3 text-center sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.065] px-4 py-3 backdrop-blur-xl">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/42">
            Today
          </p>
          <p className="text-2xl font-black text-white">{completedToday}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.065] px-4 py-3 backdrop-blur-xl">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/42">
            Next
          </p>
          <p className="text-lg font-black text-white">{upcomingSession}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.065] px-4 py-3 backdrop-blur-xl">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/42">
            Cycle
          </p>
          <p className="text-lg font-black text-white">{cycleCount} / 4</p>
        </div>
      </div>
      )}
    </section>
  );
}
