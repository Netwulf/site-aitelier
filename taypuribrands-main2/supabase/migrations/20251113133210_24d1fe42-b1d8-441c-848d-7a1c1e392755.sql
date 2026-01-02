-- Política 1: Usuários podem ver sua própria aplicação por email
CREATE POLICY "Users can view their own application by email"
ON applications FOR SELECT
USING (
  email = NULLIF(current_setting('request.jwt.claims', true), '')::json->>'email'
  OR auth.role() = 'anon'
);

-- Política 2: Usuários podem atualizar sua própria aplicação por email
CREATE POLICY "Users can update their own application by email"
ON applications FOR UPDATE
USING (email = NULLIF(current_setting('request.jwt.claims', true), '')::json->>'email')
WITH CHECK (email = NULLIF(current_setting('request.jwt.claims', true), '')::json->>'email');

-- Política 3: Usuários podem ver seus próprios roles (resolve circular dependency)
CREATE POLICY "Users can view their own roles"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);