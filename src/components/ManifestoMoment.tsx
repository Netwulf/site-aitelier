import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ManifestoMoment = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');

  return (
    <section className="section-ivory py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-l-8 border-tech-olive pl-8 md:pl-12"
        >
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif italic leading-tight text-void-black">
            {t('manifesto.quote1')}
            <br />
            {t('manifesto.quote2')}
          </blockquote>

          <p className="mt-8 text-lg md:text-xl text-void-black/70 font-sans">
            {t('manifesto.tagline')}
            <span className="text-tech-olive font-medium">{t('manifesto.taglineHighlight')}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoMoment;
