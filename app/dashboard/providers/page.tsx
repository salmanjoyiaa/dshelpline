'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import { ServiceProvider } from '@/lib/types';
import { AddProviderDialog } from '@/components/dashboard/add-provider-dialog';
import { EditProviderDialog } from '@/components/dashboard/edit-provider-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { ProvidersTable } from '@/components/dashboard/providers-table';
import { PaginationControls } from '@/components/dashboard/pagination-controls';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 25;

export default function ProvidersPage() {
  const supabase = createClient();
  const { toast } = useToast();

  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [userOrg, setUserOrg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [editingProvider, setEditingProvider] = useState<ServiceProvider | null>(null);
  const [deletingProvider, setDeletingProvider] = useState<ServiceProvider | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadInitialData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

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
          setUserOrg(user.id);
        }
      } catch (orgError) {
        logger.warn('Could not fetch organization', orgError);
        setUserOrg(user.id);
      }
    } catch (error) {
      logger.error('Error loading initial data', error);
    }
  }, [supabase]);

  const fetchProviders = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

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

      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data: providersData, count } = await supabase
        .from('service_providers')
        .select('*', { count: 'exact' })
        .eq('organization_id', orgId)
        .is('deleted_at', null)
        .order('name')
        .range(start, end);
      
      setProviders(providersData || []);
      setTotalCount(count || 0);
    } catch (providerError) {
      logger.warn('Could not fetch providers', providerError);
      setProviders([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Load initial data once on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Fetch providers when page changes
  useEffect(() => {
    fetchProviders(currentPage);
  }, [currentPage, fetchProviders]);

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
      fetchProviders(currentPage);
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
            onSuccess={() => fetchProviders(1)}
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
        
        {/* Pagination */}
        {totalCount > ITEMS_PER_PAGE && (
          <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-center">
            <PaginationControls
              currentPage={currentPage}
              totalItems={totalCount}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>

      {/* Edit Dialog */}
      <EditProviderDialog
        provider={editingProvider}
        open={!!editingProvider}
        onOpenChange={(open) => !open && setEditingProvider(null)}
        onSuccess={() => fetchProviders(currentPage)}
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
