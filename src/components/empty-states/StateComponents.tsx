'use client';

import { AlertCircle, Loader } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <Card className="border-red-200 bg-red-50">
    <CardContent className="mt-0">
      <div className="flex items-start gap-4">
        <AlertCircle className="mt-1 h-5 w-5 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900">Error loading data</h3>
          <p className="mt-1 text-sm text-red-800">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const LoadingState = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader className="mx-auto h-8 w-8 animate-spin text-blue-600" />
      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </div>
  </div>
);
