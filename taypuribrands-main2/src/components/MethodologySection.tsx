import React, { useEffect, useRef, useState } from 'react';
import { Search, Lightbulb, Brush, Rocket } from 'lucide-react';
import { useApplicationModal } from '../contexts/ApplicationModalContext';

const MethodologySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useApplicationModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger step animation sequence
          const timer = setInterval(() => {
            setCurrentStep(prev => prev < 4 ? prev + 1 : prev);
          }, 1000);
          
          setTimeout(() => clearInterval(timer), 4000);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "1",
      icon: Search,
      title: "ARQUEOLOGIA DE IDENTIDADE",
      description: "Escavamos sua história até achar o fio condutor que conecta TUDO que você é."
    },
    {
      number: "2",
      icon: Lightbulb,
      title: "BRAND OS™ COMPLETO",
      description: "Seu Sistema Operacional codificado. Voz, visual, narrativa, processos. Tudo.",
      highlight: "One Person Brand. One Person Business. One Person System."
    },
    {
      number: "3",
      icon: Brush,
      title: "STACK DE IA CONFIGURADA",
      description: "Midjourney, Claude, HeyGen, Cursor. Sua equipe de R$1M por R$500/mês."
    },
    {
      number: "4",
      icon: Rocket,
      title: "NEGÓCIO ESTRUTURADO",
      description: "Oferta, preço, funil, sistema. Pronto pra rodar no dia 1."
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black-950 via-black-900 to-black-800">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              O QUE EU FAÇO <span className="text-gradient">POR VOCÊ</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              (COM VOCÊ)
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Left side - Taynã's professional portrait */}
            <div className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="relative">
                <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-transparent to-transparent z-10" />
                  
                  <img 
                    src="/lovable-uploads/tayna-methodology.jpg" 
                    alt="Taynã Puri - Blueprint Divergente"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 glass-strong px-6 py-3 rounded-xl animate-float">
                    <div className="text-green-400 text-sm font-bold mb-1">BLUEPRINT DIVERGENTE</div>
                    <div className="text-white text-lg font-black">90 DIAS</div>
                  </div>
                </div>

                {/* Floating stats */}
                <div className="absolute -top-8 -right-8 glass-strong p-6 rounded-2xl animate-float delay-1000">
                  <div className="text-3xl font-black text-gradient mb-1">12</div>
                  <div className="text-white/80 text-sm">Vagas por ano</div>
                </div>
              </div>
            </div>

            {/* Right side - Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep > index;
                
                return (
                  <div 
                    key={index}
                    className={`relative transition-all duration-1000 delay-${(index + 1) * 200} ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <div className={`card-premium p-8 transition-all duration-700 ${
                      isActive ? 'bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30 scale-105' : 'bg-gradient-to-br from-white/5 to-white/2 border-white/10'
                    }`}>
                      <div className="flex items-start space-x-6">
                        {/* Step Number */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isActive ? 'bg-gradient-to-br from-green-500 to-green-600 scale-110' : 'bg-white/10'
                        }`}>
                          <span className={`text-2xl font-black ${
                            isActive ? 'text-black' : 'text-white/70'
                          }`}>
                            {step.number}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <Icon className={`w-6 h-6 mr-3 transition-colors duration-500 ${
                              isActive ? 'text-green-400' : 'text-white/50'
                            }`} />
                            <h3 className={`text-xl font-bold transition-colors duration-500 ${
                              isActive ? 'text-white' : 'text-white/70'
                            }`}>
                              {step.title}
                            </h3>
                          </div>
                          
                          <p className={`text-base leading-relaxed mb-3 transition-colors duration-500 ${
                            isActive ? 'text-white/80' : 'text-white/60'
                          }`}>
                            {step.description}
                          </p>
                          
                          {step.highlight && (
                            <p className={`text-sm font-medium transition-colors duration-500 ${
                              isActive ? 'text-green-400' : 'text-white/50'
                            }`}>
                              {step.highlight}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Progress Line */}
                      {index < steps.length - 1 && (
                        <div className="absolute left-16 top-24 w-0.5 h-16 bg-gradient-to-b from-green-400/50 to-transparent" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button 
              onClick={openModal}
              className="btn-premium text-lg magnetic group hover:scale-110 transition-all duration-300"
            >
              <span className="flex items-center">
                QUERO SER SELECIONADO
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
