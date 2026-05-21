import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { UserProfile } from '@/types';

export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey: QUERY_KEYS.PROFILE,
    queryFn: () => apiClient.getProfile(),
  });
};
