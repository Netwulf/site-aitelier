import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Lab {
  title: string;
  description: string;
  status: "ativo" | "em_breve";
}

const labs: Lab[] = [
  {
    title: "ARQUEOLOGIA DE HISTÓRIA",
    description: "Escavar sua própria narrativa",
    status: "em_breve",
  },
  {
    title: "DIREÇÃO DE SI",
    description: "Você como personagem e diretor",
    status: "em_breve",
  },
  {
    title: "ESTÉTICA PESSOAL",
    description: "Encontrar sua linguagem visual",
    status: "em_breve",
  },
  {
    title: "IA COMO EXTENSÃO",
    description: "Tecnologia ancestral aplicada",
    status: "em_breve",
  },
  {
    title: "PRESENÇA PÚBLICA",
    description: "Existir no mundo sem performance",
    status: "em_breve",
  },
];

const LabCard = ({ lab, index }: { lab: Lab; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
      className="p-6 border border-text-muted/20
                 hover:border-text-muted/40 transition-colors
                 bg-stone-dark/30"
    >
      {/* Arrow + Title */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-ancestral-amber">→</span>
        <h3 className="font-display text-ancestral-white">{lab.title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 pl-6">{lab.description}</p>

      {/* Status */}
      <div className="pl-6">
        {lab.status === "ativo" ? (
          <span className="text-xs font-mono-v2 text-ancestral-amber">
            [Inscrições abertas]
          </span>
        ) : (
          <span className="text-xs font-mono-v2 text-text-muted">
            [Em breve]
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const LaboratoriosSection = () => {
  return (
    <div className="py-8">
      <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-8">
        LABORATÓRIOS
      </h2>

      {/* Intro */}
      <div className="max-w-xl mb-12">
        <p className="text-text-secondary leading-relaxed">
          Investigações temáticas.
          <br />
          Grupos pequenos.
          <br />
          Tempo limitado.
          <br />
          <span className="text-ancestral-white">Intensidade alta.</span>
        </p>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {labs.map((lab, index) => (
          <LabCard key={lab.title} lab={lab} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LaboratoriosSection;
