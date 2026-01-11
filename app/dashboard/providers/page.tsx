'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import { ServiceProvider } from '@/lib/types';
import { AddProviderDialog } from '@/components/dashboard/add-provider-dialog';
import { EditProviderDialog } from '@/components/dashboard/edit-provider-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { ProvidersTable } from '@/components/dashboard/providers-table';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ProvidersPage() {
  const supabase = createClient();
  const { toast } = useToast();

  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [userOrg, setUserOrg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [editingProvider, setEditingProvider] = useState<ServiceProvider | null>(null);
  const [deletingProvider, setDeletingProvider] = useState<ServiceProvider | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Demo data for zuhab@propertyagent.com
      if (user.email?.toLowerCase() === 'zuhab@propertyagent.com') {
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
          {
            id: '4',
            name: 'Alex Johnson',
            phone: '555-0104',
            email: 'alex@example.com',
            status: 'active',
            rating: 4.6,
            total_jobs_completed: 15,
            organization_id: user.id,
            created_at: new Date('2024-01-03').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            deleted_at: null,
          },
          {
            id: '5',
            name: 'Sarah Williams',
            phone: '555-0105',
            email: 'sarah@example.com',
            status: 'active',
            rating: 4.85,
            total_jobs_completed: 28,
            organization_id: user.id,
            created_at: new Date('2024-01-04').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            deleted_at: null,
          },
          {
            id: '6',
            name: 'Mike Brown',
            phone: '555-0106',
            email: 'mike@example.com',
            status: 'active',
            rating: 4.5,
            total_jobs_completed: 12,
            organization_id: user.id,
            created_at: new Date('2024-01-05').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            deleted_at: null,
          },
          {
            id: '7',
            name: 'Lisa Anderson',
            phone: '555-0107',
            email: 'lisa@example.com',
            status: 'active',
            rating: 4.75,
            total_jobs_completed: 22,
            organization_id: user.id,
            created_at: new Date('2024-01-06').toISOString(),
            updated_at: new Date('2024-01-17').toISOString(),
            deleted_at: null,
          },
          {
            id: '8',
            name: 'David Martinez',
            phone: '555-0108',
            email: 'david@example.com',
            status: 'inactive',
            rating: 4.4,
            total_jobs_completed: 8,
            organization_id: user.id,
            created_at: new Date('2024-01-07').toISOString(),
            updated_at: new Date('2024-01-10').toISOString(),
            deleted_at: null,
          },
        ];

        setProviders(dummyProviders);
        setUserOrg(user.id);
        setLoading(false);
        return;
      }

      // Try to get user's organization, but set a default if it fails
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('organization_id')
          .eq('id', user.id)
          .single();

        if (userData?.organization_id) {
          setUserOrg(userData.organization_id);
        } else {
          // Fallback: use user ID as a temporary org ID for UI purposes
          setUserOrg(user.id);
        }
      } catch (orgError) {
        // If organization query fails, use user ID as fallback
        logger.warn('Could not fetch organization', orgError);
        setUserOrg(user.id);
      }

      // Try to fetch providers, but handle gracefully if table doesn't exist
      let orgId = user.id; // fallback org ID
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('organization_id')
          .eq('id', user.id)
          .single();
        if (userData?.organization_id) {
          orgId = userData.organization_id;
        }
      } catch (e) {
        logger.warn('Could not fetch organization', e);
      }

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
        description: 'Failed to fetch providers',
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
    if (!deletingProvider) return;

    setDeleteLoading(true);
    try {
      const res = await fetch('/api/providers/delete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: deletingProvider.id }),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload?.error || 'Delete failed')

      setDeletingProvider(null);
      toast({
        title: 'Success',
        description: 'Provider deleted successfully',
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to delete provider',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Providers</h1>
          <p className="mt-1 text-gray-400">
            Manage your service providers
          </p>
        </div>
        {userOrg && (
          <AddProviderDialog
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

      {/* Table */}
      <Card className="p-6 border-2 shadow-md hover:shadow-lg transition-all bg-slate-900/40 backdrop-blur-xl border-slate-700/50">
        <ProvidersTable
          providers={providers}
          onEdit={setEditingProvider}
          onDelete={setDeletingProvider}
          loading={loading}
        />
      </Card>

      {/* Edit Dialog */}
      <EditProviderDialog
        provider={editingProvider}
        open={!!editingProvider}
        onOpenChange={(open) => !open && setEditingProvider(null)}
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
        open={!!deletingProvider}
        onOpenChange={(open) => !open && setDeletingProvider(null)}
        title="Delete Provider"
        description="Are you sure you want to delete this provider? This action cannot be undone."
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
