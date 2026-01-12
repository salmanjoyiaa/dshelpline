'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { providerSchema, type ProviderFormData } from '@/lib/validators';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { AlertCircle, Plus, Loader2 } from 'lucide-react';

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
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ProviderFormData) => {
    setApiError(null);

    try {
      const { error: insertError } = await supabase
        .from('service_providers')
        .insert([
          {
            organization_id: organizationId,
            name: data.name,
            phone: data.phone,
            email: data.email,
            status: data.status,
            total_jobs_completed: data.total_jobs_completed,
            rating: data.rating,
          },
        ]);

      if (insertError) throw insertError;

      reset();
      setOpen(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create provider';
      setApiError(message);
      onError(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
          <Plus className="w-4 h-4 mr-2" />
          Add New Provider
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Service Provider</DialogTitle>
          <DialogDescription className="text-slate-400">
            Register a new service provider to your organization.
          </DialogDescription>
        </DialogHeader>

        {apiError && (
          <div className="p-4 bg-red-950/30 border border-red-500/50 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Full Name"
            placeholder="John Doe"
            error={errors.name}
            required
            {...register('name')}
            disabled={isSubmitting}
          />

          <FormField
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errors.email}
            required
            {...register('email')}
            disabled={isSubmitting}
          />

          <FormField
            label="Phone"
            type="tel"
            placeholder="(555) 123-4567"
            error={errors.phone}
            required
            {...register('phone')}
            disabled={isSubmitting}
          />

          <div className="pt-4 flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="border-slate-700 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Provider'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
