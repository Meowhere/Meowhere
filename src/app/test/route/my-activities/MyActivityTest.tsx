'use client';
import { BASE_URL } from '@/src/constants/api';
import { useState } from 'react';

const UpdateActivityForm = {
  title: '체험 수정 222',
  category: '문화 · 예술',
  description: 'string',
  price: 123456,
  address: 'string',
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
  subImageIdsToRemove: [],
  subImageUrlsToAdd: [],
  scheduleIdsToRemove: [],
  schedulesToAdd: [],
};

function MyActivityTest() {
  const activityId = 4236;
  const reservationId = 6742;
  const [status, setStatus] = useState('pending');

  const handleChangeStatus = async (newStatus: string) => {
    setStatus(newStatus);

    const body = {
      status: status,
    };

    const res = await fetch(
      `${BASE_URL}/api/my-activities/${activityId}/reservations/${reservationId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const handleDeleteActivity = async (activityId: number) => {
    const res = await fetch(`${BASE_URL}/api/my-activities/${activityId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log(data);
  };

  const handlePatchActivity = async (activityId: number) => {
    const res = await fetch(`${BASE_URL}/api/my-activities/${activityId}`, {
      method: 'PATCH',
      body: JSON.stringify(UpdateActivityForm),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className='flex gap-2'>
      <button
        className='m-2 p-1 bg-primary-300 text-white'
        onClick={() => handleChangeStatus('declined')}
      >
        Declined
      </button>
      <button
        className='m-2 p-1 bg-primary-300 text-white'
        onClick={() => handleDeleteActivity(4217)}
      >
        Delete Activity
      </button>
      <button
        className='m-2 p-1 bg-primary-300 text-white'
        onClick={() => handlePatchActivity(4243)}
      >
        Patch Activity
      </button>
    </div>
  );
}

export default MyActivityTest;
