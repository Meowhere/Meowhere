'use client';

import { BASE_URL } from '@/src/constants/api';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { ActivityFormData } from '@/src/types/activity.types';
import { useState } from 'react';

const activityFormData: ActivityFormData = {
  title: '테스트 데이터',
  category: '투어',
  description: '둠칫 둠칫 두둠칫',
  address: '서울특별시 강남구 테헤란로 427',
  price: 10000,
  schedules: [
    {
      date: '2026-12-01',
      startTime: '12:00',
      endTime: '19:00',
    },
    {
      date: '2026-12-05',
      startTime: '12:00',
      endTime: '18:00',
    },
    {
      date: '2025-12-05',
      startTime: '13:00',
      endTime: '17:00',
    },
    {
      date: '2023-12-05',
      startTime: '14:00',
      endTime: '15:00',
    },
  ],
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
  subImageUrls: [
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
  ],
};

const scheduleFormData = {
  scheduleId: 17335,
  headCount: 10,
};

function CreateActivity() {
  // 체험 등록 테스트
  const handlePostActivity = async () => {
    const res = await fetchFromClient(`/activities`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(activityFormData),
    });
    const data = await res.json();
    console.log(data);
  };
  // 체험 예약 등록 테스트
  const handlePostReservation = async (id: number) => {
    const res = await fetch(`${BASE_URL}/api/activities/${id}/reservations`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(scheduleFormData),
    });
    const data = await res.json();
    console.log(data);
  };
  // 이미지 등록 테스트
  const [imageFile, setImageFile] = useState<File>();
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log('선택된 파일:', file.name);
      console.log('파일 크기:', file.size, '바이트');
      console.log('파일 타입:', file.type);
      setImageFile(file);
    } else {
      console.log('선택된 파일 없음');
    }
  };
  const handlePostImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('업로드할 파일을 먼저 선택해주세요.');
      console.error('업로드할 파일이 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await fetch(`${BASE_URL}/api/activities/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className='flex gap-2 items-center'>
      <button className='m-2 p-1 bg-primary-300 text-white' onClick={handlePostActivity}>
        POST Activity
      </button>
      <button
        className='m-2 p-1 bg-primary-300 text-white'
        onClick={() => handlePostReservation(4236)}
      >
        POST Reservation
      </button>
      <form onSubmit={handlePostImage}>
        <input
          type='file'
          accept='image/*' // 이미지 파일만 선택 가능
          onChange={handleFileChange}
        />
        <button className='m-2 p-1 bg-primary-300 text-white' type='submit'>
          POST Image
        </button>
      </form>
    </div>
  );
}

export default CreateActivity;
