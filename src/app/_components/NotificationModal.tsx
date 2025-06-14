import CloseButton from '@/src/components/common/buttons/CloseButton';
import formatRelativeTime from '@/src/lib/formatRelativeTime';

export default function NotificationModal({ data }: { data: any }) {
  const notifications = data.notifications;
  const totalCount = data.totalCount;
  const cursorId = data.cursorId;

  return (
    <div>
      <h2 className='text-2xl font-semibold text-gray-800 mb-[48px]'>{totalCount}개의 알림</h2>
      <ul className='flex flex-col gap-[24px]'>
        {notifications.map(
          ({ id, content, createdAt }: { id: number; content: string; createdAt: string }) => (
            <>
              <li key={id} className='flex flex-col gap-[12px] relative'>
                <div
                  className={`${content.includes('승인') ? 'bg-blue-100 text-blue-200' : 'bg-red-100 text-red-300'} flex items-center justify-center rounded-full px-[10px] py-[6px] w-fit h-fit`}
                >
                  <span className='leading-none text-xs font-medium'>
                    {content.includes('승인') ? '예약 승인' : '예약 거절'}
                  </span>
                </div>
                <div className='flex flex-col gap-[12px] ml-[4px]'>
                  <p className='text-md font-regular text-gray-800'>{content}</p>
                  <span className='text-sm font-regular text-gray-400 leading-none'>
                    {formatRelativeTime(createdAt)}
                  </span>
                </div>
                <CloseButton className='absolute top-0 right-0' />
              </li>
              <hr className='border-gray-200 last:hidden' />
            </>
          )
        )}
      </ul>
    </div>
  );
}

// {
//   cursorId: 0,
//   notifications: [
//     {
//       id: 1,
//       teamId: 'string',
//       userId: 0,
//       content: '무슨무슨 알림이 승인되었습니다',
//       createdAt: '2025-06-14T06:04:32.504Z',
//       updatedAt: '2025-06-14T06:04:32.504Z',
//       deletedAt: '2025-06-14T06:04:32.504Z',
//     },
//     {
//       id: 2,
//       teamId: 'string',
//       userId: 0,
//       content: '무슨무슨 알림이 거절되었습니다',
//       createdAt: '2025-06-14T06:14:32.504Z',
//       updatedAt: '2025-06-14T06:14:32.504Z',
//       deletedAt: '2025-06-14T06:14:32.504Z',
//     },
//   ],
//   totalCount: 2,
// }
