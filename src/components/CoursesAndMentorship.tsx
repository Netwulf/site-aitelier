import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Sparkles, Users, Zap, ArrowRight } from "lucide-react";

const CoursesAndMentorship = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const programs = [
    {
      category: "PROGRAMA PRINCIPAL",
      title: "Brand OS Foundation",
      duration: "12 semanas intensivas",
      description: "O programa-mãe certificado. Desenvolva sua cosmologia, posicionamento e expressão única. Construa as fundações do seu One Person Brand.",
      modules: [
        "Identidade & Cosmologia Pessoal",
        "Posicionamento & Narrativa Única",
        "Expressão Visual com IA",
        "Sistema de Conteúdo Autônomo"
      ],
      icon: Sparkles,
      investment: "R$ 3.997",
      status: "Próxima turma: Fevereiro 2025"
    },
    {
      category: "LABORATÓRIOS AVANÇADOS",
      title: "AI Labs",
      duration: "4 semanas cada",
      description: "Especializações práticas em criação com IA. Visual, Music, Video e Storytelling. Para quem já tem Brand OS Foundation ou experiência prévia.",
      modules: [
        "AI Visual Lab (Imagem & Identidade)",
        "AI Music Lab (Som & Atmosfera)",
        "AI Video Lab (Narrativa Audiovisual)",
        "AI Story Lab (Texto & Roteiro)"
      ],
      icon: Zap,
      investment: "R$ 997 cada lab",
      status: "Inscrições abertas"
    },
    {
      category: "MENTORIA INDIVIDUAL",
      title: "Brand OS Mentorship",
      duration: "3 ou 6 meses",
      description: "Mentoria 1:1 com Felipe Leonel. Construção guiada do seu One Person Brand completo: identidade, sistema e negócio.",
      modules: [
        "Sessões semanais de 1h",
        "Análise de portfolio e posicionamento",
        "Acompanhamento de implementação",
        "Acesso a todos os programas"
      ],
      icon: Users,
      investment: "Sob consulta",
      status: "Vagas limitadas"
    }
  ];

  return (
    <section 
      id="programas" 
      className="py-20 md:py-32 bg-brutal-black relative z-10" 
      ref={ref as any}
    >
      {/* Background effects */}
      <div className="brutal-grid absolute inset-0 opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matrix-green/5 to-transparent" />

      <motion.div 
        className="brutal-container max-w-7xl mx-auto px-4 relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : staggerContainer}
      >
        {/* Header */}
        <motion.div 
          className="mb-16"
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="code-text text-xs mb-4 terminal-flicker">
            &gt; EDUCATION.INIT
          </div>
          <h2 className="text-brutal-white mb-6">
            CURSOS &<br />MENTORIAS
          </h2>
          <div className="w-24 h-px bg-matrix-green mb-6" />
          <p className="poetic-text text-lg md:text-xl text-brutal-white/80 max-w-3xl">
            Aprenda o método Brand OS e construa seu One Person Brand. 
            Programas online, comunidade ativa e mentoria especializada.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="glass group hover:border-matrix-green/30 transition-all"
              variants={prefersReducedMotion ? {} : fadeInUpSimple}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="p-6 border-b border-concrete-border/20">
                <div className="flex items-start justify-between mb-4">
                  <program.icon className="w-10 h-10 text-matrix-green" />
                  <span className="text-xs px-3 py-1 bg-matrix-green/10 text-matrix-green rounded-full uppercase tracking-wider font-semibold">
                    {program.category}
                  </span>
                </div>
                
                <h3 className="text-2xl text-brutal-white mb-2 group-hover:text-matrix-green transition-colors">
                  {program.title}
                </h3>
                
                <div className="code-text text-xs text-matrix-green/60 mb-4">
                  {program.duration}
                </div>

                <p className="text-sm text-brutal-white/70 leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* Modules */}
              <div className="p-6 space-y-3">
                {program.modules.map((module, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-matrix-green rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-brutal-white/60">{module}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-concrete-border/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-brutal-white/40 uppercase tracking-wide mb-1">
                      Investimento
                    </div>
                    <div className="text-xl text-matrix-green font-semibold">
                      {program.investment}
                    </div>
                  </div>
                  <div className="text-xs text-brutal-white/60 text-right">
                    {program.status}
                  </div>
                </div>

                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  Saber Mais
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-matrix-green/20"
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div>
            <h4 className="code-text text-xs text-matrix-green mb-3">FORMATO</h4>
            <p className="text-sm text-brutal-white/70">
              Aulas ao vivo online, gravações disponíveis, comunidade no Discord e biblioteca de recursos.
            </p>
          </div>
          <div>
            <h4 className="code-text text-xs text-matrix-green mb-3">CERTIFICADO</h4>
            <p className="text-sm text-brutal-white/70">
              Brand OS Foundation é certificado. AI Labs e Mentorship incluem badge de conclusão.
            </p>
          </div>
          <div>
            <h4 className="code-text text-xs text-matrix-green mb-3">GARANTIA</h4>
            <p className="text-sm text-brutal-white/70">
              7 dias de garantia incondicional. Não gostou? Devolvemos 100% do investimento.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoursesAndMentorship;
