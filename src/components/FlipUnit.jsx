import { AnimatePresence, motion } from "framer-motion";

export default function FlipUnit({ value, accent }) {
  return (
    <div className="perspective-clock relative h-20 w-[5.4rem] shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/35 shadow-glass sm:h-32 sm:w-40 md:h-40 md:w-52 xl:h-52 xl:w-72">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.11] via-transparent to-black/35" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-black/60" />
      <div className="absolute left-0 right-0 top-[calc(50%-1px)] h-px bg-white/10" />
      <div
        className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full sm:h-2.5 sm:w-2.5"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full sm:h-2.5 sm:w-2.5"
        style={{ backgroundColor: accent }}
      />

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={value}
          initial={{ rotateX: -78, opacity: 0.35, filter: "brightness(1.45)" }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 78, opacity: 0 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="backface-hidden absolute inset-0 flex origin-center items-center justify-center"
        >
          <span className="select-none font-mono text-[2.7rem] font-black leading-none tracking-normal text-white drop-shadow-2xl sm:text-[5rem] md:text-[6.35rem] xl:text-[8.7rem]">
            {value}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
