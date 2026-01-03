import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Video,
  BookOpen,
  Bot,
  Users,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Encontros ao Vivo",
    description: "3 horas por semana de imersão com Taynã. Aulas, análises de filmes, criação guiada.",
    accent: true,
  },
  {
    icon: BookOpen,
    title: "Conteúdo Gravado",
    description: "Biblioteca de apoio com técnicas, referências e tutoriais para revisar quando precisar.",
    accent: false,
  },
  {
    icon: Bot,
    title: "Suporte IA 24h",
    description: "Inteligências treinadas para ajudar você a qualquer momento. Dúvidas técnicas, criativas, de prompt.",
    accent: false,
  },
  {
    icon: Users,
    title: "Feedback Humano",
    description: "Acompanhamento individualizado das suas obras. Direção criativa personalizada.",
    accent: false,
  },
  {
    icon: Sparkles,
    title: "Ferramentas ai.telier",
    description: "Acesso às ferramentas proprietárias do ai.telier. Prompts, workflows, templates cinematográficos.",
    accent: false,
  },
  {
    icon: MessageSquare,
    title: "Clones Mentores",
    description: "Converse com inteligências treinadas em grandes cineastas. Lynch, Kubrick, Tarkovsky ao seu lado.",
    accent: false,
  },
];

export const CSCComoFunciona = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="relative py-24 md:py-32 bg-ancestral-black overflow-hidden"
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
            {">"} METODOLOGIA.structure
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white mb-6">
            Como{" "}
            <span className="text-tech-olive">Funciona</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Uma estrutura híbrida que combina o melhor do ensino presencial
            <br className="hidden md:block" />
            com o poder ilimitado da inteligência artificial.
          </p>
        </motion.div>

        {/* Main feature - Live sessions */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-8 md:p-12 bg-tech-olive/10 border-2 border-tech-olive"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 bg-tech-olive">
              <Video className="w-8 h-8 text-ancestral-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-ancestral-white mb-2 normal-case">
                Encontros ao Vivo Semanais
              </h3>
              <p className="text-lg text-text-secondary mb-4">
                O coração da formação. 3 horas por semana de imersão direta com Taynã Puri.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-ancestral-black/50">
                  <span className="text-tech-olive font-mono-v2">TEORIA</span>
                  <p className="text-text-muted mt-1">Fundamentos de cinema, análise de obras, linguagem visual</p>
                </div>
                <div className="p-4 bg-ancestral-black/50">
                  <span className="text-tech-olive font-mono-v2">PRÁTICA</span>
                  <p className="text-text-muted mt-1">Criação guiada ao vivo, experimentação, feedback em tempo real</p>
                </div>
                <div className="p-4 bg-ancestral-black/50">
                  <span className="text-tech-olive font-mono-v2">REVIEW</span>
                  <p className="text-text-muted mt-1">Análise das obras da turma, direção criativa, evolução individual</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.slice(1).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="p-6 bg-stone-dark/50 border border-text-muted/20
                           hover:border-tech-olive/30 transition-all duration-300"
              >
                <Icon className="w-6 h-6 text-tech-olive mb-4" />
                <h3 className="text-lg font-display font-bold text-ancestral-white mb-2 normal-case">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline visualization */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 border border-text-muted/20"
        >
          <h4 className="text-sm font-mono-v2 text-text-muted mb-6 tracking-widest">
            {">"} JORNADA_6_MESES.timeline
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((month) => (
              <div key={month} className="text-center">
                <div className="h-2 bg-tech-olive/30 mb-2 relative">
                  <div
                    className="absolute inset-0 bg-tech-olive"
                    style={{ width: `${(month / 6) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono-v2 text-text-muted">
                  MÊS {month}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-text-muted font-mono-v2">
            <span>Fundamentos + Experimentação</span>
            <span>Produção de Obra Final</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCComoFunciona;
