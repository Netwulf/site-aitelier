import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollOptimization } from "@/hooks/useScrollOptimization";
import VisualBreather from "@/components/VisualBreather";

// Cinema sem Cameras V2 Components
import {
  CSCHeroV2,
  CSCVirada,
  CSCSyllabus,
  CSCComoFunciona,
  CSCTurmaFundadora,
  CSCQuemDirige,
  CSCCandidatura,
  CSCFinalCTA,
} from "@/components/cinema-sem-cameras";

// Visual breather images
import studioCreate from "@/assets/gallery/studio-create.png";
import thresholdFigure from "@/assets/gallery/threshold-figure.png";
import industrialLight from "@/assets/gallery/industrial-light.png";

const CinemaSemCameras = () => {
  useSmoothScroll();
  useScrollOptimization();

  return (
    <div className="min-h-screen bg-ancestral-black cursor-brutal">
      {/* Background Effects Layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="organic-glow" style={{ top: '10%', left: '20%' }} />
        <div className="mesh-gradient-1" />
        <div className="mesh-gradient-2" />
      </div>

      <NavigationV2 />

      <main>
        {/* 1. Hero - Full-screen cinematic */}
        <CSCHeroV2 />

        {/* Divider */}
        <div className="brutal-line-glow" />

        {/* 2. A Virada - Taynã's story */}
        <CSCVirada />

        {/* Visual Breather 1 - Transition to Syllabus */}
        <VisualBreather image={studioCreate} height="40vh" overlay="gradient" />

        {/* Divider */}
        <div className="brutal-line-glow" />

        {/* 3. Syllabus - 6 pillars of cinema */}
        <CSCSyllabus />

        {/* Divider */}
        <div className="brutal-line-glow" />

        {/* 4. Como Funciona - Methodology */}
        <CSCComoFunciona />

        {/* Visual Breather 2 - Transition to Turma */}
        <VisualBreather image={thresholdFigure} height="50vh" overlay="dark" />

        {/* Divider */}
        <div className="brutal-line-glow" />

        {/* 5. Turma Fundadora - Exclusivity */}
        <CSCTurmaFundadora />

        {/* Divider */}
        <div className="brutal-line-glow" />

        {/* 6. Quem Dirige - Taynã's profile */}
        <CSCQuemDirige />

        {/* Visual Breather 3 - Transition to CTA */}
        <VisualBreather image={industrialLight} height="35vh" overlay="gradient" />

        {/* Divider */}
        <div className="brutal-line-glow" />

        {/* 7. Candidatura - Application form */}
        <CSCCandidatura />

        {/* Divider */}
        <div className="brutal-line-glow" />

        {/* 8. Final CTA */}
        <CSCFinalCTA />
      </main>

      <FooterV2 />
    </div>
  );
};

export default CinemaSemCameras;
