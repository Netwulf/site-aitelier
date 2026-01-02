import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface VisualBreatherProps {
  image: string;
  height?: string;
  overlay?: "light" | "dark" | "gradient";
}

const VisualBreather = ({
  image,
  height = "50vh",
  overlay = "gradient"
}: VisualBreatherProps) => {
  const { ref, isInView } = useInViewOptimized({ once: true, threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const overlayStyles = {
    light: "bg-gradient-to-b from-brutal-black/30 via-transparent to-brutal-black/30",
    dark: "bg-gradient-to-b from-brutal-black via-brutal-black/60 to-brutal-black",
    gradient: "bg-gradient-to-b from-brutal-black via-transparent to-brutal-black"
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{ height }}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={
          isInView && !prefersReducedMotion
            ? { scale: 1, opacity: 1 }
            : { scale: 1.1, opacity: 0 }
        }
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.1] brightness-[0.85]"
        />
        <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />
        <div className="absolute inset-0 bg-matrix-green/3 mix-blend-screen" />
      </motion.div>

      {/* Scanlines texture */}
      <div className="scanlines absolute inset-0 opacity-20" />
    </section>
  );
};

export default VisualBreather;
