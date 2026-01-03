import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple, staggerContainerPremium, cardLift, imageZoom } from "@/utils/motionVariants";
import CaseModal, { CaseData } from "./CaseModal";
import { useTranslation } from "react-i18next";

// Case images mapping
const caseImages: Record<string, string> = {
  "alan-nicolas": "/cases/alan-nicolas.jpg",
  "alexandra-loras": "/cases/alexandra-loras.webp",
  "davi-ribas": "/cases/davi-ribas.png",
  "edgar-ueda": "/cases/edgar-ueda.png",
  "rafa-medeiros": "/cases/rafa-medeiros.jpg",
};

const caseKeys = ["alan-nicolas", "alexandra-loras", "davi-ribas", "edgar-ueda", "rafa-medeiros"] as const;

const SelectedWork = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('home');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Build cases array from translations
  const cases: CaseData[] = useMemo(() => {
    return caseKeys.map((key) => ({
      name: t(`selectedWork.cases.${key}.name`),
      field: t(`selectedWork.cases.${key}.field`),
      description: t(`selectedWork.cases.${key}.description`),
      image: caseImages[key],
      tags: t(`selectedWork.cases.${key}.tags`, { returnObjects: true }) as string[],
      fullDescription: t(`selectedWork.cases.${key}.fullDescription`),
      achievements: t(`selectedWork.cases.${key}.achievements`, { returnObjects: true }) as string[],
      quote: t(`selectedWork.cases.${key}.quote`),
    }));
  }, [t]);

  const openCase = (caseData: CaseData) => {
    setSelectedCase(caseData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCase(null), 300);
  };

  return (
    <>
      <section
        id="work"
        className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-brutal-black"
      >
        {/* Background */}
        <div className="organic-glow" style={{ top: "50%", right: "20%" }} />

        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial="hidden"
          animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
          variants={staggerContainerPremium}
          className="container mx-auto max-w-7xl relative z-10"
        >
          {/* Header */}
          <motion.div variants={fadeInUpSimple} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="code-text text-sm text-matrix-green">{t('selectedWork.sectionCode')}</span>
              <div className="h-px bg-concrete-border flex-1" />
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brutal-white uppercase tracking-tighter">
              {t('selectedWork.title')}
            </h2>
            <p className="text-brutal-white/60 mt-4 max-w-2xl">
              {t('selectedWork.subtitle1')}
              {' '}{t('selectedWork.subtitle2')} <span className="text-brutal-white">{t('selectedWork.subtitle3')}</span>
            </p>
          </motion.div>

          {/* Asymmetric Grid */}
          <motion.div variants={fadeInUpSimple} className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large card - spans 7 columns - Story 3.2: Premium hover */}
            <motion.div
              className="col-span-12 md:col-span-7 group cursor-pointer"
              onClick={() => openCase(cases[0])}
              variants={cardLift}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <div className="relative h-[400px] md:h-[500px] overflow-hidden border-2 border-concrete-border group-hover:border-matrix-green transition-colors">
                {/* Real image with zoom */}
                <motion.img
                  src={cases[0].image}
                  alt={cases[0].name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  variants={imageZoom}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex gap-2 mb-3">
                    {cases[0].tags.map((tag, i) => (
                      <span key={i} className="code-text text-xs px-2 py-1 border border-matrix-green/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brutal-white uppercase tracking-tight mb-2">
                    {cases[0].name}
                  </h3>
                  <p className="text-matrix-green text-sm uppercase tracking-wider mb-2">
                    {cases[0].field}
                  </p>
                  <p className="text-concrete text-sm">{cases[0].description}</p>
                </div>

                {/* Hover arrow with animation */}
                <motion.div
                  className="absolute top-6 right-6"
                  initial={{ opacity: 0, x: -10, y: 10 }}
                  whileHover={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-6 h-6 text-matrix-green opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Shine effect overlay - Story 3.2 */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "200%", opacity: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "skewX(-20deg)",
                  }}
                />
              </div>
            </motion.div>

            {/* Medium card - spans 5 columns - Story 3.2: Premium hover */}
            <motion.div
              className="col-span-12 md:col-span-5 group cursor-pointer"
              onClick={() => openCase(cases[1])}
              variants={cardLift}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <div className="relative h-[300px] md:h-[500px] overflow-hidden border-2 border-concrete-border group-hover:border-matrix-green transition-colors">
                <motion.img
                  src={cases[1].image}
                  alt={cases[1].name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  variants={imageZoom}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex gap-2 mb-3">
                    {cases[1].tags.map((tag, i) => (
                      <span key={i} className="code-text text-xs px-2 py-1 border border-matrix-green/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-brutal-white uppercase tracking-tight mb-2">
                    {cases[1].name}
                  </h3>
                  <p className="text-matrix-green text-sm uppercase tracking-wider mb-2">
                    {cases[1].field}
                  </p>
                  <p className="text-concrete text-sm hidden md:block">{cases[1].description}</p>
                </div>
                {/* Hover arrow */}
                <motion.div className="absolute top-6 right-6">
                  <ArrowUpRight className="w-6 h-6 text-matrix-green opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "200%", opacity: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "skewX(-20deg)",
                  }}
                />
              </div>
            </motion.div>

            {/* Small cards row - 4 columns each - Story 3.2: Premium hover */}
            {cases.slice(2, 5).map((caseItem, index) => (
              <motion.div
                key={index}
                className="col-span-12 sm:col-span-6 md:col-span-4 group cursor-pointer"
                onClick={() => openCase(caseItem)}
                variants={cardLift}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                custom={index}
              >
                <div className="relative h-[280px] overflow-hidden border-2 border-concrete-border group-hover:border-matrix-green transition-colors">
                  <motion.img
                    src={caseItem.image}
                    alt={caseItem.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    variants={imageZoom}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-brutal-white uppercase tracking-tight mb-1">
                      {caseItem.name}
                    </h3>
                    <p className="text-matrix-green text-xs uppercase tracking-wider">
                      {caseItem.field}
                    </p>
                  </div>
                  <motion.div className="absolute top-4 right-4">
                    <ArrowUpRight className="w-5 h-5 text-matrix-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "200%", opacity: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      transform: "skewX(-20deg)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View all link */}
          <motion.div variants={fadeInUpSimple} className="mt-12 text-center">
            <p className="code-text text-sm text-brutal-white/50 uppercase tracking-widest">
              {t('selectedWork.bottomNote')}
            </p>
          </motion.div>
        </motion.div>

        {/* Subtle grid */}
        <div className="brutal-grid absolute inset-0 opacity-5" />
      </section>

      {/* Modal */}
      <CaseModal isOpen={isModalOpen} onClose={closeModal} caseData={selectedCase} />
    </>
  );
};

export default SelectedWork;
