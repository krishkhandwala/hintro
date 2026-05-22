'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { QUERY_KEYS, DEMO_USERS } from '@/constants';

interface UserContextType {
  userId: string;
  switchUser: (userId: string) => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>(DEMO_USERS.POPULATED);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const switchUser = async (newUserId: string) => {
    if (newUserId === userId) return;

    setIsLoading(true);
    try {
      // Update API client
      apiClient.setUserId(newUserId);

      // Invalidate all queries
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROFILE],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DASHBOARD],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CALL_STATS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CALL_SESSIONS],
      });

      setUserId(newUserId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userId, switchUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
