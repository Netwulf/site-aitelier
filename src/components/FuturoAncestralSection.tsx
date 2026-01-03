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
            <p
              className="text-2xl md:text-3xl font-display text-ancestral-white
                          leading-relaxed"
            >
              {t('futuroAncestral.line1')}
              <br />
              {t('futuroAncestral.line2')}
            </p>

            <div className="py-8 border-y border-matrix-green/20 brutal-container">
              <p className="text-lg text-text-secondary leading-loose">
                <span className="code-text text-matrix-green">{t('futuroAncestral.ia')}</span> {t('futuroAncestral.iaLine')}
                <br />
                <span className="code-text text-matrix-green">{t('futuroAncestral.storytelling')}</span> {t('futuroAncestral.storytellingLine')}
                <br />
                <span className="code-text text-ancestral-white">{t('futuroAncestral.you')}</span> {t('futuroAncestral.youLine')}
              </p>
            </div>

            <p className="text-xl text-ancestral-white leading-relaxed">
              {t('futuroAncestral.tool1')}
              <br />
              {t('futuroAncestral.tool2')}
            </p>

            <div className="w-32 h-px bg-matrix-green mx-auto my-8" />

            <p className="text-lg text-tech-olive font-display">
              {t('futuroAncestral.comparison')}
            </p>

            {/* New closing statement */}
            <div className="pt-8 mt-8 border-t border-ancestral-amber/20">
              <p className="text-lg text-text-secondary">
                {t('futuroAncestral.closing1')}
              </p>
              <p className="text-2xl md:text-3xl font-display text-ancestral-amber mt-2">
                {t('futuroAncestral.closing2')}
              </p>
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
