-- LORE Schema Migration
-- Epic 3: AI Core Features (LORE-3.8, LORE-3.9, LORE-3.10)

-- ============================================================
-- Enable pgvector extension for embeddings
-- NOTE: Must be enabled first via Supabase Dashboard > Database > Extensions
-- ============================================================
-- create extension if not exists vector with schema extensions;

-- ============================================================
-- LORE Pages Table (without embedding column - add later when pgvector enabled)
-- ============================================================
create table if not exists public.lore_pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content jsonb not null default '[]'::jsonb,
  parent_id uuid references public.lore_pages(id) on delete set null,
  tags text[] default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes for performance
create index if not exists lore_pages_user_id_idx on public.lore_pages(user_id);
create index if not exists lore_pages_parent_id_idx on public.lore_pages(parent_id);

-- RLS policies
alter table public.lore_pages enable row level security;

create policy "Users can view own pages"
  on public.lore_pages for select
  using (auth.uid() = user_id);

create policy "Users can insert own pages"
  on public.lore_pages for insert
  with check (auth.uid() = user_id);

create policy "Users can update own pages"
  on public.lore_pages for update
  using (auth.uid() = user_id);

create policy "Users can delete own pages"
  on public.lore_pages for delete
  using (auth.uid() = user_id);

-- ============================================================
-- LORE Settings Table
-- ============================================================
create table if not exists public.lore_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references auth.users(id) on delete cascade,
  image_provider text default 'dalle' check (image_provider in ('dalle', 'replicate')),
  openai_api_key text,
  replicate_api_key text,
  anthropic_api_key text,
  embeddings_enabled boolean default true,
  connection_notifications_enabled boolean default true,
  connection_threshold numeric(3,2) default 0.80,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS policies
alter table public.lore_settings enable row level security;

create policy "Users can view own settings"
  on public.lore_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.lore_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.lore_settings for update
  using (auth.uid() = user_id);

-- ============================================================
-- LORE Links Table (Page Connections)
-- ============================================================
create table if not exists public.lore_links (
  id uuid primary key default gen_random_uuid(),
  source_page_id uuid not null references public.lore_pages(id) on delete cascade,
  target_page_id uuid not null references public.lore_pages(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(source_page_id, target_page_id)
);

-- Indexes
create index if not exists lore_links_source_idx on public.lore_links(source_page_id);
create index if not exists lore_links_target_idx on public.lore_links(target_page_id);

-- RLS policies (inherit from pages ownership)
alter table public.lore_links enable row level security;

create policy "Users can view links for own pages"
  on public.lore_links for select
  using (
    exists (
      select 1 from public.lore_pages
      where id = source_page_id and user_id = auth.uid()
    )
  );

create policy "Users can insert links for own pages"
  on public.lore_links for insert
  with check (
    exists (
      select 1 from public.lore_pages
      where id = source_page_id and user_id = auth.uid()
    )
  );

create policy "Users can delete links for own pages"
  on public.lore_links for delete
  using (
    exists (
      select 1 from public.lore_pages
      where id = source_page_id and user_id = auth.uid()
    )
  );

-- ============================================================
-- LORE Connection Notifications Table
-- ============================================================
create table if not exists public.lore_connection_notifications (
  id uuid primary key default gen_random_uuid(),
  source_page_id uuid not null references public.lore_pages(id) on delete cascade,
  target_page_id uuid not null references public.lore_pages(id) on delete cascade,
  dismissed boolean default false,
  created_at timestamp with time zone default now(),
  unique(source_page_id, target_page_id)
);

-- RLS policies
alter table public.lore_connection_notifications enable row level security;

create policy "Users can manage own notifications"
  on public.lore_connection_notifications for all
  using (
    exists (
      select 1 from public.lore_pages
      where id = source_page_id and user_id = auth.uid()
    )
  );

-- ============================================================
-- Match Pages RPC Function (pgvector similarity search)
-- NOTE: Uncomment after enabling pgvector extension and adding embedding column
-- ============================================================
-- create or replace function public.match_lore_pages(
--   query_embedding vector(1536),
--   match_threshold float,
--   match_count int,
--   p_user_id uuid
-- )
-- returns table (
--   id uuid,
--   title text,
--   content_preview text,
--   similarity float
-- )
-- language sql stable
-- as $$
--   select
--     lore_pages.id,
--     lore_pages.title,
--     left(lore_pages.content::text, 300) as content_preview,
--     1 - (lore_pages.embedding <=> query_embedding) as similarity
--   from public.lore_pages
--   where
--     lore_pages.user_id = p_user_id
--     and lore_pages.embedding is not null
--     and 1 - (lore_pages.embedding <=> query_embedding) > match_threshold
--   order by lore_pages.embedding <=> query_embedding
--   limit match_count;
-- $$;

-- ============================================================
-- Storage bucket for LORE images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('lore-images', 'lore-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Users can upload own images"
  on storage.objects for insert
  with check (
    bucket_id = 'lore-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Anyone can view lore images"
  on storage.objects for select
  using (bucket_id = 'lore-images');

create policy "Users can delete own images"
  on storage.objects for delete
  using (
    bucket_id = 'lore-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ============================================================
-- Updated_at trigger function
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply triggers
create trigger lore_pages_updated_at
  before update on public.lore_pages
  for each row execute function public.handle_updated_at();

create trigger lore_settings_updated_at
  before update on public.lore_settings
  for each row execute function public.handle_updated_at();
