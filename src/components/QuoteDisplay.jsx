import { AnimatePresence, motion } from "framer-motion";
import { Heart, Plus, Quote } from "lucide-react";
import FavoriteButton from "./FavoriteButton.jsx";

export default function QuoteDisplay({
  quote,
  accent,
  category,
  isFavorite,
  onToggleFavorite,
  onOpenFavorites,
  onOpenAddQuote,
  isLockedIn = false,
}) {
  return (
    <section className={`w-full ${isLockedIn ? "mobile-lockin-quote max-w-3xl md:max-w-4xl" : "max-w-4xl"}`}>
      <div
        className={`mobile-landscape-quote-card relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.075] shadow-glass backdrop-blur-xl ${
          isLockedIn
            ? "mobile-lockin-quote-card px-3 py-3 sm:px-5 sm:py-4 md:px-8 md:py-7"
            : "px-5 py-5 sm:px-8 sm:py-7"
        }`}
      >
        <div
          className="absolute inset-x-0 top-0 h-px opacity-80"
          style={{ backgroundColor: accent }}
        />
        <div className="flex items-start gap-2.5 sm:gap-4">
          <div
            className={`mobile-landscape-quote-icon mt-1 flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/20 ${
              isLockedIn ? "h-8 w-8 sm:h-10 sm:w-10" : "h-10 w-10"
            }`}
            style={{ color: accent }}
          >
            <Quote size={isLockedIn ? 17 : 20} />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={`mobile-landscape-quote-category flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/48 ${
                isLockedIn ? "mobile-lockin-quote-category mb-1.5 sm:mb-2.5" : "mb-3"
              }`}
            >
              <span>{category}</span>
            </div>
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={quote}
                initial={{ y: 12, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -12, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`mobile-landscape-quote-text text-balance font-semibold text-white ${
                  isLockedIn
                    ? "mobile-lockin-quote-text min-h-0 text-base leading-snug sm:text-xl sm:leading-relaxed md:min-h-16 md:text-2xl"
                    : "min-h-16 text-xl leading-relaxed sm:text-2xl"
                }`}
              >
                {quote}
              </motion.p>
            </AnimatePresence>

            {!isLockedIn && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenFavorites}
                  aria-label="Open favorite quotes"
                  className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 text-sm font-bold text-white/76 transition hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <Heart size={17} style={{ color: accent }} />
                  Favorites
                </button>
                <button
                  type="button"
                  onClick={onOpenAddQuote}
                  aria-label="Add a custom quote"
                  className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 text-sm font-bold text-white/76 transition hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <Plus size={17} style={{ color: accent }} />
                  Add Quote
                </button>
              </div>
            )}
          </div>

          {!isLockedIn && (
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={onToggleFavorite}
              accent={accent}
            />
          )}
        </div>
      </div>
    </section>
  );
}
