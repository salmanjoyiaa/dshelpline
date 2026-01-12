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
    <div className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-800/20">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-slate-900/50 backdrop-blur">
            <TableRow className="border-b border-slate-700/50">
              <TableHead className="text-slate-300 font-semibold">Name</TableHead>
              <TableHead className="text-slate-300 font-semibold">Email</TableHead>
              <TableHead className="text-slate-300 font-semibold">Phone</TableHead>
              <TableHead className="text-slate-300 font-semibold">Status</TableHead>
              <TableHead className="text-slate-300 font-semibold">Jobs</TableHead>
              <TableHead className="text-slate-300 font-semibold">Rating</TableHead>
              <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow
                key={provider.id}
                className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors"
              >
                <TableCell className="font-medium text-slate-200">{provider.name}</TableCell>
                <TableCell className="text-slate-300 text-sm">{provider.email}</TableCell>
                <TableCell className="text-slate-300">{formatPhoneNumber(provider.phone)}</TableCell>
                <TableCell>
                  <StatusBadge
                    status={provider.status as any}
                    size="sm"
                  />
                </TableCell>
                <TableCell className="text-slate-300">{provider.total_jobs_completed}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{provider.rating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(provider)}
                    className="border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(provider)}
                    className="border-slate-600/50 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
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
