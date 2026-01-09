'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ServiceProvider, EditProviderFormData } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { AlertCircle, Loader2 } from 'lucide-react';
import { isValidEmail, isValidPhoneNumber } from '@/lib/utils';

interface EditProviderDialogProps {
  provider: ServiceProvider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function EditProviderDialog({
  provider,
  open,
  onOpenChange,
  onSuccess,
  onError,
}: EditProviderDialogProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditProviderFormData>({
    name: provider?.name || '',
    phone: provider?.phone || '',
    email: provider?.email || '',
    status: provider?.status || 'active',
  });

  // Update form data when provider changes
  if (
    provider &&
    (formData.name !== provider.name ||
      formData.email !== provider.email ||
      formData.phone !== provider.phone ||
      formData.status !== provider.status)
  ) {
    setFormData({
      name: provider.name,
      phone: provider.phone,
      email: provider.email,
      status: provider.status,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;

    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.phone || !formData.email) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      // Validate email
      if (!isValidEmail(formData.email)) {
        setError('Invalid email address');
        setLoading(false);
        return;
      }

      // Validate phone
      if (!isValidPhoneNumber(formData.phone)) {
        setError('Phone number must be 10 digits');
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('service_providers')
        .update({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', provider.id);

      if (updateError) throw updateError;

      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update provider';
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
          <DialogTitle>Edit Service Provider</DialogTitle>
          <DialogDescription>
            Update the provider's information.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {provider && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="555-1234"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={loading}
                required
              />
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
                    status: value as 'active' | 'inactive',
                  })
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
