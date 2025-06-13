// hooks/useMyInfoQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../services/userService';

export const useMyInfoQuery = () =>
  useQuery({
    queryKey: ['my-info'],
    queryFn: getMe,
    staleTime: 1000 * 60, // 등등
  });
