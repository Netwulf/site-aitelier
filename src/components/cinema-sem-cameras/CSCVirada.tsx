import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";

export const CSCVirada = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="a-virada"
      ref={ref}
      className="relative py-24 md:py-32 bg-ancestral-black overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 brutal-grid" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest">
            {t('csc.virada.terminal')}
          </span>
        </motion.div>

        {/* Main narrative */}
        <div className="space-y-8">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl text-ancestral-white font-display leading-relaxed"
          >
            {t('csc.virada.p1')}{" "}
            <span className="text-tech-olive">{t('csc.virada.company')}</span>.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed"
          >
            {t('csc.virada.p2line1')}
            <br />
            {t('csc.virada.p2line2')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="py-8 border-l-4 border-tech-olive pl-6"
          >
            <p className="text-xl md:text-2xl text-ancestral-white font-display leading-relaxed">
              {t('csc.virada.highlight1')}
              <br />
              <span className="text-tech-olive">{t('csc.virada.highlight2')}</span>
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed"
          >
            {t('csc.virada.p3line1')}
            <br />
            {t('csc.virada.p3line2')} <span className="text-ancestral-white">{t('csc.virada.p3vision')}</span>.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed"
          >
            {t('csc.virada.p4line1')}
            <br />
            {t('csc.virada.p4line2')}
          </motion.p>

          {/* Pull quote */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-10 my-10 border-y border-text-muted/20"
          >
            <p className="text-3xl md:text-4xl font-display text-ancestral-white leading-tight text-center">
              {t('csc.virada.quote1')}
              <br />
              <span className="text-tech-olive">{t('csc.virada.quote2')}</span>
            </p>
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl text-ancestral-white leading-relaxed"
          >
            {t('csc.virada.p5part1')}{" "}
            <span className="text-tech-olive">{t('csc.virada.p5part2')}</span>
            <br />
            {t('csc.virada.p5part3')}{" "}
            <span className="text-tech-olive">{t('csc.virada.p5part4')}</span>.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-text-muted leading-relaxed"
          >
            {t('csc.virada.p6line1')}
            <br />
            {t('csc.virada.p6line2')}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CSCVirada;
