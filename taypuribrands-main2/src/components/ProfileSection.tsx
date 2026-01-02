
import React, { useEffect, useRef, useState } from 'react';
import { useApplicationModal } from '../contexts/ApplicationModalContext';

const ProfileSection = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black-950 via-black-900 to-black-800">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              EU NUNCA APARECI. <span className="text-gradient">ATÉ AGORA.</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              5 anos cobrando 40-150k por projeto. Sempre nos bastidores. Zero redes sociais.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Image Section */}
            <div className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="relative">
                {/* Main Image */}
                <div className="relative w-full h-[700px] rounded-3xl overflow-hidden">
                  {/* Glow Effect Behind Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/30 via-green-400/20 to-transparent z-10" />
                  
                  <img 
                    src="/lovable-uploads/tayna-profile.jpg" 
                    alt="Taynã Puri"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              {/* Description */}
              <div className="space-y-6">
                <p className="text-lg text-white/80 leading-relaxed">
                  Passei no ITA aos 15. Arrisquei tudo. Fui fazer cinema.
                  CEO aos 25. Burnout aos 27.
                </p>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  <span className="text-gradient font-bold">Indígena Puri + Tech. Espiritual + Negócios.</span>
                </p>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  Clientes não compravam consultoria. Compravam perspectiva única. E pagavam 10x mais por isso.
                </p>

                <p className="text-lg text-white/80 leading-relaxed">
                  Eu sou a prova viva de que <strong className="text-white">singularidade escala</strong>.
                </p>

                <div className="card-premium bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 p-6">
                  <p className="text-base text-white/90 leading-relaxed mb-4">
                    <strong className="text-green-400">MEU NEGÓCIO HOJE:</strong>
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Zero funcionários. Zero escritório. Zero reuniões.<br />
                    Trabalhando de qualquer lugar e ganhando bem. 4 horas por dia.
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed mt-4">
                    Não porque sou especial. Porque entendi:<br />
                    <span className="text-gradient font-semibold">No futuro, não vence quem sabe mais. Vence quem É único e tem sistema pra escalar isso.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button 
              onClick={openModal}
              className="btn-premium text-lg glow-green magnetic group hover:scale-110 transition-all duration-300"
            >
              <span className="flex items-center">
                QUERO SER ESCOLHIDO
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
