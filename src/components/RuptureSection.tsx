import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "./SectionContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const RuptureSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');

  return (
    <SectionContainer number={1} className="bg-ancestral-black relative">
      {/* Brutal grid overlay */}
      <div className="brutal-grid absolute inset-0 opacity-10 pointer-events-none" />

      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={prefersReducedMotion ? {} : { duration: 0.6 }}
        className="max-w-3xl relative z-10"
      >
        {/* Terminal header */}
        <div className="code-text text-xs mb-6 terminal-flicker text-matrix-green">
          {t('rupture.terminal')}
        </div>

        <p
          className="text-2xl md:text-3xl font-display text-ancestral-white
                      leading-relaxed mb-8"
        >
          {t('rupture.title')}
        </p>

        <div className="w-24 h-px bg-matrix-green mb-8" />

        <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
          <p>{t('rupture.paragraph1')}</p>
          <p>
            {t('rupture.paragraph2')}
            <br />
            <span className="text-ancestral-white">
              {t('rupture.essence')}
            </span>
          </p>
        </div>

        <p
          className="mt-12 text-text-muted text-base border-l-2
                      border-matrix-green pl-4"
        >
          {t('rupture.conclusion1')}
          <br />
          {t('rupture.conclusion2')} <span className="code-text text-matrix-green">{t('rupture.school')}</span>.
          <br />
          {t('rupture.conclusion3')} <span className="code-text text-matrix-green">{t('rupture.atelier')}</span>.
        </p>

        {/* Canonical phrase */}
        <div className="mt-12 pt-8 border-t border-matrix-green/20">
          <p className="text-xl md:text-2xl font-display text-ancestral-white">
            {t('rupture.manifesto')} <span className="text-matrix-green">{t('rupture.manifestoHighlight')}</span>
          </p>
        </div>

        {/* Code annotation */}
        <div className="mt-8 code-text text-xs text-matrix-green/40">
          {t('rupture.codeComment')}
        </div>
      </motion.div>
    </SectionContainer>
  );
};

export default RuptureSection;
