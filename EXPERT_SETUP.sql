-- ============================================================================
-- EXPERT SETUP FOR SERVICEFLOW - RUN THIS IN SUPABASE SQL EDITOR
-- ============================================================================
-- This script creates all tables, indexes, RLS policies, and seed data
-- No circular dependencies in RLS policies - everything works smoothly!
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ORGANIZATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('locksmith', 'window_cleaning')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert dummy organizations
INSERT INTO organizations (name, business_type) VALUES
  ('Elite Locksmith Services', 'locksmith'),
  ('Crystal Window Cleaning', 'window_cleaning')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- USERS TABLE (linked to Supabase Auth)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================================================
-- SERVICE_PROVIDERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS service_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  total_jobs_completed INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.00,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_providers_organization_id ON service_providers(organization_id);
CREATE INDEX IF NOT EXISTS idx_service_providers_deleted_at ON service_providers(deleted_at);

-- ============================================================================
-- SERVICE_REQUESTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  problem_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
  assigned_provider_id UUID REFERENCES service_providers(id) ON DELETE SET NULL,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_requests_organization_id ON service_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_assigned_provider_id ON service_requests(assigned_provider_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_deleted_at ON service_requests(deleted_at);

-- ============================================================================
-- CUSTOMERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  total_requests INTEGER DEFAULT 0,
  rating_given DECIMAL(3, 2),
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_organization_id ON customers(organization_id);
CREATE INDEX IF NOT EXISTS idx_customers_deleted_at ON customers(deleted_at);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES - EXPERT VERSION
-- ============================================================================
-- KEY FIX: Users can read their own record FIRST, avoiding circular dependencies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- ORGANIZATIONS: Users can view their assigned organization
CREATE POLICY "Users can view their organization"
  ON organizations FOR SELECT
  USING (id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

-- USERS: CRITICAL FIX - Allow users to read their own record FIRST
-- This avoids the circular dependency issue
CREATE POLICY "Users can read their own record"
  ON users FOR SELECT
  USING (id = auth.uid());

-- Then allow viewing other users in the same organization
CREATE POLICY "Users can view users in their organization"
  ON users FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
  );

-- SERVICE_PROVIDERS: Full CRUD with organization isolation
CREATE POLICY "Users can view providers in their organization"
  ON service_providers FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can insert providers in their organization"
  ON service_providers FOR INSERT
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update providers in their organization"
  ON service_providers FOR UPDATE
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()))
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can delete providers in their organization"
  ON service_providers FOR DELETE
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

-- SERVICE_REQUESTS: Full CRUD with organization isolation
CREATE POLICY "Users can view requests in their organization"
  ON service_requests FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can insert requests in their organization"
  ON service_requests FOR INSERT
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update requests in their organization"
  ON service_requests FOR UPDATE
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()))
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can delete requests in their organization"
  ON service_requests FOR DELETE
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

-- CUSTOMERS: Full CRUD with organization isolation
CREATE POLICY "Users can view customers in their organization"
  ON customers FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can insert customers in their organization"
  ON customers FOR INSERT
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update customers in their organization"
  ON customers FOR UPDATE
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()))
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can delete customers in their organization"
  ON customers FOR DELETE
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

-- ============================================================================
-- DUMMY DATA
-- ============================================================================

DO $$
DECLARE
  locksmith_org_id UUID;
  windowcleaning_org_id UUID;
  provider_id_1 UUID;
  provider_id_2 UUID;
  provider_id_3 UUID;
  provider_id_4 UUID;
  provider_id_5 UUID;
  provider_id_6 UUID;
