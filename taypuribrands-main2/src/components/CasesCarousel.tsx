import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useApplicationModal } from '../contexts/ApplicationModalContext';

const CasesCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useApplicationModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cases = [
    {
      name: "Alan Nicolas",
      field: "Fenômeno IA",
      image: "/lovable-uploads/alan-nicolas.jpg",
      description: "Academia Lendária: 5.000+ alunos, R$ 200M faturamento pessoal. De 6K para 262K seguidores + alunos faturando 6 dígitos em 4 meses com IA."
    },
    {
      name: "Alexandra Loras",
      field: "Diversidade & Alto Impacto",
      image: "/lovable-uploads/alexandra-loras.webp",
      description: "SHARK TANK BRASIL — Ex-consulesa da França, Shark do Shark Tank, 20+ prêmios internacionais. Aplicou narrativa única: diversidade + alto impacto = Forbes + 20 mil pessoas impactadas globalmente."
    },
    {
      name: "Davi Ribas",
      field: "Movement Is The New Branding",
      image: "/lovable-uploads/davi-ribas.png",
      description: "Criador ETER Co, 154K seguidores, consultor internacional. Metodologia revolucionária: movimento > produto = empresas que faturam milhões com causa."
    },
    {
      name: "Edgar Ueda",
      field: "Gigante Imobiliário",
      image: "/lovable-uploads/edgar-ueda.png",
      description: "CEO Neximob: R$ 5.7 bilhões em vendas, 18.500+ imóveis, 70 cidades. Sistema único: inteligência imobiliária + expansão nacional = 3x TEDx + best-seller."
    },
    {
      name: "Rafa Medeiros",
      field: "Códigos da Influência",
      image: "/lovable-uploads/rafa-medeiros.jpg",
      description: "TEDx Speaker, 15.000+ profissionais treinados, especialização Califórnia. Método comprovado: Eneagrama + negócios = dobro de faturamento para clientes premium."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX;
    const startScrollLeft = carouselRef.current?.scrollLeft || 0;

    const handleDragMove = (e: MouseEvent) => {
      if (!carouselRef.current) return;
      const x = e.clientX;
      const walk = (x - startX) * 2;
      carouselRef.current.scrollLeft = startScrollLeft - walk;
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('formulario-aplicacao');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-black-950 to-black-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gold-400/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-8 text-white leading-tight">
              PARA QUEM EU JÁ CONSTRUÍ <span className="text-gradient">NARRATIVAS E SISTEMAS</span>
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
              Todos eles cresceram porque criaram uma narrativa + uma categoria + um sistema.<br />
              Não porque eram os melhores. <strong className="text-white">Porque eram os únicos.</strong>
            </p>
          </div>

          {/* Main Carousel */}
          <div className="relative mb-8 md:mb-12">
            <div 
              ref={carouselRef}
              className={`overflow-hidden cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
              onMouseDown={handleDragStart}
            >
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {cases.map((case_, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2 md:px-4">
                    <div className="card-premium bg-gradient-to-br from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.06] transition-all duration-500">
                      <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
                        {/* Image Section */}
                        <div className="relative">
                          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gold-500/20 to-transparent z-10" />
                            
                            <img 
                              src={case_.image} 
                              alt={case_.name}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            
                            {/* Name Overlay */}
                            <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
                              <div className="glass-strong p-3 md:p-6 rounded-xl">
                                <h3 className="text-lg md:text-2xl font-bold text-white mb-1">{case_.name}</h3>
                                <p className="text-sm md:text-base text-gold-400 font-medium">{case_.field}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-4 md:space-y-8">
                          {/* Description */}
                          <div className="glass-strong p-4 md:p-6 rounded-xl">
                            <blockquote className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed">
                              {case_.description}
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass-strong rounded-full flex items-center justify-center hover:bg-white/[0.15] transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-gold-400 transition-colors" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass-strong rounded-full flex items-center justify-center hover:bg-white/[0.15] transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-gold-400 transition-colors" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 md:space-x-3 mb-8 md:mb-16">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gold-400 w-6 md:w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button 
              onClick={openModal}
              className="btn-premium text-base md:text-lg magnetic group hover:scale-110 transition-all duration-300"
            >
              <span className="flex items-center">
                QUERO PREENCHER APLICAÇÃO
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesCarousel;
