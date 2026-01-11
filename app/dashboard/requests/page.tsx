'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import { ServiceRequest, ServiceProvider } from '@/lib/types';
import { AddRequestDialog } from '@/components/dashboard/add-request-dialog';
import { EditRequestDialog } from '@/components/dashboard/edit-request-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { RequestsTable } from '@/components/dashboard/new-requests-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function RequestsPage() {
  const supabase = createClient();
  const { toast } = useToast();

  const [requests, setRequests] = useState<any[]>([]);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [userOrg, setUserOrg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const [editingRequest, setEditingRequest] = useState<ServiceRequest | null>(null);
  const [deletingRequest, setDeletingRequest] = useState<ServiceRequest | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Demo data for zuhab@propertyagent.com
      if (user.email?.toLowerCase() === 'zuhab@propertyagent.com') {
        const dummyRequests: any[] = [
          {
            id: '1',
            organization_id: user.id,
            title: 'Hot Tub Maintenance',
            description: 'Regular maintenance and cleaning needed',
            service_type: null,
            status: 'in_progress',
            priority: 'high',
            assigned_provider_id: '1',
            created_at: new Date('2024-01-15').toISOString(),
            updated_at: new Date('2024-01-16').toISOString(),
            completed_at: null,
            deleted_at: null,
            service_providers: {
              id: '1',
              name: 'John Smith',
              phone: '555-0101',
              email: 'john@example.com',
              status: 'active',
              rating: 4.8,
            } as ServiceProvider,
          },
          {
            id: '2',
            organization_id: user.id,
            title: 'Pool Cleaning',
            description: 'Weekly pool cleaning and chemical balance',
            service_type: null,
            status: 'completed',
            priority: 'medium',
            assigned_provider_id: '2',
            created_at: new Date('2024-01-10').toISOString(),
            updated_at: new Date('2024-01-14').toISOString(),
            completed_at: new Date('2024-01-14').toISOString(),
            deleted_at: null,
            service_providers: {
              id: '2',
              name: 'Maria Garcia',
              phone: '555-0102',
              email: 'maria@example.com',
              status: 'active',
              rating: 4.9,
            } as ServiceProvider,
          },
          {
            id: '3',
            organization_id: user.id,
            title: 'WiFi Router Setup',
            description: 'Install and configure new WiFi router for guest house',
            service_type: null,
            status: 'assigned',
            priority: 'medium',
            assigned_provider_id: '3',
            created_at: new Date('2024-01-17').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            completed_at: null,
            deleted_at: null,
            service_providers: {
              id: '3',
              name: 'Tech Solutions',
              phone: '555-0103',
              email: 'tech@example.com',
              status: 'active',
              rating: 4.7,
            } as ServiceProvider,
          },
          {
            id: '4',
            organization_id: user.id,
            title: 'HVAC Filter Change',
            description: 'Replace all HVAC filters in main house',
            service_type: null,
            status: 'pending',
            priority: 'low',
            assigned_provider_id: null,
            created_at: new Date('2024-01-16').toISOString(),
            updated_at: new Date('2024-01-16').toISOString(),
            completed_at: null,
            deleted_at: null,
            service_providers: null,
          },
          {
            id: '5',
            organization_id: user.id,
            title: 'Landscape Maintenance',
            description: 'Trim hedges and mow lawn',
            service_type: null,
            status: 'completed',
            priority: 'medium',
            assigned_provider_id: '1',
            created_at: new Date('2024-01-08').toISOString(),
            updated_at: new Date('2024-01-12').toISOString(),
            completed_at: new Date('2024-01-12').toISOString(),
            deleted_at: null,
            service_providers: {
              id: '1',
              name: 'John Smith',
              phone: '555-0101',
              email: 'john@example.com',
              status: 'active',
              rating: 4.8,
            } as ServiceProvider,
          },
        ];

        const dummyProviders: ServiceProvider[] = [
          {
            id: '1',
            name: 'John Smith',
            phone: '555-0101',
            email: 'john@example.com',
            status: 'active',
            rating: 4.8,
            total_jobs_completed: 24,
            organization_id: user.id,
            created_at: new Date('2024-01-01').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            deleted_at: null,
          },
          {
            id: '2',
            name: 'Maria Garcia',
            phone: '555-0102',
            email: 'maria@example.com',
            status: 'active',
            rating: 4.9,
            total_jobs_completed: 19,
            organization_id: user.id,
            created_at: new Date('2024-01-01').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            deleted_at: null,
          },
          {
            id: '3',
            name: 'Tech Solutions',
            phone: '555-0103',
            email: 'tech@example.com',
            status: 'active',
            rating: 4.7,
            total_jobs_completed: 31,
            organization_id: user.id,
            created_at: new Date('2024-01-02').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            deleted_at: null,
          },
        ];

        setRequests(dummyRequests);
        setProviders(dummyProviders);
        setUserOrg(user.id);
        setLoading(false);
        return;
      }

      // Try to get user's organization
      let orgId = user.id; // fallback org ID
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('organization_id')
          .eq('id', user.id)
          .single();

        if (userData?.organization_id) {
          orgId = userData.organization_id;
          setUserOrg(userData.organization_id);
        } else {
          setUserOrg(user.id);
        }
      } catch (orgError) {
        // If organization query fails, use user ID as fallback
        logger.warn('Could not fetch organization', orgError);
        setUserOrg(user.id);
      }

      // Try to fetch requests
      try {
        const { data: requestsData } = await supabase
          .from('service_requests')
          .select(
            `
            *,
            service_providers:assigned_provider_id (
              id,
              name,
              phone,
              email,
              status,
              rating
            )
          `
          )
          .eq('organization_id', orgId)
          .is('deleted_at', null)
          .order('created_at', { ascending: false });

        setRequests(requestsData || []);
      } catch (requestError) {
        logger.warn('Could not fetch requests', requestError);
        setRequests([]);
      }

      // Try to fetch providers
      try {
        const { data: providersData } = await supabase
          .from('service_providers')
          .select('*')
          .eq('organization_id', orgId)
          .is('deleted_at', null)
          .order('name');

        setProviders(providersData || []);
      } catch (providerError) {
        logger.warn('Could not fetch providers', providerError);
        setProviders([]);
      }
    } catch (error) {
      logger.error('Error fetching data', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [supabase, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!deletingRequest) return;

    setDeleteLoading(true);
    try {
      const res = await fetch('/api/requests/delete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: deletingRequest.id }),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload?.error || 'Delete failed')

      setDeletingRequest(null);
      toast({
        title: 'Success',
        description: 'Request deleted successfully',
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to delete request',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Requests</h1>
          <p className="mt-1 text-gray-400">
            Manage all your service requests
          </p>
        </div>
        {userOrg && (
          <AddRequestDialog
            providers={providers}
            organizationId={userOrg}
            onSuccess={fetchData}
            onError={(error) =>
              toast({
                title: 'Error',
                description: error,
                variant: 'destructive',
              })
            }
          />
        )}
      </div>

      {/* Filter */}
      <Card className="p-4 border-2 bg-slate-900/40 backdrop-blur-xl border-slate-700/50">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600/50 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Table */}
      <Card className="p-6 border-2 shadow-md hover:shadow-lg transition-all bg-slate-900/40 backdrop-blur-xl border-slate-700/50">
        <RequestsTable
          requests={filteredRequests}
          onEdit={setEditingRequest}
          onDelete={setDeletingRequest}
          loading={loading}
        />
      </Card>

      {/* Edit Dialog */}
      <EditRequestDialog
        request={editingRequest}
        providers={providers}
        open={!!editingRequest}
        onOpenChange={(open) => !open && setEditingRequest(null)}
        onSuccess={fetchData}
        onError={(error) =>
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          })
        }
      />

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={!!deletingRequest}
        onOpenChange={(open) => !open && setDeletingRequest(null)}
        title="Delete Request"
        description="Are you sure you want to delete this request? This action cannot be undone."
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
