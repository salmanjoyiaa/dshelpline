'use client';

import { ServiceRequest, ServiceProvider } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from './empty-state';
import { formatDate } from '@/lib/utils';
import { Trash2, Edit2, FileText } from 'lucide-react';

interface RequestsTableProps {
  requests: (ServiceRequest & { service_providers?: ServiceProvider | null })[];
  onEdit?: (request: ServiceRequest) => void;
  onDelete?: (request: ServiceRequest) => void;
  onCreateNew?: () => void;
  loading?: boolean;
}

export function RequestsTable({
  requests,
  onEdit,
  onDelete,
  onCreateNew,
  loading = false,
}: RequestsTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded animate-pulse bg-slate-700" />
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No service requests"
        description="Create your first service request to get started"
        action={
          onCreateNew
            ? { label: 'Create Request', onClick: onCreateNew }
            : undefined
        }
      />
    );
  }

  return (
    <div className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-800/20">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-slate-900/50 backdrop-blur">
            <TableRow className="border-b border-slate-700/50">
              <TableHead className="text-slate-300 font-semibold">Customer</TableHead>
              <TableHead className="text-slate-300 font-semibold">Address</TableHead>
              <TableHead className="text-slate-300 font-semibold">Problem</TableHead>
              <TableHead className="text-slate-300 font-semibold">Status</TableHead>
              <TableHead className="text-slate-300 font-semibold">Provider</TableHead>
              <TableHead className="text-slate-300 font-semibold">Date</TableHead>
              {(onEdit || onDelete) && (
                <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors"
              >
                <TableCell className="font-medium text-slate-200">{request.customer_name}</TableCell>
                <TableCell className="max-w-xs truncate text-slate-300">
                  {request.customer_address}
                </TableCell>
                <TableCell className="max-w-sm truncate text-slate-300">
                  {request.problem_description}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={request.status as any}
                    size="sm"
                  />
                </TableCell>
                <TableCell className="text-slate-300">
                  {request.service_providers?.name || (
                    <span className="text-slate-500">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-slate-400 text-sm">{formatDate(request.created_at)}</TableCell>
                {(onEdit || onDelete) && (
                  <TableCell className="text-right space-x-2">
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(request)}
                        className="border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(request)}
                        className="border-slate-600/50 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
