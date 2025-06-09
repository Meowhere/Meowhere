'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ExperienceImageViewer from './components/experience/ExperienceImageViewer';
import ExperienceSummarySection from './components/experience/ExperienceSummarySection';
import Divider from './components/common/Divider';
import SectionTitle from './components/common/SectionTItle';
import ExperienceLocationMap from './components/experience/ExperienceLocationMap';
import ReservationBox from './components/reservation/ReservationBox';
import { useRouter } from 'next/navigation';
import { useGnbStore } from '@/src/store/gnbStore';
import ExperienceDescription from './components/experience/ExperienceDescription';
import ReviewSection from './components/review/ReviewSection';
import { dummyReviews } from './data/dummyReviews';
import { useModal } from '@/src/hooks/useModal';
import { getSatisfactionLabel } from '@/src/utils/getSatisfactionLabel';

const dummyExperience = {
  id: 7,
  title: '함께 배우면 즐거운 스트릿댄스',
  description:
    '안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.',
  category: '투어',
  price: 10000,
  address: '서울특별시 강남구 테헤란로 427',
  bannerImageUrl: '/assets/icons/test/img-main.jpg',
  subImages: [
    { id: 1, imageUrl: '/assets/icons/test/img-sub1.jpg' },
    { id: 2, imageUrl: '/assets/icons/test/img-sub2.jpg' },
    { id: 3, imageUrl: '/assets/icons/test/img-sub3.jpg' },
  ],
  totalCount: 1300,
  averageRating: 4.74,
};

export default function ExperienceDetailPage() {
  // const { id } = useParams();
  const router = useRouter();
  const { setTitle, setSubtitle } = useGnbStore();
  const { openReviewListModal } = useModal();

  // 예약 상태 정의
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [count, setCount] = useState(1);

  // 더미 데이터
  const pricePerPerson = 23000;
  const availableTimes = ['오후 2:00 ~ 오후 3:30', '오후 4:00 ~ 오후 5:30'];

  // 예약 시 실행될 함수 (임시 콘솔)
  const handleReserve = () => {
    console.log('예약 정보:', { date, time, count });
  };

  return (
    <main className='min-h-screen pt-[56px] px-[24px]'>
      <div className='max-w-4xl mx-auto'>
        <ExperienceImageViewer
          bannerImageUrl={dummyExperience.bannerImageUrl}
          subImages={dummyExperience.subImages}
        />
        <ExperienceSummarySection
          title={dummyExperience.title}
          rating={dummyExperience.averageRating.toFixed(1)}
          reviewCount={dummyExperience.totalCount}
          address={dummyExperience.address}
        />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto'>
        <SectionTitle title='만나는 곳' subtitle={dummyExperience.address} />
        <ExperienceLocationMap address={dummyExperience.address} />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto'>
        <SectionTitle title='체험 설명' />
        <ExperienceDescription description={dummyExperience.description} />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto'>
        <SectionTitle title='후기' />
        <ReviewSection
          rating={dummyExperience.averageRating}
          reviewCount={dummyExperience.totalCount}
          reviews={dummyReviews}
          onOpenModal={() =>
            openReviewListModal({
              activityId: dummyExperience.id,
              rating: dummyExperience.averageRating,
              reviewCount: dummyExperience.totalCount,
              satisfactionLabel: getSatisfactionLabel(dummyExperience.averageRating),
            })
          }
        />
      </div>

      <ReservationBox
        state={{ date, time, count }}
        onDateChange={setDate}
        onTimeChange={setTime}
        onCountChange={setCount}
        onReserve={handleReserve}
        availableTimes={availableTimes}
        pricePerPerson={pricePerPerson}
      />
    </main>
  );
}
