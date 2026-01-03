import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export const CSCCandidatura = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('school');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    why: "",
    experience: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="candidatura"
      ref={ref}
      className="relative py-24 md:py-32 bg-stone-dark overflow-hidden"
    >
      {/* Top glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tech-olive/50 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest block mb-4">
            {t('csc.candidatura.terminal')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white mb-6">
            {t('csc.candidatura.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            {t('csc.candidatura.subtitle1')}
            <br />
            {t('csc.candidatura.subtitle2')}
          </p>
        </motion.div>

        {/* Form or success message */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-12 bg-tech-olive/10 border-2 border-tech-olive"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-tech-olive mb-6">
              <Check className="w-8 h-8 text-ancestral-black" />
            </div>
            <h3 className="text-2xl font-display font-bold text-ancestral-white mb-4 normal-case">
              {t('csc.candidatura.success.title')}
            </h3>
            <p className="text-text-secondary mb-6">
              {t('csc.candidatura.success.line1')}
              <br />
              {t('csc.candidatura.success.line2')}
            </p>
            <p className="text-sm text-text-muted font-mono-v2">
              {t('csc.candidatura.success.note')}
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 md:p-12 bg-ancestral-black/50 border border-text-muted/20"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-mono-v2 text-text-muted mb-2 tracking-wider">
                {t('csc.candidatura.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-dark border border-text-muted/30
                         text-ancestral-white placeholder:text-text-muted/50
                         focus:border-tech-olive focus:outline-none transition-colors"
                placeholder={t('csc.candidatura.form.namePlaceholder')}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-mono-v2 text-text-muted mb-2 tracking-wider">
                {t('csc.candidatura.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-dark border border-text-muted/30
                         text-ancestral-white placeholder:text-text-muted/50
                         focus:border-tech-olive focus:outline-none transition-colors"
                placeholder={t('csc.candidatura.form.emailPlaceholder')}
              />
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-mono-v2 text-text-muted mb-2 tracking-wider">
                {t('csc.candidatura.form.experience')}
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-dark border border-text-muted/30
                         text-ancestral-white placeholder:text-text-muted/50
                         focus:border-tech-olive focus:outline-none transition-colors"
                placeholder={t('csc.candidatura.form.experiencePlaceholder')}
              />
            </div>

            {/* Why */}
            <div>
              <label htmlFor="why" className="block text-sm font-mono-v2 text-text-muted mb-2 tracking-wider">
                {t('csc.candidatura.form.why')}
              </label>
              <textarea
                id="why"
                name="why"
                required
                rows={4}
                value={formData.why}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-dark border border-text-muted/30
                         text-ancestral-white placeholder:text-text-muted/50
                         focus:border-tech-olive focus:outline-none transition-colors resize-none"
                placeholder={t('csc.candidatura.form.whyPlaceholder')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-3 px-8 py-5
                       bg-tech-olive text-ancestral-black font-bold uppercase tracking-wider
                       hover:bg-tech-olive/90 transition-all duration-300
                       shadow-[0_0_40px_rgba(141,199,94,0.2)] hover:shadow-[0_0_60px_rgba(141,199,94,0.3)]"
            >
              <span>{t('csc.candidatura.form.submit')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Note */}
            <p className="text-center text-xs text-text-muted font-mono-v2">
              {t('csc.candidatura.form.note')}
            </p>
          </motion.form>
        )}

        {/* Additional info */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm">
            {t('csc.candidatura.contact.text')}{" "}
            <a
              href={`mailto:${t('csc.candidatura.contact.email')}`}
              className="text-tech-olive hover:underline"
            >
              {t('csc.candidatura.contact.email')}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCCandidatura;
