import CloseButton from '@/src/components/common/buttons/CloseButton';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import formatRelativeTime from '@/src/lib/formatRelativeTime';
import { Notification, NotificationItem } from '@/src/types/notification.types';
import { useEffect, useState } from 'react';

export default function NotificationModal() {
  const [notificationData, setNotificationData] = useState<Notification | null>(null);

  const fetchNotificationData = async () => {
    const data = await fetchFromClient('/my-notifications');
    const jsonData = (await data.json()) as Notification;
    console.log(jsonData);
    setNotificationData(jsonData);
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  return (
    <div className='h-[380px] overflow-y-scroll'>
      {notificationData?.totalCount && notificationData?.totalCount > 0 ? (
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
                      onClick={async () => {
                        await fetchFromClient(`my-notifications/${id}`, { method: 'DELETE' });
                        await fetchNotificationData();
                      }}
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
