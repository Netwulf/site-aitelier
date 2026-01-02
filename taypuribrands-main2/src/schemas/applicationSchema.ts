import { z } from 'zod';

export const applicationSchema = z.object({
  nome: z.string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  email: z.string()
    .trim()
    .email('Email inválido')
    .max(255, 'Email deve ter no máximo 255 caracteres'),
  
  whatsapp: z.string()
    .trim()
    .min(1, 'WhatsApp é obrigatório')
    .refine((val) => {
      // Remove tudo exceto dígitos e o sinal de +
      const cleaned = val.replace(/[^\d+]/g, '');
      // Aceita números com + opcional seguido de 10-15 dígitos
      return /^\+?\d{10,15}$/.test(cleaned);
    }, 'Número de telefone inválido. Use o formato: +55 (11) 98765-4321'),
  
  instagram: z.string()
    .trim()
    .max(100, 'Instagram deve ter no máximo 100 caracteres')
    .optional(),
  
  empresa: z.string()
    .trim()
    .min(2, 'Empresa deve ter pelo menos 2 caracteres')
    .max(200, 'Empresa deve ter no máximo 200 caracteres'),
  
  cargo: z.string()
    .trim()
    .min(2, 'Cargo deve ter pelo menos 2 caracteres')
    .max(100, 'Cargo deve ter no máximo 100 caracteres'),
  
  faturamento: z.string()
    .trim()
    .min(1, 'Faturamento é obrigatório'),
  
  principais_desafios: z.string()
    .trim()
    .min(50, 'Principais desafios deve ter pelo menos 50 caracteres')
    .max(2000, 'Principais desafios deve ter no máximo 2000 caracteres'),
  
  objetivos_movimento: z.string()
    .trim()
    .max(2000, 'Objetivos deve ter no máximo 2000 caracteres')
    .optional(),
  
  cronograma: z.string()
    .trim()
    .min(1, 'Cronograma é obrigatório'),
  
  orcamento_investimento: z.string()
    .trim()
    .max(500, 'Orçamento deve ter no máximo 500 caracteres')
    .optional(),
  
  experiencia_anterior: z.string()
    .trim()
    .max(2000, 'Experiência anterior deve ter no máximo 2000 caracteres')
    .optional()
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
