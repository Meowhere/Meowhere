'use client';

import { BASE_URL } from '@/src/constants/api';
import { ActivityFormData } from '@/src/types/activity.types';

const activityFormData: ActivityFormData = {
  userId: 1899,
  title: '함께 놀러가요 롯데월드',
  category: '투어',
  description: '둠칫 둠칫 두둠칫',
  address: '서울특별시 강남구 테헤란로 427',
  price: 10000,
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
  subImageUrls: [
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
  ],
};

function CreateActivity() {
  const postActivity = async () => {
    const res = await fetch(`${BASE_URL}/api/activities`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(activityFormData),
    });
    return res.json();
  };

  const handlePostActivity = async () => {
    const data = await postActivity();
    console.log(data);
  };
  return (
    <div>
      <button
        className='m-2 p-1 bg-primary-300 text-white'
        onClick={handlePostActivity}
      >
        POST
      </button>
    </div>
  );
}

export default CreateActivity;
