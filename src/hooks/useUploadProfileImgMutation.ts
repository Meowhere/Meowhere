import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';

export const useUploadProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetchFromClient('users/me/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
    },
  });
};
