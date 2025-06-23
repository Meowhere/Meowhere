import CloseButton from '@/src/components/common/buttons/CloseButton';
import formatRelativeTime from '@/src/lib/formatRelativeTime';
import { NotificationItem } from '@/src/types/notification.types';
import { useNotifications, useDeleteNotification } from '@/src/hooks/useNotifications';

export default function NotificationModal() {
  const { data: notificationData, isLoading, error } = useNotifications();
  const deleteNotification = useDeleteNotification();

  const handleDeleteNotification = (id: number) => {
    deleteNotification.mutate(id);
  };

  return (
    <div className='lg:h-[380px] h-full overflow-y-scroll'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
        </div>
      ) : error ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <p className='text-gray-500 dark:text-gray-400'>알림을 불러올 수 없어요</p>
        </div>
      ) : notificationData?.totalCount && notificationData?.totalCount > 0 ? (
        <>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-[48px]'>
            {notificationData?.totalCount}개의 알림
          </h2>
          <ul className='flex flex-col gap-[24px]'>
            {notificationData?.notifications?.map(
              ({ id, content, createdAt }: NotificationItem) => (
                <li
                  key={id}
                  className='flex flex-col gap-[12px] pb-[24px] relative border-b last:border-b-0 border-gray-100 dark:border-gray-800'
                >
                  <div
                    className={`${content.includes('승인') ? 'bg-blue-100 dark:bg-dark-blue-200 text-blue-200 dark:text-dark-blue-100' : 'bg-red-100 dark:bg-dark-red-200 text-red-300 dark:text-dark-red-100'} flex items-center justify-center rounded-full px-[10px] py-[6px] w-fit h-fit`}
                  >
                    <span className='leading-none text-xs font-medium'>
                      {/* API에 기능 없어서 직접 구현... */}
                      {content.includes('승인') ? '예약 승인' : '예약 거절'}
                    </span>
                  </div>
                  <div className='flex flex-col gap-[12px] ml-[4px]'>
                    <p className='text-md font-regular text-gray-800 dark:text-gray-200 break-keep'>
                      {content}
                    </p>
                    <span className='text-sm font-regular text-gray-400 dark:text-gray-500 leading-none'>
                      {formatRelativeTime(createdAt)}
                    </span>
                  </div>
                  <CloseButton
                    className='absolute top-[-8px] right-0 cursor-pointer '
                    onClick={() => handleDeleteNotification(id)}
                  />
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <p className='text-gray-500 dark:text-gray-400'>알림이 없어요</p>
        </div>
      )}
    </div>
  );
}
