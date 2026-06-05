import { useCallback, useEffect, useState } from "react";

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(() =>
    typeof document === "undefined" ? false : Boolean(document.fullscreenElement),
  );

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    syncFullscreen();

    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const enterFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        return true;
      }

      const requestFullscreen = document.documentElement?.requestFullscreen;

      if (typeof requestFullscreen !== "function") {
        return false;
      }

      await requestFullscreen.call(document.documentElement);
      return Boolean(document.fullscreenElement);
    } catch {
      // Fullscreen can be blocked unless triggered by a trusted user gesture.
      return false;
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        return true;
      }

      if (typeof document.exitFullscreen !== "function") {
        return false;
      }

      await document.exitFullscreen();
      return !document.fullscreenElement;
    } catch {
      // Keep the UI state intact even if the browser rejects the request.
      return false;
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      return exitFullscreen();
    }

    return enterFullscreen();
  }, [enterFullscreen, exitFullscreen]);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
}
