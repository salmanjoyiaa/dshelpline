-- Organization RLS Policies (created separately to avoid circular dependency)
CREATE POLICY "organizations_select_own" ON public.organizations
  FOR SELECT USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "organizations_update_own" ON public.organizations
  FOR UPDATE USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role = 'owner')
  );
