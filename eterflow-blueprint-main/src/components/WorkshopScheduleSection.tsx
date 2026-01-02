import React from "react";
import { Calendar, Clock, Sparkles } from "lucide-react";

const WorkshopScheduleSection = () => {
  const saturday = [
    {
      time: "14h-18h",
      title: "FUNDAÇÃO",
      items: [
        "Desejo vs necessidade (a raiz da compra)",
        "Sua tese de mundo",
        "Protagonista, antagonista e conflito (a mecânica da sua narrativa)",
        "IA ao vivo: Mapa de Desejo da Audiência"
      ]
    },
    {
      time: "18h-20h",
      title: "ARQUITETURA",
      items: [
        "Arquétipos (qual seu padrão narrativo natural?)",
        "Narrativa de cinema aplicada à sua história",
        "IA ao vivo: Identidade visual do seu arquétipo",
        "Estrutura da sua primeira oferta de alto valor"
      ]
    }
  ];

  const sunday = [
    {
      time: "14h-18h",
      title: "APLICAÇÃO SOLO",
      items: [
        "Storyselling (vender sem parecer vendedor)",
        "Copy que converte por narrativa",
        "IA ao vivo: da sua história → templates de conteúdo",
        "Sistema Antiagência (conteúdo impossível de copiar)"
      ]
    },
    {
      time: "18h-20h",
      title: "CONSTRUÇÃO REAL",
      items: [
        "Landing page ao vivo (com IA)",
        "Hot seats da turma",
        "Q&A final",
        "Direção prática para seus próximos 30 dias"
      ]
    }
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 section-light">
      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-neutral-0">O QUE A GENTE FAZ NOS 2 DIAS</span>
          </h2>
          <p className="text-lg md:text-xl text-olive font-semibold">
            Você não só aprende. Você cria.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Saturday */}
          <div className="card-brutal-light">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-olive flex items-center justify-center">
                <Calendar className="w-6 h-6 text-neutral-0" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-0">SÁBADO</h3>
                <p className="text-olive font-mono text-sm">DESENHAR O SEU NEGÓCIO SOLO</p>
              </div>
            </div>

            <div className="space-y-6">
              {saturday.map((block, index) => (
                <div key={index} className="border-l-4 border-olive pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-olive" />
                    <span className="text-olive font-mono text-sm">{block.time}</span>
                    <span className="text-neutral-0 font-bold">- {block.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {item.includes("IA ao vivo") ? (
                          <Sparkles className="w-4 h-4 text-olive flex-shrink-0 mt-1" />
                        ) : (
                          <div className="w-2 h-2 bg-olive flex-shrink-0 mt-2" />
                        )}
                        <span className={`text-sm ${item.includes("IA ao vivo") ? "text-olive font-semibold" : "text-neutral-500"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sunday */}
          <div className="card-brutal-light">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border-2 border-olive flex items-center justify-center">
                <Calendar className="w-6 h-6 text-olive" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-0">DOMINGO</h3>
                <p className="text-olive font-mono text-sm">TRANSFORMAR EM SISTEMA E VENDA</p>
              </div>
            </div>

            <div className="space-y-6">
              {sunday.map((block, index) => (
                <div key={index} className="border-l-4 border-neutral-300 pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-400 font-mono text-sm">{block.time}</span>
                    <span className="text-neutral-0 font-bold">- {block.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {item.includes("ao vivo") || item.includes("IA") ? (
                          <Sparkles className="w-4 h-4 text-olive flex-shrink-0 mt-1" />
                        ) : (
                          <div className="w-2 h-2 bg-neutral-400 flex-shrink-0 mt-2" />
                        )}
                        <span className={`text-sm ${item.includes("ao vivo") || item.includes("IA") ? "text-olive font-semibold" : "text-neutral-500"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopScheduleSection;
