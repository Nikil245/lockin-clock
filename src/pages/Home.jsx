import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import CustomQuoteForm from "../components/CustomQuoteForm.jsx";
import FavoritesPanel from "../components/FavoritesPanel.jsx";
import FlipClock from "../components/FlipClock.jsx";
import LockInToggle from "../components/LockInToggle.jsx";
import Navbar from "../components/Navbar.jsx";
import PomodoroTimer from "../components/PomodoroTimer.jsx";
import QuoteDisplay from "../components/QuoteDisplay.jsx";
import ShortcutHintPanel from "../components/ShortcutHintPanel.jsx";
import StatsPanel from "../components/StatsPanel.jsx";
import { quotes } from "../data/quotes.js";
import { defaultThemeKey, themes } from "../data/themes.js";
import { useFocusStats } from "../hooks/useFocusStats.js";
import { useFullscreen } from "../hooks/useFullscreen.js";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useQuoteRotator } from "../hooks/useQuoteRotator.js";

const normalizeText = (text) => text.trim().replace(/\s+/g, " ");

const sanitizeFavorites = (value) => {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (favorite) =>
      favorite &&
      typeof favorite.id === "string" &&
      typeof favorite.text === "string" &&
      typeof favorite.category === "string" &&
      typeof favorite.categoryLabel === "string" &&
      typeof favorite.createdAt === "string",
  );
};

