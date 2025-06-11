// hooks/useMyInfoQuery.ts
import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { User } from '../types/user.types';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: async () => {
      const res = await fetchFromClient('users/me');
      const data = await res.json();
      return data as User;
    },
    staleTime: 1000 * 60, // 1분 (원하는대로)
  });
};
