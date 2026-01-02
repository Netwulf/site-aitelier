import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { modalSpring, staggerContainerPremium, fadeInUpSimple } from "@/utils/motionVariants";
import { useEffect } from "react";

export interface CaseData {
  name: string;
  field: string;
  description: string;
  image: string;
  tags: string[];
  fullDescription: string;
  achievements: string[];
  quote?: string;
}

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: CaseData | null;
}

// Story 3.3: Modal with spring animation
const CaseModal = ({ isOpen, onClose, caseData }: CaseModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!caseData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-brutal-black/95 backdrop-blur-md z-50"
          />

          {/* Modal with spring animation */}
          <motion.div
            variants={modalSpring}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="h-full w-full bg-brutal-black border-2 border-concrete-border overflow-y-auto">
              {/* Close button with hover effect */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center border-2 border-concrete-border hover:border-matrix-green transition-colors bg-brutal-black group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
              >
                <X className="w-5 h-5 text-brutal-white group-hover:text-matrix-green transition-colors" />
              </motion.button>

              <div className="grid lg:grid-cols-2 min-h-full">
                {/* Image Section with zoom effect */}
                <motion.div
                  className="relative h-[300px] md:h-[400px] lg:h-full overflow-hidden"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <motion.img
                    src={caseData.image}
                    alt={caseData.name}
                    className="w-full h-full object-cover object-top"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-brutal-black/30 lg:to-brutal-black" />

                  {/* Name overlay on mobile */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 lg:hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <div className="flex gap-2 mb-3">
                      {caseData.tags.map((tag, i) => (
                        <motion.span
                          key={i}
                          className="code-text text-xs px-2 py-1 border border-matrix-green/50 bg-brutal-black/80"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <h2 className="text-3xl font-bold text-brutal-white uppercase tracking-tight">
                      {caseData.name}
                    </h2>
                    <p className="text-matrix-green uppercase tracking-wider mt-2">
                      {caseData.field}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Content Section with stagger */}
                <motion.div
                  className="p-6 md:p-8 lg:p-12 flex flex-col justify-center"
                  variants={staggerContainerPremium}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Tags - desktop only */}
                  <motion.div className="hidden lg:flex gap-2 mb-6" variants={fadeInUpSimple}>
                    {caseData.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="code-text text-xs px-3 py-1.5 border border-matrix-green/50 hover:border-matrix-green hover:bg-matrix-green/10 transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Name - desktop only */}
                  <motion.div className="hidden lg:block mb-8" variants={fadeInUpSimple}>
                    <h2 className="text-4xl xl:text-5xl font-bold text-brutal-white uppercase tracking-tight">
                      {caseData.name}
                    </h2>
                    <p className="text-matrix-green text-lg uppercase tracking-wider mt-3">
                      {caseData.field}
                    </p>
                  </motion.div>

                  {/* Description */}
                  <motion.div className="mb-8" variants={fadeInUpSimple}>
                    <p className="text-brutal-white/80 text-lg leading-relaxed">
                      {caseData.fullDescription}
                    </p>
                  </motion.div>

                  {/* Achievements with stagger */}
                  <motion.div className="mb-8" variants={fadeInUpSimple}>
                    <p className="code-text text-sm text-matrix-green mb-4">CONQUISTAS</p>
                    <ul className="space-y-3">
                      {caseData.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-brutal-white/90"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.08 }}
                        >
                          <motion.span
                            className="text-matrix-green mt-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
                          >
                            →
                          </motion.span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Quote */}
                  {caseData.quote && (
                    <motion.div
                      className="border-l-2 border-matrix-green pl-6 mt-auto"
                      variants={fadeInUpSimple}
                    >
                      <p className="poetic-text text-lg text-brutal-white/70">
                        "{caseData.quote}"
                      </p>
                    </motion.div>
                  )}

                  {/* Line */}
                  <motion.div
                    className="w-24 h-px bg-matrix-green mt-8"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CaseModal;
