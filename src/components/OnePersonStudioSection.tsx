import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "CRIAR",
    description: "Produzir conteúdo com qualidade de studio. Vídeo, imagem, texto, código — sozinho.",
  },
  {
    number: "02",
    title: "ESTRUTURAR",
    description: "Transformar conhecimento em produto. Cursos, mentorias, serviços, ativos digitais.",
  },
  {
    number: "03",
    title: "VENDER",
    description: "Monetizar sem parecer vendedor. Narrativa que converte. Presença que atrai.",
  },
  {
    number: "04",
    title: "OPERAR",
    description: "Rodar o negócio em 4h/dia. Sistemas que funcionam enquanto você cria.",
  },
];

const oldStack = [
  "Editor",
  "Designer",
  "Copywriter",
  "Filmmaker",
  "Social media",
  "Dev",
  "Estrategista",
];

const newStack = [
  "Clareza",
  "Sistema",
  "Ferramentas certas",
  "Você",
];

export const OnePersonStudioSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-stone-dark relative overflow-hidden">
      {/* Background grid */}
      <div className="brutal-grid absolute inset-0 opacity-5 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="code-text text-xs mb-6 text-matrix-green">
            &gt; ONE_PERSON_STUDIO.manifest
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-ancestral-white leading-[0.95] mb-6">
            O studio completo
            <br />
            <span className="text-tech-olive">cabe em uma pessoa.</span>
          </h2>

          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl">
            A IA não substituiu criadores.
            <br />
            <span className="text-ancestral-white">Substituiu equipes.</span>
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {/* Before */}
          <div className="p-8 border border-text-muted/20 bg-ancestral-black/50">
            <div className="code-text text-xs text-text-muted mb-6">
              // ANTES
            </div>
            <p className="text-lg text-text-secondary mb-6">
              Você precisava de:
            </p>
            <div className="space-y-3">
              {oldStack.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-text-muted">
                  <span className="text-red-500/60">→</span>
                  <span className="line-through opacity-60">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="p-8 border-2 border-matrix-green bg-matrix-green/5">
            <div className="code-text text-xs text-matrix-green mb-6">
              // AGORA
            </div>
            <p className="text-lg text-ancestral-white mb-6">
              Você precisa de:
            </p>
            <div className="space-y-3">
              {newStack.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-ancestral-white">
                  <span className="text-matrix-green">→</span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-32 h-px bg-matrix-green mx-auto mb-20" />

        {/* What We Teach */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="code-text text-xs text-text-muted mb-8">
            O QUE ENSINAMOS
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-text-muted/20 hover:border-matrix-green/50 transition-colors group"
              >
                <div className="font-mono-v2 text-3xl text-text-muted/30 mb-4 group-hover:text-matrix-green/50 transition-colors">
                  {cap.number}
                </div>
                <h3 className="font-display text-xl text-ancestral-white mb-3 group-hover:text-matrix-green transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-text-secondary mb-8">
            "Não formamos funcionários.
            <br />
            <span className="text-ancestral-white">Formamos studios de uma pessoa só."</span>
          </p>

          <a
            href="#cursos"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-matrix-green text-matrix-green font-mono-v2 text-sm uppercase tracking-wider hover:bg-matrix-green hover:text-brutal-black transition-all"
          >
            <span>Ver cursos</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OnePersonStudioSection;
