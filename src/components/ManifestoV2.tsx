import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ManifestoV2 = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? {} : { duration: 0.8 }}
      className="max-w-3xl"
    >
      <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-12">
        MANIFESTO
      </h2>

      <div className="space-y-8 text-xl md:text-2xl leading-relaxed">
        {/* Opening declaration */}
        <div className="space-y-2 text-ancestral-white font-display">
          <p>Não somos agência.</p>
          <p>Não somos escola.</p>
          <p>Não somos estúdio no sentido comum.</p>
        </div>

        <p className="text-3xl md:text-4xl text-ancestral-white font-display">
          Somos o <span className="text-ancestral-amber">ai.telier</span>.
        </p>

        {/* Description */}
        <div className="space-y-4 text-text-secondary">
          <p>
            Um lugar onde arte, tecnologia e identidade
            <br />
            se reorganizam para um tempo novo.
          </p>
          <p>
            Onde founders aprendem a se dirigir como filmes.
            <br />
            Onde creators descobrem linguagem própria.
            <br />
            Onde o invisível ganha forma.
          </p>
        </div>

        {/* Method */}
        <div
          className="py-8 border-y border-text-muted/20 space-y-4
                        text-ancestral-white"
        >
          <p>Tratamos cada marca como obra.</p>
          <p>Cada pessoa como universo.</p>
          <p>Cada projeto como atelier de investigação.</p>
        </div>

        {/* Core truth */}
        <p className="text-2xl text-ancestral-white font-display">
          A alma já existe antes do logotipo.
          <br />
          <span className="text-ancestral-amber">
            Nosso trabalho é revelá-la.
          </span>
        </p>

        {/* Closing */}
        <div className="pt-8 space-y-2 text-lg text-text-secondary">
          <p>Faça do inconsciente consciente.</p>
          <p>Torne o invisível, visível.</p>
          <p className="text-ancestral-white">Torne-se a marca.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ManifestoV2;
