-- Add RLS policies for applications table to allow public form submissions

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit applications" ON applications;
DROP POLICY IF EXISTS "Anyone can update their application by email" ON applications;

-- Allow anyone to insert new applications (public form)
CREATE POLICY "Anyone can submit applications"
ON applications
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update applications (needed for auto-save functionality)
CREATE POLICY "Anyone can update their application by email"
ON applications
FOR UPDATE
USING (true)
WITH CHECK (true);