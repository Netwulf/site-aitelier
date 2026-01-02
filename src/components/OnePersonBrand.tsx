import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { OptimizedImage } from "@/components/OptimizedImage";
import rootsImage from "@/assets/roots-creative.jpg";

const OnePersonBrand = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  const principles = [
    "Marca como fundação, não como marketing",
    "Identidade no centro, não produto",
    "Negócio que nasce da alma",
    "Sistema escalável mantendo essência"
  ];

  return (
    <section className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden bg-brutal-black">
      {/* Background image - roots/identity */}
      <div className="absolute inset-0 flex items-center justify-end">
        <OptimizedImage 
          src={rootsImage}
          alt="Raízes criativas e identidade ancestral"
          className="w-1/2 h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brutal-black via-brutal-black/60 to-brutal-black/80" />
      </div>
      
      {/* Background effects */}
      <div className="organic-glow" style={{ top: "30%", left: "70%" }} />
      <div className="mesh-gradient-1" />

      <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-6xl relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUpSimple} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="code-text text-sm text-matrix-green">CONCEITO</span>
            <div className="h-px bg-concrete-border flex-1" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-brutal-white leading-none">
            O QUE É UM
            <br />
            ONE PERSON BRAND?
          </h2>
        </motion.div>

        {/* Comparação visual side-by-side */}
        <motion.div variants={fadeInUpSimple} className="mb-24">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Personal Brand */}
            <div className="brutal-grid p-8 md:p-12 border border-concrete-border">
              <span className="code-text text-xs text-concrete mb-6 block">PERSONAL BRAND</span>
              <div className="space-y-4">
                <p className="text-2xl text-concrete">Presença</p>
                <p className="text-2xl text-concrete">Instagram bonito</p>
                <p className="text-2xl text-concrete">Marketing</p>
              </div>
            </div>

            {/* One Person Brand */}
            <div className="brutal-grid p-8 md:p-12 border-2 border-matrix-green bg-matrix-green/5">
              <span className="code-text text-xs text-matrix-green mb-6 block">ONE PERSON BRAND</span>
              <div className="space-y-4">
                <p className="text-2xl font-bold text-matrix-green">Infraestrutura</p>
                <p className="text-2xl font-bold text-matrix-green">Marca É o negócio</p>
                <p className="text-2xl font-bold text-matrix-green">Sistema</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 princípios - lista clean numerada */}
        <motion.div variants={fadeInUpSimple} className="mb-24">
          <div className="border-l-4 border-matrix-green pl-8 md:pl-12">
            <div className="space-y-6">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-6">
                  <span className="code-text text-sm text-matrix-green min-w-[40px]">
                    0{index + 1}
                  </span>
                  <p className="text-xl md:text-2xl text-brutal-white">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quote final poético */}
        <motion.div variants={fadeInUpSimple} className="text-center">
          <div className="h-px bg-matrix-green w-32 mx-auto mb-8" />
          <p className="text-3xl md:text-4xl text-brutal-white italic leading-relaxed">
            "Quando identidade se torna infraestrutura"
          </p>
          <div className="h-px bg-matrix-green w-32 mx-auto mt-8" />
        </motion.div>
      </motion.div>

      {/* Subtle grid */}
      <div className="brutal-grid absolute inset-0 opacity-3" />
    </section>
  );
};

export default OnePersonBrand;
