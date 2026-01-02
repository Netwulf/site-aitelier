import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple } from "@/utils/motionVariants";
import { GraduationCap, Film } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TwoFronts = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="studio" 
      className="py-20 md:py-32 bg-zinc-50 relative overflow-hidden" 
      ref={ref as any}
    >
      {/* Bauhaus geometric shapes */}
      <div className="absolute top-10 right-10 w-40 h-40 border-4 border-brutal-black/10 rotate-45" />
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border-4 border-matrix-green/20" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-matrix-green/5" />
      
      <div className="brutal-container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="code-text text-xs mb-4 text-brutal-black/60">
            &gt; DUAL_NATURE.REVEAL
          </div>
          <h2 className="text-brutal-black mb-6 text-5xl md:text-7xl font-black uppercase tracking-tighter">
            DUAS FRENTES.<br />UMA MISSÃO.
          </h2>
          <div className="w-24 h-1 bg-matrix-green mx-auto" />
        </motion.div>

        {/* Split Screen Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* School Card */}
          <motion.div
            className="group relative bg-brutal-black border-4 border-brutal-black p-10 md:p-16 hover:border-matrix-green transition-all duration-500 overflow-hidden"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={prefersReducedMotion ? {} : fadeInUpSimple}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-matrix-green/10 flex items-center justify-center group-hover:bg-matrix-green/20 transition-colors">
                  <GraduationCap className="w-10 h-10 text-matrix-green" strokeWidth={1.5} />
                </div>
              </div>

              {/* Tag */}
              <div className="code-text text-xs mb-4 text-matrix-green">
                [ESCOLA]
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl text-brutal-white mb-6 font-bold uppercase tracking-tight">
                AI.TELIER<br />BRAND OS SCHOOL
              </h3>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-matrix-green font-serif italic mb-8">
                Aprenda a construir seu One Person Brand.
              </p>

              {/* Description */}
              <p className="text-lg text-brutal-white/70 leading-relaxed mb-6">
                O programa completo de Branding e IA para transformar 
                sua identidade em um negócio autônomo.
              </p>

              {/* Features list */}
              <ul className="space-y-2 text-sm text-brutal-white/60 mb-10">
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>Brand OS Foundation (programa-mãe certificado)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>AI Labs (Visual, Music, Video, Storytelling)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>Advanced Tracks (Brand Director | AI Creator | One-Person Founder)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>AI.TELIER Collective (comunidade de prática e mentoria)</span>
                </li>
              </ul>

              {/* Line */}
              <div className="w-0 h-px bg-matrix-green transition-all duration-700 group-hover:w-full mb-8" />

              {/* CTA */}
              <a 
                href="#programas" 
                className="inline-block btn-ghost"
              >
                Ver Programas
              </a>
            </div>
          </motion.div>

          {/* Studio Card */}
          <motion.div
            className="group relative bg-brutal-black border-4 border-brutal-black p-10 md:p-16 hover:border-matrix-green transition-all duration-500 overflow-hidden"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={prefersReducedMotion ? {} : fadeInUpSimple}
            style={{ transitionDelay: '0.1s' }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-matrix-green/10 flex items-center justify-center group-hover:bg-matrix-green/20 transition-colors">
                  <Film className="w-10 h-10 text-matrix-green" strokeWidth={1.5} />
                </div>
              </div>

              {/* Tag */}
              <div className="code-text text-xs mb-4 text-matrix-green">
                [ESTÚDIO]
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl text-brutal-white mb-6 font-bold uppercase tracking-tight">
                AI.TELIER<br />STUDIO
              </h3>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-matrix-green font-serif italic mb-8">
                Criamos sistemas de marca e narrativas com IA.
              </p>

              {/* Description */}
              <p className="text-lg text-brutal-white/70 leading-relaxed mb-6">
                Branding, identidade visual, conteúdo e universos criativos 
                para marcas e criadores que querem se posicionar no futuro.
              </p>

              {/* Features list */}
              <ul className="space-y-2 text-sm text-brutal-white/60 mb-10">
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>Brand OS para marcas pessoais e empresas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>Identidades visuais e sistemas criativos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>Campanhas e conteúdo estratégico com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green">→</span>
                  <span>Direção criativa e consultoria em IA</span>
                </li>
              </ul>

              {/* Line */}
              <div className="w-0 h-px bg-matrix-green transition-all duration-700 group-hover:w-full mb-8" />

              {/* CTA */}
              <a 
                href="#projetos" 
                className="inline-block btn-ghost"
              >
                Ver Projetos
              </a>
            </div>
          </motion.div>
        </div>

        {/* Central Quote */}
        <motion.div
          className="mt-16 text-center relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-matrix-green rounded-full" />
          </div>
          <div className="h-1 bg-brutal-black/10 mb-8" />
          <p className="text-3xl md:text-5xl text-brutal-black font-black uppercase tracking-tighter max-w-3xl mx-auto leading-tight">
            A ARTE QUE ENSINAMOS CRIA.<br />
            A ARTE QUE CRIAMOS ENSINA.
          </p>
          <div className="h-1 bg-brutal-black/10 mt-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default TwoFronts;
