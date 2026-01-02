import { motion, useSpring, useTransform } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// Story 3.3: Scroll progress bar component
const ScrollProgressBar = () => {
  const { progress, isScrolling } = useScrollProgress();

  // Smooth spring animation for the progress
  const springProgress = useSpring(progress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
  });

  // Transform to scaleX
  const scaleX = useTransform(springProgress, [0, 100], [0, 1]);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #8dc75e 0%, #a8e063 50%, #8dc75e 100%)",
          boxShadow: "0 0 10px rgba(141, 199, 94, 0.5)",
        }}
      />

      {/* Glow effect when scrolling */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[59] origin-left pointer-events-none"
        style={{ scaleX }}
        animate={{
          boxShadow: isScrolling
            ? "0 0 20px rgba(141, 199, 94, 0.8), 0 0 40px rgba(141, 199, 94, 0.4)"
            : "0 0 10px rgba(141, 199, 94, 0.3)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Progress indicator tooltip (optional - shows percentage) */}
      {progress > 5 && progress < 95 && (
        <motion.div
          className="fixed top-3 z-[60] code-text text-xs bg-brutal-black/90 border border-matrix-green/30 px-2 py-1"
          style={{
            left: `${Math.min(progress, 95)}%`,
            transform: "translateX(-50%)",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isScrolling ? 1 : 0, y: isScrolling ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgressBar;
