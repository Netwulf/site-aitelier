import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// Cinema sem Cameras Components
import { CSCHero } from "@/components/cinema-sem-cameras/CSCHero";
import { CSCRupture } from "@/components/cinema-sem-cameras/CSCRupture";
import { CSCProblem } from "@/components/cinema-sem-cameras/CSCProblem";
import { CSCCapabilities } from "@/components/cinema-sem-cameras/CSCCapabilities";
import { CSCIdealFor } from "@/components/cinema-sem-cameras/CSCIdealFor";
import { CSCMovements } from "@/components/cinema-sem-cameras/CSCMovements";
import { CSCProfile } from "@/components/cinema-sem-cameras/CSCProfile";
import { CSCInvestment } from "@/components/cinema-sem-cameras/CSCInvestment";
import { CSCProcess } from "@/components/cinema-sem-cameras/CSCProcess";

const CinemaSemCameras = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* 1. Hero - Featured Course */}
        <CSCHero />

        {/* 2. Rupture - 3 negations + affirmation */}
        <CSCRupture />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* 3. The Real Problem */}
        <CSCProblem />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* 4. What You'll Be Able To Do */}
        <CSCCapabilities />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* 5. For Who / Not For */}
        <CSCIdealFor />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* 6. The 4 Movements */}
        <CSCMovements />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* 7. Who Directs - Tay Profile */}
        <CSCProfile />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* 8. Investment */}
        <CSCInvestment />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* 9. Process + Final CTA */}
        <CSCProcess />
      </main>

      <FooterV2 />
    </div>
  );
};

export default CinemaSemCameras;
