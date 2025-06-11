import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { User } from '@/src/types/user.types';

type UpdateMyInfoPayload = {
  nickname?: string;
  newPassword?: string;
  profileImageUrl?: string;
};

export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateMyInfoPayload) => {
      const res = await fetchFromClient('users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error: ${res.status}`);
      }
      const data = await res.json();
      return data as User;
    },
    onSuccess: () => {
      // 내 정보 쿼리 무효화(갱신)
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
    },
  });
};
