import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "./SectionContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const EntrySection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');

  return (
    <SectionContainer number={5} className="py-32 relative">
      {/* Brutal grid overlay */}
      <div className="brutal-grid absolute inset-0 opacity-5 pointer-events-none" />

      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? {} : { duration: 0.6 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        {/* Terminal header */}
        <div className="code-text text-xs mb-8 terminal-flicker text-matrix-green">
          {t('entry.terminal')}
        </div>

        <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-4">
          {t('entry.line1')}
          <br />
          {t('entry.line2')}
        </p>

        <div className="w-16 h-px bg-matrix-green mx-auto my-8" />

        <p className="text-xl md:text-2xl text-ancestral-white leading-relaxed mb-12">
          {t('entry.line3')}
          <br />
          {t('entry.line4')} <span className="code-text text-matrix-green">{t('entry.talk')}</span>.
        </p>

        {/* Matrix-style CTA button */}
        <Link
          to="/contato"
          className="btn-ghost inline-flex items-center gap-3"
        >
          <span>{t('entry.cta')}</span>
        </Link>

        {/* Code annotation */}
        <div className="mt-12 code-text text-xs text-matrix-green/30">
          {t('entry.codeComment')}
        </div>
      </motion.div>
    </SectionContainer>
  );
};

export default EntrySection;
