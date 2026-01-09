// ============================================================================
// DATABASE SCHEMA TYPES
// ============================================================================

export type Organization = {
  id: string;
  name: string;
  business_type: 'locksmith' | 'window_cleaning';
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  organization_id: string;
  role: 'owner' | 'admin' | 'user';
  created_at: string;
};

export type ServiceProvider = {
  id: string;
  organization_id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  total_jobs_completed: number;
  total_jobs?: number;
  rating: number;
  avatar_url?: string;
  skills?: string[];
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceRequest = {
  id: string;
  organization_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  problem_description: string;
  description?: string;
  notes?: string;
  scheduled_at?: string | null;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  assigned_provider_id: string | null;
  service_type_id: string | null;
  service_type?: ServiceType | null;
  assigned_provider?: ServiceProvider | null;
  address: string;
  customer_email?: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceType = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  estimated_duration?: number;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  organization_id: string;
  name: string;
  phone: string;
  address: string;
  total_requests: number;
  rating_given: number | null;
  deleted_at: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  email?: string;
  full_name: string | null;
  avatar_url: string | null;
  organization_id: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
};

// ============================================================================
// RELATED TYPES
// ============================================================================

export type ServiceRequestWithProvider = ServiceRequest & {
  service_providers?: ServiceProvider | null;
};

export type Provider = ServiceProvider;

// ============================================================================
// STATUS VALIDATION
// ============================================================================

export const VALID_STATUS_TRANSITIONS: Record<
  ServiceRequest['status'],
  ServiceRequest['status'][]
> = {
  pending: ['assigned', 'cancelled'],
  assigned: ['in_progress', 'pending', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

// ============================================================================
// FORM INPUT TYPES
// ============================================================================

export type AddRequestFormData = {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  problem_description: string;
  assigned_provider_id?: string;
};

export type EditRequestFormData = {
  status: ServiceRequest['status'];
  assigned_provider_id: string | null;
};

export type AddProviderFormData = {
  name: string;
  phone: string;
  email: string;
};

export type EditProviderFormData = {
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
};

export interface WebhookLog {
  id: string
  organization_id: string | null
  source: string
  payload: Record<string, unknown>
  status: "received" | "processed" | "failed"
  error_message: string | null
  request_id: string | null
  created_at: string
}

export interface DashboardStats {
  totalRequests: number
  pendingRequests: number
  completedToday: number
  activeProviders: number
  avgResponseTime: number
  completionRate: number
}
