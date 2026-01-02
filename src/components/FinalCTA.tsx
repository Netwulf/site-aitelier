import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FinalCTA = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="final-cta"
      className="py-32 md:py-48 bg-brutal-black relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background glow */}
      <div
        className="organic-glow"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.3,
        }}
      />

      <motion.div
        className="brutal-container max-w-4xl mx-auto px-4 relative z-10 text-center"
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={fadeInUpSimple}
      >
        {/* Simple statement */}
        <p className="poetic-text text-2xl md:text-3xl lg:text-4xl text-brutal-white/80 leading-relaxed mb-12">
          Vamos conversar sobre o que você ainda não disse.
        </p>

        {/* Email with matrix glow effect */}
        <a
          href="mailto:taypuri@aitelier.com.br"
          className="inline-block text-3xl md:text-5xl lg:text-6xl font-bold text-matrix-green hover:text-brutal-white transition-colors uppercase tracking-tighter"
        >
          taypuri@aitelier.com.br
        </a>

        {/* Subtle code decoration */}
        <div className="mt-16 code-text text-xs text-matrix-green/30">
          [READY_TO_CONNECT]
        </div>
      </motion.div>

      {/* Subtle grid */}
      <div className="brutal-grid absolute inset-0 opacity-3" />
    </section>
  );
};

export default FinalCTA;
