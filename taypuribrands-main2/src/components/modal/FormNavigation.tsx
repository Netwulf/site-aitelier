
import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceedToNextStep: () => boolean;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleBackToHome: () => void;
  isSubmitting?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  canProceedToNextStep,
  nextStep,
  prevStep,
  handleSubmit,
  handleBackToHome,
  isSubmitting = false
}) => {
  if (currentStep === 5) {
    return (
      <div className="flex justify-center mt-3 sm:mt-4 shrink-0">
        <button
          type="button"
          onClick={handleBackToHome}
          className="btn-premium text-sm sm:text-base group glow-gold-strong px-4 py-2 sm:px-6 sm:py-3"
        >
          <span className="flex items-center">
            Voltar à página principal
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    );
  }

  if (currentStep < 5) {
    return (
      <div className="flex justify-between items-center mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 shrink-0">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 text-xs sm:text-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Voltar
          </button>
        ) : (
          <div />
        )}

        {currentStep === 0 ? (
          <button
            type="button"
            onClick={nextStep}
            className="btn-premium group text-base sm:text-lg px-4 py-2 sm:px-6 sm:py-3"
          >
            <span className="flex items-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
              APLICAR
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        ) : currentStep < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceedToNextStep() || isSubmitting}
            className={`btn-premium group px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm ${!canProceedToNextStep() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex items-center">
              Próximo
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canProceedToNextStep() || isSubmitting}
            className={`btn-premium text-sm sm:text-base group glow-gold-strong px-4 py-2 sm:px-6 sm:py-3 ${!canProceedToNextStep() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
          >
            <span className="flex items-center">
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
              )}
              {isSubmitting ? 'ENVIANDO...' : 'ENVIAR APLICAÇÃO'}
            </span>
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default FormNavigation;
