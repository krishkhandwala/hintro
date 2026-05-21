'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatPercentage } from '@/utils/formatting';

interface UsageCardProps {
  title: string;
  description: string;
  used: number;
  limit: number;
  unit?: string;
  isLoading?: boolean;
}

export const UsageCard = ({
  title,
  description,
  used,
  limit,
  unit = '',
  isLoading,
}: UsageCardProps) => {
  const percentage = formatPercentage(used, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-0">
        {isLoading ? (
          <>
            <Skeleton className="h-2 w-full mb-2" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <div className="mb-3">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {used}
              {unit && ` ${unit}`} / {limit}
              {unit && ` ${unit}`}
              <span className="ml-2 font-semibold text-gray-900">({percentage}%)</span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};
