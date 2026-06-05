import { AnimatePresence, motion } from "framer-motion";
import { Library, Plus, Quote } from "lucide-react";
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
    <section
      className={`w-full ${
        isLockedIn ? "mobile-lockin-quote max-w-2xl" : "max-w-3xl"
      }`}
    >
      <div
        className={`quote-glass-card mobile-landscape-quote-card relative overflow-hidden text-center ${
          isLockedIn
            ? "mobile-lockin-quote-card px-5 py-6 sm:px-8 sm:py-7"
            : "px-4 pb-5 pt-3 sm:px-7 sm:pb-6 sm:pt-4"
        }`}
      >
        <div className="relative z-10">
          <div
            className={`mobile-landscape-quote-category mb-5 flex flex-wrap items-center justify-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/72 ${
              isLockedIn ? "mobile-lockin-quote-category" : ""
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.1] px-3 py-1.5 backdrop-blur-md">
              <Quote size={14} style={{ color: accent }} />
              <span>{category}</span>
            </span>

            {!isLockedIn && (
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onOpenFavorites}
                  aria-label="Open favorite quotes"
                  title="Favorites"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.1] text-white/76 transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <Library size={16} style={{ color: accent }} />
                </button>
                <button
                  type="button"
                  onClick={onOpenAddQuote}
                  aria-label="Add a custom quote"
                  title="Add Quote"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.1] text-white/76 transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <Plus size={16} style={{ color: accent }} />
                </button>
                <FavoriteButton
                  isFavorite={isFavorite}
                  onToggle={onToggleFavorite}
                  accent={accent}
                />
              </div>
            )}
          </div>

          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={quote}
              initial={{ y: 12, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -12, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`mobile-landscape-quote-text mx-auto text-balance italic text-white ${
                isLockedIn
                  ? "mobile-lockin-quote-text max-w-xl text-[clamp(1rem,2vw,1.35rem)] font-semibold leading-relaxed"
                  : "min-h-12 max-w-2xl text-[clamp(1rem,2.2vw,1.35rem)] font-semibold leading-relaxed"
              }`}
              style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.34)" }}
            >
              "{quote}"
            </motion.p>
          </AnimatePresence>

          <div className="mt-5 flex justify-center gap-3">
            <span className="h-px w-9 bg-white/36" />
            <span className="h-px w-9 bg-white/18" />
          </div>
        </div>
      </div>
    </section>
  );
}
