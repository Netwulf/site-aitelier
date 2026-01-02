
-- Create the form_applications table
CREATE TABLE public.form_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  instagram TEXT,
  empresa TEXT NOT NULL,
  cargo TEXT NOT NULL,
  faturamento TEXT NOT NULL,
  principais_desafios TEXT NOT NULL,
  objetivos_movimento TEXT,
  cronograma TEXT NOT NULL,
  orcamento_investimento TEXT NOT NULL,
  experiencia_anterior TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.form_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insertion (anyone can submit the form)
CREATE POLICY "Allow public form submissions" 
  ON public.form_applications 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all applications (for admin purposes)
CREATE POLICY "Authenticated users can view applications" 
  ON public.form_applications 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Add trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_form_applications_updated_at
  BEFORE UPDATE ON public.form_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
