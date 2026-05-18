import { useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { getLocalDateKey, useStreak } from "./useStreak.js";

const defaultFocusStats = {
  date: getLocalDateKey(),
  todaySessions: 0,
  todayFocusMinutes: 0,
  totalSessions: 0,
};

const sanitizeFocusStats = (value) => {
  const today = getLocalDateKey();

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      ...defaultFocusStats,
      date: today,
    };
  }

  const sanitized = {
    date: typeof value.date === "string" ? value.date : today,
    todaySessions: Math.max(0, Number(value.todaySessions) || 0),
    todayFocusMinutes: Math.max(0, Number(value.todayFocusMinutes) || 0),
    totalSessions: Math.max(0, Number(value.totalSessions) || 0),
  };

  if (sanitized.date !== today) {
    return {
      ...sanitized,
      date: today,
      todaySessions: 0,
      todayFocusMinutes: 0,
    };
  }

  return sanitized;
};

const sanitizeMoodUsage = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.entries(value).reduce((nextUsage, [category, count]) => {
    const safeCount = Math.max(0, Number(count) || 0);
    if (safeCount > 0) {
      nextUsage[category] = safeCount;
    }
    return nextUsage;
  }, {});
};

export function useFocusStats(themes) {
  const [storedFocusStats, setStoredFocusStats] = useLocalStorage(
    "lockin-focus-stats",
    defaultFocusStats,
  );
  const [storedMoodUsage, setStoredMoodUsage] = useLocalStorage(
    "lockin-mood-usage",
    {},
  );
  const { streakData, markActiveToday } = useStreak();

  const focusStats = useMemo(
    () => sanitizeFocusStats(storedFocusStats),
    [storedFocusStats],
  );
  const moodUsage = useMemo(
    () => sanitizeMoodUsage(storedMoodUsage),
    [storedMoodUsage],
  );
  const mostUsedMood = useMemo(() => {
    const [topCategory] =
      Object.entries(moodUsage).sort((a, b) => b[1] - a[1])[0] ?? [];

    if (!topCategory) return "Not enough data";
    return themes[topCategory]?.label ?? topCategory;
  }, [moodUsage, themes]);

  useEffect(() => {
    const syncToday = () => {
      setStoredFocusStats((currentValue) => sanitizeFocusStats(currentValue));
    };

    syncToday();
    const timer = window.setInterval(syncToday, 60000);

    return () => window.clearInterval(timer);
  }, [setStoredFocusStats]);

  const recordFocusSession = useCallback((minutes = 25) => {
    const focusMinutes = Math.max(1, Math.round(Number(minutes) || 25));

    setStoredFocusStats((currentValue) => {
      const current = sanitizeFocusStats(currentValue);

      return {
        date: getLocalDateKey(),
        todaySessions: current.todaySessions + 1,
        todayFocusMinutes: current.todayFocusMinutes + focusMinutes,
        totalSessions: current.totalSessions + 1,
      };
    });
    markActiveToday();
  }, [markActiveToday, setStoredFocusStats]);

  const recordMoodUsage = useCallback((category) => {
    if (!themes[category]) return;

    setStoredMoodUsage((currentValue) => {
      const current = sanitizeMoodUsage(currentValue);
      return {
        ...current,
        [category]: (current[category] ?? 0) + 1,
      };
    });
  }, [setStoredMoodUsage, themes]);

  return {
    focusStats,
    streakData,
    moodUsage,
    mostUsedMood,
    recordFocusSession,
    recordMoodUsage,
  };
}
