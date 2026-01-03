import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import {
  Video,
  BookOpen,
  Bot,
  Users,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const featureIcons = {
  recordedContent: BookOpen,
  aiSupport: Bot,
  humanFeedback: Users,
  aitelierTools: Sparkles,
  mentorClones: MessageSquare,
};

export const CSCComoFunciona = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const featureKeys = Object.keys(featureIcons) as (keyof typeof featureIcons)[];

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="relative py-24 md:py-32 bg-ancestral-black overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest block mb-4">
            {t('csc.comoFunciona.terminal')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white mb-6">
            {t('csc.comoFunciona.title1')}{" "}
            <span className="text-tech-olive">{t('csc.comoFunciona.title2')}</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('csc.comoFunciona.subtitle1')}
            <br className="hidden md:block" />
            {t('csc.comoFunciona.subtitle2')}
          </p>
        </motion.div>

        {/* Main feature - Live sessions */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-8 md:p-12 bg-tech-olive/10 border-2 border-tech-olive"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 bg-tech-olive">
              <Video className="w-8 h-8 text-ancestral-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-ancestral-white mb-2 normal-case">
                {t('csc.comoFunciona.mainFeature.title')}
              </h3>
              <p className="text-lg text-text-secondary mb-4">
                {t('csc.comoFunciona.mainFeature.description')}
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-ancestral-black/50">
                  <span className="text-tech-olive font-mono-v2">{t('csc.comoFunciona.mainFeature.columns.theory.label')}</span>
                  <p className="text-text-muted mt-1">{t('csc.comoFunciona.mainFeature.columns.theory.description')}</p>
                </div>
                <div className="p-4 bg-ancestral-black/50">
                  <span className="text-tech-olive font-mono-v2">{t('csc.comoFunciona.mainFeature.columns.practice.label')}</span>
                  <p className="text-text-muted mt-1">{t('csc.comoFunciona.mainFeature.columns.practice.description')}</p>
                </div>
                <div className="p-4 bg-ancestral-black/50">
                  <span className="text-tech-olive font-mono-v2">{t('csc.comoFunciona.mainFeature.columns.review.label')}</span>
                  <p className="text-text-muted mt-1">{t('csc.comoFunciona.mainFeature.columns.review.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[key];
            return (
              <motion.div
                key={key}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="p-6 bg-stone-dark/50 border border-text-muted/20
                           hover:border-tech-olive/30 transition-all duration-300"
              >
                <Icon className="w-6 h-6 text-tech-olive mb-4" />
                <h3 className="text-lg font-display font-bold text-ancestral-white mb-2 normal-case">
                  {t(`csc.comoFunciona.features.${key}.title`)}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {t(`csc.comoFunciona.features.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline visualization */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 border border-text-muted/20"
        >
          <h4 className="text-sm font-mono-v2 text-text-muted mb-6 tracking-widest">
            {t('csc.comoFunciona.timeline.terminal')}
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((month) => (
              <div key={month} className="text-center">
                <div className="h-2 bg-tech-olive/30 mb-2 relative">
                  <div
                    className="absolute inset-0 bg-tech-olive"
                    style={{ width: `${(month / 6) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono-v2 text-text-muted">
                  {t('csc.comoFunciona.timeline.month')} {month}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-text-muted font-mono-v2">
            <span>{t('csc.comoFunciona.timeline.start')}</span>
            <span>{t('csc.comoFunciona.timeline.end')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCComoFunciona;
