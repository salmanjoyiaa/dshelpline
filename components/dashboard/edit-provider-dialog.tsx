'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { ServiceProvider } from '@/lib/types';
import { providerEditSchema, type ProviderEditFormData } from '@/lib/validators';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';

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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<ProviderEditFormData>({
    resolver: zodResolver(providerEditSchema),
    mode: 'onBlur',
    values: {
      name: provider?.name || '',
      email: provider?.email || '',
      phone: provider?.phone || '',
      status: provider?.status || 'active',
    },
  });

  useEffect(() => {
    if (provider) {
      reset({
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        status: provider.status,
      });
    }
  }, [provider, reset]);

  const status = watch('status');

  const onSubmit = async (data: ProviderEditFormData) => {
    if (!provider) return;

    setSubmitError(null);

    try {
      const { error: updateError } = await supabase
        .from('service_providers')
        .update({
          name: data.name,
          phone: data.phone,
          email: data.email,
          status: data.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', provider.id);

      if (updateError) throw updateError;

      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update provider';
      setSubmitError(message);
      onError(message);
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

        {submitError && (
          <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{submitError}</p>
          </div>
        )}

        {provider && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Full Name"
              error={errors.name}
              required
            >
              <input
                {...register('name')}
                placeholder="John Doe"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              label="Email"
              error={errors.email}
              required
            >
              <input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              label="Phone Number"
              error={errors.phone}
              required
            >
              <input
                {...register('phone')}
                placeholder="555-1234"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                disabled={isSubmitting}
              />
            </FormField>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Status *
              </label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setValue('status', value as ProviderEditFormData['status'])
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
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
