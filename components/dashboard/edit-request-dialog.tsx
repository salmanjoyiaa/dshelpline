'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import {
  ServiceRequest,
  ServiceProvider,
  VALID_STATUS_TRANSITIONS,
} from '@/lib/types';
import { requestEditSchema, type RequestEditFormData } from '@/lib/validators';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';

interface EditRequestDialogProps {
  request: ServiceRequest | null;
  providers: ServiceProvider[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function EditRequestDialog({
  request,
  providers,
  open,
  onOpenChange,
  onSuccess,
  onError,
}: EditRequestDialogProps) {
  const supabase = createClient();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<RequestEditFormData>({
    resolver: zodResolver(requestEditSchema),
    mode: 'onBlur',
    values: {
      status: (request?.status || 'pending') as RequestEditFormData['status'],
      assigned_provider_id: request?.assigned_provider_id || undefined,
    },
  });

  useEffect(() => {
    if (request) {
      reset({
        status: request.status as RequestEditFormData['status'],
        assigned_provider_id: request.assigned_provider_id || undefined,
      });
    }
  }, [request, reset]);

  const status = watch('status');
  const assignedProviderId = watch('assigned_provider_id');

  const onSubmit = async (data: RequestEditFormData) => {
    if (!request) return;

    setSubmitError(null);

    try {
      // Validate status transition
      const validTransitions = VALID_STATUS_TRANSITIONS[request.status];
      if (!validTransitions.includes(data.status)) {
        throw new Error(
          `Cannot transition from ${request.status} to ${data.status}`
        );
      }

      const res = await fetch('/api/requests/update', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: request.id,
          status: data.status,
          assigned_provider_id: data.assigned_provider_id || null,
        }),
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error || 'Update failed');

      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update request';
      setSubmitError(message);
      onError(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Service Request</DialogTitle>
          <DialogDescription>
            Update the status and assigned provider.
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{submitError}</p>
          </div>
        )}

        {request && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-200 mb-2">
                Customer
              </p>
              <p className="text-sm text-slate-400 mb-4">{request.customer_name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Status *
              </label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setValue('status', value as RequestEditFormData['status'])
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VALID_STATUS_TRANSITIONS[request.status].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400 mt-1">
                Valid transitions from {request.status}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Assigned Provider
              </label>
              <Select
                value={assignedProviderId || ''}
                onValueChange={(value) =>
                  setValue('assigned_provider_id', value || undefined)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select a provider..." />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
