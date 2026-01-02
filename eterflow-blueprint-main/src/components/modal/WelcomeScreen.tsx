
import React from 'react';
import { CheckCircle } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            APLICAÇÃO <span className="text-olive">ONE PERSON BRAND™</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Este programa é seleto e limitado. Inscrições mediante aprovação.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Para quem é
            </h3>

            <div className="text-sm sm:text-base text-neutral-400 leading-relaxed text-left max-w-xl mx-auto space-y-2">
              <p>Fundadores que:</p>
              <p>• Já têm negócio</p>
              <p>• Já entregaram resultado</p>
              <p>• Já provaram competência</p>
              <p>• Mas ainda não têm marca pessoal estratégica</p>
              <p>• Ainda não transformaram conhecimento em autoridade</p>
              <p>• Ainda não construíram narrativa</p>
              <p>• Querem impactar gente de verdade</p>
            </div>

            <div className="border-2 border-olive p-4 mt-6">
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                <strong className="text-white">O que eles têm em comum?</strong><br />
                "Meu negócio cresceu. Mas eu cresci também — e ninguém está vendo isso."
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="pt-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-neutral-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-olive mr-2 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">Processo Seletivo</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-olive mr-2 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">Vagas Limitadas</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-olive mr-2 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">12 Semanas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
