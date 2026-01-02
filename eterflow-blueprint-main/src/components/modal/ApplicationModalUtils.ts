
export const formatPhoneNumber = (value: string) => {
  if (!value) return '';
  
  const cleaned = value.replace(/[^\d+]/g, '');
  
  if (cleaned && !cleaned.startsWith('+')) {
    return '+' + cleaned;
  }
  
  if (cleaned.startsWith('+55')) {
    const numbers = cleaned.slice(3);
    
    if (numbers.length === 0) {
      return '+55 ';
    } else if (numbers.length <= 2) {
      return `+55 (${numbers}`;
    } else if (numbers.length <= 7) {
      return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  }
  
  return cleaned;
};

export const getStepFields = (step: number) => {
  switch (step) {
    case 1: return ['nome', 'email', 'whatsapp'];
    case 2: return ['empresa', 'cargo', 'faturamento'];
    case 3: return ['principais_desafios', 'cronograma'];
    case 4: return []; // Removido 'orcamento_investimento' pois não existe mais
    default: return [];
  }
};

export const getStepTitle = (currentStep: number) => {
  switch (currentStep) {
    case 0: return 'Bem-vindo ao Aitelier - Transforme sua Marca Pessoal';
    case 1: return 'Informações Pessoais - Aitelier';
    case 2: return 'Informações da Empresa - Aitelier';
    case 3: return 'Desafios e Objetivos - Aitelier';
    case 4: return 'Finalizar Aplicação - Aitelier';
    case 5: return 'Aplicação Enviada com Sucesso - Aitelier';
    default: return 'Aitelier - Blueprint Divergente';
  }
};

export const getStepDescription = (currentStep: number) => {
  switch (currentStep) {
    case 0: return 'Inicie sua jornada de transformação com o Blueprint Divergente';
    case 1: return 'Preencha suas informações pessoais para começar';
    case 2: return 'Conte-nos sobre sua empresa e negócio';
    case 3: return 'Compartilhe seus desafios e objetivos';
    case 4: return 'Confirme sua aplicação para finalizar o processo';
    case 5: return 'Sua aplicação foi enviada e em breve entraremos em contato';
    default: return 'Formulário de aplicação para o Blueprint Divergente';
  }
};
