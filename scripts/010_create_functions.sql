-- Function to find nearest available provider
CREATE OR REPLACE FUNCTION public.find_nearest_provider(
  p_organization_id UUID,
  p_service_type_id UUID,
  p_location GEOGRAPHY,
  p_max_distance_km NUMERIC DEFAULT 50
)
RETURNS TABLE (
  provider_id UUID,
  provider_name TEXT,
  distance_km NUMERIC,
  rating NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id AS provider_id,
    p.name AS provider_name,
    ROUND((ST_Distance(p.location, p_location) / 1000)::NUMERIC, 2) AS distance_km,
    p.rating
  FROM public.providers p
  JOIN public.provider_skills ps ON p.id = ps.provider_id
  WHERE p.organization_id = p_organization_id
    AND p.is_active = true
    AND p.status = 'available'
    AND ps.service_type_id = p_service_type_id
    AND ST_DWithin(p.location, p_location, p_max_distance_km * 1000)
  ORDER BY ST_Distance(p.location, p_location) ASC, p.rating DESC
  LIMIT 10;
END;
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply update triggers
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_service_types_updated_at
  BEFORE UPDATE ON public.service_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_requests_updated_at
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
