import React, { useEffect, useRef, useState } from "react";
import { useApplicationModal } from "../contexts/ApplicationModalContext";

const ProblemSection = () => {
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
      className="py-16 md:py-24 relative overflow-hidden section-light"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="accent-bar-lg mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-neutral-0 leading-tight">
              TODO FOUNDER BEM-SUCEDIDO<br />
              CHEGA NESTE <span className="text-olive">MOMENTO</span>
            </h2>
          </div>

          {/* Problem Content */}
          <div
            className={`text-center mb-12 space-y-4 max-w-4xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg text-neutral-0">O negócio está rodando. A equipe está estruturada. Os números crescendo.</p>
            <p className="text-base md:text-lg text-neutral-400">Mas quando alguém pergunta "o que você faz", você ainda explica pelo produto.</p>
            <p className="text-neutral-500 italic">Não por quem você é.</p>
            <p className="text-olive font-semibold">E isso está limitando seu próximo nível.</p>
          </div>

          {/* Vision Statement */}
          <div
            className={`card-brutal-light mb-12 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-0 text-center">
              O QUE VOCÊ REALMENTE QUER
            </h3>

            <div className="text-base md:text-lg text-neutral-400 mb-6 leading-relaxed space-y-2">
              <p>• Ser convidado para podcasts importantes</p>
              <p>• Palestrar em eventos que mudam carreira</p>
              <p>• Ter uma narrativa que ninguém copia</p>
              <p>• Criar conteúdo inteligente, não raso</p>
              <p>• Abrir um braço de consultoria premium</p>
              <p>• Ser reconhecido pelo que você sabe, não só pelo que você opera</p>
            </div>

            <p className="text-lg md:text-xl text-olive font-bold mb-4 text-center">
              Você não quer ser influencer. Você quer ser referência.
            </p>

            <div className="divider my-6" />

            <p className="text-base md:text-lg text-neutral-400 leading-relaxed text-center">
              <strong className="text-neutral-0">Seu maior ativo não é seu negócio.</strong><br />
              É quem você se tornou para construir ele.
            </p>
          </div>

          {/* Separator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-neutral-300"></div>
            <div className="mx-8 text-olive font-mono text-sm">///</div>
            <div className="flex-1 h-px bg-neutral-300"></div>
          </div>

          {/* CTA */}
          <div
            className={`text-center transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={openModal}
              className="btn-brutal text-lg"
            >
              <span>QUERO APLICAR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