const sanitizeCustomQuotes = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.entries(value).reduce((nextValue, [category, entries]) => {
    if (!Array.isArray(entries)) return nextValue;

    const validEntries = entries.filter(
      (entry) =>
        entry &&
        typeof entry.id === "string" &&
        typeof entry.text === "string" &&
        typeof entry.createdAt === "string",
    );

    if (validEntries.length > 0) {
      nextValue[category] = validEntries;
    }

    return nextValue;
  }, {});
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    "lockin-category",
    defaultThemeKey,
  );
  const [is24Hour, setIs24Hour] = useLocalStorage("lockin-24-hour", false);
  const [selectedMode, setSelectedMode] = useLocalStorage("lockin-mode", "clock");
  const [isLockedIn, setIsLockedIn] = useLocalStorage("lockin-lock-mode", false);
  const [favoriteQuotes, setFavoriteQuotes] = useLocalStorage(
    "lockin-favorite-quotes",
    [],
  );
  const [customQuotes, setCustomQuotes] = useLocalStorage(
    "lockin-custom-quotes",
    {},
  );
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [pomodoroCommand, setPomodoroCommand] = useState(null);
  const { enterFullscreen, exitFullscreen, toggleFullscreen } = useFullscreen();
  const {
    focusStats,
    streakData,
    mostUsedMood,
    recordFocusSession,
    recordMoodUsage,
  } = useFocusStats(themes);

  const safeCategory = themes[selectedCategory] ? selectedCategory : defaultThemeKey;
  const safeMode = selectedMode === "pomodoro" ? "pomodoro" : "clock";
  const safeLockedIn = Boolean(isLockedIn);
  const theme = themes[safeCategory];
  const safeFavorites = useMemo(
    () => sanitizeFavorites(favoriteQuotes),
    [favoriteQuotes],
  );
  const safeCustomQuotes = useMemo(
    () => sanitizeCustomQuotes(customQuotes),
    [customQuotes],
  );
  const mergedQuotes = useMemo(() => {
    return Object.keys(themes).reduce((nextQuotes, category) => {
      const defaultQuotes = quotes[category] ?? [];
      const customCategoryQuotes = safeCustomQuotes[category] ?? [];
      nextQuotes[category] = [
        ...defaultQuotes,
        ...customCategoryQuotes.map((entry) => entry.text),
      ];
      return nextQuotes;
    }, {});
  }, [safeCustomQuotes]);
  const { quote } = useQuoteRotator(safeCategory, mergedQuotes);
  const isCurrentQuoteFavorite = safeFavorites.some(
    (favorite) =>
      favorite.category === safeCategory &&
      normalizeText(favorite.text) === normalizeText(quote),
  );

  const toggleFavorite = () => {
    const quoteText = normalizeText(quote);
    if (!quoteText) return;

    setFavoriteQuotes((currentFavorites) => {
      const sanitized = sanitizeFavorites(currentFavorites);
      const existing = sanitized.find(
        (favorite) =>
          favorite.category === safeCategory &&
          normalizeText(favorite.text) === quoteText,
      );

      if (existing) {
        return sanitized.filter((favorite) => favorite.id !== existing.id);
      }

      return [
        {
          id: `fav-${Date.now()}`,
          text: quoteText,
          category: safeCategory,
          categoryLabel: theme.label,
          createdAt: new Date().toISOString(),
        },
        ...sanitized,
      ];
    });
  };

  const removeFavorite = (favoriteId) => {
    setFavoriteQuotes((currentFavorites) =>
      sanitizeFavorites(currentFavorites).filter(
        (favorite) => favorite.id !== favoriteId,
      ),
    );
  };

  const addCustomQuote = (category, rawText) => {
    const quoteText = normalizeText(rawText);
    const safeQuoteCategory = themes[category] ? category : safeCategory;

    if (!quoteText) {
      return { ok: false, message: "Write a quote before adding it." };
    }

    if (quoteText.length > 160) {
      return { ok: false, message: "Keep custom quotes under 160 characters." };
    }

    const categoryDefaults = quotes[safeQuoteCategory] ?? [];
    const categoryCustoms = safeCustomQuotes[safeQuoteCategory] ?? [];
    const duplicateExists = [
      ...categoryDefaults,
      ...categoryCustoms.map((entry) => entry.text),
    ].some(
      (existingQuote) =>
        normalizeText(existingQuote).toLowerCase() === quoteText.toLowerCase(),
    );

    if (duplicateExists) {
      return { ok: false, message: "That quote already exists in this category." };
    }

    setCustomQuotes((currentCustomQuotes) => {
      const sanitized = sanitizeCustomQuotes(currentCustomQuotes);
      const nextEntry = {
        id: `${safeQuoteCategory}-${Date.now()}`,
        text: quoteText,
        createdAt: new Date().toISOString(),
      };

      return {
        ...sanitized,
        [safeQuoteCategory]: [
          ...(sanitized[safeQuoteCategory] ?? []),
          nextEntry,
        ],
      };
    });

    return { ok: true };
  };

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      recordMoodUsage(category);
    },
    [recordMoodUsage, setSelectedCategory],
  );

  const toggleLockInMode = useCallback(() => {
    setIsFavoritesOpen(false);
    setIsAddQuoteOpen(false);
    setIsStatsOpen(false);

    setIsLockedIn((currentValue) => {
      const nextValue = !Boolean(currentValue);

      if (nextValue) {
        enterFullscreen();
      } else {
        exitFullscreen();
      }

      return nextValue;
    });
  }, [enterFullscreen, exitFullscreen, setIsLockedIn]);

  const toggleTimeFormat = useCallback(() => {
    setIs24Hour((value) => !value);
  }, [setIs24Hour]);

  const sendPomodoroCommand = useCallback((type) => {
    setPomodoroCommand({ type, id: Date.now() });
  }, []);
  const startPausePomodoro = useCallback(() => {
    sendPomodoroCommand("startPause");
  }, [sendPomodoroCommand]);
  const resetPomodoro = useCallback(() => {
    sendPomodoroCommand("reset");
  }, [sendPomodoroCommand]);

  useKeyboardShortcuts({
    isPomodoroMode: safeMode === "pomodoro",
    onToggleLockMode: toggleLockInMode,
    onToggleFullscreen: toggleFullscreen,
    onToggleTimeFormat: toggleTimeFormat,
    onPomodoroStartPause: startPausePomodoro,
    onPomodoroReset: resetPomodoro,
  });

  return (
    <main
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{ background: theme.gradient }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.62)_100%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-black"
        animate={{ opacity: safeLockedIn ? 0.28 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <AnimatePresence initial={false}>
          {!safeLockedIn && (
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <Navbar
                categories={themes}
                selectedCategory={safeCategory}
                onCategoryChange={handleCategoryChange}
                mode={safeMode}
                onModeChange={setSelectedMode}
                is24Hour={is24Hour}
                onFormatToggle={toggleTimeFormat}
                isLockedIn={safeLockedIn}
                onToggleLockIn={toggleLockInMode}
                onOpenStats={() => setIsStatsOpen(true)}
                accent={theme.accent}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {safeLockedIn && (
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              className="fixed right-4 top-4 z-50"
            >
              <LockInToggle
                isLockedIn={safeLockedIn}
                onToggle={toggleLockInMode}
                accent={theme.accent}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key={safeCategory}
          initial={{ opacity: 0.72 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex flex-1 flex-col items-center justify-center px-4 pb-8 sm:px-6 lg:px-8 ${
            safeLockedIn
              ? "gap-6 pt-16 sm:gap-8"
              : "gap-8 pt-2 sm:gap-10"
          }`}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={safeMode}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="flex w-full justify-center"
            >
              {safeMode === "clock" ? (
                <FlipClock is24Hour={is24Hour} accent={theme.accent} />
              ) : (
                <PomodoroTimer
                  accent={theme.accent}
                  isLockedIn={safeLockedIn}
                  keyboardCommand={pomodoroCommand}
                  onFocusSessionComplete={recordFocusSession}
                />
              )}
            </motion.div>
          </AnimatePresence>
          <QuoteDisplay
            quote={quote}
            accent={theme.accent}
            category={theme.label}
            isFavorite={isCurrentQuoteFavorite}
            onToggleFavorite={toggleFavorite}
            onOpenFavorites={() => setIsFavoritesOpen(true)}
            onOpenAddQuote={() => setIsAddQuoteOpen(true)}
            isLockedIn={safeLockedIn}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {!safeLockedIn && (
          <motion.footer
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-none fixed bottom-4 right-4 z-40 hidden rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-white/38 shadow-glow backdrop-blur-xl md:block"
          >
            LockIn Clock · Local-first focus studio
          </motion.footer>
        )}
      </AnimatePresence>

      <FavoritesPanel
        isOpen={isFavoritesOpen}
        favorites={safeFavorites}
        onClose={() => setIsFavoritesOpen(false)}
        onRemove={removeFavorite}
        accent={theme.accent}
      />
      <CustomQuoteForm
        isOpen={isAddQuoteOpen}
        categories={themes}
        selectedCategory={safeCategory}
        onClose={() => setIsAddQuoteOpen(false)}
        onAddQuote={addCustomQuote}
        accent={theme.accent}
      />
      <StatsPanel
        isOpen={isStatsOpen && !safeLockedIn}
        onClose={() => setIsStatsOpen(false)}
        stats={focusStats}
        streak={streakData}
        mostUsedMood={mostUsedMood}
        accent={theme.accent}
      />
      <ShortcutHintPanel accent={theme.accent} isLockedIn={safeLockedIn} />
    </main>
  );
}
