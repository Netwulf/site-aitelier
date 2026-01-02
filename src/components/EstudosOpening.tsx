import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const EstudosOpening = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-3xl"
    >
      <div className="space-y-2 text-2xl md:text-3xl font-display text-ancestral-amber mb-12">
        <p>Escola de Cinema sem Câmeras.</p>
        <p>Escola de Arte sem Pincéis.</p>
        <p>Escola de Programação sem Código.</p>
      </div>

      <div className="space-y-6 text-xl leading-relaxed">
        <p className="text-text-secondary">
          Não ensinamos técnicas.
          <br />
          <span className="text-ancestral-white">Formamos linguagem.</span>
        </p>

        <div
          className="py-8 border-y border-text-muted/20 space-y-2
                        text-ancestral-white"
        >
          <p>Storytelling sem fórmula.</p>
          <p>Criação sem alienação.</p>
          <p>Tecnologia sem dependência.</p>
        </div>

        <p className="text-text-secondary">
          Estudamos forma, ritmo, montagem, símbolo, desejo
          <br />
          como estruturas de pensamento —
          <br />
          usando IA como ferramenta, não como centro.
        </p>

        <p
          className="text-lg text-text-muted border-l-2
                      border-ancestral-terracotta pl-4 mt-8"
        >
          Não é curso online.
          <br />É imersão.
        </p>
      </div>
    </motion.div>
  );
};

export default EstudosOpening;
