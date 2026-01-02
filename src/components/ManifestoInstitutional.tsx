import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { OptimizedImage } from "@/components/OptimizedImage";
import atticImage from "@/assets/attic-mystical.jpg";

const ManifestoInstitutional = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden bg-brutal-black">
      {/* Background image with mystical overlay */}
      <div className="absolute inset-0">
        <OptimizedImage 
          src={atticImage}
          alt="Portal místico de descoberta"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brutal-black/80 via-brutal-black/70 to-brutal-black" />
      </div>
      
      {/* Background effects */}
      <div className="organic-glow" style={{ top: "20%", right: "10%" }} />
      <div className="mesh-gradient-2" />

      <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-7xl relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUpSimple} className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="code-text text-sm text-matrix-green">MANIFESTO</span>
            <div className="h-px bg-concrete-border flex-1" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-brutal-white leading-none mb-4">
            A ESCOLA E O ESTÚDIO
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold text-matrix-green leading-none">
            DO FUTURO CRIATIVO
          </h2>
        </motion.div>

        {/* 3 blocos side-by-side */}
        <motion.div variants={fadeInUpSimple} className="grid md:grid-cols-3 gap-12">
          {/* VISÃO */}
          <div className="border-l-2 border-matrix-green pl-8">
            <span className="code-text text-xs text-matrix-green mb-6 block">VISÃO</span>
            <h3 className="text-xl font-bold text-brutal-white mb-4">
              O que acreditamos
            </h3>
            <p className="text-base text-concrete leading-relaxed">
              Um futuro onde criadores têm autonomia real através da fusão entre identidade autêntica e inteligência artificial.
            </p>
          </div>

          {/* MISSÃO */}
          <div className="border-l-2 border-brutal-white pl-8">
            <span className="code-text text-xs text-brutal-white mb-6 block">MISSÃO</span>
            <h3 className="text-xl font-bold text-brutal-white mb-4">
              O que fazemos
            </h3>
            <p className="text-base text-concrete leading-relaxed">
              Ensinamos o método Brand OS e criamos sistemas de marca que transformam identidade em negócio escalável.
            </p>
          </div>

          {/* MÉTODO */}
          <div className="border-l-2 border-concrete-border pl-8">
            <span className="code-text text-xs text-concrete mb-6 block">MÉTODO</span>
            <h3 className="text-xl font-bold text-brutal-white mb-4">
              Como fazemos
            </h3>
            <p className="text-base text-concrete leading-relaxed">
              Identidade → Sistema → Autonomia. Da alma ao negócio através de criação consciente e tecnologia.
            </p>
          </div>
        </motion.div>

        {/* Quote final */}
        <motion.div variants={fadeInUpSimple} className="mt-24 text-center">
          <div className="h-px bg-matrix-green w-32 mx-auto mb-8" />
          <p className="text-2xl md:text-3xl text-brutal-white italic">
            Onde arte encontra sistema. Onde criação encontra autonomia.
          </p>
          <div className="h-px bg-matrix-green w-32 mx-auto mt-8" />
        </motion.div>
      </motion.div>

      {/* Subtle grid */}
      <div className="brutal-grid absolute inset-0 opacity-3" />
    </section>
  );
};

export default ManifestoInstitutional;
