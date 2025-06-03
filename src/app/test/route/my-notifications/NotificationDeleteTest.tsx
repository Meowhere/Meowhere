'use client';

import { BASE_URL } from '@/src/constants/api';

function NotificationDeleteTestPage() {
  const handleDeleteNotification = async (id: number) => {
    const res = await fetch(`${BASE_URL}/api/my-notifications/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button
        className='m-2 p-1 bg-primary-300 text-white'
        onClick={() => handleDeleteNotification(4063)}
      >
        Delete Activity
      </button>
    </div>
  );
}

export default NotificationDeleteTestPage;
