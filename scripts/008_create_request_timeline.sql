-- Request timeline/activity log
CREATE TABLE IF NOT EXISTS public.request_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.request_timeline ENABLE ROW LEVEL SECURITY;

-- Index
CREATE INDEX IF NOT EXISTS idx_timeline_request ON public.request_timeline(request_id);
CREATE INDEX IF NOT EXISTS idx_timeline_created ON public.request_timeline(created_at DESC);

-- RLS Policy (inherit from request access)
CREATE POLICY "timeline_select" ON public.request_timeline
  FOR SELECT USING (
    request_id IN (
      SELECT id FROM public.service_requests WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "timeline_insert" ON public.request_timeline
  FOR INSERT WITH CHECK (
    request_id IN (
      SELECT id FROM public.service_requests WHERE organization_id IN (
        SELECT organization_id FROM public.profiles WHERE id = auth.uid()
      )
    )
  );
