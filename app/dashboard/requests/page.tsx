'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from '@/lib/theme-context';
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
  const { isDarkMode } = useTheme();

  const [requests, setRequests] = useState<
    (ServiceRequest & { service_providers?: ServiceProvider | null })[]
  >([]);
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
      const { error } = await supabase
        .from('service_requests')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', deletingRequest.id);

      if (error) throw error;

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
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Requests</h1>
          <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
      <Card className={`p-4 border-2 ${isDarkMode ? 'bg-slate-900/40 backdrop-blur-xl border-slate-700/50' : 'bg-white border-gray-300 hover:shadow-md transition-all'}`}>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className={`w-48 ${isDarkMode ? 'bg-slate-800/50 border-slate-600/50 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
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
      <Card className={`p-6 border-2 shadow-md hover:shadow-lg transition-all ${isDarkMode ? 'bg-slate-900/40 backdrop-blur-xl border-slate-700/50' : 'bg-white border-gray-300'}`}>
        <RequestsTable
          requests={filteredRequests}
          onEdit={setEditingRequest}
          onDelete={setDeletingRequest}
          loading={loading}
          isDarkMode={isDarkMode}
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
