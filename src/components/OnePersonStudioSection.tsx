import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const OnePersonStudioSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');

  const capabilities = t('onePersonStudio.capabilities', { returnObjects: true }) as Array<{
    number: string;
    title: string;
    description: string;
  }>;
  const beforeItems = t('onePersonStudio.before.items', { returnObjects: true }) as string[];
  const afterItems = t('onePersonStudio.after.items', { returnObjects: true }) as string[];

  return (
    <section className="py-24 md:py-32 bg-stone-dark relative overflow-hidden">
      {/* Background grid */}
      <div className="brutal-grid absolute inset-0 opacity-5 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="code-text text-xs mb-6 text-matrix-green">
            {t('onePersonStudio.terminal')}
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-ancestral-white leading-[0.95] mb-6">
            {t('onePersonStudio.title1')}
            <br />
            <span className="text-tech-olive">{t('onePersonStudio.title2')}</span>
          </h2>

          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl">
            {t('onePersonStudio.subtitle1')}
            <br />
            <span className="text-ancestral-white">{t('onePersonStudio.subtitle2')}</span>
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 mb-20"
        >
          {/* Before */}
          <div className="p-8 md:p-10 border border-text-muted/30 bg-ancestral-black/50 rounded-sm">
            <div className="font-mono-v2 text-sm text-text-muted mb-4 tracking-wider uppercase">
              {t('onePersonStudio.before.label')}
            </div>
            <p className="text-xl md:text-2xl text-ancestral-white font-medium mb-8">
              {t('onePersonStudio.before.title')}
            </p>
            <div className="space-y-4">
              {beforeItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-text-muted text-lg">—</span>
                  <span className="text-lg text-text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="p-8 md:p-10 border-2 border-matrix-green bg-matrix-green/10 rounded-sm">
            <div className="font-mono-v2 text-sm text-matrix-green mb-4 tracking-wider uppercase">
              {t('onePersonStudio.after.label')}
            </div>
            <p className="text-xl md:text-2xl text-ancestral-white font-medium mb-8">
              {t('onePersonStudio.after.title')}
            </p>
            <div className="space-y-4">
              {afterItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-matrix-green text-lg">→</span>
                  <span className="text-lg text-ancestral-white font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-32 h-px bg-matrix-green mx-auto mb-20" />

        {/* What We Teach */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="code-text text-xs text-text-muted mb-8">
            {t('onePersonStudio.whatWeTeach')}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-text-muted/20 hover:border-matrix-green/50 transition-colors group"
              >
                <div className="font-mono-v2 text-3xl text-text-muted/30 mb-4 group-hover:text-matrix-green/50 transition-colors">
                  {cap.number}
                </div>
                <h3 className="font-display text-xl text-ancestral-white mb-3 group-hover:text-matrix-green transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-text-secondary mb-8">
            "{t('onePersonStudio.bottomQuote1')}
            <br />
            <span className="text-ancestral-white">{t('onePersonStudio.bottomQuote2')}"</span>
          </p>

          <a
            href="#cursos"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-matrix-green text-matrix-green font-mono-v2 text-sm uppercase tracking-wider hover:bg-matrix-green hover:text-brutal-black transition-all"
          >
            <span>{t('onePersonStudio.cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OnePersonStudioSection;
