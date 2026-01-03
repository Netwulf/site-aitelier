import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import {
  Film,
  Eye,
  Clapperboard,
  FileText,
  Volume2,
  Palette,
} from "lucide-react";

const pillarIcons = {
  "01": Eye,
  "02": Clapperboard,
  "03": Film,
  "04": FileText,
  "05": Volume2,
  "06": Palette,
};

export const CSCSyllabus = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const pillarIds = ["01", "02", "03", "04", "05", "06"];

  return (
    <section
      id="syllabus"
      ref={ref}
      className="relative py-24 md:py-32 bg-stone-dark overflow-hidden"
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
            {t('csc.syllabus.terminal')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white mb-6">
            {t('csc.syllabus.title1')}{" "}
            <span className="text-tech-olive">{t('csc.syllabus.title2')}</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('csc.syllabus.subtitle1')}
            <br className="hidden md:block" />
            {t('csc.syllabus.subtitle2')}
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillarIds.map((id, index) => {
            const Icon = pillarIcons[id as keyof typeof pillarIcons];
            const topics = t(`csc.syllabus.pillars.${id}.topics`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-6 md:p-8 bg-ancestral-black/50 border border-text-muted/20
                           hover:border-tech-olive/50 transition-all duration-300"
              >
                {/* Number */}
                <span className="absolute top-4 right-4 text-6xl font-display font-black
                               text-tech-olive/10 group-hover:text-tech-olive/20 transition-colors">
                  {id}
                </span>

                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-tech-olive" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-ancestral-white mb-1 normal-case">
                  {t(`csc.syllabus.pillars.${id}.title`)}
                </h3>
                <p className="text-sm text-tech-olive font-mono-v2 mb-4">
                  {t(`csc.syllabus.pillars.${id}.subtitle`)}
                </p>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {t(`csc.syllabus.pillars.${id}.description`)}
                </p>

                {/* Topics */}
                <ul className="space-y-2">
                  {topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-1 h-1 bg-tech-olive" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm font-mono-v2">
            {t('csc.syllabus.bottomNote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCSyllabus;
