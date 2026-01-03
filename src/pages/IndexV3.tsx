import { useTranslation } from "react-i18next";
import { NavigationV2 } from "@/components/NavigationV2";
import { HeroV2 } from "@/components/HeroV2";
import { RuptureSection } from "@/components/RuptureSection";
import { Triptych } from "@/components/Triptych";
import { FuturoAncestralSection } from "@/components/FuturoAncestralSection";
import { ArchivePreview } from "@/components/ArchivePreview";
import { EntrySection } from "@/components/EntrySection";
import { FooterV2 } from "@/components/FooterV2";
import VisualBreather from "@/components/VisualBreather";
import { SacredGeometryOverlay } from "@/components/SacredGeometryOverlay";
import { ManifestoMoment } from "@/components/ManifestoMoment";
import { ClonesShowcase } from "@/components/ClonesShowcase";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollOptimization } from "@/hooks/useScrollOptimization";

// V1 Components - Consolidated
import InstagramDiagnosticSection from "@/components/InstagramDiagnosticSection";
import CommunityHub from "@/components/CommunityHub";
import Partners from "@/components/Partners";

// Breather images - reutilizar do V1
import breatherThreshold from "@/assets/gallery/breather-threshold.png";
import concreteVoid from "@/assets/gallery/concrete-void.png";

const IndexV3 = () => {
  useSmoothScroll();
  useScrollOptimization();
  const { t } = useTranslation('home');

  const triptychItems = [
    {
      title: t('triptych.items.escola.title'),
      tags: t('triptych.items.escola.tags', { returnObjects: true }) as string[],
      description: t('triptych.items.escola.description'),
      href: "/escola",
      cta: t('triptych.items.escola.cta'),
    },
    {
      title: t('triptych.items.studio.title'),
      tags: t('triptych.items.studio.tags', { returnObjects: true }) as string[],
      description: t('triptych.items.studio.description'),
      href: "/studio",
      cta: t('triptych.items.studio.cta'),
    },
    {
      title: t('triptych.items.playground.title'),
      tags: t('triptych.items.playground.tags', { returnObjects: true }) as string[],
      description: t('triptych.items.playground.description'),
      href: "/playground",
      cta: t('triptych.items.playground.cta'),
    },
  ];

  return (
    <div className="min-h-screen bg-void-black cursor-brutal relative">
      {/* Background Effects Layer - do V1 */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="organic-glow" style={{ top: '10%', left: '20%' }} />
        <div className="mesh-gradient-1" />
        <div className="mesh-gradient-2" />
      </div>

      <NavigationV2 />

      <main>
        {/* Hero - "O futuro é ancestral." */}
        <HeroV2 variant="A" />

        {/* Brutal Line Divider - V1 Recovery */}
        <div className="brutal-line-glow" />

        {/* Section 1: The Rupture */}
        <RuptureSection />

        {/* Visual Breather 1 */}
        <VisualBreather image={breatherThreshold} height="50vh" overlay="gradient" />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Section 2: The Triptych */}
        <section className="relative py-24 md:py-32 px-4 md:px-8 bg-brutal-black">
          <div className="container mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="code-text text-sm text-matrix-green">{t('triptych.sectionCode')}</span>
                <div className="h-px bg-matrix-green/50 flex-1" />
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brutal-white leading-tight">
                {t('triptych.sectionTitle')} <span className="text-matrix-green">{t('triptych.sectionTitleHighlight')}</span>
              </h2>
            </div>

            <Triptych items={triptychItems} />
          </div>
        </section>

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Manifesto Moment - Warm Ivory Breathing Room */}
        <ManifestoMoment />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Section: AI Clones Showcase */}
        <ClonesShowcase />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Section 3: Futuro Ancestral with Sacred Geometry */}
        <div className="relative">
          <SacredGeometryOverlay opacity={0.03} />
          <FuturoAncestralSection />
        </div>

        {/* Visual Breather 2 */}
        <VisualBreather image={concreteVoid} height="40vh" overlay="dark" />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Section 4: Visual Archive Preview */}
        <ArchivePreview />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Section 5: Instagram Diagnostic - Full Tool from V1 */}
        <InstagramDiagnosticSection />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Section 6: Community Hub - From V1 */}
        <CommunityHub />

        {/* Section 8: Partners Marquee - From V1 */}
        <Partners />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Section 9: Entry CTA */}
        <EntrySection />
      </main>

      <FooterV2 />
    </div>
  );
};

export default IndexV3;
