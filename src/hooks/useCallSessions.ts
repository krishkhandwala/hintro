import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { CallSession, CallSessionStats } from '@/types';

export const useCallStats = () => {
  return useQuery<CallSessionStats>({
    queryKey: QUERY_KEYS.CALL_STATS,
    queryFn: () => apiClient.getCallStats(),
  });
};

export const useCallSessions = (limit: number = 10) => {
  return useQuery<CallSession[]>({
    queryKey: [QUERY_KEYS.CALL_SESSIONS, limit],
    queryFn: () => apiClient.getCallSessions(limit),
  });
};
