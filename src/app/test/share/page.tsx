import KakaoShareButton from '@/src/components/common/buttons/KakaoShareButton';
import { Activity } from '@/src/types/activity.types';

const dummyExperience: Activity = {
  id: 4554,
  userId: 2003,
  title: '나만의 수제 도장 만들어 보기',
  description:
    '전통과 현대적 감각이 어우러진 나만의 수제 도장을 만들어보는 특별한 공예 체험입니다. 다양한 종류의 돌과 서체를 선택하고, 전문가의 도움을 받아 직접 이름을 새기거나 원하는 문양을 디자인하여 세상에 하나뿐인 도장을 완성합니다. (도장 재료 및 각인 도구 제공, 약 2시간)',
  category: '문화 · 예술',
  price: 39000,
  address: '서울특별시 마포구 어울마당로 100-7',
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/14-1_2003_1749885619478.jpeg',
  rating: 0,
  reviewCount: 0,
  createdAt: '2025-06-14T16:25:46.556Z',
  updatedAt: '2025-06-14T16:25:46.556Z',
  subImageUrls: [],
  schedules: [],
};

export default function KakaoShareTestPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-lg'>
      <div>카카오톡 공유하기</div>
      <div>
        <KakaoShareButton size={40} activity={dummyExperience} />
      </div>
    </div>
  );
}
