-- Service providers
CREATE TABLE IF NOT EXISTS public.providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'busy', 'offline')),
  location GEOGRAPHY(POINT, 4326),
  location_updated_at TIMESTAMPTZ,
  rating NUMERIC(2,1) DEFAULT 5.0,
  total_jobs INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_providers_org ON public.providers(organization_id);
CREATE INDEX IF NOT EXISTS idx_providers_status ON public.providers(status) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_providers_location ON public.providers USING GIST(location);

-- RLS Policies
CREATE POLICY "providers_select_own_org" ON public.providers
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "providers_insert_own_org" ON public.providers
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "providers_update_own_org" ON public.providers
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "providers_delete_own_org" ON public.providers
  FOR DELETE USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );
