-- Create admin user and assign admin role
-- Note: This creates a user with email admin@aitelier.com and password Aitelier@2024

-- Insert admin user (Supabase will hash the password automatically)
-- We need to use the auth.users table through a function or manually via Supabase dashboard
-- For now, we'll just create the role assignment structure

-- Create a helper function to assign admin role
CREATE OR REPLACE FUNCTION public.assign_admin_role(_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Get user_id from email
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = _email;
  
  -- Insert admin role if user exists and doesn't already have it
  IF _user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Note: You'll need to create the user admin@aitelier.com with password Aitelier@2024
-- through the Lovable Cloud interface first, then this function will assign the admin role