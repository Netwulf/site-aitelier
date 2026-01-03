import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "./SectionContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const FuturoAncestralSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');

  return (
    <section className="py-section bg-stone-dark relative">
      {/* Brutal grid overlay */}
      <div className="brutal-grid absolute inset-0 opacity-5 pointer-events-none" />

      <SectionContainer number={3}>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? {} : { duration: 0.8 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          {/* Terminal header */}
          <div className="code-text text-xs mb-4 terminal-flicker text-matrix-green">
            {t('futuroAncestral.terminal')}
          </div>

          <h2
            className="font-mono-v2 text-sm tracking-widest
                        text-tech-olive mb-12"
          >
            {t('futuroAncestral.title')}
          </h2>

          <div className="w-24 h-px bg-matrix-green mx-auto mb-12" />

          <div className="space-y-8">
            {/* Opening statement */}
            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-text-secondary">
                {t('futuroAncestral.intro')}
              </p>
              <p className="text-2xl md:text-3xl font-display text-ancestral-white">
                {t('futuroAncestral.wetreat')}
              </p>
            </div>

            {/* Technology evolution - stacked */}
            <div className="py-8 border-y border-matrix-green/20 brutal-container">
              <div className="space-y-3 text-lg text-text-secondary">
                <p><span className="text-tech-olive">{t('futuroAncestral.fire')}</span></p>
                <p><span className="text-tech-olive">{t('futuroAncestral.writing')}</span></p>
                <p><span className="text-tech-olive">{t('futuroAncestral.language')}</span></p>
              </div>
            </div>

            {/* Natural integration */}
            <p className="text-xl text-ancestral-white leading-relaxed">
              {t('futuroAncestral.paragraph1')}
            </p>

            {/* AI prediction */}
            <p className="text-2xl md:text-3xl font-display text-matrix-green">
              {t('futuroAncestral.aiWill')}
            </p>

            <p className="text-lg text-text-secondary leading-relaxed">
              {t('futuroAncestral.paragraph2')}
            </p>

            <div className="w-32 h-px bg-matrix-green mx-auto my-8" />

            {/* Core message */}
            <div className="space-y-2">
              <p className="text-lg text-text-secondary">
                {t('futuroAncestral.notAbout')}
              </p>
              <p className="text-xl text-ancestral-white leading-relaxed">
                {t('futuroAncestral.aboutHumans')}
              </p>
            </div>

            <div className="w-16 h-px bg-ancestral-amber mx-auto my-8" />

            {/* Therefore */}
            <p className="text-lg text-ancestral-amber font-display">
              {t('futuroAncestral.therefore')} <span className="text-2xl">{t('futuroAncestral.title')}</span>
            </p>

            {/* Three pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <p className="text-tech-olive font-mono-v2 text-sm tracking-widest">
                  {t('futuroAncestral.techEdge')}
                </p>
              </div>
              <div className="text-center">
                <p className="text-ancestral-amber font-mono-v2 text-sm tracking-widest">
                  {t('futuroAncestral.ancientWisdom')}
                </p>
              </div>
              <div className="text-center">
                <p className="text-ancestral-white font-mono-v2 text-sm tracking-widest">
                  {t('futuroAncestral.humanEssence')}
                </p>
              </div>
            </div>
          </div>

          {/* Code annotation */}
          <div className="mt-12 code-text text-xs text-matrix-green/30">
            {t('futuroAncestral.codeComment')}
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};

export default FuturoAncestralSection;
