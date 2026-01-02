
import React from 'react';
import { Sparkles } from 'lucide-react';

interface PreviewImage {
  src: string;
  title: string;
  fullImage: string;
}

interface DeliverablePreviewProps {
  previewImages: PreviewImage[];
  onImageClick: (image: string, title: string) => void;
}

const DeliverablePreview = ({ previewImages, onImageClick }: DeliverablePreviewProps) => {
  return (
    <div className="card-premium mb-12 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-500/20 transition-all duration-1000 delay-300 hover:scale-[1.01]">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-emerald-400 mr-2" />
        </div>
        
        <div className="max-w-4xl mx-auto text-left">
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
            Não vou te dar um curso sobre marca pessoal. Não vou te ensinar estratégias que já existem. Não vou te passar templates para seguir. <strong className="text-white font-bold">EU VOU CRIAR SUA MARCA E NEGÓCIO PESSOALMENTE.</strong> Do zero. Totalmente personalizado. Baseado em quem você realmente é. <strong className="text-emerald-400 font-bold">12 Divergentes exclusivos por ano.</strong>
          </p>
          
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            Vou te entregar seu Brand OS™ completo, sua Identidade e Narrativa, IA configurada como equipe, e o passo a passo pra você já fazer as primeiras vendas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliverablePreview;
