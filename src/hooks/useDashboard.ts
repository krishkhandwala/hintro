import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { DashboardData } from '@/types';

export const useDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: () => apiClient.getDashboard(),
  });
};
