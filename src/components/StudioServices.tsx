import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const movementImages = {
  obra: [
    "/hero-options/hero-darkroom-reveal.png",
    "/tayna-portraits/tayna-studio-contemplative.png",
  ],
  linguagem: [
    "/hero-options/hero-weaver-threads.png",
    "/hero-options/hero-atelier-workspace.png",
  ],
  sistema: [
    "/hero-options-v2/hero-brutalist-tunnel.png",
    "/hero-options/hero-atelier-workspace.png",
  ],
};

export const StudioServices = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('studio');

  const movementKeys = ['obra', 'linguagem', 'sistema'] as const;

  return (
    <section className="py-24 md:py-32 px-6 bg-ancestral-black">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono-v2 text-sm text-text-muted tracking-widest mb-4">
            {t('services.title')}
          </p>
          <h2 className="text-3xl md:text-4xl text-ancestral-white leading-tight max-w-2xl mb-6">
            {t('services.subtitle1')}
            <br />
            <span className="text-ancestral-amber">{t('services.subtitle2')}</span>
          </h2>
          <p className="font-mono-v2 text-sm text-ancestral-amber/70">
            {t('services.comment')}
          </p>
        </div>

        {/* Movements - 3 grouped sections */}
        <div className="space-y-16">
          {movementKeys.map((movementKey, movementIndex) => {
            const items = t(`services.movements.${movementKey}.items`, { returnObjects: true }) as Array<{title: string, tagline: string}>;
            const images = movementImages[movementKey];

            return (
              <motion.div
                key={movementKey}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: movementIndex * 0.1 }}
              >
                {/* Movement Header */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono-v2 text-4xl md:text-5xl font-bold text-ancestral-amber/30">
                    {String(movementIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-ancestral-white">
                      {t(`services.movements.${movementKey}.title`)}
                    </h3>
                    <p className="font-mono-v2 text-sm text-ancestral-amber">
                      {t(`services.movements.${movementKey}.subtitle`)}
                    </p>
                  </div>
                  <div className="h-px bg-ancestral-amber/20 flex-1" />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {items.map((service, serviceIndex) => (
                    <div key={service.title} className="group">
                      <div className="relative h-[280px] md:h-[320px] overflow-hidden border border-text-muted/20 group-hover:border-ancestral-amber/50 transition-colors duration-500">
                        <img
                          src={images[serviceIndex]}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ancestral-black via-ancestral-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h4 className="text-xl md:text-2xl font-display text-ancestral-white mb-2">
                            {service.title}
                          </h4>
                          <p className="text-base text-ancestral-amber">
                            {service.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note with canonical phrase */}
        <motion.div
          className="mt-16 pt-8 border-t border-text-muted/20"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-text-muted text-sm max-w-xl mb-4">
            {t('services.footer.note1')}
            <br />
            <span className="text-ancestral-white">{t('services.footer.note2')}</span>
          </p>
          <p className="font-mono-v2 text-sm text-ancestral-amber/70">
            {t('services.footer.comment')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioServices;
