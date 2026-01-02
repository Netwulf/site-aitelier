import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Target, Sparkles, Video, Users, Calendar } from 'lucide-react';
import { useApplicationModal } from '../contexts/ApplicationModalContext';

const DeliverableSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const deliverables = [
    {
      icon: Target,
      title: "POSICIONAMENTO DEFINITIVO",
      description: "Sua tese única no mercado - o território que só você pode ocupar.",
      preview: "Tese + Território + Diferenciação"
    },
    {
      icon: Sparkles,
      title: "NARRATIVA ESTRUTURADA",
      description: "Do elevator pitch à palestra completa - sua história contada com impacto.",
      preview: "Elevator Pitch + Palestra"
    },
    {
      icon: Video,
      title: "METODOLOGIA PROPRIETÁRIA",
      description: "Seu conhecimento sistematizado em frameworks que podem ser ensinados e vendidos.",
      preview: "Framework + Sistema"
    },
    {
      icon: Users,
      title: "ESTRATÉGIA DE PRESENÇA",
      description: "Onde e como aparecer para construir autoridade sem virar criador de conteúdo.",
      preview: "Canais + Conteúdo Estratégico"
    },
    {
      icon: Calendar,
      title: "MODELO DE AUTORIDADE",
      description: "Consultoria, palestra ou mentoria - estruturado e pronto para monetizar.",
      preview: "Oferta + Precificação + Pitch"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden section-light">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="accent-bar-lg mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-neutral-0 leading-tight">
              O QUE VOCÊ <span className="text-olive">LEVA</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-500 max-w-3xl mx-auto">
              Tudo construído a partir de quem você realmente é. Sem persona. Sem script. Sem fingimento.
            </p>
          </div>

          {/* Deliverables Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`card-brutal-light group transition-all duration-500 hover:border-olive ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-olive flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-neutral-0" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-0 leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-neutral-500 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="border-t border-neutral-300 pt-4">
                    <span className="text-olive font-mono text-xs uppercase tracking-wider">
                      {item.preview}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={openModal}
              className="btn-brutal text-lg"
            >
              <span className="flex items-center">
                QUERO SER SELECIONADO
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverableSection;
