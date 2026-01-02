
import React from 'react';
import { LucideIcon, Eye } from 'lucide-react';

interface DeliverableCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  preview: string;
  gradient: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const DeliverableCard = ({
  icon: Icon,
  title,
  description,
  preview,
  gradient,
  isHovered,
  onHover,
  onLeave
}: DeliverableCardProps) => {
  return (
    <div 
      className="group relative h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`card-premium h-full min-h-[280px] flex flex-col transition-all duration-500 hover:scale-105 ${
        isHovered ? 'bg-white/[0.12] border-gold-500/30 shadow-glow-gold' : ''
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'scale-110 glow-gold-strong' : 'scale-100'
          }`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <h3 className={`text-lg font-bold text-white mb-3 transition-all duration-300 ${
            isHovered ? 'text-gradient' : ''
          }`}>
            {title}
          </h3>
          
          <p className="text-white/70 leading-relaxed mb-4 flex-grow text-sm">
            {description}
          </p>
          
          <div className={`glass px-3 py-2 rounded-lg transition-all duration-300 mt-auto ${
            isHovered ? 'bg-gold-500/10 border-gold-500/20' : ''
          }`}>
            <div className="flex items-center">
              <Eye className="w-3 h-3 text-gold-400 mr-2" />
              <span className="text-xs text-white/80 font-medium">{preview}</span>
            </div>
          </div>
        </div>
        
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl -z-10`} />
      </div>
    </div>
  );
};

export default DeliverableCard;
