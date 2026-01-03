import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ProcessSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('studio');

  const steps = [
    {
      number: "01",
      titleKey: "process.steps.step1.title",
      linesKey: "process.steps.step1.lines",
      outputsKey: "process.steps.step1.outputs",
    },
    {
      number: "02",
      titleKey: "process.steps.step2.title",
      linesKey: "process.steps.step2.lines",
      outputsKey: "process.steps.step2.outputs",
    },
    {
      number: "03",
      titleKey: "process.steps.step3.title",
      linesKey: "process.steps.step3.lines",
      outputsKey: "process.steps.step3.outputs",
    },
  ];

  return (
    <div>
      <div className="mb-12">
        <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-4">
          {t('process.title')}
        </h2>
        <p className="text-xl text-ancestral-white">
          {t('process.subtitle')}
        </p>
      </div>

      <div className="space-y-16">
        {steps.map((step, index) => {
          const lines = t(step.linesKey, { returnObjects: true }) as string[];
          const outputs = t(step.outputsKey, { returnObjects: true }) as string[];

          return (
            <motion.div
              key={step.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
              className="border-t border-text-muted/20 pt-8"
            >
              <div className="grid md:grid-cols-[100px_1fr] gap-8">
                {/* Number */}
                <div className="font-mono-v2 text-4xl text-text-muted/40">
                  {step.number}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-2xl text-ancestral-white mb-6">
                    {t(step.titleKey)}
                  </h3>

                  <div className="space-y-1 text-text-secondary mb-6">
                    {lines.map((line: string, i: number) => (
                      <p key={i} className={line === "" ? "h-4" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-text-muted">→ {t('process.outputLabel')}</span>
                    {outputs.map((output: string, i: number) => (
                      <span key={output} className="text-sm text-ancestral-amber">
                        {output}
                        {i < outputs.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-16 pt-8 border-t border-text-muted/20">
        <p className="text-text-muted text-sm">
          {t('process.footer.line1')}
          <br />
          {t('process.footer.line2')}
          <br />
          {t('process.footer.line3')}
        </p>
      </div>
    </div>
  );
};

export default ProcessSection;
