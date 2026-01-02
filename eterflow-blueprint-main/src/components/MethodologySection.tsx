import React, { useEffect, useRef, useState } from 'react';
import { Search, Lightbulb, Brush } from 'lucide-react';
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
      number: "01",
      icon: Search,
      title: "MÊS 1: IDENTIDADE",
      description: "Sessões profundas para entender: Sua história real (não a versão LinkedIn), seus drivers internos, seu conhecimento tácito, suas convicções não-negociáveis."
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "MÊS 2: ESTRATÉGIA",
      description: "Construção do seu posicionamento: Arquétipo e território, mensagem central, público estratégico, modelo de monetização."
    },
    {
      number: "03",
      icon: Brush,
      title: "MÊS 3: ATIVAÇÃO",
      description: "Materialização da marca: Narrativas prontas para usar, apresentação de autoridade, roteiro de conteúdo, próximos passos claros."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden section-dark">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="accent-bar-lg mx-auto" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              COMO FUNCIONA <span className="text-olive">NA PRÁTICA</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
              O processo de construir sua identidade profissional
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            {/* Left side - Taynã's portrait */}
            <div className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <div className="relative">
                <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden border-2 border-neutral-200">
                  <img
                    src="/lovable-uploads/tayna-methodology.jpg"
                    alt="Taynã Puri - Blueprint Divergente"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute bottom-0 left-0 bg-olive text-neutral-0 px-6 py-3">
                    <div className="text-xs font-mono uppercase tracking-wider mb-1">BLUEPRINT DIVERGENTE</div>
                    <div className="text-2xl font-bold">90 DIAS</div>
                  </div>
                </div>

                {/* Stats badge */}
                <div className="absolute -top-4 -right-4 bg-neutral-0 border-2 border-olive p-4">
                  <div className="text-3xl font-bold text-olive mb-1">12</div>
                  <div className="text-neutral-400 text-sm font-mono">VAGAS/ANO</div>
                </div>
              </div>
            </div>

            {/* Right side - Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep > index;

                return (
                  <div
                    key={index}
                    className={`relative transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className={`p-6 md:p-8 border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-olive bg-olive/5'
                        : 'border-neutral-200 bg-neutral-100'
                    }`}>
                      <div className="flex items-start gap-6">
                        {/* Step Number */}
                        <div className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 ${
                          isActive
                            ? 'bg-olive border-olive text-neutral-0'
                            : 'bg-transparent border-neutral-300 text-neutral-400'
                        }`}>
                          <span className="text-lg font-mono font-bold">
                            {step.number}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <Icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${
                              isActive ? 'text-olive' : 'text-neutral-500'
                            }`} />
                            <h3 className={`text-lg font-bold transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-neutral-400'
                            }`}>
                              {step.title}
                            </h3>
                          </div>

                          <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                            isActive ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={openModal}
              className="btn-brutal text-lg"
            >
              <span>QUERO SER SELECIONADO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
