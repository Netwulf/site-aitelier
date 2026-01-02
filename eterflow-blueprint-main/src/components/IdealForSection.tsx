import React from "react";
import { Target, Users, Sparkles } from "lucide-react";

const IdealForSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 section-dark">
      <div className="container mx-auto relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-olive">PRA QUEM É</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Left - Primary audience */}
          <div className="border-2 border-olive p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-olive flex items-center justify-center">
                <Target className="w-6 h-6 text-neutral-0" />
              </div>
              <h3 className="text-2xl font-bold text-olive">IDEAL PRA</h3>
            </div>

            <ul className="space-y-3">
              {[
                "Criadores",
                "Especialistas",
                "Consultores",
                "Terapeutas",
                "Mentores",
                "One-person founders"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-olive" />
                  <span className="text-white text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Also works for */}
          <div className="card-brutal p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border-2 border-neutral-300 flex items-center justify-center">
                <Users className="w-6 h-6 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">FUNCIONA TAMBÉM PRA</h3>
            </div>

            <ul className="space-y-3">
              {[
                "Qualquer pessoa que É o próprio negócio",
                "Quem quer IA como co-founder",
                "Quem quer vender com autenticidade"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-400" />
                  <span className="text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing */}
        <div className="text-center border-2 border-olive p-6 md:p-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-olive" />
            <span className="text-olive font-mono text-sm uppercase tracking-wider">A VERDADE</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            Se você é o negócio…
          </p>
          <p className="text-2xl md:text-3xl font-bold text-olive">
            esse workshop é seu mapa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IdealForSection;
