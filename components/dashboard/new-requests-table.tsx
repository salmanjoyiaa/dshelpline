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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { Trash2, Edit2 } from 'lucide-react';

interface RequestsTableProps {
  requests: (ServiceRequest & { service_providers?: ServiceProvider | null })[];
  onEdit: (request: ServiceRequest) => void;
  onDelete: (request: ServiceRequest) => void;
  loading?: boolean;
  isDarkMode?: boolean;
}

export function RequestsTable({
  requests,
  onEdit,
  onDelete,
  loading = false,
  isDarkMode = true,
}: RequestsTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-12 rounded animate-pulse ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No requests found</p>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg overflow-x-auto ${isDarkMode ? 'border-slate-700/50 bg-slate-800/20' : 'border-gray-300 bg-gray-50'}`}>
      <Table>
        <TableHeader>
          <TableRow className={`border-b ${isDarkMode ? 'border-slate-700/50 hover:bg-slate-800/30' : 'border-gray-200 hover:bg-gray-100'}`}>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Customer</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Address</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Problem</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Status</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Provider</TableHead>
            <TableHead className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Date</TableHead>
            <TableHead className={`text-right ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} className={`border-b transition ${isDarkMode ? 'border-slate-700/50 hover:bg-slate-800/30' : 'border-gray-200 hover:bg-gray-100'}`}>
              <TableCell className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{request.customer_name}</TableCell>
              <TableCell className={`max-w-xs truncate ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {request.customer_address}
              </TableCell>
              <TableCell className={`max-w-xs truncate ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {request.problem_description}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusLabel(request.status)}
                </Badge>
              </TableCell>
              <TableCell className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>
                {request.service_providers?.name || '-'}
              </TableCell>
              <TableCell className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{formatDate(request.created_at)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(request)}
                  className={isDarkMode ? 'border-slate-600/50 text-slate-300 hover:bg-slate-700/50' : 'border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400'}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(request)}
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
