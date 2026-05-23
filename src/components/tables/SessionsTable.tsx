'use client';

import { CallSession } from '@/types';
import { formatDateTime, formatDuration, formatRelativeTime } from '@/utils/formatting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton';

interface SessionsTableProps {
  sessions: CallSession[];
  isLoading?: boolean;
}

export const SessionsTable = ({ sessions, isLoading }: SessionsTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent className="mt-0">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent className="mt-0">
        {sessions.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-600">No sessions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Duration</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Participants
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    AI Interactions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={session.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'hover:bg-gray-50' : 'bg-white hover:bg-gray-50'} transition-colors`}>
                    <td className="py-4 px-4">
                      <div className="text-gray-900 font-medium">{formatDateTime(session.date)}</div>
                      <div className="text-xs text-gray-600">{formatRelativeTime(session.date)}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 font-medium">
                      {formatDuration(session.duration)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-2">
                        {session.participants.slice(0, 2).map((p) => (
                          <span
                            key={p}
                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {p}
                          </span>
                        ))}
                        {session.participants.length > 2 && (
                          <span className="text-xs text-gray-600 py-1">
                            +{session.participants.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 font-medium">{session.aiInteractions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
