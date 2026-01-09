-- Junction table for provider skills (many-to-many)
CREATE TABLE IF NOT EXISTS public.provider_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  service_type_id UUID NOT NULL REFERENCES public.service_types(id) ON DELETE CASCADE,
  proficiency_level INTEGER DEFAULT 3 CHECK (proficiency_level BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider_id, service_type_id)
);

-- Enable RLS
ALTER TABLE public.provider_skills ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_provider_skills_provider ON public.provider_skills(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_skills_service ON public.provider_skills(service_type_id);

-- RLS Policies (inherit from provider access)
CREATE POLICY "provider_skills_select" ON public.provider_skills
  FOR SELECT USING (
    provider_id IN (
      SELECT id FROM public.providers WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "provider_skills_insert" ON public.provider_skills
  FOR INSERT WITH CHECK (
    provider_id IN (
      SELECT id FROM public.providers WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
      )
    )
  );

CREATE POLICY "provider_skills_delete" ON public.provider_skills
  FOR DELETE USING (
    provider_id IN (
      SELECT id FROM public.providers WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
      )
    )
  );
