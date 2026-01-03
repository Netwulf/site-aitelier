import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { Users, Star, Lock, Zap } from "lucide-react";

const benefitIcons = {
  lifetime: Star,
  exclusivity: Lock,
  priority: Zap,
  community: Users,
};

export const CSCTurmaFundadora = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const benefitKeys = Object.keys(benefitIcons) as (keyof typeof benefitIcons)[];

  return (
    <section
      id="turma-fundadora"
      ref={ref}
      className="relative py-24 md:py-32 bg-stone-dark overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tech-olive/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tech-olive/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest block mb-4">
            {t('csc.turmaFundadora.terminal')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white mb-6">
            {t('csc.turmaFundadora.title1')}{" "}
            <span className="text-tech-olive">{t('csc.turmaFundadora.title2')}</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('csc.turmaFundadora.subtitle')}
          </p>
        </motion.div>

        {/* Big number visual */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-display font-black
                           text-tech-olive/10 blur-3xl">
              12
            </div>
            <span className="relative text-[12rem] md:text-[16rem] font-display font-black
                           text-transparent bg-clip-text bg-gradient-to-b
                           from-tech-olive via-tech-olive/80 to-tech-olive/40">
              12
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-display text-ancestral-white mt-4">
            {t('csc.turmaFundadora.slotsLabel')}
          </p>
          <p className="text-text-muted mt-2">
            {t('csc.turmaFundadora.details')}
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefitKeys.map((key, index) => {
            const Icon = benefitIcons[key];
            return (
              <motion.div
                key={key}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-ancestral-black/50 border border-text-muted/20"
              >
                <div className="p-3 bg-tech-olive/10 border border-tech-olive/30">
                  <Icon className="w-5 h-5 text-tech-olive" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-ancestral-white mb-1 normal-case">
                    {t(`csc.turmaFundadora.benefits.${key}.title`)}
                  </h3>
                  <p className="text-sm text-text-muted">
                    {t(`csc.turmaFundadora.benefits.${key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process note */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-8 border border-tech-olive/30 bg-tech-olive/5"
        >
          <h4 className="text-xl font-display font-bold text-ancestral-white mb-3 normal-case">
            {t('csc.turmaFundadora.process.title')}
          </h4>
          <p className="text-text-secondary max-w-xl mx-auto">
            {t('csc.turmaFundadora.process.line1')}
            <br />
            {t('csc.turmaFundadora.process.line2')}
            <br />
            {t('csc.turmaFundadora.process.line3')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCTurmaFundadora;
