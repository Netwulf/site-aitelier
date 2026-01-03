import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ContactTopic = "studio" | "escola" | "newsletter" | null;

const ContactV2 = () => {
  useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('contact');

  const topics = [
    {
      id: "studio" as const,
      label: t('topics.studio.label'),
      description: t('topics.studio.description'),
    },
    {
      id: "escola" as const,
      label: t('topics.escola.label'),
      description: t('topics.escola.description'),
    },
    {
      id: "newsletter" as const,
      label: t('topics.newsletter.label'),
      description: t('topics.newsletter.description'),
    },
  ];

  const [selectedTopic, setSelectedTopic] = useState<ContactTopic>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTopic) {
      toast.error(t('validation.selectTopic'));
      return;
    }

    if (!email) {
      toast.error(t('validation.fillEmail'));
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Integrate with backend/email service
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success(t('messages.success'));
    } catch (error) {
      toast.error(t('messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedTopic(null);
    setEmail("");
    setMessage("");
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl text-ancestral-white mb-4">
              {t('page.title')}
            </h1>
            <p className="text-lg text-text-muted">
              {t('page.subtitle')}
            </p>
          </motion.div>

          {isSuccess ? (
            /* Success State */
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              className="p-12 border border-matrix-green/30 bg-matrix-green/5 text-center"
            >
              <CheckCircle className="w-16 h-16 text-matrix-green mx-auto mb-6" />
              <h3 className="text-2xl font-display text-ancestral-white mb-2">
                {t('success.title')}
              </h3>
              <p className="text-text-muted mb-8">
                {t('success.subtitle')}
              </p>
              <button
                onClick={resetForm}
                className="font-mono-v2 text-sm text-matrix-green hover:text-ancestral-white transition-colors"
              >
                [{t('success.sendAnother')}]
              </button>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Topic Selection */}
              <div>
                <label className="font-mono-v2 text-xs text-text-muted mb-4 block tracking-wider">
                  {t('labels.subject')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-4 border-2 text-left transition-all ${
                        selectedTopic === topic.id
                          ? "border-matrix-green bg-matrix-green/10"
                          : "border-text-muted/20 hover:border-text-muted/40"
                      }`}
                    >
                      <span
                        className={`block font-medium mb-1 ${
                          selectedTopic === topic.id
                            ? "text-matrix-green"
                            : "text-ancestral-white"
                        }`}
                      >
                        {topic.label}
                      </span>
                      <span className="text-sm text-text-muted">
                        {topic.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-mono-v2 text-xs text-text-muted mb-2 block tracking-wider">
                  {t('labels.yourEmail')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder={t('placeholders.email')}
                  className="w-full px-4 py-4 bg-stone-dark border border-text-muted/20
                           text-ancestral-white placeholder:text-text-muted/50
                           focus:border-matrix-green focus:outline-none transition-colors
                           disabled:opacity-50"
                />
              </div>

              {/* Message (optional) */}
              <div>
                <label className="font-mono-v2 text-xs text-text-muted mb-2 block tracking-wider">
                  {t('labels.message')} <span className="text-text-muted/50">{t('labels.optional')}</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  placeholder={t('placeholders.message')}
                  className="w-full px-4 py-4 bg-stone-dark border border-text-muted/20
                           text-ancestral-white placeholder:text-text-muted/50
                           focus:border-matrix-green focus:outline-none transition-colors
                           resize-none disabled:opacity-50"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !selectedTopic || !email}
                className="w-full px-8 py-4 bg-matrix-green text-ancestral-black font-bold
                         uppercase tracking-wider flex items-center justify-center gap-3
                         hover:bg-matrix-green/90 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('buttons.sending')}
                  </>
                ) : (
                  <>
                    {t('buttons.send')}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Direct email fallback */}
              <p className="text-center text-sm text-text-muted">
                {t('directEmail')}{" "}
                <a
                  href="mailto:contato@aitelier.com.br"
                  className="text-matrix-green hover:text-ancestral-white transition-colors"
                >
                  contato@aitelier.com.br
                </a>
              </p>
            </motion.form>
          )}
        </div>
      </main>

      <FooterV2 />
    </div>
  );
};

export default ContactV2;
