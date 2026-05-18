import { useEffect, useMemo, useState } from "react";

export function useQuoteRotator(categoryKey, quoteMap, intervalMs = 12000) {
  const categoryQuotes = useMemo(
    () => quoteMap[categoryKey] ?? [],
    [categoryKey, quoteMap],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [categoryKey]);

  useEffect(() => {
    setIndex((current) => {
      if (categoryQuotes.length === 0) return 0;
      return Math.min(current, categoryQuotes.length - 1);
    });
  }, [categoryQuotes.length]);

  useEffect(() => {
    if (categoryQuotes.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % categoryQuotes.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [categoryQuotes.length, intervalMs]);

  const safeIndex =
    categoryQuotes.length === 0 ? 0 : Math.min(index, categoryQuotes.length - 1);

  return {
    quote: categoryQuotes[safeIndex] ?? "",
  };
}
