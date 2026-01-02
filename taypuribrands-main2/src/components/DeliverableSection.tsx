import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Target, Users, Video, Calendar, Palette } from 'lucide-react';
import DeliverableModal from './DeliverableModal';
import DeliverableCard from './DeliverableCard';
import DeliverablePreview from './DeliverablePreview';
import { useApplicationModal } from '../contexts/ApplicationModalContext';

const DeliverableSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ image: '', title: '' });
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useApplicationModal();

  // Updated modal images
  const modalImages = {
    movimento: "/lovable-uploads/09eda0c9-19c3-47ea-9842-777119a791bb.png",
    identidadeVisual: "/lovable-uploads/29a10b52-5847-4251-b4ed-912b2cbc0e68.png"
  };

  // Preview images for the thumbnail grid
  const previewImages = [
    { 
      src: "/lovable-uploads/e8f389e4-fe43-4df2-b475-0ea7644b61fe.png",
      title: "Movimento",
      fullImage: modalImages.movimento
    },
    { 
      src: "/lovable-uploads/942f15a4-0579-45b2-afe1-8343e8c0204f.png",
      title: "Identidade Visual",
      fullImage: modalImages.identidadeVisual
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openDeliverableModal = (image: string, title: string) => {
    setModalContent({ image, title });
    setModalOpen(true);
  };

  const deliverables = [
    {
      icon: Target,
      title: "ARQUEOLOGIA DE IDENTIDADE",
      description: "Escavamos sua história até achar o fio condutor que conecta TUDO que você é.",
      preview: "Identidade + Narrativa + Categoria",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Sparkles,
      title: "BRAND OS™ COMPLETO",
      description: "Seu Sistema Operacional codificado. Voz, visual, narrativa, processos. Tudo.",
      preview: "Sistema Operacional Pessoal",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "STACK DE IA CONFIGURADA",
      description: "Midjourney, Claude, HeyGen, Cursor. Sua equipe de R$1M por R$500/mês.",
      preview: "IA como Equipe Completa",
      gradient: "from-emerald-400 to-green-500"
    },
    {
      icon: Users,
      title: "NEGÓCIO ESTRUTURADO",
      description: "Oferta, preço, funil, sistema. Pronto pra rodar no dia 1.",
      preview: "Oferta + Funil + Sistema",
      gradient: "from-teal-400 to-emerald-500"
    },
    {
      icon: Palette,
      title: "CONTEÚDO + POSICIONAMENTO",
      description: "Construo seu conteúdo e posicionamento único para você se destacar no mercado.",
      preview: "Conteúdo + Posicionamento",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Calendar,
      title: "90 DIAS DE SUPORTE DIRETO",
      description: "WhatsApp direto comigo. Sem intermediário. Você aparece, eu construo com você, você sai vendendo.",
      preview: "Suporte Personalizado",
      gradient: "from-teal-500 to-emerald-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden bg-gradient-to-b from-black-800 via-black-850 to-black-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
              O QUE EU FAÇO <span className="text-gradient">POR VOCÊ</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-2">
              (COM VOCÊ)
            </p>
            <div className="text-base text-white/60 max-w-4xl mx-auto space-y-2">
              <p>✔ Redefino sua identidade e narrativa</p>
              <p>✔ Estruturo sua oferta e modelo de negócio</p>
              <p>✔ Configuro IA como sua equipe completa</p>
              <p>✔ Construo seu conteúdo e posicionamento</p>
              <p>✔ Te coloco vendendo em 90 dias</p>
              <p className="text-emerald-400 font-bold mt-4">One Person Brand. One Person Business. One Person System.</p>
            </div>
          </div>

          {/* Compact Example Preview */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <DeliverablePreview 
              previewImages={previewImages}
              onImageClick={openDeliverableModal}
            />
          </div>

          {/* Interactive Deliverables Grid */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${isVisible ? 'stagger-children revealed' : 'stagger-children'}`}>
            {deliverables.map((item, index) => (
              <DeliverableCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                preview={item.preview}
                gradient={item.gradient}
                isHovered={hoveredCard === index}
                onHover={() => setHoveredCard(index)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button 
              onClick={openModal}
              className="group btn-premium text-lg magnetic hover:scale-110 transition-all duration-300"
            >
              <span className="flex items-center relative z-10">
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                QUERO SER SELECIONADO
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <DeliverableModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        image={modalContent.image}
        title={modalContent.title}
      />
    </section>
  );
};

export default DeliverableSection;
