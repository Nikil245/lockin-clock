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
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#090815]/58 px-4 pb-4 backdrop-blur-[3px] sm:items-center sm:py-8"
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
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/14 bg-[#252839]/76 shadow-glass backdrop-blur-md"
            style={{
              boxShadow: `0 30px 90px rgba(0, 0, 0, 0.5), 0 0 46px ${accent}20`,
            }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.1]"
                  style={{ color: accent }}
                >
                  <Plus size={19} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Add Quote</h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                    Custom rotation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.1] text-white/78 transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close add quote"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 px-5 pb-5">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/54">
                  Category
                </span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-white/12 bg-[#151b2d]/78 px-3 text-sm font-semibold text-white outline-none backdrop-blur-md focus:ring-2 focus:ring-white/25"
                >
                  {Object.entries(categories).map(([key, theme]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white">
                      {theme.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/54">
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
                  className="w-full resize-none rounded-2xl border border-white/12 bg-[#151b2d]/78 px-3 py-3 text-base font-semibold leading-relaxed text-white outline-none placeholder:text-white/32 focus:ring-2 focus:ring-white/25"
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
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-black text-zinc-950 shadow-glow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/35"
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
