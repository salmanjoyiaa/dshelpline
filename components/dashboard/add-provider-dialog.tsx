'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AddProviderFormData } from '@/lib/types';
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
import { AlertCircle, Plus, Loader2 } from 'lucide-react';
import { isValidEmail, isValidPhoneNumber } from '@/lib/utils';

interface AddProviderDialogProps {
  organizationId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function AddProviderDialog({
  organizationId,
  onSuccess,
  onError,
}: AddProviderDialogProps) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddProviderFormData>({
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const { error: insertError } = await supabase
        .from('service_providers')
        .insert([
          {
            organization_id: organizationId,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            status: 'active',
            total_jobs_completed: 0,
            rating: 0,
          },
        ]);

      if (insertError) throw insertError;

      setFormData({
        name: '',
        phone: '',
        email: '',
      });
      setOpen(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create provider';
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
          Add New Provider
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Service Provider</DialogTitle>
          <DialogDescription>
            Register a new service provider to your organization.
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
                  Adding...
                </>
              ) : (
                'Add Provider'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
