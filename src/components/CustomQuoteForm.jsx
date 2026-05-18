import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const maxQuoteLength = 160;

export default function CustomQuoteForm({
  isOpen,
  categories,
  selectedCategory,
  onClose,
  onAddQuote,
  accent,
}) {
  const [category, setCategory] = useState(selectedCategory);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCategory(selectedCategory);
      setText("");
      setError("");
    }
  }, [isOpen, selectedCategory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onAddQuote(category, text);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setText("");
    setError("");
    onClose();
  };

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
            aria-label="Close add quote"
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 26, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 26, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-lg border bg-zinc-950/82 shadow-glass backdrop-blur-2xl"
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
                  <Plus size={19} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Add Quote</h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                    Custom rotation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white/76 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close add quote"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/46">
                  Category
                </span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-11 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-sm font-semibold text-white outline-none backdrop-blur-xl focus:ring-2 focus:ring-white/25"
                >
                  {Object.entries(categories).map(([key, theme]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white">
                      {theme.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/46">
                  <span>Quote</span>
                  <span>{text.length} / {maxQuoteLength}</span>
                </span>
                <textarea
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value.slice(0, maxQuoteLength));
                    setError("");
                  }}
                  rows={4}
                  placeholder="Write a quote that keeps you locked in."
                  className="w-full resize-none rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-base font-semibold leading-relaxed text-white outline-none placeholder:text-white/28 focus:ring-2 focus:ring-white/25"
                />
              </label>

              {error && (
                <p className="rounded-lg border border-red-300/20 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-100">
                  {error}
                </p>
              )}

              <button
                type="submit"
                aria-label="Add custom quote"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-black text-zinc-950 shadow-glow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/35"
                style={{ backgroundColor: accent }}
              >
                <Plus size={18} />
                Add Quote
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
