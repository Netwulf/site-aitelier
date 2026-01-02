import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProcessStep {
  number: string;
  title: string;
  description: string[];
  outputs: string[];
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "ARQUEOLOGIA",
    description: [
      "Escavamos.",
      "Quem você é. O que você defende.",
      "Por que você importa.",
      "",
      "Não inventamos história.",
      "Revelamos a que já existe.",
    ],
    outputs: ["Identidade Narrativa", "Posicionamento", "Manifesto"],
  },
  {
    number: "02",
    title: "DIREÇÃO",
    description: [
      "Damos forma ao invisível.",
      "Como você é visto.",
      "Como você marca.",
      "",
      "Fotografia arquetípica.",
      "Vídeo-manifesto.",
      "Estética coerente.",
    ],
    outputs: ["Presença Cinematográfica"],
  },
  {
    number: "03",
    title: "ATIVAÇÃO",
    description: [
      "Estruturamos a comunicação.",
      "Onde e como você existe no mundo.",
      "",
      "Site narrativo.",
      "Direção de conteúdo.",
      "Materiais de apresentação.",
    ],
    outputs: ["Sistema de Presença"],
  },
];

export const ProcessSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-12">
        <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-4">
          O PROCESSO
        </h2>
        <p className="text-xl text-ancestral-white">
          Três movimentos. Uma direção.
        </p>
      </div>

      <div className="space-y-16">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
            className="border-t border-text-muted/20 pt-8"
          >
            <div className="grid md:grid-cols-[100px_1fr] gap-8">
              {/* Number */}
              <div className="font-mono-v2 text-4xl text-text-muted/40">
                {step.number}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-2xl text-ancestral-white mb-6">
                  {step.title}
                </h3>

                <div className="space-y-1 text-text-secondary mb-6">
                  {step.description.map((line, i) => (
                    <p key={i} className={line === "" ? "h-4" : ""}>
                      {line}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-text-muted">→ Saída:</span>
                  {step.outputs.map((output, i) => (
                    <span key={output} className="text-sm text-ancestral-amber">
                      {output}
                      {i < step.outputs.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-16 pt-8 border-t border-text-muted/20">
        <p className="text-text-muted text-sm">
          Cada projeto é único.
          <br />
          Tempo e investimento variam.
          <br />
          Conversamos antes.
        </p>
      </div>
    </div>
  );
};

export default ProcessSection;
