import React from "react";

const OpeningNarrativeSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 section-dark">
      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Opening Question */}
        <div className="text-center mb-12">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Você já percebeu que você já é um negócio?</span>
          </h2>
        </div>

        {/* Narrative */}
        <div className="card-brutal p-6 md:p-10 mb-8">
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-6">
            Cada escolha que você fez — largar o emprego, trocar de área, começar do zero, errar, recomeçar — é parte da sua tese.
          </p>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-6">
            Cada dor que você superou é um ponto de virada.
            <br />
            Cada conhecimento que acumulou é repertório vivo.
          </p>
          <p className="text-xl md:text-2xl font-bold text-olive">
            O problema é que quase ninguém estrutura isso.
          </p>
        </div>

        {/* Problem List */}
        <div className="card-brutal p-6 md:p-10 mb-8">
          <p className="text-xl font-bold text-white mb-6">Aí acontece o clássico:</p>
          <ul className="space-y-3 mb-6">
            {[
              "Você sabe que poderia cobrar mais",
              "Sua entrega é A+, mas sua narrativa é B-",
              "Você é diferente, mas não consegue explicar como",
              "Você trava na hora de vender",
              "Parece que trabalha muito, mas comunica pouco",
              "Cria conteúdo e não sente que representa quem você é"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-neutral-500 mt-2 flex-shrink-0" />
                <span className="text-neutral-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution */}
        <div className="card-brutal p-6 md:p-10">
          <div className="text-center space-y-6">
            <p className="text-xl md:text-2xl font-bold text-white">
              <span className="text-olive">Negócio Solo 2.0</span> é sobre pegar tudo que você já viveu
              <br />
              e transformar isso em um negócio leve, autoral e lucrativo —
            </p>
            <p className="text-2xl md:text-3xl font-bold text-olive">
              com a IA como seu co-founder invisível.
            </p>

            <div className="divider my-8" />

            <p className="text-lg text-neutral-500 mb-4">
              Não é sobre aprender mais técnica.
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              É sobre organizar quem você já é.
            </p>

            <div className="border-2 border-olive p-6 mt-8">
              <p className="text-lg md:text-xl text-neutral-400 mb-2">
                Sem equipe. Sem agência. Sem 50 conteúdos por semana.
              </p>
              <p className="text-2xl md:text-3xl font-bold text-olive">
                Você + IA + Clareza = Poder.
              </p>
            </div>

            <p className="text-lg text-neutral-400 pt-4">
              Um negócio de alto valor não nasce de mais técnica.
              <br />
              <span className="text-olive font-semibold">Nasce de mais clareza.</span>
              <br />
              E isso é o que a IA amplifica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningNarrativeSection;
