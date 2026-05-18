import { AnimatePresence, motion } from "framer-motion";
import { Heart, Trash2, X } from "lucide-react";

export default function FavoritesPanel({
  isOpen,
  favorites,
  onClose,
  onRemove,
  accent,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-4 pb-4 backdrop-blur-sm sm:items-center sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
            aria-label="Close favorites"
          />
          <motion.section
            initial={{ y: 26, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 26, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative max-h-[82vh] w-full max-w-2xl overflow-hidden rounded-lg border bg-zinc-950/82 shadow-glass backdrop-blur-2xl"
            style={{
              borderColor: `${accent}8a`,
              boxShadow: `0 26px 80px rgba(0, 0, 0, 0.58), 0 0 42px ${accent}22`,
            }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/20"
                  style={{ color: accent }}
                >
                  <Heart size={19} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Favorites</h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                    Saved quotes
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white/76 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close favorites"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[62vh] overflow-y-auto p-4">
              {favorites.length === 0 ? (
                <div className="rounded-lg border border-white/10 bg-white/[0.055] px-5 py-8 text-center">
                  <p className="text-base font-semibold text-white/76">
                    No favorite quotes yet. Save one that hits hard.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((favorite) => (
                    <article
                      key={favorite.id}
                      className="rounded-lg border border-white/10 bg-white/[0.065] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-white/42">
                            {favorite.categoryLabel}
                          </p>
                          <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
                            {favorite.text}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(favorite.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-white/66 transition hover:bg-white/[0.1] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                          aria-label="Remove favorite quote"
                          title="Remove"
                        >
                          <Trash2 size={17} style={{ color: accent }} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
