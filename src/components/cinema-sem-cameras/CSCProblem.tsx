import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";

export const CSCProblem = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const problems = [
    "dirigir imagem com intenção",
    "criar estética que converte",
    "produzir obra que vende",
    "cobrar bem sem equipe",
    "operar como estúdio solo de verdade",
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Temperature: WARM transitioning to tension */}
      <div className="absolute inset-0 bg-gradient-to-b from-ancestral-black via-[#0a0810] to-[#100810]" />

      {/* Tension glow - warmer colors */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-900/10 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/5 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header with dramatic number */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="font-mono-v2 text-xs mb-4 text-orange-400/70 tracking-[0.3em] uppercase">
            O problema real
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white leading-[1.1]">
              Hoje, qualquer pessoa
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                gera vídeos.
              </span>
            </h2>

            {/* Dramatic stat */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={inView && !prefersReducedMotion ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="text-[6rem] md:text-[8rem] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-orange-400/30 to-transparent">
                ∞
              </div>
              <div className="absolute bottom-2 left-0 text-xs font-mono-v2 text-orange-400/50 tracking-widest uppercase">
                ferramentas
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Problem list */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Subtle border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent blur-xl" />

            <div className="relative p-8 md:p-10 border border-orange-500/20 bg-[#0a0505]/80">
              <p className="text-xl md:text-2xl text-ancestral-white font-display mb-8">
                Pouca gente consegue:
              </p>

              <ul className="space-y-5">
                {problems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="text-orange-400/40 group-hover:text-orange-400 transition-colors">
                      —
                    </span>
                    <span className="text-lg text-text-muted group-hover:text-ancestral-white/80 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right - The insight */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            {/* Key insight card */}
            <div className="relative mb-8">
              {/* Glow */}
              <div className="absolute inset-0 bg-matrix-green/20 blur-3xl" />

              <div className="relative p-8 md:p-10 border-2 border-matrix-green bg-matrix-green/5">
                <p className="text-xl md:text-2xl text-ancestral-white mb-3">
                  Ferramenta não é o gargalo.
                </p>
                <p className="text-4xl md:text-5xl font-bold text-matrix-green font-display">
                  Direção é.
                </p>
              </div>
            </div>

            {/* Value proposition */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={inView && !prefersReducedMotion ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-start gap-4"
            >
              <span className="text-matrix-green text-2xl">→</span>
              <p className="text-lg text-text-muted leading-relaxed">
                É isso que diferencia quem opera projetos de{" "}
                <span className="text-ancestral-white font-semibold text-xl">
                  R$10k–50k
                </span>{" "}
                por obra audiovisual.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCProblem;
