import React from 'react';
import { Form } from '../shared/Form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const issueSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  region: z.string().min(1, 'Region is required'),
  zone: z.string().min(1, 'Zone is required'),
  woreda: z.string().min(1, 'Woreda is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type IssueFormData = z.infer<typeof issueSchema>;

interface IssueFormProps {
  initialData?: Partial<IssueFormData>;
  onSubmit: (data: IssueFormData) => void;
  isSubmitting?: boolean;
}

export function IssueForm({ initialData, onSubmit, isSubmitting }: IssueFormProps) {
  return (
    <Form
      schema={issueSchema}
      defaultValues={initialData || { priority: 'medium' }}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitLabel={initialData ? 'Update Issue' : 'Report Issue'}
    >
      {(methods) => (
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              {...methods.register('title')}
              placeholder="e.g., Broken Water Pipe in Bole"
            />
            {(methods.formState.errors as any).title && (
              <p className="text-xs text-destructive">{(methods.formState.errors as any).title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              {...methods.register('description')}
              placeholder="Provide as much detail as possible about the issue..."
              className="min-h-[100px]"
            />
            {(methods.formState.errors as any).description && (
              <p className="text-xs text-destructive">{(methods.formState.errors as any).description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => methods.setValue('category', value)}
                defaultValue={methods.getValues('category')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water">Water & Sanitation</SelectItem>
                  <SelectItem value="roads">Roads & Transport</SelectItem>
                  <SelectItem value="electricity">Electricity & Power</SelectItem>
                  <SelectItem value="garbage">Waste Management</SelectItem>
                  <SelectItem value="drainage">Drainage System</SelectItem>
                </SelectContent>
              </Select>
              {(methods.formState.errors as any).category && (
                <p className="text-xs text-destructive">{(methods.formState.errors as any).category.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                onValueChange={(value) => methods.setValue('priority', value as any)}
                defaultValue={methods.getValues('priority')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              {(methods.formState.errors as any).priority && (
                <p className="text-xs text-destructive">{(methods.formState.errors as any).priority.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="region">Region</Label>
              <Input id="region" {...methods.register('region')} placeholder="Region" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zone">Zone</Label>
              <Input id="zone" {...methods.register('zone')} placeholder="Zone" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="woreda">Woreda</Label>
              <Input id="woreda" {...methods.register('woreda')} placeholder="Woreda" />
            </div>
          </div>
        </div>
      )}
    </Form>
  );
}
