import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const FuturoAncestralSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-section bg-stone-dark relative">
      {/* Brutal grid overlay */}
      <div className="brutal-grid absolute inset-0 opacity-5 pointer-events-none" />

      <SectionContainer number={3}>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? {} : { duration: 0.8 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          {/* Terminal header */}
          <div className="code-text text-xs mb-4 terminal-flicker text-matrix-green">
            &gt; FUTURO_ANCESTRAL.manifest
          </div>

          <h2
            className="font-mono-v2 text-sm tracking-widest
                        text-tech-olive mb-12"
          >
            FUTURO ANCESTRAL
          </h2>

          <div className="w-24 h-px bg-matrix-green mx-auto mb-12" />

          <div className="space-y-8">
            <p
              className="text-2xl md:text-3xl font-display text-ancestral-white
                          leading-relaxed"
            >
              Usamos tecnologia do futuro
              <br />
              para revelar verdades que sempre existiram.
            </p>

            <div className="py-8 border-y border-matrix-green/20 brutal-container">
              <p className="text-lg text-text-secondary leading-loose">
                <span className="code-text text-matrix-green">IA</span> é nossa câmera.
                <br />
                <span className="code-text text-matrix-green">Storytelling</span> é nosso roteiro.
                <br />
                <span className="code-text text-ancestral-white">Você</span> é a direção.
              </p>
            </div>

            <p className="text-xl text-ancestral-white leading-relaxed">
              A ferramenta serve ao humano
              <br />
              de forma tão natural que parece ancestral.
            </p>

            <div className="w-32 h-px bg-matrix-green mx-auto my-8" />

            <p className="text-lg text-tech-olive font-display">
              Como fogo. Como escrita. Como linguagem.
            </p>
          </div>

          {/* Code annotation */}
          <div className="mt-12 code-text text-xs text-matrix-green/30">
            // ANCIENT_WISDOM_PROTOCOL_ACTIVE
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};

export default FuturoAncestralSection;
