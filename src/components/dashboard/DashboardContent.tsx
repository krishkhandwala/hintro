'use client';

import { useState } from 'react';
import { TrendingUp, Clock, MessageCircle, BookOpen } from 'lucide-react';
import { Sidebar, TopNavbar } from '@/components/layout';
import { FeedbackModal } from '@/components/modals';
import { StatCard, UsageCard, SubscriptionCard } from '@/components/cards';
import { SessionsTable } from '@/components/tables';
import { EmptyState, ErrorState, LoadingState } from '@/components/empty-states';
import { useProfile, useDashboard, useCallStats, useCallSessions } from '@/hooks';
import { formatDuration } from '@/utils/formatting';

export const DashboardContent = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const profileQuery = useProfile();
  const dashboardQuery = useDashboard();
  const statsQuery = useCallStats();
  const sessionsQuery = useCallSessions(10);

  const isLoading =
    profileQuery.isLoading ||
    dashboardQuery.isLoading ||
    statsQuery.isLoading ||
    sessionsQuery.isLoading;

  const hasError =
    profileQuery.isError || dashboardQuery.isError || statsQuery.isError || sessionsQuery.isError;

  if (hasError) {
    return (
      <>
        <Sidebar
          profile={profileQuery.data}
          isLoading={profileQuery.isLoading}
          onFeedbackClick={() => setFeedbackOpen(true)}
        />
        <TopNavbar />
        <div className="lg:ml-64 p-6">
          <ErrorState
            message="Failed to load dashboard data. Please try again."
            onRetry={() => {
              profileQuery.refetch();
              dashboardQuery.refetch();
              statsQuery.refetch();
              sessionsQuery.refetch();
            }}
          />
        </div>
        <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      </>
    );
  }

  const isEmpty = sessionsQuery.data?.length === 0;

  return (
    <>
      <Sidebar
        profile={profileQuery.data}
        isLoading={profileQuery.isLoading}
        onFeedbackClick={() => setFeedbackOpen(true)}
      />
      <TopNavbar />

      <main className="lg:ml-64 p-4 sm:p-6 pb-12">
        {isLoading ? (
          <LoadingState message="Loading your dashboard..." />
        ) : isEmpty ? (
          <div className="space-y-6">
            <EmptyState
              icon={<BookOpen className="h-12 w-12 text-gray-400" />}
              title="No Sessions Yet"
              description="Start a call session to see your activity here"
              action={{
                label: 'Start a Call',
                onClick: () => console.log('Start call'),
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Sessions"
                value={statsQuery.data?.totalSessions ?? 0}
                icon={<TrendingUp className="h-5 w-5" />}
                isLoading={statsQuery.isLoading}
              />
              <StatCard
                label="Average Duration"
                value={
                  statsQuery.data?.averageDuration
                    ? formatDuration(statsQuery.data.averageDuration)
                    : '—'
                }
                icon={<Clock className="h-5 w-5" />}
                isLoading={statsQuery.isLoading}
              />
              <StatCard
                label="AI Interactions"
                value={statsQuery.data?.aiInteractions ?? 0}
                icon={<MessageCircle className="h-5 w-5" />}
                isLoading={statsQuery.isLoading}
              />
              <StatCard
                label="Knowledge Base"
                value={dashboardQuery.data?.knowledgeBase.total ?? 0}
                icon={<BookOpen className="h-5 w-5" />}
                isLoading={dashboardQuery.isLoading}
              />
            </div>

            {/* Subscription and Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SubscriptionCard
                plan={
                  dashboardQuery.data?.subscriptionPlan || {
                    name: 'Free',
                    status: 'active',
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                  }
                }
                isLoading={dashboardQuery.isLoading}
              />
              <UsageCard
                title="API Calls"
                description="Monthly usage"
                used={dashboardQuery.data?.usage.apiCalls ?? 0}
                limit={dashboardQuery.data?.usage.apiCallsLimit ?? 1000}
                isLoading={dashboardQuery.isLoading}
              />
            </div>

            {/* Storage Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UsageCard
                title="Storage"
                description="Data storage usage"
                used={dashboardQuery.data?.usage.storage ?? 0}
                limit={dashboardQuery.data?.usage.storageLimit ?? 1000}
                unit="MB"
                isLoading={dashboardQuery.isLoading}
              />
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vocab Terms</span>
                    <span className="font-semibold text-gray-900">
                      {dashboardQuery.data?.vocabTerms.total ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notes</span>
                    <span className="font-semibold text-gray-900">
                      {dashboardQuery.data?.notes.total ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions Table */}
            <SessionsTable
              sessions={sessionsQuery.data ?? []}
              isLoading={sessionsQuery.isLoading}
            />
          </div>
        )}
      </main>

      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  );
};
