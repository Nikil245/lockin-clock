import { Maximize2, Minimize2 } from "lucide-react";
import { useFullscreen } from "../hooks/useFullscreen.js";

export default function FullscreenButton({ accent }) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const Icon = isFullscreen ? Minimize2 : Maximize2;

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.075] text-white/82 backdrop-blur-xl transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      <Icon size={18} style={{ color: accent }} />
    </button>
  );
}
