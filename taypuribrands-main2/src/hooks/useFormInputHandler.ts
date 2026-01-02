
import { formatPhoneNumber } from '../components/modal/ApplicationModalUtils';
import { FormData } from './useApplicationForm';

export const useFormInputHandler = (
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  errors: { [key: string]: string },
  clearFieldError: (field: string) => void,
  validateField: (field: string, value: string) => string
) => {
  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'whatsapp') {
      formattedValue = formatPhoneNumber(value);
    } else if (field === 'instagram' && !value.startsWith('@')) {
      formattedValue = '@' + value.replace('@', '');
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    if (errors[field]) {
      clearFieldError(field);
    }
    
    validateField(field, formattedValue);
  };

  return { handleInputChange };
};
