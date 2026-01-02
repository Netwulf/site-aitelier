import React, { useEffect, useRef, useState } from "react";
import { AlertTriangle, TrendingDown, Users, DollarSign } from "lucide-react";
import { useApplicationModal } from "../contexts/ApplicationModalContext";

const ProblemSection = () => {
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
            setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
          }, 800);

          setTimeout(() => clearInterval(timer), 3200);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-gradient-to-b from-black-950 via-black-900 to-black-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-white leading-tight">
              TRABALHO FANTASMA.
              <span className="block text-gradient mt-2">60 HORAS POR SEMANA.</span>
              <span className="block text-white mt-2">AINDA GANHA POUCO POR MÊS.</span>
            </h2>
          </div>

          {/* Problem Content */}
          <div
            className={`text-center mb-12 space-y-6 max-w-5xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-lg md:text-xl text-white leading-relaxed">Você é genial e pensa diferente.</p>

            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Mas desperdiça seu gênio em reuniões sobre reuniões.
            </p>

            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Enquanto isso, pessoas comuns com IA faturam <span className="text-gradient font-bold">10x mais</span>,
              trabalhando 10x menos. Não porque são melhores.{" "}
              <strong className="text-white">Porque trocaram de jogo.</strong>
            </p>
          </div>

          {/* Vision Statement */}
          <div
            className={`card-premium text-center mb-12 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-500/20 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 blur-xl rounded-2xl" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-bold mb-6 text-white leading-tight">
                  SABE POR QUE VOCÊ NÃO SAI DAÍ?
                </h3>

                <div className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
                  Você foi programado para achar que precisa:
                  <br />• Equipe • Investimento • Anos de experiência • Permissão
                </div>

                <p className="text-base md:text-lg text-gradient font-bold mb-6">Mentira.</p>

                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-4xl mx-auto mb-6">
                  Você só precisa de 3 coisas:
                  <br />
                  <span className="text-white">Sua essência única codificada</span>
                  <br />
                  <span className="text-white">IAs como sua equipe completa </span>
                  <br />
                  <span className="text-white">Coragem pra criar categoria própria</span>
                </p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
            <div className="mx-8 text-emerald-400 font-bold text-lg">—————</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
          </div>

          {/* CTA */}
          <div
            className={`text-center transition-all duration-1000 delay-1200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={openModal}
              className="btn-premium text-lg magnetic group hover:scale-110 transition-all duration-300"
            >
              <span className="flex items-center">PREENCHER APLICAÇÃO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
