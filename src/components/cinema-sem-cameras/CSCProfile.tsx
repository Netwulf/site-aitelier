import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";

export const CSCProfile = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] py-24 md:py-32 overflow-hidden"
    >
      {/* Temperature: WARM - humanizing, personal */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0814] via-[#0a0a12] to-ancestral-black" />

      {/* Atmospheric glow - warm tones */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[200px] rounded-full -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-matrix-green/5 blur-[150px] rounded-full -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-mono-v2 text-xs mb-4 text-matrix-green tracking-[0.3em] uppercase">
            Quem dirige
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-matrix-green/20 via-transparent to-purple-500/10 blur-3xl" />

            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden border-2 border-text-muted/20">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ancestral-black via-transparent to-transparent z-10" />

                <img
                  src="/assets/tayna-portrait-real.jpg"
                  alt="Tay - Fundador AI.TELIER"
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-matrix-green/50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-matrix-green/50" />
              </div>

              {/* Stats floating card */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={inView && !prefersReducedMotion ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 md:-right-12 bg-ancestral-black border-2 border-matrix-green p-6"
              >
                <div className="text-5xl font-display font-black text-matrix-green mb-1">6</div>
                <div className="text-xs font-mono-v2 text-text-muted tracking-widest uppercase">
                  Dígitos/ano
                </div>
                <div className="text-xs font-mono-v2 text-matrix-green/70 mt-2">
                  Zero funcionários
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Name */}
            <div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-ancestral-white mb-2">
                TAY
              </h3>
              <p className="text-lg text-matrix-green font-mono-v2">
                Fundador do AI.TELIER
              </p>
            </div>

            {/* Bio - narrative style */}
            <div className="space-y-6 text-lg text-text-muted leading-relaxed">
              <p>
                Passei no <span className="text-ancestral-white">ITA aos 15</span>. Escolhi cinema.
              </p>

              <p>
                Fui CEO da <span className="text-ancestral-white">Hollywood Film Academy aos 25</span>.
              </p>

              <p>
                Aprendi cedo o custo de modelos que não respeitam autonomia criativa e pessoal.
              </p>

              <div className="py-4 border-l-2 border-matrix-green/50 pl-6">
                <p className="text-ancestral-white">
                  Hoje opero{" "}
                  <span className="text-matrix-green font-bold">múltiplos seis dígitos</span>,
                  <br />
                  <span className="text-matrix-green font-bold">zero funcionários</span>,
                  <br />
                  <span className="text-matrix-green font-bold">~4h por dia</span>.
                </p>
              </div>
            </div>

            {/* Context box */}
            <div className="p-6 border border-text-muted/20 bg-[#0a0812]/80">
              <p className="text-text-muted">
                <span className="text-matrix-green font-bold">Cinema sem Câmeras</span> é o braço
                audiovisual do movimento{" "}
                <span className="text-ancestral-white font-semibold">Divergentes</span> — pessoas
                construindo negócios que respeitam quem elas são.
              </p>
            </div>

            {/* Quote */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={inView && !prefersReducedMotion ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative"
            >
              {/* Giant quote mark */}
              <span className="absolute -top-4 -left-4 text-6xl text-matrix-green/20 font-display">
                "
              </span>

              <blockquote className="text-xl md:text-2xl font-display text-ancestral-white pl-8">
                Não sou professor.
                <br />
                <span className="text-matrix-green font-bold">
                  Sou diretor que forma diretores.
                </span>
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCProfile;
