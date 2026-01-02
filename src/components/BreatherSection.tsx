import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import breatherImage from "@/assets/generated/breather-forest.png";

const BreatherSection = () => {
  const { ref, isInView } = useInViewOptimized({ once: true, threshold: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative h-[40vh] md:h-[50vh] overflow-hidden"
    >
      {/* Full-width atmospheric image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={
          isInView && !prefersReducedMotion
            ? { scale: 1, opacity: 1 }
            : { scale: 1.1, opacity: 0 }
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={breatherImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.1] brightness-[0.9]"
        />
        {/* Gradient overlays for smooth transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-brutal-black via-transparent to-brutal-black" />
        {/* Green accent overlay */}
        <div className="absolute inset-0 bg-matrix-green/3 mix-blend-screen" />
      </motion.div>

      {/* Scanlines for texture */}
      <div className="scanlines absolute inset-0 opacity-30" />
    </section>
  );
};

export default BreatherSection;
