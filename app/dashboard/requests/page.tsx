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
import { PaginationControls } from '@/components/dashboard/pagination-controls';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 25

export default function RequestsPage() {
  const supabase = createClient();
  const { toast } = useToast();

  const [requests, setRequests] = useState<any[]>([]);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [userOrg, setUserOrg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [editingRequest, setEditingRequest] = useState<ServiceRequest | null>(null);
  const [deletingRequest, setDeletingRequest] = useState<ServiceRequest | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadInitialData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Try to get user's organization
      let orgId = user.id; // fallback org ID
      try {
        const { data: userData } = await supabase
          .from('profiles')
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
        logger.warn('Could not fetch organization', orgError);
        setUserOrg(user.id);
      }

      // Try to fetch providers (no pagination)
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
      logger.error('Error loading initial data', error);
    }
  }, [supabase]);

  const fetchRequests = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Get org ID
      let orgId = user.id;
      try {
        const { data: userData } = await supabase
          .from('profiles')
          .select('organization_id')
          .eq('id', user.id)
          .single();
        if (userData?.organization_id) orgId = userData.organization_id;
      } catch (e) {
        logger.warn('Could not fetch organization', e);
      }

      // Fetch requests with pagination
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data: requestsData, count } = await supabase
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
        `,
          { count: 'exact' }
        )
        .eq('organization_id', orgId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(start, end);

      setRequests(requestsData || []);
      setTotalCount(count || 0);
    } catch (error) {
      logger.error('Error fetching requests', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch requests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [supabase, toast]);

  // Load initial data once on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Fetch requests when page changes
  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage, fetchRequests]);

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
      fetchRequests(currentPage);
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
            onSuccess={() => fetchRequests(1)}
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
      <EditRequestDialog
        request={editingRequest}
        providers={providers}
        open={!!editingRequest}
        onOpenChange={(open) => !open && setEditingRequest(null)}
        onSuccess={() => fetchRequests(currentPage)}
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
