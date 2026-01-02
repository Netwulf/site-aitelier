
import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import PersonalInfoStep from './PersonalInfoStep';
import BusinessInfoStep from './BusinessInfoStep';
import ChallengesStep from './ChallengesStep';
import InvestmentStep from './InvestmentStep';
import SuccessScreen from './SuccessScreen';

interface ApplicationStepRendererProps {
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
  onInputChange: (field: string, value: string) => void;
  getFieldClassName: (field: string, baseClassName: string) => string;
  getFieldError: (field: string) => string;
}

const ApplicationStepRenderer: React.FC<ApplicationStepRendererProps> = ({
  currentStep,
  formData,
  errors,
  onInputChange,
  getFieldClassName,
  getFieldError
}) => {
  switch (currentStep) {
    case 0:
      return <WelcomeScreen />;
    case 1:
      return (
        <PersonalInfoStep
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          getFieldClassName={getFieldClassName}
          getFieldError={getFieldError}
        />
      );
    case 2:
      return (
        <BusinessInfoStep
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          getFieldClassName={getFieldClassName}
          getFieldError={getFieldError}
        />
      );
    case 3:
      return (
        <ChallengesStep
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          getFieldClassName={getFieldClassName}
          getFieldError={getFieldError}
        />
      );
    case 4:
      return (
        <InvestmentStep
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          getFieldClassName={getFieldClassName}
          getFieldError={getFieldError}
        />
      );
    case 5:
      return <SuccessScreen />;
    default:
      return null;
  }
};

export default ApplicationStepRenderer;
