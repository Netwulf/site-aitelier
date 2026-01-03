import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";

export const ManifestoV2 = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? {} : { duration: 0.8 }}
      className="max-w-3xl"
    >
      <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-12">
        {t('manifestoV2.title')}
      </h2>

      <div className="space-y-8 text-xl md:text-2xl leading-relaxed">
        {/* Opening declaration */}
        <div className="space-y-2 text-ancestral-white font-display">
          <p>{t('manifestoV2.opening.line1')}</p>
          <p>{t('manifestoV2.opening.line2')}</p>
          <p>{t('manifestoV2.opening.line3')}</p>
        </div>

        <p className="text-3xl md:text-4xl text-ancestral-white font-display">
          {t('manifestoV2.declaration')} <span className="text-ancestral-amber">ai.telier</span>.
        </p>

        {/* Description */}
        <div className="space-y-4 text-text-secondary">
          <p>
            {t('manifestoV2.description.line1')}
            <br />
            {t('manifestoV2.description.line2')}
          </p>
          <p>
            {t('manifestoV2.description.line3')}
            <br />
            {t('manifestoV2.description.line4')}
            <br />
            {t('manifestoV2.description.line5')}
          </p>
        </div>

        {/* Method */}
        <div
          className="py-8 border-y border-text-muted/20 space-y-4
                        text-ancestral-white"
        >
          <p>{t('manifestoV2.method.line1')}</p>
          <p>{t('manifestoV2.method.line2')}</p>
          <p>{t('manifestoV2.method.line3')}</p>
        </div>

        {/* Core truth */}
        <p className="text-2xl text-ancestral-white font-display">
          {t('manifestoV2.truth.line1')}
          <br />
          <span className="text-ancestral-amber">
            {t('manifestoV2.truth.line2')}
          </span>
        </p>

        {/* Closing */}
        <div className="pt-8 space-y-2 text-lg text-text-secondary">
          <p>{t('manifestoV2.closing.line1')}</p>
          <p>{t('manifestoV2.closing.line2')}</p>
          <p className="text-ancestral-white">{t('manifestoV2.closing.line3')}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ManifestoV2;
