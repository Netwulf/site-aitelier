import React from "react";
import { AlertCircle, Check } from "lucide-react";

const WhyNowSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 section-light">
      <div className="container mx-auto relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border-2 border-neutral-0 px-4 py-2 mb-6">
            <AlertCircle className="w-5 h-5 text-neutral-0" />
            <span className="text-neutral-0 font-mono text-sm uppercase tracking-wider">URGENTE</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-olive">POR QUE AGORA</span>
          </h2>
        </div>

        {/* Context */}
        <div className="card-brutal-light mb-8">
          <p className="text-2xl md:text-3xl font-bold text-neutral-0 mb-6 text-center">
            Porque IA está nivelando todo mundo.
          </p>

          <div className="space-y-2 mb-8 text-center">
            <p className="text-neutral-500">Todo mundo gera conteúdo.</p>
            <p className="text-neutral-500">Todo mundo parece igual.</p>
            <p className="text-neutral-500">Todo mundo usa as mesmas ferramentas.</p>
          </div>

          <p className="text-xl md:text-2xl font-bold text-olive text-center mb-6">
            Mas pouquíssimos têm:
          </p>

          <div className="grid md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              "Tese clara",
              "Narrativa estruturada",
              "Oferta bem construída",
              "Identidade forte",
              "Sistema leve",
              "Operação solo com IA"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 border border-neutral-300 p-3">
                <Check className="w-4 h-4 text-olive flex-shrink-0" />
                <span className="text-neutral-0 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing urgency */}
        <div className="text-center border-2 border-neutral-0 p-6 md:p-8">
          <p className="text-base text-neutral-500 mb-4">
            Daqui 6 meses, todo mundo terá conteúdo "ok".
          </p>
          <p className="text-xl md:text-2xl font-bold text-neutral-0 mb-4">
            Mas só quem tiver <span className="text-olive">narrativa + sistema + IA</span> vai crescer de verdade.
          </p>
          <p className="text-lg text-olive font-semibold">
            Você pode sair na frente agora — enquanto ainda é vantagem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyNowSection;