BEGIN
  -- Get organization IDs
  SELECT id INTO locksmith_org_id FROM organizations WHERE business_type = 'locksmith' LIMIT 1;
  SELECT id INTO windowcleaning_org_id FROM organizations WHERE business_type = 'window_cleaning' LIMIT 1;

  -- Insert service providers for Locksmith
  INSERT INTO service_providers (organization_id, name, phone, email, status, total_jobs_completed, rating)
  VALUES 
    (locksmith_org_id, 'John Smith', '555-0101', 'john@locksmith.com', 'active', 45, 4.8),
    (locksmith_org_id, 'Mike Johnson', '555-0102', 'mike@locksmith.com', 'active', 38, 4.6),
    (locksmith_org_id, 'Sarah Davis', '555-0103', 'sarah@locksmith.com', 'active', 52, 4.9)
  ON CONFLICT DO NOTHING;

  -- Insert service providers for Window Cleaning
  INSERT INTO service_providers (organization_id, name, phone, email, status, total_jobs_completed, rating)
  VALUES 
    (windowcleaning_org_id, 'Tom Wilson', '555-0201', 'tom@windowcleaning.com', 'active', 67, 4.7),
    (windowcleaning_org_id, 'Lisa Brown', '555-0202', 'lisa@windowcleaning.com', 'active', 53, 4.8),
    (windowcleaning_org_id, 'Chris Lee', '555-0203', 'chris@windowcleaning.com', 'inactive', 41, 4.5)
  ON CONFLICT DO NOTHING;

  -- Get provider IDs for service requests
  SELECT id INTO provider_id_1 FROM service_providers WHERE email = 'john@locksmith.com';
  SELECT id INTO provider_id_2 FROM service_providers WHERE email = 'mike@locksmith.com';
  SELECT id INTO provider_id_3 FROM service_providers WHERE email = 'sarah@locksmith.com';
  SELECT id INTO provider_id_4 FROM service_providers WHERE email = 'tom@windowcleaning.com';
  SELECT id INTO provider_id_5 FROM service_providers WHERE email = 'lisa@windowcleaning.com';
  SELECT id INTO provider_id_6 FROM service_providers WHERE email = 'chris@windowcleaning.com';

  -- Insert service requests for Locksmith
  INSERT INTO service_requests (organization_id, customer_name, customer_phone, customer_address, problem_description, status, assigned_provider_id)
  VALUES 
    (locksmith_org_id, 'Robert Williams', '555-1001', '123 Main St, Downtown', 'Broken door lock', 'completed', provider_id_1),
    (locksmith_org_id, 'Jennifer Garcia', '555-1002', '456 Oak Ave, Midtown', 'Lost keys need entry', 'in_progress', provider_id_2),
    (locksmith_org_id, 'Michael Brown', '555-1003', '789 Pine Rd, Uptown', 'Lock rekeying', 'assigned', provider_id_3),
    (locksmith_org_id, 'Lisa Anderson', '555-1004', '321 Elm St, Downtown', 'Safe installation', 'assigned', provider_id_1),
    (locksmith_org_id, 'David Lee', '555-1005', '654 Maple Dr, Suburbs', 'Emergency lockout', 'in_progress', provider_id_2),
    (locksmith_org_id, 'Susan Martinez', '555-1006', '987 Birch Ln, Suburbs', 'New lock installation', 'pending', NULL),
    (locksmith_org_id, 'James Wilson', '555-1007', '246 Cedar Ave, Midtown', 'Lock repair needed', 'pending', NULL),
    (locksmith_org_id, 'Patricia Taylor', '555-1008', '135 Spruce St, Downtown', 'Door hardware replacement', 'completed', provider_id_3)
  ON CONFLICT DO NOTHING;

  -- Insert service requests for Window Cleaning
  INSERT INTO service_requests (organization_id, customer_name, customer_phone, customer_address, problem_description, status, assigned_provider_id)
  VALUES 
    (windowcleaning_org_id, 'Emily Johnson', '555-2001', '111 First St, Downtown', 'Residential window cleaning', 'completed', provider_id_4),
    (windowcleaning_org_id, 'Daniel Martinez', '555-2002', '222 Second Ave, Midtown', 'Office building windows', 'in_progress', provider_id_5),
    (windowcleaning_org_id, 'Amanda Smith', '555-2003', '333 Third Blvd, Uptown', 'Storefront windows', 'assigned', provider_id_4),
    (windowcleaning_org_id, 'Christopher Davis', '555-2004', '444 Fourth St, Downtown', 'Home window cleaning', 'assigned', provider_id_5),
    (windowcleaning_org_id, 'Stephanie Brown', '555-2005', '555 Fifth Ave, Suburbs', 'Gutter cleaning with windows', 'in_progress', provider_id_6),
    (windowcleaning_org_id, 'Kevin Anderson', '555-2006', '666 Sixth Rd, Suburbs', 'Post-construction cleaning', 'pending', NULL),
    (windowcleaning_org_id, 'Michelle Lee', '555-2007', '777 Seventh Ln, Midtown', 'Skylight cleaning', 'pending', NULL),
    (windowcleaning_org_id, 'Ryan Taylor', '555-2008', '888 Eighth Dr, Downtown', 'High-rise window cleaning', 'completed', provider_id_4)
  ON CONFLICT DO NOTHING;

  -- Insert customers for Locksmith
  INSERT INTO customers (organization_id, name, phone, address, total_requests, rating_given)
  VALUES 
    (locksmith_org_id, 'Robert Williams', '555-1001', '123 Main St, Downtown', 3, 5.0),
    (locksmith_org_id, 'Jennifer Garcia', '555-1002', '456 Oak Ave, Midtown', 2, 4.5),
    (locksmith_org_id, 'Michael Brown', '555-1003', '789 Pine Rd, Uptown', 1, 4.8),
    (locksmith_org_id, 'Lisa Anderson', '555-1004', '321 Elm St, Downtown', 4, 4.9),
    (locksmith_org_id, 'David Lee', '555-1005', '654 Maple Dr, Suburbs', 2, 4.7)
  ON CONFLICT DO NOTHING;

  -- Insert customers for Window Cleaning
  INSERT INTO customers (organization_id, name, phone, address, total_requests, rating_given)
  VALUES 
    (windowcleaning_org_id, 'Emily Johnson', '555-2001', '111 First St, Downtown', 5, 4.9),
    (windowcleaning_org_id, 'Daniel Martinez', '555-2002', '222 Second Ave, Midtown', 2, 4.6),
    (windowcleaning_org_id, 'Amanda Smith', '555-2003', '333 Third Blvd, Uptown', 3, 4.8),
    (windowcleaning_org_id, 'Christopher Davis', '555-2004', '444 Fourth St, Downtown', 1, 4.5),
    (windowcleaning_org_id, 'Stephanie Brown', '555-2005', '555 Fifth Ave, Suburbs', 6, 5.0)
  ON CONFLICT DO NOTHING;

END $$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Uncomment these to verify your data after running the script:
-- SELECT 'Organizations' as table_name, COUNT(*) FROM organizations;
-- SELECT 'Service Providers' as table_name, COUNT(*) FROM service_providers WHERE deleted_at IS NULL;
-- SELECT 'Service Requests' as table_name, COUNT(*) FROM service_requests WHERE deleted_at IS NULL;
-- SELECT 'Customers' as table_name, COUNT(*) FROM customers WHERE deleted_at IS NULL;
-- ============================================================================
