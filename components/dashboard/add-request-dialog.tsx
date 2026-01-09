'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ServiceProvider, AddRequestFormData } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Plus, Loader2 } from 'lucide-react';

interface AddRequestDialogProps {
  providers: ServiceProvider[];
  organizationId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function AddRequestDialog({
  providers,
  organizationId,
  onSuccess,
  onError,
}: AddRequestDialogProps) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddRequestFormData>({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    problem_description: '',
    assigned_provider_id: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.customer_name ||
        !formData.customer_phone ||
        !formData.customer_address ||
        !formData.problem_description
      ) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('service_requests')
        .insert([
          {
            organization_id: organizationId,
            customer_name: formData.customer_name,
            customer_phone: formData.customer_phone,
            customer_address: formData.customer_address,
            problem_description: formData.problem_description,
            assigned_provider_id: formData.assigned_provider_id || null,
            status: 'pending',
          },
        ]);

      if (insertError) throw insertError;

      setFormData({
        customer_name: '',
        customer_phone: '',
        customer_address: '',
        problem_description: '',
        assigned_provider_id: undefined,
      });
      setOpen(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create request';
      setError(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Service Request</DialogTitle>
          <DialogDescription>
            Add a new service request and optionally assign it to a provider.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customer_name" className="text-sm font-medium">
              Customer Name *
            </Label>
            <Input
              id="customer_name"
              placeholder="John Doe"
              value={formData.customer_name}
              onChange={(e) =>
                setFormData({ ...formData, customer_name: e.target.value })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="customer_phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="customer_phone"
              placeholder="555-1234"
              value={formData.customer_phone}
              onChange={(e) =>
                setFormData({ ...formData, customer_phone: e.target.value })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="customer_address" className="text-sm font-medium">
              Address *
            </Label>
            <Input
              id="customer_address"
              placeholder="123 Main St, City, State"
              value={formData.customer_address}
              onChange={(e) =>
                setFormData({ ...formData, customer_address: e.target.value })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label
              htmlFor="problem_description"
              className="text-sm font-medium"
            >
              Problem Description *
            </Label>
            <Input
              id="problem_description"
              placeholder="Describe the issue..."
              value={formData.problem_description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  problem_description: e.target.value,
                })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label
              htmlFor="assigned_provider_id"
              className="text-sm font-medium"
            >
              Assign Provider (Optional)
            </Label>
            <Select
              value={formData.assigned_provider_id || ''}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  assigned_provider_id: value || undefined,
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
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Request'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
