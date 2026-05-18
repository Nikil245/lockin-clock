import { Heart } from "lucide-react";

export default function FavoriteButton({ isFavorite, onToggle, accent }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-white/72 backdrop-blur-xl transition hover:scale-105 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{
        color: isFavorite ? accent : undefined,
        boxShadow: isFavorite ? `0 0 26px ${accent}26` : undefined,
      }}
      aria-label={isFavorite ? "Remove favorite quote" : "Save favorite quote"}
      title={isFavorite ? "Remove favorite" : "Save favorite"}
    >
      <Heart
        size={19}
        fill={isFavorite ? accent : "none"}
        strokeWidth={isFavorite ? 2.6 : 2}
      />
    </button>
  );
}
