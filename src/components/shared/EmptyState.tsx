import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-xl bg-muted/30">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4" variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
