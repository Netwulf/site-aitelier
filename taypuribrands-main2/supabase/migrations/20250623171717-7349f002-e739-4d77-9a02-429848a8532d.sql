
-- Add status field to track partial vs complete applications
ALTER TABLE public.form_applications 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'partial' CHECK (status IN ('partial', 'complete'));

-- Create unique index on email for faster lookups and prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_form_applications_email_unique ON public.form_applications(email);

-- Create function to save partial application data (Part 1)
CREATE OR REPLACE FUNCTION public.save_partial_application(
  p_nome text,
  p_email text,
  p_whatsapp text,
  p_instagram text DEFAULT NULL
)
RETURNS jsonb
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  result_record record;
BEGIN
  -- Use UPSERT to insert or update based on email
  INSERT INTO public.form_applications (
    nome,
    email,
    whatsapp,
    instagram,
    status
  ) VALUES (
    p_nome,
    p_email,
    p_whatsapp,
    CASE WHEN p_instagram = '' OR p_instagram = '@' THEN NULL ELSE p_instagram END,
    'partial'
  )
  ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    whatsapp = EXCLUDED.whatsapp,
    instagram = EXCLUDED.instagram,
    updated_at = now()
  RETURNING * INTO result_record;

  -- Return the record as JSON
  RETURN to_jsonb(result_record);
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.save_partial_application TO anon;
GRANT EXECUTE ON FUNCTION public.save_partial_application TO authenticated;

-- Update the complete submission function to handle UPSERT
CREATE OR REPLACE FUNCTION public.submit_form_application(
  p_nome text,
  p_email text,
  p_whatsapp text,
  p_instagram text DEFAULT NULL,
  p_empresa text DEFAULT NULL,
  p_cargo text DEFAULT NULL,
  p_faturamento text DEFAULT NULL,
  p_principais_desafios text DEFAULT NULL,
  p_objetivos_movimento text DEFAULT NULL,
  p_cronograma text DEFAULT NULL,
  p_orcamento_investimento text DEFAULT NULL,
  p_experiencia_anterior text DEFAULT NULL
)
RETURNS jsonb
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  result_record record;
BEGIN
  -- Use UPSERT to insert or update complete application
  INSERT INTO public.form_applications (
    nome,
    email,
    whatsapp,
    instagram,
    empresa,
    cargo,
    faturamento,
    principais_desafios,
    objetivos_movimento,
    cronograma,
    orcamento_investimento,
    experiencia_anterior,
    status
  ) VALUES (
    p_nome,
    p_email,
    p_whatsapp,
    CASE WHEN p_instagram = '' OR p_instagram = '@' THEN NULL ELSE p_instagram END,
    p_empresa,
    p_cargo,
    p_faturamento,
    p_principais_desafios,
    p_objetivos_movimento,
    p_cronograma,
    p_orcamento_investimento,
    p_experiencia_anterior,
    'complete'
  )
  ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    whatsapp = EXCLUDED.whatsapp,
    instagram = EXCLUDED.instagram,
    empresa = EXCLUDED.empresa,
    cargo = EXCLUDED.cargo,
    faturamento = EXCLUDED.faturamento,
    principais_desafios = EXCLUDED.principais_desafios,
    objetivos_movimento = EXCLUDED.objetivos_movimento,
    cronograma = EXCLUDED.cronograma,
    orcamento_investimento = EXCLUDED.orcamento_investimento,
    experiencia_anterior = EXCLUDED.experiencia_anterior,
    status = 'complete',
    updated_at = now()
  RETURNING * INTO result_record;

  -- Return the inserted/updated record as JSON
  RETURN to_jsonb(result_record);
END;
$$;
