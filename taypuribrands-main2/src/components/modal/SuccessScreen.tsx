
import React from 'react';
import { Check, CheckCircle } from 'lucide-react';

const SuccessScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center glow-green">
        <Check className="w-10 h-10 text-white" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
          APLICAÇÃO ENVIADA
        </h3>
        
        <p className="text-xl text-white/80 max-w-md mx-auto">
          Entraremos em contato brevemente...
        </p>
        
        <p className="text-base text-white/60 max-w-lg mx-auto">
          Sua aplicação foi recebida com sucesso. Nossa equipe analisará seu perfil e retornará em até 48 horas com os próximos passos.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-6 text-white/50 text-sm">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
            <span>Aplicação Recebida</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
            <span>Análise em Andamento</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
