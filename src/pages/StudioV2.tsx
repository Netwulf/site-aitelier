import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { SectionContainer } from "@/components/SectionContainer";
import { StudioOpening } from "@/components/StudioOpening";
import { StudioServices } from "@/components/StudioServices";
import { ProcessSection } from "@/components/ProcessSection";
import { StudioEntry } from "@/components/StudioEntry";
import { InstagramDiagnostic } from "@/components/InstagramDiagnostic";
import SelectedWork from "@/components/SelectedWork";
import VisualBreather from "@/components/VisualBreather";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const StudioV2 = () => {
  useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation('studio');

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* Hero - "Onde o campo encontra o mundo" */}
        <section className="pt-32 pb-16 px-6 bg-ancestral-black">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono-v2 text-sm text-ancestral-amber mb-4 tracking-widest">
                {t('hero.terminal')}
              </p>
              <h1 className="font-display text-hero text-ancestral-white leading-none mb-8">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mb-6 leading-relaxed">
                {t('hero.line1')}
                <br />
                <span className="text-ancestral-white">{t('hero.line2')}</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Diagnostic - First Step */}
        <InstagramDiagnostic variant="studio" />

        {/* Opening Statement */}
        <SectionContainer number={1}>
          <StudioOpening />
        </SectionContainer>

        {/* Visual Breather */}
        <VisualBreather
          image="/hero-options-v2/hero-shamanic-forest.png"
          height="40vh"
          overlay="gradient"
        />

        {/* O que fazemos - Serviços visuais */}
        <StudioServices />

        {/* Quem já confiou - Cases com fotos (subiu no fluxo) */}
        <SelectedWork />

        {/* Visual Breather */}
        <VisualBreather
          image="/hero-options/hero-emergence-light.png"
          height="35vh"
          overlay="dark"
        />

        {/* O Processo */}
        <SectionContainer number={2}>
          <ProcessSection />
        </SectionContainer>

        {/* Entrar */}
        <SectionContainer number={3}>
          <StudioEntry />
        </SectionContainer>
      </main>

      <FooterV2 />
    </div>
  );
};

export default StudioV2;
