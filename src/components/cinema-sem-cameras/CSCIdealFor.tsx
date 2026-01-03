import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";
import { Check, X } from "lucide-react";

export const CSCIdealFor = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const idealFor = [
    "quer operar como One Person Studio",
    "cria (ou quer criar) vídeos profissionalmente",
    "quer cobrar mais sem depender de equipe",
    "entende que direção é o diferencial real",
    "quer unir cinema, IA e negócio",
    "se identifica com a mentalidade Divergente",
  ];

  const notFor = [
    "quer só aprender ferramenta",
    "busca atalhos rápidos",
    "quer emprego em produtora",
    "não quer assumir autoria",
    "não quer vender o que cria",
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Temperature: COOL - clarity, filtering */}
      <div className="absolute inset-0 bg-gradient-to-b from-ancestral-black via-[#080a10] to-ancestral-black" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-mono-v2 text-xs mb-4 text-matrix-green tracking-[0.3em] uppercase">
            Filtro de entrada
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-ancestral-white">
            Para quem <span className="text-tech-olive">é</span> e{" "}
            <span className="text-text-muted/50">não é</span>
          </h2>
        </motion.div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* PARA QUEM É */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-matrix-green/10 blur-3xl" />

            <div className="relative h-full p-8 md:p-10 border-2 border-matrix-green bg-matrix-green/5">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-matrix-green flex items-center justify-center">
                  <Check className="w-7 h-7 text-ancestral-black" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-matrix-green font-display">
                  PARA QUEM É
                </h3>
              </div>

              <p className="text-lg text-ancestral-white mb-6">
                Essa formação é para você se:
              </p>

              <ul className="space-y-4">
                {idealFor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <span className="text-matrix-green mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                      →
                    </span>
                    <span className="text-text-muted group-hover:text-ancestral-white/90 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* PARA QUEM NÃO É */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-full p-8 md:p-10 border border-text-muted/20 bg-ancestral-black/80">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 border-2 border-text-muted/30 flex items-center justify-center">
                  <X className="w-7 h-7 text-text-muted/50" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-text-muted font-display">
                  PARA QUEM NÃO É
                </h3>
              </div>

              <p className="text-lg text-text-muted/70 mb-6">
                Não é para você se:
              </p>

              <ul className="space-y-4">
                {notFor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: 10 }}
                    animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-text-muted/30 mt-1 flex-shrink-0">—</span>
                    <span className="text-text-muted/50">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCIdealFor;
