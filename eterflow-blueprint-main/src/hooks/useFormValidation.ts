import { useState } from 'react';
import { applicationSchema } from '../schemas/applicationSchema';
import { z } from 'zod';

interface FormData {
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

interface FormErrors {
  [key: string]: string;
}

const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: string, value: string): string => {
    try {
      // Validate single field using zod
      const fieldSchema = applicationSchema.shape[field as keyof typeof applicationSchema.shape];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      
      // Clear error if validation passes
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || 'Validação falhou';
        
        // Set error in state
        setErrors(prev => ({
          ...prev,
          [field]: errorMessage
        }));
        
        return errorMessage;
      }
      return '';
    }
  };

  const validateAllFields = (formData: FormData): boolean => {
    try {
      applicationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        return false;
      }
      return false;
    }
  };

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validateField,
    validateAllFields,
    clearFieldError,
    setErrors
  };
};

export default useFormValidation;
