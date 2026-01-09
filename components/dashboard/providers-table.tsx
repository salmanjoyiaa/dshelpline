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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/lib/utils';
import { Trash2, Edit2, Star } from 'lucide-react';

interface ProvidersTableProps {
  providers: ServiceProvider[];
  onEdit: (provider: ServiceProvider) => void;
  onDelete: (provider: ServiceProvider) => void;
  loading?: boolean;
  isDarkMode?: boolean;
}

export function ProvidersTable({
  providers,
  onEdit,
  onDelete,
  loading = false,
  isDarkMode = true,
}: ProvidersTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-12 rounded animate-pulse ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />
        ))}
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No providers found</p>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg overflow-x-auto ${isDarkMode ? 'border-slate-700/50 bg-slate-800/20' : 'border-gray-300 bg-gray-50'}`}>
      <Table>
        <TableHeader>
          <TableRow className={`border-b ${isDarkMode ? 'border-slate-700/50 hover:bg-slate-800/30' : 'border-gray-200 hover:bg-gray-100'}`}>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Name</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Email</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Phone</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Status</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Jobs Completed</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Rating</TableHead>
            <TableHead className={`text-right ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id} className={`border-b transition ${isDarkMode ? 'border-slate-700/50 hover:bg-slate-800/30' : 'border-gray-200 hover:bg-gray-100'}`}>
              <TableCell className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{provider.name}</TableCell>
              <TableCell className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{provider.email}</TableCell>
              <TableCell className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{formatPhoneNumber(provider.phone)}</TableCell>
              <TableCell>
                <Badge
                  variant={provider.status === 'active' ? 'default' : 'secondary'}
                >
                  {provider.status}
                </Badge>
              </TableCell>
              <TableCell className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{provider.total_jobs_completed}</TableCell>
              <TableCell>
                <div className={`flex items-center gap-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(provider)}
                  className={isDarkMode ? 'border-slate-600/50 text-slate-300 hover:bg-slate-700/50' : 'border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400'}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(provider)}
                  className={isDarkMode ? 'border-slate-600/50 text-red-400 hover:bg-slate-700/50' : 'border-gray-300 text-red-600 hover:bg-red-50 hover:border-red-300'}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
