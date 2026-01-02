-- Verificar e corrigir RLS para applications table

-- Remover políticas existentes
DROP POLICY IF EXISTS "Anyone can submit applications" ON applications;
DROP POLICY IF EXISTS "Anyone can update their application by email" ON applications;

-- Garantir que RLS está habilitado
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Criar política de INSERT mais permissiva
CREATE POLICY "Enable insert for all users"
ON applications
FOR INSERT
TO public
WITH CHECK (true);

-- Criar política de UPDATE permissiva
CREATE POLICY "Enable update for all users"
ON applications
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Criar política de SELECT para permitir verificação de emails existentes
CREATE POLICY "Enable select for all users"
ON applications
FOR SELECT
TO public
USING (true);