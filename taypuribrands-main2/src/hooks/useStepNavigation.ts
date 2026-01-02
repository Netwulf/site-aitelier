
import { getStepFields } from '../components/modal/ApplicationModalUtils';
import { FormData } from './useApplicationForm';
import { usePartialSave } from './usePartialSave';

export const useStepNavigation = (
  currentStep: number,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  formData: FormData,
  errors: { [key: string]: string },
  validateField: (field: string, value: string) => string
) => {
  const { savePartialData } = usePartialSave();

  const canProceedToNextStep = () => {
    if (currentStep === 0) return true;
    
    const stepFields = getStepFields(currentStep);
    
    const hasRequiredValues = stepFields.every(field => {
      const value = formData[field as keyof typeof formData];
      
      if (field === 'instagram') {
        return true;
      }
      if (field === 'experiencia_anterior') {
        return true;
      }
      
      const hasValue = value && value.trim() !== '' && value !== '@';
      return hasValue;
    });
    
    const hasNoErrors = stepFields.every(field => !errors[field]);
    
    return hasRequiredValues && hasNoErrors;
  };

  const nextStep = async () => {
    if (currentStep === 0) {
      setCurrentStep(prev => prev + 1);
      return;
    }
    
    const stepFields = getStepFields(currentStep);
    
    stepFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      validateField(field, value);
    });
    
    if (canProceedToNextStep() && currentStep < 5) {
      // Auto-save data on every step transition (steps 1, 2, 3, 4)
      if (currentStep >= 1 && currentStep <= 4 && formData.email) {
        // Build partial data object with all filled fields up to current step
        const partialData: any = { email: formData.email };
        
        // Step 1 fields
        if (formData.nome) partialData.nome = formData.nome;
        if (formData.whatsapp) partialData.whatsapp = formData.whatsapp;
        if (formData.instagram) partialData.instagram = formData.instagram;
        
        // Step 2 fields (if we're at step 2 or later)
        if (currentStep >= 2) {
          if (formData.empresa) partialData.empresa = formData.empresa;
          if (formData.cargo) partialData.cargo = formData.cargo;
          if (formData.faturamento) partialData.faturamento = formData.faturamento;
        }
        
        // Step 3 fields (if we're at step 3 or later)
        if (currentStep >= 3) {
          if (formData.principais_desafios) partialData.principais_desafios = formData.principais_desafios;
          if (formData.cronograma) partialData.cronograma = formData.cronograma;
        }
        
        // Step 4 fields (if we're at step 4)
        if (currentStep >= 4) {
          if (formData.experiencia_anterior) partialData.experiencia_anterior = formData.experiencia_anterior;
        }
        
        // Save partial data asynchronously - don't block navigation if it fails
        savePartialData(partialData);
      }
      
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return {
    canProceedToNextStep,
    nextStep,
    prevStep
  };
};
