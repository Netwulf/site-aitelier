import { supabase } from '../integrations/supabase/client';
import { FormData } from '../hooks/useApplicationForm';

export const sendApplicationToSupabase = async (data: FormData) => {
  try {
    // Validate required fields
    const requiredFields = ['nome', 'email', 'whatsapp'];
    const missingFields = requiredFields.filter(field => !data[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
    }
    
    // Insert directly into applications table
    const { data: result, error } = await supabase
      .from('applications')
      .insert({
        nome: data.nome,
        email: data.email,
        whatsapp: data.whatsapp,
        instagram: data.instagram === '@' || !data.instagram ? null : data.instagram,
        negocio: data.empresa || null,
        faturamento: data.faturamento || null,
        desafio_principal: data.principais_desafios || null,
        momento_negocio: data.objetivos_movimento || null,
        investimento_disponivel: data.cronograma || null,
        motivacao: data.experiencia_anterior || null,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      // Handle specific error cases
      if (error.message.includes('duplicate') || error.code === '23505') {
        throw new Error('Este email já foi cadastrado. Se você já aplicou, aguarde nosso contato.');
      }
      
      if (error.message.includes('permission') || error.code === '42501') {
        throw new Error('Erro de permissão ao salvar dados. Por favor, contate o suporte.');
      }
      
      throw new Error('Erro ao enviar aplicação. Por favor, tente novamente.');
    }
    
    return { success: true, data: result };
  } catch (error) {
    throw error;
  }
};

export const savePartialApplication = async (data: Partial<FormData> & { email: string }) => {
  try {
    // Email is required as the unique identifier
    if (!data.email) {
      throw new Error('Email é obrigatório');
    }
    
    // Check if application already exists
    const { data: existing, error: selectError } = await supabase
      .from('applications')
      .select('id')
      .eq('email', data.email)
      .maybeSingle();
    
    // If RLS blocks SELECT but we can still INSERT, treat as non-existent
    const existingApp = (selectError && selectError.code === 'PGRST301') ? null : existing;

    // Prepare data - only include fields that have values
    const updateData: any = {};
    if (data.nome) updateData.nome = data.nome;
    if (data.whatsapp) updateData.whatsapp = data.whatsapp;
    if (data.instagram) updateData.instagram = data.instagram === '@' ? null : data.instagram;
    if (data.empresa) updateData.negocio = data.empresa;
    if (data.cargo) updateData.cargo = data.cargo;
    if (data.faturamento) updateData.faturamento = data.faturamento;
    if (data.principais_desafios) updateData.desafio_principal = data.principais_desafios;
    if (data.cronograma) updateData.momento_negocio = data.cronograma;
    if (data.objetivos_movimento) updateData.investimento_disponivel = data.objetivos_movimento;
    if (data.experiencia_anterior) updateData.motivacao = data.experiencia_anterior;

    if (existingApp) {
      // Update existing application with all provided fields
      const { data: result, error } = await supabase
        .from('applications')
        .update(updateData)
        .eq('id', existingApp.id)
        .select()
        .single();

      if (error) {
        throw new Error('Erro ao atualizar progresso.');
      }
      
      return { success: true, data: result };
    } else {
      // Insert new partial application
      const insertData = {
        ...updateData,
        email: data.email,
        status: 'pending'
      };
      
      const { data: result, error } = await supabase
        .from('applications')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        throw new Error('Erro ao salvar progresso.');
      }
      
      return { success: true, data: result };
    }
  } catch (error) {
    throw error;
  }
};
