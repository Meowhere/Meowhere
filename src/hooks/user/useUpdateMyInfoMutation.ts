// hooks/useUpdateMyInfoMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchMe } from '../../services/userService';

export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
    },
  });
};
