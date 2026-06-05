import { motion } from "framer-motion";
import { ChevronDown, Layers3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CategoryDropdown from "./CategoryDropdown.jsx";

export default function CategorySelector({
  categories,
  selectedCategory,
  onChange,
  accent,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedTheme = categories[selectedCategory];

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleSelect = (category) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <motion.button
        type="button"
        whileHover={{ scale: 1.015, filter: "brightness(1.12)" }}
        whileTap={{ scale: 0.985 }}
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-10 max-w-[12.25rem] shrink-0 items-center gap-2 rounded-full border bg-white/[0.1] px-3 text-sm text-white/88 shadow-glow backdrop-blur-md transition focus:outline-none focus:ring-2 focus:ring-white/30 sm:max-w-none sm:min-w-52"
        style={{
          borderColor: isOpen ? `${accent}a8` : "rgba(255, 255, 255, 0.12)",
          boxShadow: isOpen ? `0 0 28px ${accent}22` : undefined,
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Choose motivation category"
        title="Choose motivation category"
      >
        <Layers3 size={17} className="shrink-0" style={{ color: accent }} />
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{
            backgroundColor: selectedTheme?.accent ?? accent,
            boxShadow: `0 0 14px ${selectedTheme?.accent ?? accent}`,
          }}
        />
        <span className="max-w-[8.5rem] truncate font-semibold sm:max-w-[12rem]">
          {selectedTheme?.label ?? "Study Motivation"}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="ml-auto shrink-0"
        >
          <ChevronDown size={17} style={{ color: accent }} />
        </motion.span>
      </motion.button>

      <CategoryDropdown
        isOpen={isOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleSelect}
        accent={accent}
      />
    </div>
  );
}
