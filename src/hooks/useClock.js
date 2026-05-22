import { useEffect, useMemo, useState } from "react";

const pad = (value) => String(value).padStart(2, "0");

export function useClock(is24Hour) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const rawHours = now.getHours();
    const meridiem = rawHours >= 12 ? "PM" : "AM";
    const displayHours = is24Hour
      ? rawHours
      : rawHours % 12 === 0
        ? 12
        : rawHours % 12;

    return {
      hours: pad(displayHours),
      minutes: pad(now.getMinutes()),
      seconds: pad(now.getSeconds()),
      meridiem,
      compactDate: `${now.toLocaleDateString(undefined, {
        weekday: "long",
      })} ${now.toLocaleDateString(undefined, {
        day: "numeric",
      })} ${now.toLocaleDateString(undefined, {
        month: "short",
      })}`,
      date: now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    };
  }, [is24Hour, now]);
}
