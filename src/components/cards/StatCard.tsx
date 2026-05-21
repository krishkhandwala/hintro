'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  isLoading?: boolean;
}

export const StatCard = ({ label, value, icon, trend, isLoading }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{label}</CardTitle>
      {icon && <div className="text-gray-400">{icon}</div>}
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <>
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-16" />
        </>
      ) : (
        <>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {trend && (
            <p
              className={`text-xs font-medium mt-1 ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </>
      )}
    </CardContent>
  </Card>
);
