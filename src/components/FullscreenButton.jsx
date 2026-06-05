import { Maximize2, Minimize2 } from "lucide-react";
import { useFullscreen } from "../hooks/useFullscreen.js";

export default function FullscreenButton({ accent, onFullscreenUnavailable }) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const Icon = isFullscreen ? Minimize2 : Maximize2;

  const handleToggleFullscreen = async () => {
    const wasFullscreen = isFullscreen;
    const fullscreenChanged = await toggleFullscreen();

    if (!wasFullscreen && !fullscreenChanged) {
      onFullscreenUnavailable?.();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleFullscreen}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.1] text-white/82 backdrop-blur-md transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      <Icon size={18} style={{ color: accent }} />
    </button>
  );
}
