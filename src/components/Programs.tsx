import studioImage from "@/assets/studio-workshop.jpg";
import handsImage from "@/assets/hands-creating.jpg";
import paintingImage from "@/assets/painting-session.jpg";
import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple, staggerContainer, slideInLeft } from "@/utils/motionVariants";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Programs = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  
  const programs = [
    {
      title: "PRÁTICO",
      duration: "IA APLICADA",
      description: "Geração de imagens, vídeos, roteiros, música e clones de voz. Criação de identidades visuais, produtos criativos e narrativas. Uso consciente e autoral das ferramentas.",
      image: studioImage,
    },
    {
      title: "FILOSÓFICO",
      duration: "CONSCIÊNCIA CRIATIVA",
      description: "O papel do criador na era das máquinas. Desenvolvimento de cosmologia e expressão próprias. Psicologia arquetípica e storytelling simbólico.",
      image: paintingImage,
    },
    {
      title: "ECONÔMICO",
      duration: "MODELO DE NEGÓCIO",
      description: "Construção de One Person Business com IA. Monetização de expressão: Substack, YouTube, produtos digitais. Economia da atenção e design de comunidade.",
      image: handsImage,
    },
  ];

  return (
    <section id="programas" className="py-20 md:py-32 bg-brutal-black" ref={ref as any}>
      <motion.div 
        className="brutal-container max-w-7xl mx-auto px-4"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : staggerContainer}
      >
        {/* Título da seção */}
        <motion.div className="mb-16" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
          <div className="code-text text-xs mb-4">
            &gt; STRUCTURE.INIT
          </div>
          <h2 className="text-brutal-white mb-4">
            ESTRUTURA DE<br />CONTEÚDO
          </h2>
          <div className="w-20 h-px bg-matrix-green" />
          <p className="poetic-text text-lg text-brutal-white/80 mt-6 max-w-2xl">
            Três níveis integrados — prática, consciência e economia
          </p>
        </motion.div>
        
        {/* Grid de programas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {programs.map((program, index) => (
            <motion.div 
              key={index}
              className="brutal-block p-0 hover-brutal cursor-brutal group"
              variants={prefersReducedMotion ? {} : slideInLeft}
            >
              {/* Imagem com overlay */}
              <div className="relative h-64 overflow-hidden">
                <OptimizedImage 
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-brutal group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/50 to-transparent" />
                
                {/* Código verde no canto */}
                <div className="absolute top-4 right-4 code-text text-xs">
                  [{index + 1}/3]
                </div>
              </div>
              
              {/* Conteúdo */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-brutal-white text-xl md:text-2xl">
                    {program.title}
                  </h3>
                  <span className="code-text text-xs">
                    {program.duration}
                  </span>
                </div>
                
                <div className="brutal-line my-4" />
                
                <p className="poetic-text text-base text-brutal-white/80">
                  {program.description}
                </p>
                
                {/* Linha verde de hover */}
                <div className="w-0 h-px bg-matrix-green transition-all duration-300 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Nota de rodapé */}
        <motion.div className="mt-12 text-center" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
          <p className="text-concrete text-sm uppercase tracking-wider">
            Aulas ao vivo 2x/semana + Comunidade ativa + Biblioteca de prompts e IAs
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Programs;
