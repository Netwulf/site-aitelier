
-- First, let's drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow public form submissions" ON public.form_applications;
DROP POLICY IF EXISTS "Enable public form submissions" ON public.form_applications;
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.form_applications;
DROP POLICY IF EXISTS "Authenticated users can view applications" ON public.form_applications;

-- Create a comprehensive policy that allows both authenticated and anonymous users to insert
CREATE POLICY "Allow all users to submit forms" 
  ON public.form_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users to view applications (admin purposes)
CREATE POLICY "Authenticated users can view applications" 
  ON public.form_applications 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.form_applications ENABLE ROW LEVEL SECURITY;
