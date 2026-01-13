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
    <div className="border dark:border-slate-700/50 border-gray-300 rounded-lg overflow-hidden dark:bg-slate-800/20 bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 dark:bg-slate-900/50 bg-gray-100 backdrop-blur">
            <TableRow className="dark:border-b dark:border-slate-700/50 border-b border-gray-200">
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Customer</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Address</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Problem</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Status</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Provider</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Date</TableHead>
              {(onEdit || onDelete) && (
                <TableHead className="text-right dark:text-slate-300 text-gray-700 font-semibold">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                className="dark:border-b dark:border-slate-700/30 border-b border-gray-200 dark:hover:bg-slate-800/50 hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium dark:text-slate-200 text-gray-900">{request.customer_name}</TableCell>
                <TableCell className="max-w-xs truncate dark:text-slate-300 text-gray-700">
                  {request.customer_address}
                </TableCell>
                <TableCell className="max-w-sm truncate dark:text-slate-300 text-gray-700">
                  {request.problem_description}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={request.status as any}
                    size="sm"
                  />
                </TableCell>
                <TableCell className="dark:text-slate-300 text-gray-700">
                  {request.service_providers?.name || (
                    <span className="dark:text-slate-500 text-gray-400">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="dark:text-slate-400 text-gray-600 text-sm">{formatDate(request.created_at)}</TableCell>
                {(onEdit || onDelete) && (
                  <TableCell className="text-right space-x-2">
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(request)}
                        className="dark:border-slate-600/50 border-gray-300 dark:text-slate-300 text-gray-700 dark:hover:bg-slate-700 hover:bg-gray-100 dark:hover:text-white hover:text-gray-900 dark:hover:border-slate-500 hover:border-gray-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(request)}
                        className="dark:border-slate-600/50 border-gray-300 dark:text-red-400 text-red-600 dark:hover:bg-red-500/20 hover:bg-red-50 dark:hover:border-red-500/50 hover:border-red-300"
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
