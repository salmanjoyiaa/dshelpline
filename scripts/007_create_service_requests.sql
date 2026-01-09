-- Service requests
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  service_type_id UUID REFERENCES public.service_types(id) ON DELETE SET NULL,
  assigned_provider_id UUID REFERENCES public.providers(id) ON DELETE SET NULL,
  
  -- Customer info
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  
  -- Location
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  
  -- Request details
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  description TEXT,
  notes TEXT,
  
  -- Timestamps
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  estimated_duration INTEGER, -- minutes
  
  -- External reference (from webhook)
  external_id TEXT,
  source TEXT DEFAULT 'manual',
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_requests_org ON public.service_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_provider ON public.service_requests(assigned_provider_id);
CREATE INDEX IF NOT EXISTS idx_requests_location ON public.service_requests USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_requests_created ON public.service_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_requests_scheduled ON public.service_requests(scheduled_at);

-- RLS Policies
CREATE POLICY "requests_select_own_org" ON public.service_requests
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "requests_insert_own_org" ON public.service_requests
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "requests_update_own_org" ON public.service_requests
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "requests_delete_own_org" ON public.service_requests
  FOR DELETE USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );
