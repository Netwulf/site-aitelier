
import { useState, useEffect } from 'react';

export interface FormData {
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
}

export const useApplicationForm = (isOpen: boolean) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    whatsapp: '',
    instagram: '@',
    empresa: '',
    cargo: '',
    faturamento: '',
    principais_desafios: '',
    objetivos_movimento: '',
    cronograma: '',
    orcamento_investimento: '',
    experiencia_anterior: ''
  });

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      nome: '',
      email: '',
      whatsapp: '',
      instagram: '@',
      empresa: '',
      cargo: '',
      faturamento: '',
      principais_desafios: '',
      objetivos_movimento: '',
      cronograma: '',
      orcamento_investimento: '',
      experiencia_anterior: ''
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return {
    currentStep,
    setCurrentStep,
    isSubmitting,
    setIsSubmitting,
    formData,
    setFormData,
    resetForm
  };
};
