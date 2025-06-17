import CloseButton from '@/src/components/common/buttons/CloseButton';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import formatRelativeTime from '@/src/lib/formatRelativeTime';
import { Notification, NotificationItem } from '@/src/types/notification.types';
import { useEffect, useState } from 'react';

export default function NotificationModal() {
  const [notificationData, setNotificationData] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotificationData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchFromClient('/my-notifications');
      const jsonData = (await data.json()) as Notification;
      console.log(jsonData);
      setNotificationData(jsonData);
    } catch (error) {
      console.error('알림 로딩실패', error);
      setError('알림을 불러올 수 없어요');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await fetchFromClient(`my-notifications/${id}`, { method: 'DELETE' });

      setNotificationData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          notifications: prev.notifications.filter((notification) => notification.id !== id),
          totalCount: prev.totalCount - 1,
        };
      });
    } catch (error) {
      console.error('알림 삭제 실패:', error);
      fetchNotificationData();
    }
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  return (
    <div className='h-[380px] overflow-y-scroll'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
        </div>
      ) : error ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <p className='text-gray-500 dark:text-gray-400'>{error}</p>
        </div>
      ) : notificationData?.totalCount && notificationData?.totalCount > 0 ? (
        <>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-[48px]'>
            {notificationData?.totalCount}개의 알림
          </h2>
          <ul className='flex flex-col gap-[24px]'>
            {notificationData?.notifications?.map(
              ({ id, content, createdAt }: NotificationItem) => (
                <div key={id}>
                  <li className='flex flex-col gap-[12px] relative'>
                    <div
                      className={`${content.includes('승인') ? 'bg-blue-100 dark:bg-dark-blue-200 text-dark-blue-100' : 'bg-red-100 dark:bg-dark-red-200 text-dark-red-100'} flex items-center justify-center rounded-full px-[10px] py-[6px] w-fit h-fit`}
                    >
                      <span className='leading-none text-xs font-medium'>
                        {/* API에 기능 없어서 직접 구현... */}
                        {content.includes('승인') ? '예약 승인' : '예약 거절'}
                      </span>
                    </div>
                    <div className='flex flex-col gap-[12px] ml-[4px]'>
                      <p className='text-md font-regular text-gray-800 dark:text-gray-200'>
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
                  <hr className='border-gray-200 dark:border-gray-700 last:hidden' />
                </div>
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
