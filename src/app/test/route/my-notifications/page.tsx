import { BASE_URL } from '@/src/constants/api';
import { cookies } from 'next/headers';
import NotificationDeleteTestPage from './NotificationDeleteTest';

async function MyNotificationsTestPage() {
  const cookieStore = await cookies();

  const getMyNotifications = async () => {
    const res = await fetch(`${BASE_URL}/api/my-notifications?size=10`, {
      method: 'GET',
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.json();
  };
  const notificationData = await getMyNotifications();

  return (
    <div>
      <div>My Notification Test Page</div>
      <div className='text-md'>내 알림 목록:</div>
      <NotificationDeleteTestPage />
      <pre>{JSON.stringify(notificationData, null, 2)}</pre>
    </div>
  );
}

export default MyNotificationsTestPage;
