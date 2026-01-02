
-- Grant basic table privileges to anon role for form submissions
GRANT INSERT ON public.form_applications TO anon;
GRANT SELECT ON public.form_applications TO anon;

-- Grant privileges to authenticated role as well
GRANT INSERT ON public.form_applications TO authenticated;
GRANT SELECT ON public.form_applications TO authenticated;

-- Also grant usage on the sequence for the id column
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
