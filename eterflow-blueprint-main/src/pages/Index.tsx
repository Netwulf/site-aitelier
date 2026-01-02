import React from 'react';
import Header from '../components/Header';
import WorkshopHeroSection from '../components/WorkshopHeroSection';
import InstagramDiagnosticSection from '../components/InstagramDiagnosticSection';
import OpeningNarrativeSection from '../components/OpeningNarrativeSection';
import DeliverablesWorkshopSection from '../components/DeliverablesWorkshopSection';
import PracticalExampleSection from '../components/PracticalExampleSection';
import WorkshopScheduleSection from '../components/WorkshopScheduleSection';
import WhyNowSection from '../components/WhyNowSection';
import IdealForSection from '../components/IdealForSection';
import ProfileSection from '../components/ProfileSection';
import CasesCarousel from '../components/CasesCarousel';
import InvestmentOptionsSection from '../components/InvestmentOptionsSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <WorkshopHeroSection />
      <InstagramDiagnosticSection />
      <OpeningNarrativeSection />
      <DeliverablesWorkshopSection />
      <PracticalExampleSection />
      <WorkshopScheduleSection />
      <WhyNowSection />
      <IdealForSection />
      <ProfileSection />
      <CasesCarousel />
      <InvestmentOptionsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
