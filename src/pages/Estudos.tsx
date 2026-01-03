import { motion } from "framer-motion";
import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { EscolaHero } from "@/components/EscolaHero";
import { OnePersonStudioSection } from "@/components/OnePersonStudioSection";
import { CoursesNetflixGallery } from "@/components/CoursesNetflixGallery";
import { EstudosEntry } from "@/components/EstudosEntry";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Estudos = () => {
  useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* Hero - Featured Course */}
        <EscolaHero />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* One Person Studio Section - The main pitch */}
        <OnePersonStudioSection />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* TODO: COMECE AQUI - ZERO→ONE Block - Reativar quando curso estiver pronto */}

        {/* Courses Netflix Gallery - Organized by categories */}
        <CoursesNetflixGallery />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Entry CTA */}
        <section className="py-24 md:py-32 px-6 bg-ancestral-black">
          <EstudosEntry />
        </section>
      </main>

      <FooterV2 />
    </div>
  );
};

export default Estudos;
