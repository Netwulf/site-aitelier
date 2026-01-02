import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import manifestoImage from "@/assets/generated/manifesto-contemplation.png";

const ManifestoSection = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-40 px-4 md:px-8 overflow-hidden bg-brutal-black">
      {/* Background */}
      <div className="organic-glow" style={{ top: "30%", left: "10%" }} />

      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-6xl relative z-10"
      >
        {/* Grid layout: Image + Text */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Side Image - Rotoscope style */}
          <motion.div
            variants={fadeInUpSimple}
            className="relative order-2 md:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={manifestoImage}
                alt="Momento de contemplação"
                className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.1] brightness-[0.95]"
              />
              {/* Green accent overlay */}
              <div className="absolute inset-0 bg-matrix-green/5 mix-blend-screen" />
              {/* Gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-r from-brutal-black/40 via-transparent to-transparent md:bg-gradient-to-l" />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-matrix-green/30 -z-10" />
          </motion.div>

          {/* Text Content */}
          <div className="order-1 md:order-2 space-y-8">
            {/* O Problema - direto ao ponto */}
            <motion.div variants={fadeInUpSimple}>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-brutal-white uppercase tracking-tight leading-tight">
                Você é mais do que consegue mostrar.
              </p>
            </motion.div>

            {/* Linha verde */}
            <motion.div variants={fadeInUpSimple}>
              <div className="w-24 h-px bg-matrix-green" />
            </motion.div>

            {/* A proposta - prática */}
            <motion.div variants={fadeInUpSimple}>
              <p className="text-lg md:text-xl text-brutal-white/80 leading-relaxed mb-6">
                A maioria das pessoas competentes <span className="text-matrix-green">vive abaixo da própria complexidade.</span>
                <br />
                Construíram expertise, mas não sabem se apresentar.
              </p>
              <p className="text-xl md:text-2xl text-brutal-white font-bold">
                Nós extraímos quem você é e transformamos em presença pública.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Subtle grid */}
      <div className="brutal-grid absolute inset-0 opacity-5" />
    </section>
  );
};

export default ManifestoSection;
