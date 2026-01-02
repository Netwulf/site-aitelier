import React from "react";
import { ArrowRight, Clock, Phone, CheckCircle } from "lucide-react";
import { useApplicationModal } from "../contexts/ApplicationModalContext";

const ProcessoSeletivoSection = () => {
  const { openModal } = useApplicationModal();

  return (
    <section
      id="formulario-aplicacao"
      className="relative py-20 px-4 section-dark"
    >
      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-olive">
              12 DIVERGENTES. 12 NEGÓCIOS.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto mb-8">
            12 Vagas para 2026.
          </p>

          {/* CTA Button */}
          <button
            onClick={openModal}
            className="btn-brutal text-lg"
          >
            <span className="flex items-center">
              PREENCHER APLICAÇÃO AGORA
              <ArrowRight className="ml-3 w-5 h-5" />
            </span>
          </button>
        </div>

        {/* Timeline Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 border-2 border-olive flex items-center justify-center">
              <Clock className="w-6 h-6 text-olive" />
            </div>
            <div>
              <p className="text-olive font-mono text-sm mb-1">PRAZO</p>
              <p className="text-white">7 dias</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 border-2 border-olive flex items-center justify-center">
              <Phone className="w-6 h-6 text-olive" />
            </div>
            <div>
              <p className="text-olive font-mono text-sm mb-1">ENTREVISTA</p>
              <p className="text-white">com aprovados</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 border-2 border-olive flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-olive" />
            </div>
            <div>
              <p className="text-olive font-mono text-sm mb-1">INÍCIO</p>
              <p className="text-white">imediato para selecionados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessoSeletivoSection;
