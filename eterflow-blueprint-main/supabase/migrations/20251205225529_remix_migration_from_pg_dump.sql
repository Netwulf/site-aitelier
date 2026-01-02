CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'user'
);


--
-- Name: is_admin(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_admin(user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$;


SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    whatsapp text NOT NULL,
    instagram text,
    negocio text,
    faturamento text,
    desafio_principal text,
    momento_negocio text,
    investimento_disponivel text,
    motivacao text,
    submitted_at timestamp with time zone DEFAULT now(),
    status text DEFAULT 'pending'::text,
    created_at timestamp with time zone DEFAULT now(),
    cargo text,
    CONSTRAINT applications_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])))
);


--
-- Name: heatmap_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.heatmap_data (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_path text NOT NULL,
    element_selector text,
    x_position integer NOT NULL,
    y_position integer NOT NULL,
    interaction_count integer DEFAULT 1,
    avg_time_spent_seconds numeric(10,2),
    date date DEFAULT CURRENT_DATE,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: page_views; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.page_views (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id text NOT NULL,
    page_path text NOT NULL,
    page_title text,
    time_on_page_seconds integer,
    scroll_depth_percentage integer,
    viewed_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_interactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_interactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id text NOT NULL,
    interaction_type text NOT NULL,
    element_id text,
    element_class text,
    element_text text,
    page_path text NOT NULL,
    x_position integer,
    y_position integer,
    "timestamp" timestamp with time zone DEFAULT now(),
    CONSTRAINT user_interactions_interaction_type_check CHECK ((interaction_type = ANY (ARRAY['click'::text, 'scroll'::text, 'hover'::text, 'focus'::text])))
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id text NOT NULL,
    visitor_id text,
    ip_address text,
    user_agent text,
    referrer text,
    landing_page text,
    entry_time timestamp with time zone DEFAULT now(),
    exit_time timestamp with time zone,
    duration_seconds integer,
    page_views integer DEFAULT 1,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: workshop_leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workshop_leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    whatsapp text NOT NULL,
    opcao_escolhida text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: heatmap_data heatmap_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.heatmap_data
    ADD CONSTRAINT heatmap_data_pkey PRIMARY KEY (id);


--
-- Name: page_views page_views_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.page_views
    ADD CONSTRAINT page_views_pkey PRIMARY KEY (id);


--
-- Name: user_interactions user_interactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_interactions
    ADD CONSTRAINT user_interactions_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: workshop_leads workshop_leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workshop_leads
    ADD CONSTRAINT workshop_leads_pkey PRIMARY KEY (id);


--
-- Name: idx_applications_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_email ON public.applications USING btree (email);


--
-- Name: idx_applications_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_status ON public.applications USING btree (status);


--
-- Name: idx_applications_submitted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_submitted_at ON public.applications USING btree (submitted_at DESC);


--
-- Name: idx_heatmap_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_heatmap_date ON public.heatmap_data USING btree (date DESC);


--
-- Name: idx_heatmap_page_path; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_heatmap_page_path ON public.heatmap_data USING btree (page_path);


--
-- Name: idx_page_views_page_path; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_page_views_page_path ON public.page_views USING btree (page_path);


--
-- Name: idx_page_views_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_page_views_session_id ON public.page_views USING btree (session_id);


--
-- Name: idx_page_views_viewed_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_page_views_viewed_at ON public.page_views USING btree (viewed_at DESC);


--
-- Name: idx_user_interactions_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_interactions_session_id ON public.user_interactions USING btree (session_id);


--
-- Name: idx_user_interactions_timestamp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_interactions_timestamp ON public.user_interactions USING btree ("timestamp" DESC);


--
-- Name: idx_user_interactions_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_interactions_type ON public.user_interactions USING btree (interaction_type);


--
-- Name: idx_user_sessions_entry_time; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_sessions_entry_time ON public.user_sessions USING btree (entry_time DESC);


--
-- Name: idx_user_sessions_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_sessions_session_id ON public.user_sessions USING btree (session_id);


--
-- Name: idx_user_sessions_visitor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_sessions_visitor_id ON public.user_sessions USING btree (visitor_id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles Admins can assign roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can assign roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: workshop_leads Admins can delete workshop leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete workshop leads" ON public.workshop_leads FOR DELETE USING (public.is_admin(auth.uid()));


--
-- Name: user_roles Admins can revoke roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can revoke roles" ON public.user_roles FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: applications Admins can update applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update applications" ON public.applications FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: workshop_leads Admins can update workshop leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update workshop leads" ON public.workshop_leads FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: applications Admins can view all applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all applications" ON public.applications FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: user_roles Admins can view all user roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all user roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: heatmap_data Admins can view heatmap data; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view heatmap data" ON public.heatmap_data FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: user_interactions Admins can view interactions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view interactions" ON public.user_interactions FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: page_views Admins can view page views; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view page views" ON public.page_views FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: user_sessions Admins can view sessions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view sessions" ON public.user_sessions FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: workshop_leads Admins can view workshop leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view workshop leads" ON public.workshop_leads FOR SELECT USING (public.is_admin(auth.uid()));


--
-- Name: workshop_leads Allow public insert workshop leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public insert workshop leads" ON public.workshop_leads FOR INSERT TO authenticated, anon WITH CHECK (true);


--
-- Name: workshop_leads Allow public update workshop leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public update workshop leads" ON public.workshop_leads FOR UPDATE TO authenticated, anon USING (true) WITH CHECK (true);


--
-- Name: heatmap_data Anyone can insert heatmap data; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert heatmap data" ON public.heatmap_data FOR INSERT WITH CHECK (true);


--
-- Name: user_interactions Anyone can insert interactions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert interactions" ON public.user_interactions FOR INSERT WITH CHECK (true);


--
-- Name: page_views Anyone can insert page views; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (true);


--
-- Name: user_sessions Anyone can insert their session; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert their session" ON public.user_sessions FOR INSERT WITH CHECK (true);


--
-- Name: user_sessions Anyone can update their own session; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update their own session" ON public.user_sessions FOR UPDATE USING (true) WITH CHECK (true);


--
-- Name: applications Enable insert for all users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for all users" ON public.applications FOR INSERT WITH CHECK (true);


--
-- Name: applications Users can update their own application by email; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own application by email" ON public.applications FOR UPDATE USING ((email = ((NULLIF(current_setting('request.jwt.claims'::text, true), ''::text))::json ->> 'email'::text))) WITH CHECK ((email = ((NULLIF(current_setting('request.jwt.claims'::text, true), ''::text))::json ->> 'email'::text)));


--
-- Name: applications Users can view their own application by email; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own application by email" ON public.applications FOR SELECT USING (((email = ((NULLIF(current_setting('request.jwt.claims'::text, true), ''::text))::json ->> 'email'::text)) OR (auth.role() = 'anon'::text)));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: applications; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

--
-- Name: heatmap_data; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.heatmap_data ENABLE ROW LEVEL SECURITY;

--
-- Name: page_views; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

--
-- Name: user_interactions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_sessions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: workshop_leads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.workshop_leads ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


