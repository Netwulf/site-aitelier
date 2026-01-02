import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const FuturoAncestralDeep = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="py-16 md:py-24 bg-stone-dark -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? {} : { duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h2
          className="font-mono-v2 text-sm tracking-widest text-ancestral-amber mb-16
                       text-center"
        >
          FUTURO ANCESTRAL
        </h2>

        <div className="space-y-12 text-center">
          {/* Opening contrast */}
          <div className="space-y-2 text-xl md:text-2xl">
            <p className="text-text-secondary">A maioria trata IA como novidade.</p>
            <p className="text-ancestral-white font-display">
              Nós tratamos como continuidade.
            </p>
          </div>

          {/* Historical examples */}
          <div className="py-8 border-y border-text-muted/20">
            <div className="space-y-4 text-lg text-text-secondary">
              <p>Fogo foi tecnologia.</p>
              <p>Escrita foi tecnologia.</p>
              <p>Linguagem foi tecnologia.</p>
            </div>

            <p className="mt-8 text-xl text-ancestral-white leading-relaxed">
              Cada uma dessas ferramentas
              <br />
              serviu ao humano de forma tão natural
              <br />
              que esquecemos que foram inventadas.
            </p>
          </div>

          {/* AI positioning */}
          <div className="space-y-6">
            <p className="text-3xl md:text-4xl text-ancestral-white font-display">
              IA será assim.
            </p>

            <p className="text-lg text-text-secondary leading-relaxed">
              Não porque vai desaparecer,
              <br />
              mas porque vai se integrar
              <br />
              ao que sempre fomos.
            </p>
          </div>

          {/* Core insight */}
          <div className="py-8">
            <p className="text-xl md:text-2xl text-ancestral-white leading-relaxed">
              O futuro não é sobre máquinas.
              <br />
              É sobre humanos com novas ferramentas
              <br />
              <span className="text-ancestral-amber">
                acessando verdades antigas.
              </span>
            </p>
          </div>

          {/* Declaration */}
          <div className="space-y-4">
            <p className="text-2xl text-ancestral-white font-display">
              Por isso:{" "}
              <span className="text-ancestral-amber">Futuro Ancestral</span>.
            </p>

            <div className="pt-8 space-y-2 text-lg text-text-secondary">
              <p>Tecnologia de ponta.</p>
              <p>Sabedoria milenar.</p>
              <p className="text-ancestral-white">Essência humana intacta.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FuturoAncestralDeep;
