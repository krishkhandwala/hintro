'use client';

import { Badge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton';
import { SubscriptionPlan } from '@/types';
import { formatDate } from '@/utils/formatting';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isLoading?: boolean;
}

export const SubscriptionCard = ({ plan, isLoading }: SubscriptionCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <CardTitle>Subscription Plan</CardTitle>
      <Badge className="h-5 w-5 text-amber-600" />
    </CardHeader>
    <CardContent className="mt-0">
      {isLoading ? (
        <>
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-4 w-48" />
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-900 capitalize">{plan.name}</p>
          <p className="mt-2 text-sm text-gray-600">
            Expires on {formatDate(plan.expiresAt)}
          </p>
          <div className="mt-4 inline-block">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                plan.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              {plan.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);
