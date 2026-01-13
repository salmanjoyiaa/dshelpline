-- Service types for each organization
CREATE TABLE IF NOT EXISTS public.service_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'wrench',
  color TEXT DEFAULT '#2563EB',
  estimated_duration INTEGER DEFAULT 60, -- minutes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.service_types ENABLE ROW LEVEL SECURITY;

-- Index
CREATE INDEX IF NOT EXISTS idx_service_types_org ON public.service_types(organization_id);

-- RLS Policies
CREATE POLICY "service_types_select_own_org" ON public.service_types
  FOR SELECT USING (
    is_active AND
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "service_types_insert_own_org" ON public.service_types
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "service_types_update_own_org" ON public.service_types
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "service_types_delete_own_org" ON public.service_types
  FOR DELETE USING (
    is_active AND
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );
