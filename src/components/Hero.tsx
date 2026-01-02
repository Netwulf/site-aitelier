import heroImage from "@/assets/generated/hero-brutalist-tunnel.png";
import { motion } from "framer-motion";
import { fadeInUp, textReveal, staggerContainer } from "@/utils/motionVariants";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image com overlay escuro */}
      <div className="absolute inset-0">
        <OptimizedImage 
          src={heroImage} 
          alt="Portal para o futuro ancestral" 
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brutal-black/70 via-brutal-black/60 to-brutal-black/80" />
      </div>
      
      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0" />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 brutal-container max-w-7xl mx-auto py-20 px-4"
        initial="hidden"
        animate="visible"
        variants={prefersReducedMotion ? {} : staggerContainer}
      >
        <div className="space-y-8">
          {/* Código terminal */}
          <motion.div
            className="code-text text-sm mb-4 terminal-flicker"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            &gt; STUDIO.SYSTEM.ONLINE
          </motion.div>

          {/* Logo principal */}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeInUp}
            className="mb-8"
          >
            <img
              src="/logo-aitelier.png"
              alt="AI.TELIER"
              className="h-24 md:h-32 lg:h-40 w-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Headline cinematográfica - paradoxo poético */}
          <motion.div
            className="max-w-4xl"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            <p className="poetic-text text-2xl md:text-4xl lg:text-5xl text-brutal-white leading-tight">
              A arte que ensinamos cria.
            </p>
            <p className="poetic-text text-2xl md:text-4xl lg:text-5xl text-brutal-white/80 leading-tight mt-2">
              A arte que criamos ensina.
            </p>
          </motion.div>

          {/* Linha separadora com brilho verde */}
          <div className="w-32 h-px bg-matrix-green matrix-glow my-8" />
          
          {/* Grid exposto no fundo */}
          <div className="brutal-grid absolute inset-0 opacity-20 pointer-events-none" />
        </div>
      </motion.div>
      
      {/* Fragmento de código verde flutuante */}
      <div className="absolute bottom-10 right-10 code-text text-xs opacity-50">
        [CONSCIOUSNESS_MODE: ACTIVE]
      </div>
    </section>
  );
};

export default Hero;
