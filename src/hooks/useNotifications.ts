import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { Notification } from '@/src/types/notification.types';

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<Notification> => {
      const res = await fetchFromClient('/my-notifications');
      return res.json();
    },
    staleTime: 1000 * 60 * 2, //2분
    gcTime: 1000 * 60 * 5, //5분
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      return await fetchFromClient(`my-notifications/${notificationId}`, {
        method: 'DELETE',
      });
    },
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousData = queryClient.getQueryData(['notifications']); //백업

      queryClient.setQueryData(['notifications'], (oldData: Notification | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          notifications: oldData.notifications.filter(
            (notification) => notification.id !== notificationId
          ),
          totalCount: oldData.totalCount - 1,
        };
      });
      return { previousData };
    },
    onError: (error, notificationId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['notifications'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
