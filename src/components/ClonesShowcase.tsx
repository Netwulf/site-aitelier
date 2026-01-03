import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, MessageCircle, X, Vote, Check, Heart } from "lucide-react";

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

// Coming soon clones - minds being prepared
const comingSoonClones = [
  { name: "Leonardo da Vinci", initials: "LV", id: "leonardo-da-vinci" },
  { name: "Steve Jobs", initials: "SJ", id: "steve-jobs" },
  { name: "Walt Disney", initials: "WD", id: "walt-disney" },
  { name: "Carl Jung", initials: "CJ", id: "carl-jung" },
  { name: "Joseph Campbell", initials: "JC", id: "joseph-campbell" },
  { name: "Isaac Asimov", initials: "IA", id: "isaac-asimov" },
  { name: "Werner Herzog", initials: "WH", id: "werner-herzog" },
  { name: "Naval Ravikant", initials: "NR", id: "naval-ravikant" },
  { name: "Nikola Tesla", initials: "NT", id: "nikola-tesla" },
  { name: "Frida Kahlo", initials: "FK", id: "frida-kahlo" },
  { name: "Stanley Kubrick", initials: "SK", id: "stanley-kubrick" },
  { name: "Marie Curie", initials: "MC", id: "marie-curie" },
  { name: "Albert Einstein", initials: "AE", id: "albert-einstein" },
  { name: "Simone de Beauvoir", initials: "SB", id: "simone-de-beauvoir" },
  { name: "Miyamoto Musashi", initials: "MM", id: "miyamoto-musashi" },
  { name: "Virginia Woolf", initials: "VW", id: "virginia-woolf" },
  { name: "Paulo Freire", initials: "PF", id: "paulo-freire" },
  { name: "Bruce Lee", initials: "BL", id: "bruce-lee" },
  { name: "Hayao Miyazaki", initials: "HM", id: "hayao-miyazaki" },
  { name: "Clarice Lispector", initials: "CL", id: "clarice-lispector" },
  { name: "Federico Fellini", initials: "FF", id: "federico-fellini" },
  { name: "Ada Lovelace", initials: "AL", id: "ada-lovelace" },
  { name: "Charlie Munger", initials: "CM", id: "charlie-munger" },
];

// Get votes from localStorage
const getVotes = (): Record<string, boolean> => {
  try {
    const stored = localStorage.getItem("aitelier-clone-votes");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save vote to localStorage
const saveVote = (cloneId: string) => {
  const votes = getVotes();
  votes[cloneId] = true;
  localStorage.setItem("aitelier-clone-votes", JSON.stringify(votes));
};

export const ClonesShowcase = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');
  const { shortCode } = useLanguage();

  // Modal state
  const [selectedClone, setSelectedClone] = useState<typeof comingSoonClones[0] | null>(null);
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [justVoted, setJustVoted] = useState(false);

  // Load votes on mount
  useEffect(() => {
    setVotes(getVotes());
  }, []);

  const handleVote = (cloneId: string) => {
    saveVote(cloneId);
    setVotes(prev => ({ ...prev, [cloneId]: true }));
    setJustVoted(true);

    // Reset animation after delay
    setTimeout(() => {
      setJustVoted(false);
      setSelectedClone(null);
    }, 1500);
  };

  const hasVoted = (cloneId: string) => votes[cloneId] === true;

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
            <p className="text-sm text-warm-ivory/40 mt-2 font-mono-v2">
              {t('ui.voteHint')}
            </p>
          </div>

          {/* Coming soon avatars - now clickable */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {comingSoonClones.map((clone, index) => (
              <motion.button
                key={clone.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                onClick={() => setSelectedClone(clone)}
                className="group relative"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border
                              flex items-center justify-center
                              transition-all duration-300 cursor-pointer
                              ${hasVoted(clone.id)
                                ? "bg-ancestral-amber/20 border-ancestral-amber/50"
                                : "bg-white/5 border-white/10 hover:border-ancestral-amber/50 hover:bg-ancestral-amber/10"
                              }`}
                >
                  {hasVoted(clone.id) ? (
                    <Heart className="w-4 h-4 text-ancestral-amber fill-ancestral-amber" />
                  ) : (
                    <span className="font-mono-v2 text-xs text-warm-ivory/50
                                   group-hover:text-ancestral-amber transition-colors">
                      {clone.initials}
                    </span>
                  )}
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2
                              opacity-0 group-hover:opacity-100 transition-opacity
                              whitespace-nowrap pointer-events-none z-10">
                  <span className="text-[10px] text-ancestral-amber font-mono-v2 bg-brutal-black px-2 py-1">
                    {clone.name}
                  </span>
                </div>
              </motion.button>
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

      {/* Vote Modal */}
      <AnimatePresence>
        {selectedClone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => !justVoted && setSelectedClone(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brutal-black/90 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-white/10
                        p-8 max-w-md w-full text-center"
            >
              {/* Close button */}
              {!justVoted && (
                <button
                  onClick={() => setSelectedClone(null)}
                  className="absolute top-4 right-4 text-warm-ivory/50 hover:text-warm-ivory transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Content */}
              {justVoted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="py-8"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-tech-olive/20 border border-tech-olive
                                flex items-center justify-center">
                    <Check className="w-10 h-10 text-tech-olive" />
                  </div>
                  <h3 className="text-2xl font-display text-tech-olive mb-2">
                    {t('ui.vote.thanks')}
                  </h3>
                  <p className="text-warm-ivory/60 text-sm">
                    {t('ui.vote.recorded')}
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-ancestral-amber/10 border border-ancestral-amber/30
                                flex items-center justify-center">
                    <span className="font-mono-v2 text-2xl text-ancestral-amber">
                      {selectedClone.initials}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl font-display text-warm-ivory mb-2">
                    {selectedClone.name}
                  </h3>

                  {/* Description */}
                  <p className="text-warm-ivory/60 text-sm mb-8">
                    {t('ui.vote.question')}
                  </p>

                  {/* Vote button or already voted */}
                  {hasVoted(selectedClone.id) ? (
                    <div className="flex items-center justify-center gap-2 text-ancestral-amber">
                      <Heart className="w-5 h-5 fill-ancestral-amber" />
                      <span className="font-mono-v2 text-sm">{t('ui.vote.alreadyVoted')}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleVote(selectedClone.id)}
                      className="inline-flex items-center gap-3 px-8 py-4
                                bg-ancestral-amber text-void-black
                                hover:bg-ancestral-amber/90
                                transition-all duration-300 font-mono-v2 text-sm
                                group"
                    >
                      <Vote className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {t('ui.vote.button')}
                    </button>
                  )}

                  {/* Info text */}
                  <p className="text-warm-ivory/40 text-xs mt-6 font-mono-v2">
                    {t('ui.vote.info')}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClonesShowcase;
