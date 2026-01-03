import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Film,
  Eye,
  Clapperboard,
  FileText,
  Volume2,
  Palette,
} from "lucide-react";

const pillars = [
  {
    id: "01",
    icon: Eye,
    title: "Direção",
    subtitle: "A visão que guia tudo",
    description:
      "Como traduzir uma ideia em linguagem visual. Comando de cena, direção de atores (humanos e sintéticos), construção de atmosfera.",
    topics: ["Comando criativo", "Direção de atores IA", "Construção de atmosfera", "Ponto de vista narrativo"],
  },
  {
    id: "02",
    icon: Clapperboard,
    title: "Mise en Scène",
    subtitle: "O que está em cena",
    description:
      "Composição de quadro, posicionamento de elementos, iluminação expressiva, cenografia e figurino como narrativa.",
    topics: ["Composição de quadro", "Iluminação narrativa", "Cenografia", "Figurino como personagem"],
  },
  {
    id: "03",
    icon: Film,
    title: "Decupagem",
    subtitle: "A montagem antes da montagem",
    description:
      "Fragmentação da cena em planos. Lógica de corte, ritmo, continuidade. Como pensar cinematicamente antes de gerar.",
    topics: ["Fragmentação de cena", "Lógica de corte", "Ritmo e timing", "Raccord e continuidade"],
  },
  {
    id: "04",
    icon: FileText,
    title: "Roteiro",
    subtitle: "A estrutura invisível",
    description:
      "Estrutura dramática, arcos de personagem, diálogos, subtext. Como escrever para IA executar com precisão.",
    topics: ["Estrutura de 3 atos", "Arco de personagem", "Diálogo e subtext", "Prompts cinematográficos"],
  },
  {
    id: "05",
    icon: Volume2,
    title: "Som & Música",
    subtitle: "50% do cinema é som",
    description:
      "Design de som, diálogos, foley, música original. Como criar paisagens sonoras completas com IA.",
    topics: ["Sound design", "Diálogo e ADR", "Foley e ambientes", "Composição musical IA"],
  },
  {
    id: "06",
    icon: Palette,
    title: "Linguagem Visual",
    subtitle: "O vocabulário do cineasta",
    description:
      "Color grading, textura, movimento de câmera, transições. Como criar uma identidade visual consistente.",
    topics: ["Color science", "Camera movement", "Transições narrativas", "Identidade visual"],
  },
];

export const CSCSyllabus = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="syllabus"
      ref={ref}
      className="relative py-24 md:py-32 bg-stone-dark overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest block mb-4">
            {">"} EMENTA_CINEMATOGRAFICA.syllabus
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white mb-6">
            O Que Você Vai{" "}
            <span className="text-tech-olive">Dominar</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            6 pilares fundamentais do cinema. Conhecimento real de escola de cinema,
            <br className="hidden md:block" />
            aplicado com ferramentas de IA de última geração.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-6 md:p-8 bg-ancestral-black/50 border border-text-muted/20
                           hover:border-tech-olive/50 transition-all duration-300"
              >
                {/* Number */}
                <span className="absolute top-4 right-4 text-6xl font-display font-black
                               text-tech-olive/10 group-hover:text-tech-olive/20 transition-colors">
                  {pillar.id}
                </span>

                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-tech-olive" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-ancestral-white mb-1 normal-case">
                  {pillar.title}
                </h3>
                <p className="text-sm text-tech-olive font-mono-v2 mb-4">
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Topics */}
                <ul className="space-y-2">
                  {pillar.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-1 h-1 bg-tech-olive" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm font-mono-v2">
            // Cada pilar inclui teoria, prática guiada e criação de obra própria
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCSyllabus;
