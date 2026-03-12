-- Ajouter la colonne api_key à la table profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS api_key TEXT;
CREATE INDEX IF NOT EXISTS idx_profiles_api_key ON profiles(api_key);
