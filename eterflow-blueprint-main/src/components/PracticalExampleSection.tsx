import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

const PracticalExampleSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 section-dark">
      <div className="container mx-auto relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-olive">COMO FUNCIONA</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400">Vou te mostrar com um exemplo real:</p>
        </div>

        {/* Example Case */}
        <div className="card-brutal p-6 md:p-10 mb-8">
          {/* Before */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold text-white">Pessoa chega assim:</h3>
            </div>
            <div className="border-l-4 border-red-500 pl-6 py-2 bg-neutral-100">
              <p className="text-neutral-400 italic">
                "Sou psicóloga. Tenho atendimentos, já estudei muito, já ajudei muita gente… mas meu conteúdo não
                converte, meu posicionamento é confuso e não sei qual oferta criar."
              </p>
            </div>
          </div>

          {/* Process */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-olive mb-4">No Negócio Solo 2.0 a gente:</h3>
            <ul className="space-y-3">
              {[
                { label: "Encontra a tese dela:", value: '"Cuidar da mente é cuidar da vida prática"' },
                {
                  label: "Estrutura a narrativa:",
                  value: "antes (ansiedade difusa) → conflito (sobrecarga interna) → depois (clareza de vida)",
                },
                { label: "Define seu arquétipo", value: "" },
                { label: "Cria sua primeira oferta de alto valor", value: "" },
                { label: "Cria conteúdos que educam + posicionam + convertem", value: "" },
                { label: "Gera identidade visual baseada no arquétipo", value: "" },
                { label: "Cria landing page funcional e alinhada", value: "" },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-olive mt-2 flex-shrink-0" />
                  <span className="text-neutral-400">
                    <span className="text-white font-semibold">{item.label}</span>
                    {item.value && <span className="text-olive"> {item.value}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-olive" />
              <h3 className="text-xl font-bold text-white">Resultado:</h3>
            </div>
            <div className="border-l-4 border-olive pl-6 py-2 bg-olive/10">
              <p className="text-xl font-bold text-olive">
                Uma profissional antes genérica vira uma marca viva, clara e impossível de copiar.
              </p>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold text-white">
            Funciona para qualquer pessoa que <span className="text-olive">É o próprio negócio</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PracticalExampleSection;
