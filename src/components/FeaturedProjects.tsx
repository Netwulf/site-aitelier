import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { ArrowRight, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FeaturedProjects = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const projects = [
    {
      category: "Brand OS Completo",
      title: "[Nome do Aluno] — Designer Visual",
      description: "Sistema de identidade pessoal + automação de conteúdo + produtos digitais.",
      tools: "Brand OS Foundation + AI Labs",
      type: "student"
    },
    {
      category: "Brand",
      title: "Identidade NEON Corp",
      description: "Sistema visual completo para marca tech do futuro.",
      tools: "Stable Diffusion, Figma",
      type: "studio"
    },
    {
      category: "Brand OS Completo",
      title: "[Nome do Aluno] — Estrategista de Conteúdo",
      description: "Sistema de narrativa pessoal + clonagem cognitiva + comunidade própria.",
      tools: "Brand OS Foundation + AI Labs",
      type: "student"
    },
    {
      category: "Concept Art",
      title: "Cidades Invisíveis",
      description: "Série de mundos arquitetônicos impossíveis gerados com IA.",
      tools: "Midjourney, Photoshop",
      type: "studio"
    },
    {
      category: "Brand OS Completo",
      title: "[Nome do Aluno] — Músico e Produtor",
      description: "Sistema de identidade sonora + música generativa + produtos autorais.",
      tools: "Brand OS Foundation + AI Labs",
      type: "student"
    },
    {
      category: "Brand",
      title: "Cosmos Studio",
      description: "Branding e web design para estúdio de criação com IA.",
      tools: "Claude, Midjourney, Framer",
      type: "studio"
    },
  ];

  return (
    <section 
      id="projetos" 
      className="py-20 md:py-32 bg-concrete-gray relative" 
      ref={ref as any}
    >
      {/* Background grid */}
      <div className="brutal-grid absolute inset-0 opacity-10" />

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
            &gt; PORTFOLIO.LOAD
          </div>
          <h2 className="text-brutal-white mb-6">
            PROJETOS &<br />SISTEMAS DE MARCA
          </h2>
          <div className="w-24 h-px bg-matrix-green mb-6" />
          <p className="poetic-text text-lg md:text-xl text-brutal-white/80 max-w-3xl">
            O que criamos no AI.TELIER Studio — e os One Person Brands 
            que nossos alunos construíram com Brand OS.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glass group hover:border-matrix-green/30 transition-all cursor-pointer overflow-hidden"
              variants={prefersReducedMotion ? {} : fadeInUpSimple}
              style={{ transitionDelay: `${index * 0.1}s` }}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
            >
              {/* Thumbnail placeholder with gradient */}
              <div className="aspect-video bg-gradient-to-br from-matrix-green/20 via-brutal-black to-brutal-black relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-matrix-green/30 group-hover:text-matrix-green/60 transition-colors" />
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs px-3 py-1 bg-brutal-black/80 backdrop-blur-sm text-matrix-green rounded-full uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-matrix-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl text-brutal-white mb-3 group-hover:text-matrix-green transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-brutal-white/60 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="code-text text-xs text-matrix-green/60 mb-4">
                  {project.tools}
                </div>

                {/* Tag line */}
                <p className="text-xs text-brutal-white/40 italic border-t border-concrete-border/30 pt-4">
                  {project.type === 'student' ? 'One Person Brand Real →' : 'Projeto AI.TELIER Studio →'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <a 
            href="#todos-projetos" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Ver Todos os Projetos
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
