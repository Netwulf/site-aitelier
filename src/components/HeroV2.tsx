import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { textReveal, staggerContainer } from "@/utils/motionVariants";

interface HeroV2Props {
  variant?: "A" | "B" | "C";
}

export const HeroV2 = ({ variant = "A" }: HeroV2Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with video and cinematic filter */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-ancestral-black via-stone-dark to-ancestral-black" />

        {/* Hero video with cinematic treatment */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-options/Video_ai.telier01.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay on video */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-ancestral-black via-ancestral-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ancestral-black/60 via-transparent to-ancestral-black/60" />

        {/* Scanlines overlay */}
        <div className="absolute inset-0 scanlines pointer-events-none" />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 max-w-6xl flex flex-col h-screen px-6 md:px-8">
        {/* Main content - centered vertically */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <div className="max-w-4xl w-full">
            {/* Brand Name */}
            <motion.div
              className="font-mono-v2 text-sm text-tech-olive tracking-[0.3em] mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AI.TELIER
            </motion.div>

            {/* Main Title - Glitch effect */}
            <motion.h1
              className={prefersReducedMotion
                ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.9] tracking-tight text-ancestral-white"
                : "glitch text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.9] tracking-tight text-ancestral-white"
              }
              data-text="Escola de arte para a era da IA."
              variants={prefersReducedMotion ? {} : textReveal}
              initial="hidden"
              animate="visible"
            >
              Escola de <span className="text-tech-olive">arte</span>
              <br />
              para a era da IA.
            </motion.h1>

            {/* Subtitle - poetic positioning */}
            <motion.p
              className="mt-8 md:mt-12 text-xl md:text-2xl lg:text-3xl
                        text-ancestral-white/80 max-w-2xl leading-relaxed
                        font-display"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Onde storytelling, negócios e tecnologia
              <br />
              se organizam como <span className="text-tech-olive">linguagem.</span>
            </motion.p>

            {/* Philosophy tagline */}
            <motion.div
              className="mt-8 font-mono-v2 text-sm text-text-muted tracking-wider"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              // O futuro é ancestral.
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - bottom */}
        <motion.div
          className="pb-8 flex justify-center"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
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
            <span className="text-xs tracking-widest">SCROLL</span>
            <span>↓</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ancestral-black to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroV2;
