
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import DeliverableSection from '../components/DeliverableSection';
import CasesCarousel from '../components/CasesCarousel';
import ProfileSection from '../components/ProfileSection';
import ProcessoSeletivoSection from '../components/ProcessoSeletivoSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSection />
      <DeliverableSection />
      <CasesCarousel />
      <ProfileSection />
      <ProcessoSeletivoSection />
      <Footer />
    </div>
  );
};

export default Index;
