import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple, staggerContainer, scaleIn, magneticHover } from "@/utils/motionVariants";
import { Cpu, Palette, TrendingUp, LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";

const Pillars = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');

  const pillarIcons: LucideIcon[] = [Cpu, Palette, TrendingUp];
  const pillarKeys = ['ia', 'arte', 'negocio'] as const;

  return (
    <section id="pilares" className="py-20 md:py-32 bg-brutal-black" ref={ref as any}>
      <motion.div
        className="brutal-container max-w-7xl mx-auto px-4"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : staggerContainer}
      >
        {/* Header */}
        <motion.div className="mb-16 text-center" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
          <div className="code-text text-xs mb-4 terminal-flicker">
            {t('pillars.terminal')}
          </div>
          <h2 className="text-brutal-white mb-4">
            {t('pillars.title1')}<br />{t('pillars.title2')}
          </h2>
          <div className="w-20 h-px bg-matrix-green mx-auto mb-8" />
          <p className="poetic-text text-xl text-brutal-white/80 max-w-2xl mx-auto">
            {t('pillars.subtitle')}
          </p>
        </motion.div>

        {/* Grid de pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillarKeys.map((key, index) => {
            const Icon = pillarIcons[index];
            const tools = t(`pillars.items.${key}.tools`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={index}
                className="glass p-8 md:p-10 cursor-brutal group"
                variants={prefersReducedMotion ? {} : scaleIn}
                initial={prefersReducedMotion ? false : "rest"}
                whileHover={prefersReducedMotion ? undefined : "hover"}
                whileTap={prefersReducedMotion ? undefined : "tap"}
              >
                {/* Icon e número */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <Icon className="w-12 h-12 text-matrix-green" strokeWidth={1.5} />
                  </div>
                  <span className="code-text text-xs opacity-50">
                    [{index + 1}/3]
                  </span>
                </div>

              {/* Título */}
              <h3 className="text-3xl md:text-4xl text-brutal-white mb-4 uppercase tracking-tight">
                {t(`pillars.items.${key}.title`)}
              </h3>

              <div className="brutal-line my-4" />

              {/* Descrição */}
              <p className="poetic-text text-base text-brutal-white/80 mb-6">
                {t(`pillars.items.${key}.description`)}
              </p>

              {/* Items */}
              <ul className="space-y-3">
                {tools.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-brutal-white/70"
                  >
                    <span className="code-text text-matrix-green mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Linha verde de hover */}
              <div className="w-0 h-px bg-matrix-green transition-all duration-300 group-hover:w-full mt-6" />
            </motion.div>
          );
          })}
        </div>

        {/* Citação */}
        <motion.div className="mt-20 text-center" variants={prefersReducedMotion ? {} : fadeInUpSimple}>
          <blockquote className="text-xl md:text-2xl text-matrix-green font-mono leading-tight">
            "{t('pillars.quote')}"
          </blockquote>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Pillars;
