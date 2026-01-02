-- Criar enum para status do CRM
CREATE TYPE public.crm_status AS ENUM (
  'novo',
  'contato_inicial',
  'call_agendada',
  'call_realizada',
  'segunda_call',
  'negado',
  'fechado'
);

-- Adicionar colunas de CRM na tabela applications
ALTER TABLE public.applications
ADD COLUMN crm_status public.crm_status DEFAULT 'novo',
ADD COLUMN contacted_by text,
ADD COLUMN call_scheduled_at timestamp with time zone,
ADD COLUMN crm_notes text,
ADD COLUMN updated_by uuid REFERENCES auth.users(id);

-- Criar índice para facilitar queries por status
CREATE INDEX idx_applications_crm_status ON public.applications(crm_status);