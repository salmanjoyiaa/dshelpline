'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  ServiceRequest,
  ServiceProvider,
  EditRequestFormData,
  VALID_STATUS_TRANSITIONS,
} from '@/lib/types';
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
import { Label } from '@/components/ui/label';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditRequestFormData>({
    status: request?.status || 'pending',
    assigned_provider_id: request?.assigned_provider_id || null,
  });

  // Update form data when request changes
  if (request && (formData.status !== request.status || formData.assigned_provider_id !== request.assigned_provider_id)) {
    setFormData({
      status: request.status,
      assigned_provider_id: request.assigned_provider_id,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    setError(null);
    setLoading(true);

    try {
      // Check if status transition is valid
      const validTransitions = VALID_STATUS_TRANSITIONS[request.status];
      if (!validTransitions.includes(formData.status)) {
        setError(
          `Cannot transition from ${request.status} to ${formData.status}`
        );
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('service_requests')
        .update({
          status: formData.status,
          assigned_provider_id: formData.assigned_provider_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', request.id);

      if (updateError) throw updateError;

      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update request';
      setError(message);
      onError(message);
    } finally {
      setLoading(false);
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

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {request && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Customer
              </p>
              <p className="text-sm text-gray-600 mb-4">{request.customer_name}</p>
            </div>

            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as ServiceRequest['status'],
                  })
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VALID_STATUS_TRANSITIONS[request.status].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Valid transitions from {request.status}
              </p>
            </div>

            <div>
              <Label
                htmlFor="assigned_provider_id"
                className="text-sm font-medium"
              >
                Assigned Provider
              </Label>
              <Select
                value={formData.assigned_provider_id || ''}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    assigned_provider_id: value || null,
                  })
                }
                disabled={loading}
              >
                <SelectTrigger>
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
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
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
