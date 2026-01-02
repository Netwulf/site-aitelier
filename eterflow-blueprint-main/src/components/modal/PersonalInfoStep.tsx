
import React from 'react';
import { Instagram } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: {
    nome: string;
    email: string;
    whatsapp: string;
    instagram: string;
  };
  errors: { [key: string]: string };
  onInputChange: (field: string, value: string) => void;
  getFieldClassName: (field: string, baseClassName: string) => string;
  getFieldError: (field: string) => string;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  errors,
  onInputChange,
  getFieldClassName,
  getFieldError
}) => {
  return (
    <div className="space-y-3 sm:space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="relative">
          <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Nome Completo *</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => onInputChange('nome', e.target.value)}
            className={getFieldClassName('nome', "w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white placeholder-white/50 transition-all duration-300 text-sm")}
            placeholder="Seu nome completo"
          />
          {getFieldError('nome') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('nome')}</p>
          )}
        </div>
        
        <div className="relative">
          <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className={getFieldClassName('email', "w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white placeholder-white/50 transition-all duration-300 text-sm")}
            placeholder="seu@email.com"
          />
          {getFieldError('email') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('email')}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="relative">
          <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2">WhatsApp *</label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => onInputChange('whatsapp', e.target.value)}
            className={getFieldClassName('whatsapp', "w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white placeholder-white/50 transition-all duration-300 text-sm")}
            placeholder="+55 (11) 99999-9999"
          />
          {getFieldError('whatsapp') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('whatsapp')}</p>
          )}
        </div>
        
        <div className="relative">
          <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Instagram</label>
          <div className="relative">
            <Instagram className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => onInputChange('instagram', e.target.value)}
              className={getFieldClassName('instagram', "w-full bg-white/5 border border-white/10 rounded-lg pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-white placeholder-white/50 transition-all duration-300 text-sm")}
              placeholder="@seuinstagram"
            />
          </div>
          {getFieldError('instagram') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('instagram')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
