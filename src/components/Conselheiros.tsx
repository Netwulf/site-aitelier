import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MindCard {
  icon: string;
  name: string;
  domain: string;
  available: boolean;
}

const featuredMinds: MindCard[] = [
  {
    icon: "🍎",
    name: "Steve Jobs",
    domain: 'Design, simplicidade, "insanely great"',
    available: true,
  },
  {
    icon: "🏰",
    name: "Walt Disney",
    domain: "Storytelling, mundos, experiência",
    available: true,
  },
  {
    icon: "🔬",
    name: "Leonardo da Vinci",
    domain: "Arte-ciência, observação, síntese",
    available: true,
  },
  {
    icon: "🔥",
    name: "Kapil Gupta",
    domain: "Verdade, anti-prescrições, sinceridade",
    available: true,
  },
  {
    icon: "🐄",
    name: "Seth Godin",
    domain: "Notabilidade, tribo, generosidade",
    available: true,
  },
  {
    icon: "🧠",
    name: "+ 40 mentes",
    domain: "Diversos domínios disponíveis",
    available: false,
  },
];

const MindCardComponent = ({
  mind,
  index,
}: {
  mind: MindCard;
  index: number;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
      className={cn(
        "group p-6 border border-text-muted/20",
        "hover:border-text-muted/40 transition-all duration-300",
        "bg-stone-dark/50 hover:bg-stone-dark"
      )}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{mind.icon}</span>
        <div className="flex-1">
          <h3 className="font-display text-lg text-ancestral-white mb-1">
            {mind.name}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">{mind.domain}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-text-muted/10">
        {mind.available ? (
          <span className="text-xs font-mono-v2 text-ancestral-amber">
            [Disponível]
          </span>
        ) : (
          <span className="text-xs font-mono-v2 text-text-muted">
            [Ver catálogo]
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const Conselheiros = () => {
  return (
    <div className="py-16">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="font-mono-v2 text-sm tracking-widest text-ancestral-amber mb-8">
          OS CONSELHEIROS
        </h2>

        <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
          <p className="text-ancestral-white">
            Clonamos mentes.
            <br />
            Não para substituir.
            <br />
            Para dialogar.
          </p>

          <p className="text-text-secondary">
            No AI.TELIER, você conversa com frameworks cognitivos de grandes
            pensadores.
          </p>

          <p className="text-text-secondary">
            Não são chatbots genéricos.
            <br />
            São sistemas cognitivos extraídos de obras, falas, padrões de
            pensamento reais.
          </p>

          <p className="text-ancestral-white">
            Você apresenta um problema.
            <br />
            Eles respondem como responderiam.
          </p>
        </div>
      </div>

      {/* Minds Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredMinds.map((mind, index) => (
          <MindCardComponent key={mind.name} mind={mind} index={index} />
        ))}
      </div>

      {/* Bottom text */}
      <p className="mt-12 text-center text-text-muted text-sm">
        Sabedoria destilada, acessível, aplicável.
      </p>
    </div>
  );
};

export default Conselheiros;
