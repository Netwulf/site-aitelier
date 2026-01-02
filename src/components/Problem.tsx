import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Problem = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="problema" className="py-20 md:py-32 bg-concrete-gray relative" ref={ref as any}>
      {/* Grid de fundo */}
      <div className="brutal-grid absolute inset-0 opacity-10" />
      
      <motion.div 
        className="brutal-container max-w-6xl mx-auto px-4 relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : staggerContainer}
      >
        {/* Header */}
        <motion.div className="mb-16" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
          <div className="code-text text-xs mb-4">
            &gt; DIAGNOSIS.RUN
          </div>
          <h2 className="text-brutal-white mb-4">
            O PROBLEMA QUE<br />RESOLVEMOS
          </h2>
          <div className="w-20 h-px bg-matrix-green" />
        </motion.div>
        
        {/* Intro */}
        <motion.div className="mb-16" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
          <p className="poetic-text text-xl md:text-2xl text-brutal-white/90 leading-relaxed max-w-3xl">
            O mundo está sendo automatizado. IA já replica técnica melhor e mais rápido que humanos. 
            E a maioria das pessoas está respondendo de duas formas igualmente erradas:
          </p>
        </motion.div>
        
        {/* Grid de grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Grupo 1 */}
          <motion.div className="glass p-8 md:p-10" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
            <div className="code-text text-sm mb-4 text-matrix-green">
              [GRUPO_01]
            </div>
            <h3 className="text-2xl md:text-3xl text-brutal-white mb-6 uppercase tracking-tight">
              PÂNICO
            </h3>
            <p className="poetic-text text-lg text-brutal-white/80">
              "IA vai acabar com os artistas/criadores."
            </p>
          </motion.div>
          
          {/* Grupo 2 */}
          <motion.div className="glass p-8 md:p-10" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
            <div className="code-text text-sm mb-4 text-matrix-green">
              [GRUPO_02]
            </div>
            <h3 className="text-2xl md:text-3xl text-brutal-white mb-6 uppercase tracking-tight">
              PRODUTIVISMO
            </h3>
            <p className="poetic-text text-lg text-brutal-white/80">
              "Vou usar IA pra produzir 10x mais conteúdo."
            </p>
          </motion.div>
        </div>
        
        {/* Verdade */}
        <motion.div 
          className="glass-strong p-10 md:p-16 border-l-4 border-l-matrix-green"
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="code-text text-sm mb-6 text-matrix-green terminal-flicker">
            &gt; TRUTH.REVEAL
          </div>
          <h3 className="text-3xl md:text-5xl text-brutal-white mb-8 uppercase tracking-tight">
            A VERDADE
          </h3>
          <p className="poetic-text text-xl md:text-2xl text-brutal-white/90 leading-relaxed mb-8">
            IA não mata arte. Revela o que ela sempre foi.
          </p>
          <div className="w-32 h-px bg-matrix-green my-8" />
          <p className="text-lg text-brutal-white/80 leading-relaxed">
            Técnica será automatizada. O que não pode ser automatizado — e portanto se torna infinitamente valioso — é <span className="code-text text-matrix-green">Cosmologia + Expressão</span>.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Problem;
