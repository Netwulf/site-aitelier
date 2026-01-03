import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

export const EscolaHero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-options/hero-darkroom-reveal.png"
          alt="Cinema sem Câmeras"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-ancestral-black via-ancestral-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ancestral-black/80 via-transparent to-ancestral-black/40" />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 max-w-6xl px-6 md:px-8 pt-24">
        <div className="max-w-3xl">
          {/* Course Badge */}
          <motion.div
            className="inline-flex items-center gap-3 mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-mono-v2 text-xs text-matrix-green tracking-[0.3em] uppercase">
              Formação Principal
            </span>
            <span className="text-matrix-green/50">|</span>
            <span className="font-mono-v2 text-xs text-text-muted tracking-wider">
              Março 2025
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight text-ancestral-white mb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cinema
            <br />
            <span className="text-tech-olive">sem Câmeras</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-ancestral-white/80 max-w-2xl leading-relaxed font-display mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Direção Cinematográfica para One Person Studios.
          </motion.p>

          {/* Impact phrase */}
          <motion.p
            className="text-base md:text-lg text-text-muted max-w-xl leading-relaxed mb-10"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Não é cinema com IA. É como operar um{" "}
            <span className="text-ancestral-white">estúdio de alto nível sem equipe</span>.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#candidatura"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4
                         bg-matrix-green text-ancestral-black font-bold uppercase tracking-wider
                         hover:bg-matrix-green/90 transition-all duration-300"
            >
              <span>Quero me Candidatar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                         border-2 border-ancestral-white/30 text-ancestral-white font-medium
                         hover:border-matrix-green hover:text-matrix-green transition-all duration-300"
            >
              Conhecer a Formação
            </a>
          </motion.div>

          {/* Meta info */}
          <motion.div
            className="mt-12 flex flex-wrap gap-8 text-sm text-text-muted font-mono-v2"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div>
              <span className="text-matrix-green">30-40</span> vagas
            </div>
            <div>
              <span className="text-matrix-green">6</span> meses
            </div>
            <div>
              <span className="text-matrix-green">R$ 8.000</span> ou 10x
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={prefersReducedMotion ? {} : { opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={
            prefersReducedMotion
              ? {}
              : { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }
          className="text-text-muted text-sm font-mono-v2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest">EXPLORAR</span>
          <span>↓</span>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ancestral-black to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default EscolaHero;
