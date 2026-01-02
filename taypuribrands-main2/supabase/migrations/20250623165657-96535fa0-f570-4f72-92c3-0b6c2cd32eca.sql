
-- First, let's drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow public form submissions" ON public.form_applications;
DROP POLICY IF EXISTS "Enable public form submissions" ON public.form_applications;
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.form_applications;
DROP POLICY IF EXISTS "Allow all users to submit forms" ON public.form_applications;
DROP POLICY IF EXISTS "Authenticated users can view applications" ON public.form_applications;

-- Create a simple policy that allows anyone to insert without any conditions
CREATE POLICY "Allow anonymous form submissions" 
  ON public.form_applications 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to also insert
CREATE POLICY "Allow authenticated form submissions" 
  ON public.form_applications 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE public.form_applications ENABLE ROW LEVEL SECURITY;
