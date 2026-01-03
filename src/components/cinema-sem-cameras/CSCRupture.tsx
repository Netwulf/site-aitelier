import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";

export const CSCRupture = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const negations = [
    { text: "Não é cinema com IA.", delay: 0 },
    { text: "Não é curso de prompt.", delay: 0.15 },
    { text: "Não é formação artística isolada.", delay: 0.3 },
  ];

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative min-h-[80vh] flex items-center py-24 md:py-32 overflow-hidden"
    >
      {/* Background: Gradient transition from Hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-ancestral-black via-[#050810] to-ancestral-black" />

      {/* Atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-matrix-green/5 blur-[150px] rounded-full" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Negations - striking through */}
        <div className="space-y-6 mb-16">
          {negations.map((item, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
              animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: item.delay }}
              className="relative inline-block"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl text-text-muted/60 font-display">
                <span className="relative">
                  {item.text}
                  {/* Strikethrough line */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: item.delay + 0.3 }}
                    className="absolute left-0 top-1/2 w-full h-[2px] bg-text-muted/40 origin-left"
                  />
                </span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main statement */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          <p className="text-lg md:text-xl text-ancestral-white/70 leading-relaxed max-w-3xl mx-auto">
            <span className="text-matrix-green font-bold text-xl md:text-2xl">Cinema sem Câmeras</span>{" "}
            ensina direção cinematográfica aplicada ao modelo de{" "}
            <span className="text-ancestral-white font-semibold">One Person Studio</span> — para quem
            quer operar como estúdio de uma pessoa só, criando filmes, clipes, comerciais e conteúdo
            audiovisual de alto nível, sem depender de equipe, estrutura ou indústria.
          </p>

          {/* The punchline */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={inView && !prefersReducedMotion ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="relative inline-block"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-matrix-green/20 blur-3xl" />

            <div className="relative border-2 border-matrix-green px-10 py-8 bg-matrix-green/5">
              <p className="text-xl md:text-2xl text-ancestral-white font-display mb-2">
                Aqui, cinema não é só arte.
              </p>
              <p className="text-2xl md:text-4xl text-matrix-green font-bold font-display">
                É linguagem + sistema + autonomia econômica.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCRupture;
