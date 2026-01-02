import React, { useState } from "react";
import { Check, Calendar, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useCheckoutModal } from "@/contexts/CheckoutModalContext";

const InvestmentOptionsSection = () => {
  const [activeLote, setActiveLote] = useState(0);
  const { openCheckoutModal } = useCheckoutModal();

  const lotes = [
    { name: "LOTE 01", price: 297, active: true },
    { name: "LOTE 02", price: 397, active: false },
    { name: "LOTE 03", price: 497, active: false }
  ];

  const currentLote = lotes[activeLote];

  return (
    <section id="investimento" className="relative py-16 md:py-24 px-4 section-dark">
      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-olive">INVESTIMENTO</span>
          </h2>
        </div>

        {/* Lotes selector */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          {lotes.map((lote, index) => (
            <button
              key={index}
              onClick={() => setActiveLote(index)}
              className={`px-4 md:px-6 py-3 font-bold transition-all duration-200 ${
                activeLote === index
                  ? "bg-olive text-neutral-0 border-2 border-olive"
                  : "bg-transparent border-2 border-neutral-200 text-neutral-400 hover:border-olive hover:text-white"
              }`}
            >
              <span className="block text-sm font-mono">{lote.name}</span>
              <span className="block text-xs opacity-70">R$ {lote.price}</span>
              {index === 0 && (
                <span className="block text-xs mt-1">Ativo</span>
              )}
            </button>
          ))}
        </div>

        {/* Single Option Card */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="border-2 border-olive p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-block border border-olive px-4 py-2 mb-4">
                <span className="text-olive font-mono text-sm">{currentLote.name} - ATIVO</span>
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-bold text-olive">R$ {currentLote.price}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">WORKSHOP AO VIVO</h3>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "2 dias completos de workshop",
                "Hot seats e mentorias",
                "Comunidade exclusiva da turma",
                "Materiais e templates"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-400">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openCheckoutModal}
              className="btn-brutal w-full text-lg py-5"
            >
              <span className="flex items-center justify-center">
                GARANTIR MINHA VAGA
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Additional info */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="border border-neutral-200 p-4 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-olive flex-shrink-0 mt-1" />
            <div>
              <p className="text-olive font-mono text-sm mb-1">DATA</p>
              <p className="text-neutral-400 text-sm">20 e 21 de Dezembro, 14h-20h</p>
            </div>
          </div>

          <div className="border border-neutral-200 p-4 flex items-start gap-3">
            <Users className="w-5 h-5 text-olive flex-shrink-0 mt-1" />
            <div>
              <p className="text-olive font-mono text-sm mb-1">VAGAS</p>
              <p className="text-neutral-400 text-sm">30 pessoas</p>
            </div>
          </div>

          <div className="border border-neutral-200 p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-olive flex-shrink-0 mt-1" />
            <div>
              <p className="text-olive font-mono text-sm mb-1">HORÁRIO</p>
              <p className="text-neutral-400 text-sm">Horário de Brasília</p>
            </div>
          </div>
        </div>

        {/* Guarantee detail */}
        <div className="text-center card-brutal p-6 md:p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">GARANTIA</h3>
          <p className="text-neutral-400 leading-relaxed">
            Participe do sábado inteiro. Se não fizer sentido,
            <span className="text-olive font-semibold"> devolvemos tudo</span>. Simples.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOptionsSection;
