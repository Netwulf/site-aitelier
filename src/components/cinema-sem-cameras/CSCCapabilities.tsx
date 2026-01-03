import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";
import { Palette, DollarSign, Film, Zap } from "lucide-react";

export const CSCCapabilities = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const pillars = [
    { icon: Film, text: "pensar como diretor" },
    { icon: Zap, text: "operar como estúdio" },
    { icon: Palette, text: "criar obras de alto nível" },
    { icon: DollarSign, text: "transformar linguagem em vantagem" },
  ];

  const createItems = [
    "Clipes, comerciais e branded content de nível profissional",
    "Vídeos cinematográficos para lançamentos",
    "Conteúdo orgânico que diferencia marcas",
    "Obras autorais que circulam no mundo real",
  ];

  const chargeItems = [
    "Direção audiovisual por projetos de médio e alto valor",
    "Operar como estúdio boutique solo",
    "Construir portfólio que sustenta preço",
    "Usar linguagem própria como vantagem competitiva",
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Temperature: COOL - informative, structured */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#100810] via-ancestral-black to-ancestral-black" />

      {/* Subtle atmospheric elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[600px] bg-matrix-green/5 blur-[200px] rounded-full -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[600px] bg-tech-olive/5 blur-[200px] rounded-full -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="font-mono-v2 text-xs mb-4 text-matrix-green tracking-[0.3em] uppercase">
            O que é essa formação
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-ancestral-white leading-[1.1] mb-8">
            Cinema sem Câmeras
            <br />
            <span className="text-tech-olive">ensina você a:</span>
          </h2>

          {/* Pillars as horizontal strip */}
          <div className="flex flex-wrap gap-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-2 px-4 py-2 border border-text-muted/20 bg-ancestral-black/50 hover:border-matrix-green/50 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-matrix-green/60 group-hover:text-matrix-green transition-colors" />
                  <span className="text-sm text-text-muted group-hover:text-ancestral-white/80 transition-colors font-mono-v2">
                    {pillar.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Clarification */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-text-muted mt-8 max-w-2xl"
          >
            Não é sobre{" "}
            <span className="line-through text-text-muted/50">entrar na indústria do cinema</span>.
            <br />
            É sobre{" "}
            <span className="text-ancestral-white font-semibold">
              usar cinema como superpoder profissional.
            </span>
          </motion.p>
        </motion.div>

        {/* Two Columns - CRIAR + COBRAR */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* CRIAR */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative group"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-matrix-green/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full p-8 md:p-10 border-2 border-matrix-green bg-matrix-green/5">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-matrix-green flex items-center justify-center">
                  <Palette className="w-8 h-8 text-ancestral-black" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-matrix-green font-display">
                    CRIAR
                  </h3>
                  <p className="text-sm text-text-muted font-mono-v2">o que você vai produzir</p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {createItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-matrix-green text-lg mt-0.5">→</span>
                    <span className="text-ancestral-white/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* COBRAR */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-tech-olive/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full p-8 md:p-10 border-2 border-tech-olive bg-tech-olive/5">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-tech-olive flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-ancestral-black" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-tech-olive font-display">
                    COBRAR
                  </h3>
                  <p className="text-sm text-text-muted font-mono-v2">como você vai monetizar</p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {chargeItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-tech-olive text-lg mt-0.5">→</span>
                    <span className="text-ancestral-white/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Closing quote */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-text-muted italic font-display">
            "A formação que transforma linguagem em{" "}
            <span className="text-ancestral-white not-italic font-semibold">
              autoridade profissional.
            </span>
            "
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCCapabilities;
