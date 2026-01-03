import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";

export const CSCFinalCTA = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-ancestral-black overflow-hidden"
    >
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest block mb-8">
            {t('csc.finalCta.terminal')}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-ancestral-white mb-8 leading-tight">
            {t('csc.finalCta.title1')}
            <br />
            <span className="text-tech-olive">{t('csc.finalCta.title2')}</span>
          </h2>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            {t('csc.finalCta.subtitle1')}
            <br className="hidden md:block" />
            {t('csc.finalCta.subtitle2')}
          </p>

          <a
            href="#candidatura"
            className="group inline-flex items-center justify-center gap-3 px-12 py-6
                     bg-tech-olive text-ancestral-black font-bold text-lg uppercase tracking-wider
                     hover:bg-tech-olive/90 transition-all duration-300
                     shadow-[0_0_60px_rgba(141,199,94,0.3)] hover:shadow-[0_0_80px_rgba(141,199,94,0.4)]"
          >
            <span>{t('csc.finalCta.cta')}</span>
          </a>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-mono-v2 text-text-muted">
            <span>{t('csc.finalCta.meta.slots')}</span>
            <span className="text-tech-olive">•</span>
            <span>{t('csc.finalCta.meta.months')}</span>
            <span className="text-tech-olive">•</span>
            <span>{t('csc.finalCta.meta.start')}</span>
          </div>
        </motion.div>

        {/* Terminal closing */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <p className="text-xs font-mono-v2 text-text-muted/50 tracking-widest">
            {t('csc.finalCta.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCFinalCTA;
