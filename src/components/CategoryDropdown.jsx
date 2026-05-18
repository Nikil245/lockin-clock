import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export default function CategoryDropdown({
  isOpen,
  categories,
  selectedCategory,
  onSelect,
  accent,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -8, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -8, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 top-[calc(100%+0.6rem)] z-50 w-[calc(100vw-2rem)] max-w-[22rem] overflow-hidden rounded-lg border bg-zinc-950/82 p-1.5 shadow-glass backdrop-blur-2xl sm:left-auto sm:right-0 sm:w-80"
          style={{
            borderColor: `${accent}8a`,
            boxShadow: `0 24px 70px rgba(0, 0, 0, 0.55), 0 0 34px ${accent}26`,
          }}
        >
          <div className="max-h-80 overflow-y-auto pr-1">
            {Object.entries(categories).map(([key, theme]) => {
              const isSelected = selectedCategory === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelect(key)}
                  aria-label={`Select ${theme.label}`}
                  className="group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-white/78 transition hover:bg-white/[0.09] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  style={{
                    backgroundColor: isSelected ? `${theme.accent}18` : undefined,
                    color: isSelected ? "#ffffff" : undefined,
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full transition group-hover:scale-125"
                    style={{
                      backgroundColor: theme.accent,
                      boxShadow: `0 0 16px ${theme.accent}9a`,
                    }}
                  />
                  <span className="min-w-0 flex-1 truncate font-medium">
                    {theme.label}
                  </span>
                  {isSelected && (
                    <Check size={16} className="shrink-0" style={{ color: accent }} />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
