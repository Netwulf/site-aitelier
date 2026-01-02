import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple } from "@/utils/motionVariants";

const BriefAbout = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-40 px-4 md:px-8 overflow-hidden bg-brutal-black">
      {/* Respiro visual - seção mais quieta */}
      <div className="mesh-gradient-2" style={{ opacity: 0.3 }} />

      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={fadeInUpSimple}
        className="container mx-auto max-w-4xl relative z-10 text-center"
      >
        {/* Linha verde acima */}
        <div className="w-24 h-px bg-matrix-green mx-auto mb-12" />

        {/* Para quem é / não é - visual */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 text-left max-w-3xl mx-auto mb-16">
          {/* É para quem */}
          <div>
            <p className="code-text text-sm text-matrix-green mb-4">É PARA QUEM</p>
            <ul className="space-y-3 text-brutal-white/80">
              <li className="flex items-start gap-2">
                <span className="text-matrix-green">→</span>
                <span>Tem profundidade mas ela não aparece</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-matrix-green">→</span>
                <span>Quer se diferenciar sem virar personagem</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-matrix-green">→</span>
                <span>Busca algo que dure</span>
              </li>
            </ul>
          </div>

          {/* Não é para quem */}
          <div>
            <p className="code-text text-sm text-brutal-white/50 mb-4">NÃO É PARA QUEM</p>
            <ul className="space-y-3 text-brutal-white/50">
              <li className="flex items-start gap-2">
                <span className="text-brutal-white/30">×</span>
                <span>Quer fórmula pronta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brutal-white/30">×</span>
                <span>Quer viralizar rápido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brutal-white/30">×</span>
                <span>Terceiriza pensamento</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha verde abaixo */}
        <div className="w-24 h-px bg-matrix-green mx-auto mb-12" />

        {/* Link para studio */}
        <a
          href="/manifesto"
          className="inline-flex items-center gap-3 text-brutal-white hover:text-matrix-green transition-colors group"
        >
          <span className="code-text text-sm uppercase tracking-widest">Ler manifesto completo</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

export default BriefAbout;
