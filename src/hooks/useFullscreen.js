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
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Fullscreen can be blocked unless triggered by a trusted user gesture.
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // Keep the UI state intact even if the browser rejects the request.
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await exitFullscreen();
      return;
    }

    await enterFullscreen();
  }, [enterFullscreen, exitFullscreen]);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
}
