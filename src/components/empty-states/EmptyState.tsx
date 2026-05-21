'use client';

import { FileText, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  icon = <FileText className="h-12 w-12 text-gray-400" />,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <Card className="border-dashed border-2">
    <CardContent className="mt-0">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 max-w-xs">{description}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {action.label}
          </button>
        )}
      </div>
    </CardContent>
  </Card>
);
