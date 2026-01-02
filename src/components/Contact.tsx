import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple, staggerContainer, slideInLeft, slideInRight } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Contact = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="oferta" className="py-20 md:py-32 bg-white relative overflow-hidden" ref={ref as any}>
      {/* Scanlines de fundo */}
      <div className="scanlines absolute inset-0 opacity-20" />
      
      <motion.div 
        className="brutal-container max-w-5xl mx-auto px-4 relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Coluna esquerda - CTA */}
          <motion.div className="space-y-8" variants={prefersReducedMotion ? {} : slideInLeft}>
            <div className="code-text text-xs text-brutal-black">
              &gt; OFFER.INIT
            </div>
            
            <h2 className="text-brutal-black leading-none">
              GANHE SEU<br />DINHEIRO DE VOLTA
            </h2>
            
            <div className="w-24 h-px bg-brutal-black" />
            
            <div className="space-y-6">
              <p className="poetic-text text-lg text-brutal-black/90">
                Pague <span className="code-text not-italic text-matrix-green">R$997</span> hoje.
                <br />
                Se você não criar seu primeiro projeto autoral em 30 dias, devolvemos 100% do seu dinheiro.
              </p>
              
              <p className="text-brutal-black/70 text-sm uppercase tracking-wider">
                Participe de 4 encontros ao vivo · Publique 1 projeto criativo · Complete o módulo "Cosmologia Pessoal"
              </p>
            </div>
            
            {/* Botão CTA */}
            <div className="pt-8">
              <button className="btn-primary w-full md:w-auto">
                Entrar na Turma Fundadora
              </button>
            </div>
          </motion.div>
          
          {/* Coluna direita - Informações */}
          <motion.div className="space-y-8" variants={prefersReducedMotion ? {} : slideInRight}>
            {/* O que entregamos */}
            <div className="border-2 border-brutal-black/20 bg-warm-ivory p-6">
              <h3 className="text-lg md:text-xl text-brutal-black mb-4 uppercase tracking-tight">
                O QUE VOCÊ RECEBE
              </h3>
              <div className="h-px bg-brutal-black/20 my-3" />
              <div className="space-y-3">
                <p className="text-brutal-black/90 text-sm">
                  → Aula-Laboratório com Taynã <span className="code-text text-xs">[1x/semana]</span>
                </p>
                <p className="text-brutal-black/90 text-sm">
                  → Oficina Técnica de IA <span className="code-text text-xs">[1x/semana]</span>
                </p>
                <p className="text-brutal-black/90 text-sm">
                  → Comunidade Viva <span className="code-text text-xs">[24h ativa]</span>
                </p>
                <p className="text-brutal-black/90 text-sm">
                  → Biblioteca de Prompts e IAs <span className="code-text text-xs">[atualização semanal]</span>
                </p>
                <p className="text-brutal-black/90 text-sm">
                  → Rituais Criativos Mensais <span className="code-text text-xs">[temas simbólicos]</span>
                </p>
              </div>
            </div>
            
            {/* Garantia */}
            <div className="border-2 border-matrix-green bg-matrix-green/5 p-6 border-l-4">
              <h3 className="text-lg md:text-xl text-brutal-black mb-4 uppercase tracking-tight">
                GARANTIA TOTAL
              </h3>
              <div className="h-px bg-brutal-black/20 my-3" />
              <p className="poetic-text text-base text-brutal-black/80">
                Remove risco total. Aumenta conversão em 3-4x. 
                Só 10% pedem reembolso.
              </p>
              <p className="code-text text-xs mt-4 text-matrix-green">
                [ROI_TYPICAL: 34:1_IN_48H]
              </p>
            </div>
            
            {/* Sobre */}
            <div className="border-2 border-brutal-black/20 bg-warm-ivory p-6">
              <h3 className="text-lg md:text-xl text-brutal-black mb-4 uppercase tracking-tight">
                SOBRE O AI.TELIER
              </h3>
              <div className="h-px bg-brutal-black/20 my-3" />
              <p className="text-brutal-black/80 text-sm leading-relaxed mb-4 font-serif italic">
                AI.TELIER é a Escola e o Estúdio da Nova Era Criativa.
                Unimos arte, tecnologia e direção para formar criadores e produzir obras que unem alma e algoritmo.
              </p>
              <p className="text-brutal-black/90 text-xs mt-3">
                Email: <span className="code-text">contato@ai.telier</span>
              </p>
              <p className="text-brutal-black/90 text-xs mt-2">
                Instagram: <span className="code-text">@ai.telier</span>
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Footer message */}
        <motion.div className="mt-20 text-center" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
          <p className="code-text text-sm text-brutal-black/50">
            [TRANSMISSION_ACTIVE]
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-matrix-green" />
            <span className="code-text text-xs text-brutal-black/50">CONSCIOUSNESS_PROTOCOL_RUNNING</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Grid de fundo */}
      <div className="brutal-grid absolute inset-0 opacity-5 pointer-events-none" />
    </section>
  );
};

export default Contact;
