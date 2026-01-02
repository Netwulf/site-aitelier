import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Fundamento {
  number: string;
  title: string;
  description: string;
}

const fundamentos: Fundamento[] = [
  {
    number: "01",
    title: "OBSERVAÇÃO",
    description: "Ver o que está ali, não o que você quer ver",
  },
  {
    number: "02",
    title: "LINGUAGEM",
    description: "Encontrar palavras que são suas",
  },
  {
    number: "03",
    title: "FORMA",
    description: "Dar corpo ao que era só sensação",
  },
  {
    number: "04",
    title: "RITMO",
    description: "Entender tempo como material",
  },
  {
    number: "05",
    title: "SÍNTESE",
    description: "Comprimir até restar só o essencial",
  },
];

export const FundamentosSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="py-8">
      <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-8">
        FUNDAMENTOS
      </h2>

      {/* Intro */}
      <div className="max-w-2xl mb-12">
        <p className="text-lg text-text-secondary leading-relaxed mb-6">
          Antes de criar, ver.
          <br />
          Antes de falar, ouvir.
          <br />
          Antes de construir, desconstruir.
        </p>

        <p className="text-ancestral-white">
          Todo mundo que entra no atelier
          <br />
          passa pelos fundamentos:
        </p>
      </div>

      {/* Fundamentos List */}
      <div className="space-y-0 border-t border-text-muted/20">
        {fundamentos.map((item, index) => (
          <motion.div
            key={item.number}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
            className="border-b border-text-muted/20 py-6
                       grid grid-cols-[60px_1fr] md:grid-cols-[80px_200px_1fr]
                       gap-4 items-baseline"
          >
            {/* Number */}
            <span className="font-mono-v2 text-2xl text-text-muted/40">
              {item.number}
            </span>

            {/* Title */}
            <span className="font-display text-lg text-ancestral-white">
              {item.title}
            </span>

            {/* Description */}
            <span className="text-text-secondary col-start-2 md:col-start-3">
              {item.description}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FundamentosSection;
