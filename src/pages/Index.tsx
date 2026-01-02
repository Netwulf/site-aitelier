import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ManifestoSection from "@/components/ManifestoSection";
import VisualBreather from "@/components/VisualBreather";
import ArtGallery from "@/components/ArtGallery";
import InstagramDiagnosticSection from "@/components/InstagramDiagnosticSection";
import SelectedWork from "@/components/SelectedWork";
import BriefAbout from "@/components/BriefAbout";
import CommunityHub from "@/components/CommunityHub";
import Partners from "@/components/Partners";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CustomCursor from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollOptimization } from "@/hooks/useScrollOptimization";

// Gallery images for breathers - Cinematic style (Wong Kar-Wai, Villeneuve, Claire Denis)
import breatherThreshold from "@/assets/gallery/breather-threshold.png";
import concreteVoid from "@/assets/gallery/concrete-void.png";
import methodologyWorkspace from "@/assets/generated/methodology-workspace.png";

const Index = () => {
  useSmoothScroll();
  useScrollOptimization();

  return (
    <PageTransition>
      <div className="min-h-screen bg-brutal-black relative">
        {/* Story 3.4: Custom Cursor */}
        <CustomCursor />

        {/* Story 3.3: Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Background Effects Layer */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="organic-glow" style={{ top: '10%', left: '20%' }} />
          <div className="mesh-gradient-1" />
          <div className="mesh-gradient-2" />
        </div>

        <Navigation />
        <main>
        <Hero />
        <ManifestoSection />

        {/* Visual Breather 1 - Threshold (Villeneuve style) */}
        <VisualBreather image={breatherThreshold} height="50vh" overlay="gradient" />

        <ArtGallery />

        {/* Visual Breather 2 - Concrete Void */}
        <VisualBreather image={concreteVoid} height="40vh" overlay="dark" />

        <InstagramDiagnosticSection />
        <SelectedWork />

        {/* Visual Breather 3 - Methodology Workspace (Apichatpong style) */}
        <VisualBreather image={methodologyWorkspace} height="45vh" overlay="gradient" />

        <BriefAbout />
        <CommunityHub />
        <Partners />
        <FinalCTA />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
