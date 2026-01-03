import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { ChevronDown, ArrowRight } from "lucide-react";

export const CSCHeroV2 = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');

  const scrollToContent = () => {
    document.getElementById("a-virada")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0">
        <img
          src="/courses/cinema-sem-cameras.png"
          alt="Cinema sem Câmeras"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Gradient overlays for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-ancestral-black via-ancestral-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ancestral-black/70 via-transparent to-ancestral-black/30" />
        {/* Film grain texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 max-w-6xl px-6 md:px-8 pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="font-mono-v2 text-xs text-tech-olive tracking-[0.3em] uppercase">
              {t('csc.hero.badge')}
            </span>
            <span className="text-tech-olive/50">|</span>
            <span className="font-mono-v2 text-xs text-text-muted tracking-wider">
              {t('csc.hero.slots')}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold
                       leading-[0.95] tracking-tight text-ancestral-white mb-6"
          >
            {t('csc.hero.title1')}
            <br />
            <span className="text-tech-olive">{t('csc.hero.title2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-ancestral-white/90 max-w-2xl
                       leading-relaxed font-display mb-6"
          >
            {t('csc.hero.subtitle1')}{" "}
            <span className="text-tech-olive">{t('csc.hero.subtitle2')}</span> {t('csc.hero.subtitleEnd')}
          </motion.p>

          {/* Impact phrase */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-text-muted max-w-xl leading-relaxed mb-10"
          >
            {t('csc.hero.impact1')}{" "}
            <span className="text-ancestral-white">
              {t('csc.hero.impact2')}
            </span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="#candidatura"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4
                         bg-tech-olive text-ancestral-black font-bold uppercase tracking-wider
                         hover:bg-tech-olive/90 transition-all duration-300
                         shadow-[0_0_40px_rgba(141,199,94,0.3)]"
            >
              <span>{t('csc.hero.cta1')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#syllabus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                         border-2 border-ancestral-white/30 text-ancestral-white font-medium
                         hover:border-tech-olive hover:text-tech-olive transition-all duration-300"
            >
              {t('csc.hero.cta2')}
            </a>
          </motion.div>

          {/* Meta info */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-6 text-sm text-text-muted font-mono-v2"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-tech-olive" />
              <span><span className="text-tech-olive">12</span> {t('csc.hero.meta.slots')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-tech-olive" />
              <span><span className="text-tech-olive">6</span> {t('csc.hero.meta.months')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-tech-olive" />
              <span><span className="text-tech-olive">3h</span>{t('csc.hero.meta.liveHours')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-tech-olive" />
              <span>{t('csc.hero.meta.aiSupport')} <span className="text-tech-olive">24h</span></span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                   text-text-muted/70 hover:text-tech-olive transition-colors cursor-pointer"
      >
        <span className="text-xs font-mono-v2 tracking-[0.3em]">{t('csc.hero.scroll')}</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ancestral-black to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default CSCHeroV2;
