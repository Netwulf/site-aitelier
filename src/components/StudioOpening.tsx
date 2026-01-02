import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const StudioOpening = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-4xl"
    >
      {/* Main Statement */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brutal-white leading-tight mb-6">
          Não construímos marcas.
          <br />
          <span className="text-matrix-green">Marcamos histórias.</span>
        </h2>
        <p className="text-2xl md:text-3xl text-brutal-white/70">
          Marcas que parecem filmes.
        </p>
      </div>

      {/* Manifesto Block */}
      <div className="border-l-2 border-matrix-green pl-8 mb-16 space-y-6">
        <p className="text-xl md:text-2xl text-brutal-white leading-relaxed">
          Não somos uma agência.
          <br />
          Somos um <span className="text-matrix-green font-bold">Story Studio</span> — um estúdio de cinema
          e branding aplicado à essência humana.
        </p>
        <p className="text-lg text-brutal-white/70">
          Transformamos fundadores, criadores e visionários em narrativas vivas.
          <br />
          Histórias com estética, ritmo e alma.
        </p>
      </div>

      {/* Core Philosophy */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-brutal-black border border-concrete-border p-8">
          <p className="code-text text-sm text-matrix-green mb-4">FILOSOFIA</p>
          <p className="text-lg text-brutal-white leading-relaxed">
            A Inteligência Artificial é nossa câmera.
            <br />
            O storytelling é nosso roteiro.
            <br />
            <span className="text-matrix-green">E o humano é nossa direção.</span>
          </p>
        </div>
        <div className="bg-brutal-black border border-concrete-border p-8">
          <p className="code-text text-sm text-matrix-green mb-4">CRENÇA</p>
          <p className="text-lg text-brutal-white leading-relaxed">
            A alma de uma marca já existe antes do logotipo.
            <br />
            <span className="text-matrix-green">Nosso trabalho é revelá-la.</span>
          </p>
        </div>
      </div>

      {/* Signature Lines */}
      <div className="space-y-4 text-center py-12 border-y border-concrete-border">
        <p className="text-xl text-brutal-white/60 italic">
          "We don't sell design. We direct stories."
        </p>
        <p className="text-xl text-brutal-white/60 italic">
          "We don't brand businesses. We awaken founders."
        </p>
      </div>

      {/* Final Statement */}
      <div className="mt-16 text-center">
        <p className="code-text text-sm text-matrix-green mb-4 tracking-widest">
          BRANDING COMO CINEMA. STORYTELLING COMO ESTRATÉGIA.
        </p>
        <p className="text-2xl md:text-3xl font-bold text-brutal-white">
          Each brand is a story. Each story, a film.
          <br />
          <span className="text-matrix-green">Each film, a message to the future.</span>
        </p>
      </div>
    </motion.div>
  );
};

export default StudioOpening;
