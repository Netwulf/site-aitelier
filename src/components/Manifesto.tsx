import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUp, staggerContainer } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState, useEffect } from "react";

const Manifesto = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.2, once: true });
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <section 
      id="manifesto" 
      className="py-20 md:py-32 bg-concrete-gray relative" 
      ref={ref as any}
      style={{ willChange: isInView && !hasAnimated ? 'transform, opacity' : 'auto' }}
    >
      {/* Grid de fundo */}
      <div className="brutal-grid absolute inset-0 opacity-10" />
      
      <motion.div 
        className="brutal-container max-w-4xl mx-auto px-4 relative z-10"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : staggerContainer}
      >
        {/* Header */}
        <motion.div className="mb-16 text-center" variants={prefersReducedMotion ? {} : fadeInUp}>
          <div className="code-text text-xs mb-4 terminal-flicker">
            &gt; THESIS.LOAD
          </div>
          <h2 className="text-brutal-white">
            NOSSA TESE<br />CENTRAL
          </h2>
        </motion.div>
        
        {/* Blocos de manifesto */}
        <div className="space-y-12">
          {/* Bloco 1 */}
          <motion.div className="glass p-8 md:p-12" variants={prefersReducedMotion ? {} : fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <span className="code-text text-2xl">01</span>
              <div className="w-full h-px bg-matrix-green mt-4" />
            </div>
            <h3 className="text-2xl md:text-3xl text-brutal-white mb-6 uppercase tracking-tight">
              COSMOLOGIA
            </h3>
            <p className="poetic-text text-lg text-brutal-white/90 leading-relaxed">
              O universo completo que você cria. A lógica interna. A forma como tudo conversa entre si. 
              Sua visão de mundo materializada. Não é técnica — é sua verdade transformada em linguagem visual.
            </p>
          </motion.div>
          
          {/* Bloco 2 */}
          <motion.div className="glass p-8 md:p-12" variants={prefersReducedMotion ? {} : fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <span className="code-text text-2xl">02</span>
              <div className="w-full h-px bg-matrix-green mt-4" />
            </div>
            <h3 className="text-2xl md:text-3xl text-brutal-white mb-6 uppercase tracking-tight">
              EXPRESSÃO
            </h3>
            <p className="poetic-text text-lg text-brutal-white/90 leading-relaxed">
              Sua impressão digital humana. O que faz você criar algo diferente usando as mesmas ferramentas que qualquer um tem acesso. 
              O estilo insubstituível que emerge quando você para de copiar.
            </p>
          </motion.div>
          
          {/* Bloco 3 */}
          <motion.div className="glass p-8 md:p-12" variants={prefersReducedMotion ? {} : fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <span className="code-text text-2xl">03</span>
              <div className="w-full h-px bg-matrix-green mt-4" />
            </div>
            <h3 className="text-2xl md:text-3xl text-brutal-white mb-6 uppercase tracking-tight">
              CRIADORES CONSCIENTES
            </h3>
            <p className="poetic-text text-lg text-brutal-white/90 leading-relaxed">
              O futuro não precisa de mais robôs. Precisa de pessoas que unem tecnologia, arte e consciência. 
              Que sabem materializar visão sem perder alma. Que dominam ferramentas sem virar ferramenta.
            </p>
          </motion.div>
          
          {/* Bloco 4 */}
          <motion.div className="glass p-8 md:p-12" variants={prefersReducedMotion ? {} : fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <span className="code-text text-2xl">04</span>
              <div className="w-full h-px bg-matrix-green mt-4" />
            </div>
            <h3 className="text-2xl md:text-3xl text-brutal-white mb-6 uppercase tracking-tight">
              AS DUAS HABILIDADES INAUTOMATIZÁVEIS
            </h3>
            <p className="poetic-text text-lg text-brutal-white/90 leading-relaxed">
              Pensar como artista (desenvolver cosmologia e expressão próprias). 
              Criar como engenheiro (usar IA como ferramenta de materialização). 
              Juntas, elas formam o criador que o futuro não consegue replicar.
            </p>
          </motion.div>
        </div>
        
        {/* Citação final */}
        <motion.div className="mt-20 text-center" variants={prefersReducedMotion ? {} : fadeInUp}>
          <blockquote className="text-2xl md:text-4xl text-matrix-green font-mono leading-tight">
            "QUANDO TUDO É FEITO POR MÁQUINAS,<br />O QUE TEM VALOR É O QUE CARREGA ESPÍRITO."
          </blockquote>
          <div className="w-32 h-px bg-matrix-green mx-auto mt-8" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
