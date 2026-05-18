import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

export const getLocalDateKey = (date = new Date()) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const getPreviousDateKey = (dateKey) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);
  return getLocalDateKey(date);
};

const sanitizeStreakData = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      lastActiveDate: null,
    };
  }

  return {
    currentStreak: Math.max(0, Number(value.currentStreak) || 0),
    bestStreak: Math.max(0, Number(value.bestStreak) || 0),
    lastActiveDate:
      typeof value.lastActiveDate === "string" ? value.lastActiveDate : null,
  };
};

export function useStreak() {
  const [storedStreak, setStoredStreak] = useLocalStorage("lockin-streak-data", {
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
  });

  const streakData = useMemo(
    () => sanitizeStreakData(storedStreak),
    [storedStreak],
  );

  const markActiveToday = useCallback(() => {
    const today = getLocalDateKey();

    setStoredStreak((currentValue) => {
      const current = sanitizeStreakData(currentValue);

      if (current.lastActiveDate === today) {
        return current;
      }

      const nextCurrentStreak =
        current.lastActiveDate === getPreviousDateKey(today)
          ? current.currentStreak + 1
          : 1;

      return {
        currentStreak: nextCurrentStreak,
        bestStreak: Math.max(current.bestStreak, nextCurrentStreak),
        lastActiveDate: today,
      };
    });
  }, [setStoredStreak]);

  return {
    streakData,
    markActiveToday,
  };
}
