import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, MessageCircle } from "lucide-react";

// Clone IDs for dynamic data
const cloneIds = ["david-lynch", "neil-gaiman", "ursula-le-guin", "tayna-puri"];

// Clone images mapping
const cloneImages: Record<string, string> = {
  "david-lynch": "/clones/david-lynch-aitelier.png",
  "neil-gaiman": "/clones/neil-gaiman-aitelier.png",
  "ursula-le-guin": "/clones/ursula-le-guin-aitelier.png",
  "tayna-puri": "/tayna-portraits/tayna-studio-contemplative.png",
};

// Clone names (these don't need translation)
const cloneNames: Record<string, string> = {
  "david-lynch": "David Lynch",
  "neil-gaiman": "Neil Gaiman",
  "ursula-le-guin": "Ursula K. Le Guin",
  "tayna-puri": "Taynã Puri",
};

// Coming soon clones - 30+ minds being prepared
const comingSoonClones = [
  { name: "Leonardo da Vinci", initials: "LV" },
  { name: "Steve Jobs", initials: "SJ" },
  { name: "Walt Disney", initials: "WD" },
  { name: "Carl Jung", initials: "CJ" },
  { name: "Joseph Campbell", initials: "JC" },
  { name: "Elon Musk", initials: "EM" },
  { name: "Naval Ravikant", initials: "NR" },
  { name: "Alan Watts", initials: "AW" },
  { name: "Nikola Tesla", initials: "NT" },
  { name: "Frida Kahlo", initials: "FK" },
  { name: "Stanley Kubrick", initials: "SK" },
  { name: "Marie Curie", initials: "MC" },
  { name: "Albert Einstein", initials: "AE" },
  { name: "Simone de Beauvoir", initials: "SB" },
  { name: "Marcus Aurelius", initials: "MA" },
  { name: "Miyamoto Musashi", initials: "MM" },
  { name: "Virginia Woolf", initials: "VW" },
  { name: "Paulo Freire", initials: "PF" },
  { name: "Bruce Lee", initials: "BL" },
  { name: "Hayao Miyazaki", initials: "HM" },
  { name: "Clarice Lispector", initials: "CL" },
  { name: "Federico Fellini", initials: "FF" },
  { name: "Ada Lovelace", initials: "AL" },
  { name: "Charlie Munger", initials: "CM" },
];

export const ClonesShowcase = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');
  const { shortCode } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-brutal-black relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-olive/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-tech-olive" />
            <span className="font-mono-v2 text-sm tracking-widest text-tech-olive">
              {t('ui.sectionCode')}
            </span>
            <Sparkles className="w-5 h-5 text-tech-olive" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brutal-white leading-tight mb-4">
            {t('ui.titlePlain')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('ui.subtitle')}
            <br />
            <span className="text-ancestral-amber">{t('ui.subtitleHighlight')}</span>
          </p>
        </motion.div>

        {/* Active Clones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {cloneIds.map((cloneId, index) => (
            <motion.div
              key={cloneId}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/${shortCode}/chat/${cloneId}`}
                className="group block relative overflow-hidden border border-white/10
                          bg-gradient-to-b from-white/5 to-transparent
                          hover:border-tech-olive/50 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={cloneImages[cloneId]}
                    alt={cloneNames[cloneId]}
                    className="w-full h-full object-cover object-top
                              grayscale group-hover:grayscale-0
                              transition-all duration-700
                              group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/50 to-transparent" />

                  {/* Active badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2 py-1 bg-tech-olive text-void-black text-[10px] font-mono-v2 tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-void-black rounded-full animate-pulse" />
                      {t('ui.activeBadge')}
                    </span>
                  </div>

                  {/* Chat icon on hover */}
                  <div className="absolute top-4 right-4 w-10 h-10 border border-white/20
                                bg-brutal-black/50 flex items-center justify-center
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MessageCircle className="w-5 h-5 text-tech-olive" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="font-mono-v2 text-[10px] text-tech-olive tracking-widest mb-1">
                    {t(`ui.minds.${cloneId}.subtitle`).toUpperCase()}
                  </p>
                  <h3 className="font-display text-xl text-warm-ivory mb-2
                               group-hover:text-tech-olive transition-colors">
                    {cloneNames[cloneId]}
                  </h3>
                  <p className="text-sm text-warm-ivory/50 leading-relaxed">
                    {t(`ui.minds.${cloneId}.description`)}
                  </p>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-tech-olive opacity-0
                              group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-8">
            <span className="font-mono-v2 text-xs tracking-widest text-ancestral-amber">
              {t('ui.comingSoonCount', { count: comingSoonClones.length })}
            </span>
            <h3 className="text-2xl md:text-3xl font-display text-warm-ivory mt-3">
              {t('ui.comingSoonTitle')}
            </h3>
          </div>

          {/* Coming soon avatars */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {comingSoonClones.map((clone, index) => (
              <motion.div
                key={clone.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className="group relative"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10
                              flex items-center justify-center
                              hover:border-ancestral-amber/50 hover:bg-ancestral-amber/10
                              transition-all duration-300 cursor-default"
                >
                  <span className="font-mono-v2 text-xs text-warm-ivory/50
                                 group-hover:text-ancestral-amber transition-colors">
                    {clone.initials}
                  </span>
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2
                              opacity-0 group-hover:opacity-100 transition-opacity
                              whitespace-nowrap pointer-events-none z-10">
                  <span className="text-[10px] text-ancestral-amber font-mono-v2 bg-brutal-black px-2 py-1">
                    {clone.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link
              to={`/${shortCode}/playground`}
              className="inline-flex items-center gap-2 px-6 py-3
                        border border-tech-olive text-tech-olive
                        hover:bg-tech-olive hover:text-void-black
                        transition-all duration-300 font-mono-v2 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              {t('ui.exploreCta')}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClonesShowcase;
