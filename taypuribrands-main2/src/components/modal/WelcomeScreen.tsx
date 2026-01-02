
import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            APLICAÇÃO PARA <span className="text-gradient">12 DIVERGENTES</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Este processo é altamente seletivo. Apenas Divergentes que demonstrarem potencial real serão aceitos.
          </p>
        </div>

        {/* Badge Section */}
        <div className="flex justify-center">
          <div className="inline-flex items-center glass px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-gold-400 mr-2 animate-pulse" />
            <span className="text-gold-400 text-sm font-medium">12 vagas restantes</span>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Você está pronto para se tornar um dos 12 Divergentes selecionados?
            </h3>
            
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Esta é sua oportunidade de ter seu negócio, Brand OS™ e IA configurada criados pessoalmente por <strong className="text-gradient">Taynã Puri</strong>.
            </p>
            
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              O processo de seleção é rigoroso e apenas Divergentes com múltiplas habilidades que não querem escolher uma só serão aceitos.
            </p>
          </div>

          {/* Features Section */}
          <div className="pt-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-white/60">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">Processo Seletivo</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">Apenas 12 Vagas</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">90 Dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
