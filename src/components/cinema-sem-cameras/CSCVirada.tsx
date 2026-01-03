import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const CSCVirada = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="a-virada"
      ref={ref}
      className="relative py-24 md:py-32 bg-ancestral-black overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 brutal-grid" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest">
            {">"} A_VIRADA.manifest
          </span>
        </motion.div>

        {/* Main narrative */}
        <div className="space-y-8">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl text-ancestral-white font-display leading-relaxed"
          >
            Eu era CEO da{" "}
            <span className="text-tech-olive">Hollywood Film Academy</span>.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed"
          >
            Uma das maiores escolas de cinema do mundo.
            <br />
            Formamos milhares de cineastas em produção tradicional.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="py-8 border-l-4 border-tech-olive pl-6"
          >
            <p className="text-xl md:text-2xl text-ancestral-white font-display leading-relaxed">
              Mas em 2023, eu vi algo que mudou tudo:
              <br />
              <span className="text-tech-olive">o poder que estava chegando com a IA.</span>
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed"
          >
            Não era mais sobre ter equipe, orçamento, equipamento.
            <br />
            Era sobre ter <span className="text-ancestral-white">visão</span>.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed"
          >
            Saí da Hollywood Film Academy para criar algo novo.
            <br />
            Um lugar onde o conhecimento de cinema encontra o poder da IA.
          </motion.p>

          {/* Pull quote */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-10 my-10 border-y border-text-muted/20"
          >
            <p className="text-3xl md:text-4xl font-display text-ancestral-white leading-tight text-center">
              "A IA não substitui o cineasta.
              <br />
              <span className="text-tech-olive">Ela liberta quem tem visão.</span>"
            </p>
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl text-ancestral-white leading-relaxed"
          >
            Este curso é a síntese de{" "}
            <span className="text-tech-olive">décadas de cinema</span>
            <br />
            com o que há de mais avançado em{" "}
            <span className="text-tech-olive">inteligência artificial</span>.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-text-muted leading-relaxed"
          >
            Não é sobre apertar botões. É sobre dominar a linguagem do cinema
            <br />
            e usar IA como sua equipe de produção ilimitada.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CSCVirada;
