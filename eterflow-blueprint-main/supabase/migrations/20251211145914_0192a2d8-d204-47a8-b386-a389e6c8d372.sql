-- Tabela para armazenar diagnósticos de Instagram
CREATE TABLE public.instagram_diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instagram_username TEXT NOT NULL,
  profile_name TEXT,
  profile_bio TEXT,
  profile_picture TEXT,
  followers_count INTEGER,
  posts_data JSONB,
  reels_data JSONB,
  initial_observation TEXT,
  full_diagnosis JSONB,
  reels_analysis JSONB,
  processing_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS para inserção e leitura pública
ALTER TABLE public.instagram_diagnoses ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Allow public insert instagram_diagnoses" 
ON public.instagram_diagnoses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read instagram_diagnoses" 
ON public.instagram_diagnoses 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public update instagram_diagnoses" 
ON public.instagram_diagnoses 
FOR UPDATE 
USING (true)
WITH CHECK (true);