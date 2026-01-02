-- Tabela de aplicações do programa 12 Divergentes
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  instagram TEXT,
  negocio TEXT,
  faturamento TEXT,
  desafio_principal TEXT,
  momento_negocio TEXT,
  investimento_disponivel TEXT,
  motivacao TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para busca rápida
CREATE INDEX idx_applications_email ON public.applications(email);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_submitted_at ON public.applications(submitted_at DESC);

-- RLS: Dados sensíveis - apenas admin pode ver
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Tabela de sessões de usuários
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  visitor_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  landing_page TEXT,
  entry_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  exit_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  page_views INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_user_sessions_session_id ON public.user_sessions(session_id);
CREATE INDEX idx_user_sessions_visitor_id ON public.user_sessions(visitor_id);
CREATE INDEX idx_user_sessions_entry_time ON public.user_sessions(entry_time DESC);

-- RLS: Público pode inserir suas próprias sessões
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert their session" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (true);

-- Tabela de interações do usuário (cliques, scroll, hover)
CREATE TABLE public.user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('click', 'scroll', 'hover', 'focus')),
  element_id TEXT,
  element_class TEXT,
  element_text TEXT,
  page_path TEXT NOT NULL,
  x_position INTEGER,
  y_position INTEGER,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_user_interactions_session_id ON public.user_interactions(session_id);
CREATE INDEX idx_user_interactions_type ON public.user_interactions(interaction_type);
CREATE INDEX idx_user_interactions_timestamp ON public.user_interactions(timestamp DESC);

ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert interactions" 
ON public.user_interactions 
FOR INSERT 
WITH CHECK (true);

-- Tabela de visualizações de página
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  time_on_page_seconds INTEGER,
  scroll_depth_percentage INTEGER,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_page_views_session_id ON public.page_views(session_id);
CREATE INDEX idx_page_views_page_path ON public.page_views(page_path);
CREATE INDEX idx_page_views_viewed_at ON public.page_views(viewed_at DESC);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views" 
ON public.page_views 
FOR INSERT 
WITH CHECK (true);

-- Tabela de áreas quentes (heatmap data)
CREATE TABLE public.heatmap_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  element_selector TEXT,
  x_position INTEGER NOT NULL,
  y_position INTEGER NOT NULL,
  interaction_count INTEGER DEFAULT 1,
  avg_time_spent_seconds DECIMAL(10,2),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_heatmap_page_path ON public.heatmap_data(page_path);
CREATE INDEX idx_heatmap_date ON public.heatmap_data(date DESC);

ALTER TABLE public.heatmap_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert heatmap data" 
ON public.heatmap_data 
FOR INSERT 
WITH CHECK (true);