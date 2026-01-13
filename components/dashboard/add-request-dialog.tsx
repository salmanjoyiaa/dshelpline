'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { ServiceProvider } from '@/lib/types';
import { requestSchema, type RequestFormData } from '@/lib/validators';
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    mode: 'onBlur',
  });

  const assignedProviderId = watch('assigned_provider_id');

  const onSubmit = async (data: RequestFormData) => {
    setSubmitError(null);

    try {
      const { error: insertError } = await supabase
        .from('service_requests')
        .insert([
          {
            organization_id: organizationId,
            customer_name: data.customer_name,
            customer_phone: data.customer_phone,
            customer_address: data.customer_address,
            problem_description: data.problem_description,
            assigned_provider_id: data.assigned_provider_id || null,
            status: 'pending',
          },
        ]);

      if (insertError) throw insertError;

      reset();
      setOpen(false);
      onSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create request';
      setSubmitError(message);
      onError(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
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

        {submitError && (
          <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Customer Name"
            placeholder="John Doe"
            error={errors.customer_name}
            required
            disabled={isSubmitting}
            {...register('customer_name')}
          />

          <FormField
            label="Phone Number"
            placeholder="555-1234"
            error={errors.customer_phone}
            required
            disabled={isSubmitting}
            {...register('customer_phone')}
          />

          <FormField
            label="Address"
            placeholder="123 Main St, City, State"
            error={errors.customer_address}
            required
            disabled={isSubmitting}
            {...register('customer_address')}
          />

          <FormField
            label="Problem Description"
            placeholder="Describe the issue..."
            error={errors.problem_description}
            required
            disabled={isSubmitting}
            {...register('problem_description')}
          />

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Assign Provider <span className="text-slate-400">(Optional)</span>
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
              onClick={() => setOpen(false)}
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
