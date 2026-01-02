
-- Create a secure function to insert form applications
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
  -- Insert the form application
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
    experiencia_anterior
  ) VALUES (
    p_nome,
    p_email,
    p_whatsapp,
    CASE WHEN p_instagram = '@' THEN NULL ELSE p_instagram END,
    p_empresa,
    p_cargo,
    p_faturamento,
    p_principais_desafios,
    p_objetivos_movimento,
    p_cronograma,
    p_orcamento_investimento,
    p_experiencia_anterior
  )
  RETURNING * INTO result_record;

  -- Return the inserted record as JSON
  RETURN to_jsonb(result_record);
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.submit_form_application TO anon;
GRANT EXECUTE ON FUNCTION public.submit_form_application TO authenticated;
