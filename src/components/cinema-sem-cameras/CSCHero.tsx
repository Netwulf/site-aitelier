import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export const CSCHero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  // Cinematic reveal sequence
  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(5);
      return;
    }

    const stages = [
      { delay: 500, stage: 1 },   // Question appears
      { delay: 2000, stage: 2 },  // First stat
      { delay: 3500, stage: 3 },  // Second stat
      { delay: 5000, stage: 4 },  // Title reveals
      { delay: 6500, stage: 5 },  // Full content
    ];

    stages.forEach(({ delay, stage: s }) => {
      setTimeout(() => setStage(s), delay);
    });
  }, [prefersReducedMotion]);

  const scrollToProcess = () => {
    document.getElementById("candidatura")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1: Deep void background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508] via-ancestral-black to-ancestral-black" />

      {/* Layer 2: Atmospheric orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-matrix-green/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-30%] right-[-15%] w-[50%] h-[50%] bg-tech-olive/5 blur-[120px] rounded-full" />

      {/* Layer 3: Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 4: Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Stage 1: Opening question */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-text-muted text-lg md:text-xl mb-12 font-mono-v2 tracking-wide"
            >
              E se você pudesse operar um estúdio de cinema...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Stage 2-3: Giant stats reveal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Glow behind */}
                <div className="absolute inset-0 text-[8rem] md:text-[12rem] font-display font-black text-matrix-green/10 blur-2xl">
                  0
                </div>
                <span className="text-[8rem] md:text-[12rem] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-matrix-green via-matrix-green/80 to-matrix-green/40">
                  0
                </span>
                <p className="text-sm md:text-base text-text-muted font-mono-v2 mt-2 tracking-widest uppercase">
                  funcionários
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Glow behind */}
                <div className="absolute inset-0 text-[8rem] md:text-[12rem] font-display font-black text-tech-olive/10 blur-2xl">
                  6
                </div>
                <span className="text-[8rem] md:text-[12rem] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-tech-olive via-tech-olive/80 to-tech-olive/40">
                  6
                </span>
                <p className="text-sm md:text-base text-text-muted font-mono-v2 mt-2 tracking-widest uppercase">
                  dígitos/ano
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stage 4: Title */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-6">
                <span className="text-ancestral-white">Cinema</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-green via-tech-olive to-matrix-green">
                  sem Câmeras
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-ancestral-white/80 font-display max-w-2xl mx-auto mb-4">
                Direção Cinematográfica para One Person Studios.
              </p>

              <p className="text-base md:text-lg text-text-muted max-w-xl mx-auto">
                Não é cinema com IA. É como operar um{" "}
                <span className="text-ancestral-white">estúdio de alto nível sem equipe</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 5: CTAs and meta */}
        <AnimatePresence>
          {stage >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12"
            >
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={scrollToProcess}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5
                             bg-matrix-green text-ancestral-black font-bold uppercase tracking-wider
                             hover:bg-matrix-green/90 transition-all duration-300
                             shadow-[0_0_40px_rgba(0,255,136,0.2)] hover:shadow-[0_0_60px_rgba(0,255,136,0.3)]"
                >
                  <span>Quero me Candidatar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm font-mono-v2">
                <div className="px-4 py-2 border border-text-muted/30 bg-ancestral-black/50">
                  <span className="text-matrix-green">30-40</span>
                  <span className="text-text-muted ml-2">vagas</span>
                </div>
                <div className="px-4 py-2 border border-text-muted/30 bg-ancestral-black/50">
                  <span className="text-matrix-green">6</span>
                  <span className="text-text-muted ml-2">meses</span>
                </div>
                <div className="px-4 py-2 border border-text-muted/30 bg-ancestral-black/50">
                  <span className="text-matrix-green">Março</span>
                  <span className="text-text-muted ml-2">2025</span>
                </div>
                <div className="px-4 py-2 border border-matrix-green/50 bg-matrix-green/10">
                  <span className="text-matrix-green font-bold">R$ 8.000</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {stage >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-text-muted/50"
            >
              <span className="text-xs font-mono-v2 tracking-[0.3em]">SCROLL</span>
              <div className="w-px h-8 bg-gradient-to-b from-text-muted/50 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CSCHero;
