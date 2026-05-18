import { useEffect } from "react";

const isTypingTarget = (target) => {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
};

export function useKeyboardShortcuts({
  enabled = true,
  isPomodoroMode,
  onToggleLockMode,
  onToggleFullscreen,
  onToggleTimeFormat,
  onPomodoroStartPause,
  onPomodoroReset,
}) {
  useEffect(() => {
    if (!enabled) return undefined;

    const handleKeyDown = (event) => {
      if (event.repeat || isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();

      if (key === "l") {
        event.preventDefault();
        onToggleLockMode();
        return;
      }

      if (key === "f") {
        event.preventDefault();
        onToggleFullscreen();
        return;
      }

      if (key === "t") {
        event.preventDefault();
        onToggleTimeFormat();
        return;
      }

      if (event.code === "Space" && isPomodoroMode) {
        event.preventDefault();
        onPomodoroStartPause();
        return;
      }

      if (key === "r" && isPomodoroMode) {
        event.preventDefault();
        onPomodoroReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    enabled,
    isPomodoroMode,
    onPomodoroReset,
    onPomodoroStartPause,
    onToggleFullscreen,
    onToggleLockMode,
    onToggleTimeFormat,
  ]);
}
