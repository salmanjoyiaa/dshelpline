'use client';

import { ServiceProvider } from '@/lib/types';
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
import { formatPhoneNumber } from '@/lib/utils';
import { Trash2, Edit2, Users } from 'lucide-react';

interface ProvidersTableProps {
  providers: ServiceProvider[];
  onEdit: (provider: ServiceProvider) => void;
  onDelete: (provider: ServiceProvider) => void;
  onCreateNew?: () => void;
  loading?: boolean;
}

export function ProvidersTable({
  providers,
  onEdit,
  onDelete,
  onCreateNew,
  loading = false,
}: ProvidersTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded animate-pulse bg-slate-700" />
        ))}
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No service providers"
        description="Add your first service provider to get started"
        action={
          onCreateNew
            ? { label: 'Add Provider', onClick: onCreateNew }
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
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Name</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Email</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Phone</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Status</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Jobs</TableHead>
              <TableHead className="dark:text-slate-300 text-gray-700 font-semibold">Rating</TableHead>
              <TableHead className="text-right dark:text-slate-300 text-gray-700 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow
                key={provider.id}
                className="dark:border-b dark:border-slate-700/30 border-b border-gray-200 dark:hover:bg-slate-800/50 hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium dark:text-slate-200 text-gray-900">{provider.name}</TableCell>
                <TableCell className="dark:text-slate-300 text-gray-700 text-sm">{provider.email}</TableCell>
                <TableCell className="dark:text-slate-300 text-gray-700">{formatPhoneNumber(provider.phone)}</TableCell>
                <TableCell>
                  <StatusBadge
                    status={provider.status as any}
                    size="sm"
                  />
                </TableCell>
                <TableCell className="dark:text-slate-300 text-gray-700">{provider.total_jobs_completed}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 dark:text-slate-300 text-gray-700">
                    <span className="dark:text-yellow-400 text-yellow-600">★</span>
                    <span className="font-medium">{provider.rating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(provider)}
                    className="dark:border-slate-600/50 border-gray-300 dark:text-slate-300 text-gray-700 dark:hover:bg-slate-700 hover:bg-gray-100 dark:hover:text-white hover:text-gray-900 dark:hover:border-slate-500 hover:border-gray-400"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(provider)}
                    className="dark:border-slate-600/50 border-gray-300 dark:text-red-400 text-red-600 dark:hover:bg-red-500/20 hover:bg-red-50 dark:hover:border-red-500/50 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
