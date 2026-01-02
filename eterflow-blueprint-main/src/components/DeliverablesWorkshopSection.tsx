import React from "react";
import {
  Globe,
  FileText,
  Palette,
  Users,
  ArrowRight,
  Target,
  Bot,
  MessageSquare,
  Video,
  Sparkles
} from "lucide-react";
import { useCheckoutModal } from "@/contexts/CheckoutModalContext";

const deliverables = [
  {
    icon: Sparkles,
    number: "00",
    title: "Diagnóstico com IA",
    description: "Antes do workshop você vai conversar com uma IA para já fazer parte da sua análise de história e de quem você é — influenciando na preparação do workshop.",
    value: "R$ 500"
  },
  {
    icon: Users,
    number: "01",
    title: "Mapa de Desejo da Sua Audiência",
    description: "Análise real do que seu cliente ideal quer, teme e busca. Vamos pegar informações direto do seu público (comentários do YouTube, etc) e usar IA para analisar e organizar o que é mais importante.",
    value: "R$ 400"
  },
  {
    icon: Target,
    number: "02",
    title: "Sua Primeira Oferta de Alto Valor Montada",
    description: "A síntese da sua história + expertise + tese de mundo transformada em oferta clara e vendável.",
    value: "R$ 800"
  },
  {
    icon: FileText,
    number: "03",
    title: "StoryBrand Solo — sua narrativa estruturada",
    description: "Documento completo com: sua tese de mundo, arquétipo de marca, antes → conflito → transformação → depois, posicionamento único, sua história como ativo, promessa central da sua oferta.",
    value: "R$ 10.000+"
  },
  {
    icon: Palette,
    number: "04",
    title: "Identidade Visual Solo (gerada com IA)",
    description: "Paleta, estética, direção visual e tom — baseados na sua narrativa e no seu arquétipo.",
    value: "R$ 5.000+"
  },
  {
    icon: MessageSquare,
    number: "05",
    title: "Prompts e Estudo de Prompt",
    description: "Funcionamento e como escrever melhores prompts, como conversar com IA mantendo sua marca e identidade. Kit completo de prompts personalizados para clareza, escrita, conteúdo, narrativa e copy.",
    value: "R$ 400"
  },
  {
    icon: Globe,
    number: "06",
    title: "Landing Page Publicada (ao vivo com IA)",
    description: "Você cria sua página de vendas funcionando, com narrativa, copy e estrutura. Sem código, sem design, sem travar.",
    value: "R$ 3-5k"
  },
  {
    icon: Video,
    number: "07",
    title: "Criação e Edição de Vídeo com IA",
    description: "Sistema Antiagência completo: vamos ensinar criação e edição de vídeo com IAs que você pode usar para seus próprios conteúdos. Conteúdo impossível de copiar.",
    value: "R$ 4k+"
  },
  {
    icon: Bot,
    number: "08",
    title: "Agentes de IA de Alto Valor",
    description: "Agentes especializados prontos para usar: diretor de fotografia, copywriter, escritor, criador de LP, diretor de cena e mais.",
    value: "R$ 300 cada"
  }
];

const DeliverablesWorkshopSection = () => {
  const { openCheckoutModal } = useCheckoutModal();
  return (
    <section className="relative py-16 md:py-24 px-4 section-dark">
      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-olive">O QUE VOCÊ LEVA PRA CASA</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            No final dos 2 dias, você sai com:
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {deliverables.map((deliverable, index) => (
            <div
              key={index}
              className="border border-neutral-200 p-6 hover:border-olive transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-olive flex items-center justify-center">
                  <deliverable.icon className="w-6 h-6 text-neutral-0" />
                </div>
                <span className="text-neutral-500 text-sm font-mono">{deliverable.number}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{deliverable.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">{deliverable.description}</p>
              <div className="border border-olive px-3 py-1 inline-block">
                <span className="text-olive text-sm font-mono">Valor: {deliverable.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total value */}
        <div className="border-2 border-olive p-6 md:p-8 mb-8">
          <div className="text-center mb-4">
            <p className="text-neutral-500 text-sm font-mono uppercase tracking-wider mb-2">VALOR TOTAL DE MERCADO</p>
            <p className="text-4xl md:text-5xl font-bold text-olive">~R$ 24.800+</p>
          </div>
          <p className="text-center text-neutral-400 max-w-2xl mx-auto">
            Esses conteúdos você vai aprender a gerar e gerar junto — ou seja, vai poder fazer isso quantas vezes quiser.
            <span className="text-olive"> Os agentes e prompts você recebe prontos.</span>
          </p>
        </div>

        {/* Bottom message */}
        <div className="text-center card-brutal p-6 md:p-8 mb-8">
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            Tudo isso… feito com você.
          </p>
          <p className="text-lg text-neutral-400 mb-2">
            Ao vivo. Sem teoria vaga. Sem "anota aí".
          </p>
          <p className="text-xl font-bold text-olive">
            Implementação real.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={openCheckoutModal}
            className="btn-brutal text-lg"
          >
            <span className="flex items-center">
              GARANTIR MINHA VAGA
              <ArrowRight className="ml-3 w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesWorkshopSection;
