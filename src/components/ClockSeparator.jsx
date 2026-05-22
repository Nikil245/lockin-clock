import { motion } from "framer-motion";

export default function ClockSeparator({ accent }) {
  const dotStyle = {
    backgroundColor: accent,
    boxShadow: `0 0 18px ${accent}, 0 0 38px ${accent}66`,
  };

  return (
    <div
      className="mobile-landscape-clock-separator flex h-20 w-3 shrink-0 flex-col items-center justify-center gap-3 sm:h-32 sm:w-6 sm:gap-4 md:h-40 md:w-8 xl:h-52 xl:w-10"
      aria-hidden="true"
    >
      {[0, 1].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.58, 1, 0.58], scale: [0.92, 1, 0.92] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: dot * 0.12,
            ease: "easeInOut",
          }}
          className="h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3"
          style={dotStyle}
        />
      ))}
    </div>
  );
}
