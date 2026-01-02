
-- Drop the existing policy that's too restrictive
DROP POLICY IF EXISTS "Allow public form submissions" ON public.form_applications;

-- Create a new policy that properly allows public insertion
CREATE POLICY "Enable public form submissions" 
  ON public.form_applications 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Ensure the policy allows anonymous users (not just authenticated users)
-- This policy specifically targets the anon role which is used for unauthenticated users
CREATE POLICY "Allow anonymous form submissions" 
  ON public.form_applications 
  FOR INSERT 
  TO anon
  WITH CHECK (true);
