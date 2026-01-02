
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { getStepTitle, getStepDescription } from './ApplicationModalUtils';
import ApplicationModalHeader from './ApplicationModalHeader';
import ApplicationStepRenderer from './ApplicationStepRenderer';
import FormNavigation from './FormNavigation';
import AutoSaveIndicator from './AutoSaveIndicator';

interface ApplicationModalCoreProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  formData: {
    nome: string;
    email: string;
    whatsapp: string;
    instagram: string;
    empresa: string;
    cargo: string;
    faturamento: string;
    principais_desafios: string;
    objetivos_movimento: string;
    cronograma: string;
    orcamento_investimento: string;
    experiencia_anterior: string;
  };
  errors: { [key: string]: string };
  isSubmitting: boolean;
  canProceedToNextStep: () => boolean;
  onInputChange: (field: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleBackToHome: () => void;
  getFieldError: (field: string) => string;
  getFieldClassName: (field: string, baseClassName: string) => string;
  autoSaveStatus: {
    isVisible: boolean;
    status: 'saving' | 'saved' | 'error';
    lastSaveTime?: Date | null;
  };
}

const ApplicationModalCore: React.FC<ApplicationModalCoreProps> = ({
  isOpen,
  onClose,
  currentStep,
  formData,
  errors,
  isSubmitting,
  canProceedToNextStep,
  onInputChange,
  nextStep,
  prevStep,
  handleSubmit,
  handleBackToHome,
  getFieldError,
  getFieldClassName,
  autoSaveStatus
}) => {
  const totalSteps = 6;

  console.log('ApplicationModalCore render - isOpen:', isOpen, 'currentStep:', currentStep);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl h-[95vh] sm:h-[90vh] max-h-[90vh] bg-neutral-0 border-2 border-neutral-200 p-0 z-50 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">
            {getStepTitle(currentStep)}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {getStepDescription(currentStep)}
          </DialogDescription>

          <button
            onClick={onClose}
            className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10 w-7 h-7 sm:w-8 sm:h-8 border border-neutral-200 bg-neutral-100 hover:bg-olive hover:border-olive flex items-center justify-center transition-colors group"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-neutral-0" />
          </button>

          <div className="h-full flex flex-col min-h-0">
            <ApplicationModalHeader currentStep={currentStep} />

            <div className="flex-1 px-2 sm:px-4 md:px-6 pb-1 sm:pb-2 overflow-hidden min-h-0">
              <div className="h-full border border-neutral-200 bg-neutral-100">
                <form onSubmit={handleSubmit} className="h-full flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto px-1 sm:px-2 py-1 min-h-0">
                    <ApplicationStepRenderer
                      currentStep={currentStep}
                      formData={formData}
                      errors={errors}
                      onInputChange={onInputChange}
                      getFieldClassName={getFieldClassName}
                      getFieldError={getFieldError}
                    />
                  </div>

                  <FormNavigation
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    canProceedToNextStep={canProceedToNextStep}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleSubmit={handleSubmit}
                    handleBackToHome={handleBackToHome}
                    isSubmitting={isSubmitting}
                  />
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AutoSaveIndicator
        isVisible={autoSaveStatus.isVisible}
        status={autoSaveStatus.status}
        lastSaveTime={autoSaveStatus.lastSaveTime}
      />
    </>
  );
};

export default ApplicationModalCore;
