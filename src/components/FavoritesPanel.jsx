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
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#090815]/58 px-4 pb-4 backdrop-blur-[3px] sm:items-center sm:py-8"
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
            className="relative max-h-[84vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.35] bg-[rgba(20,10,35,0.35)] shadow-glass backdrop-blur-[4px]"
            style={{
              WebkitBackdropFilter: "blur(4px) saturate(120%)",
              boxShadow: `0 30px 90px rgba(0, 0, 0, 0.5), 0 0 46px ${accent}20`,
            }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:pt-8">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.1]"
                  style={{ color: accent }}
                >
                  <Heart size={19} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white sm:text-3xl">
                    Saved Inspirations
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                    Saved quotes
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.1] text-white/78 transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close favorites"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[62vh] overflow-y-auto px-5 pb-5 sm:px-8 sm:pb-8">
              {favorites.length === 0 ? (
                <div
                  className="quote-glass-card quote-glass-card-compact px-5 py-10 text-center"
                  style={{
                    background: "rgba(20, 10, 35, 0.28)",
                    backdropFilter: "blur(4px) saturate(120%)",
                    WebkitBackdropFilter: "blur(4px) saturate(120%)",
                  }}
                >
                  <p className="text-base font-semibold text-white/76">
                    No favorite quotes yet. Save one that hits hard.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {favorites.map((favorite) => (
                    <article
                      key={favorite.id}
                      className="quote-glass-card quote-glass-card-compact p-5"
                      style={{
                        background: "rgba(20, 10, 35, 0.28)",
                        backdropFilter: "blur(4px) saturate(120%)",
                        WebkitBackdropFilter: "blur(4px) saturate(120%)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-white/54">
                            {favorite.categoryLabel}
                          </p>
                          <p className="text-base italic leading-relaxed text-white sm:text-lg">
                            {favorite.text}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(favorite.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/66 transition hover:bg-white/[0.16] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
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
