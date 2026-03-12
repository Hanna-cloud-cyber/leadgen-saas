-- ═══════════════════════════════════════════
-- SCHÉMA DE BASE DE DONNÉES — LeadGen SaaS
-- À exécuter dans Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Table des utilisateurs (profils étendus, l'auth est gérée par Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  leads_used_this_month INT NOT NULL DEFAULT 0,
  leads_limit INT NOT NULL DEFAULT 10, -- Free = 10, Starter = 200, Pro = 1000
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Table des leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  website TEXT,
  emails TEXT[] DEFAULT '{}',
  phone TEXT,
  address TEXT,
  sector TEXT,
  city TEXT,
  country TEXT DEFAULT 'France',
  linkedin TEXT,
  twitter TEXT,
  facebook TEXT,
  instagram TEXT,
  score INT NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  source TEXT NOT NULL DEFAULT 'google',
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'replied', 'converted', 'lost')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Table des recherches (historique)
CREATE TABLE searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  keywords TEXT NOT NULL,
  city TEXT,
  country TEXT DEFAULT 'France',
  results_count INT NOT NULL DEFAULT 0,
  leads_found INT NOT NULL DEFAULT 0,
  emails_found INT NOT NULL DEFAULT 0,
  duration_ms INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Table des emails générés
CREATE TABLE generated_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  tone TEXT NOT NULL DEFAULT 'friendly',
  sent BOOLEAN NOT NULL DEFAULT false,
  opened BOOLEAN NOT NULL DEFAULT false,
  replied BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Table des vérifications d'emails
CREATE TABLE email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  is_valid BOOLEAN NOT NULL,
  mx_records BOOLEAN NOT NULL DEFAULT false,
  reason TEXT,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Table des contacts individuels (personnes)
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  email_guesses JSONB DEFAULT '[]', -- [{email, pattern, confidence, verified}]
  phone TEXT,
  mobile TEXT,
  job_title TEXT,
  company TEXT,
  company_website TEXT,
  linkedin TEXT,
  twitter TEXT,
  city TEXT,
  country TEXT DEFAULT 'France',
  source TEXT NOT NULL DEFAULT 'google',
  score INT NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'replied', 'converted', 'lost')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── INDEX pour la performance ───
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_sector ON leads(sector);
CREATE INDEX idx_leads_city ON leads(city);
CREATE INDEX idx_leads_score ON leads(score DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_searches_user_id ON searches(user_id);
CREATE INDEX idx_generated_emails_user_id ON generated_emails(user_id);
CREATE INDEX idx_generated_emails_lead_id ON generated_emails(lead_id);
CREATE INDEX idx_email_verifications_email ON email_verifications(email);
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_contacts_lead_id ON contacts(lead_id);
CREATE INDEX idx_contacts_company ON contacts(company);
CREATE INDEX idx_contacts_score ON contacts(score DESC);
CREATE INDEX idx_contacts_full_name ON contacts(full_name);
CREATE INDEX idx_contacts_email ON contacts(email);

-- ─── RLS (Row Level Security) — Chaque utilisateur ne voit que ses données ───
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own leads"
  ON leads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own leads"
  ON leads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own leads"
  ON leads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own leads"
  ON leads FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own searches"
  ON searches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own searches"
  ON searches FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own emails"
  ON generated_emails FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own emails"
  ON generated_emails FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own contacts"
  ON contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own contacts"
  ON contacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own contacts"
  ON contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own contacts"
  ON contacts FOR DELETE USING (auth.uid() = user_id);

-- ─── Fonction pour créer automatiquement un profil à l'inscription ───
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Fonction pour reset le compteur de leads chaque mois ───
CREATE OR REPLACE FUNCTION reset_monthly_leads()
RETURNS void AS $$
BEGIN
  UPDATE profiles SET leads_used_this_month = 0;
END;
$$ LANGUAGE plpgsql;
-- Note : planifier cette fonction via Supabase CRON (pg_cron) chaque 1er du mois
