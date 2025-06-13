'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useRouter } from 'next/navigation';
import ExperienceImageViewer from './experience/ExperienceImageViewer';
import ExperienceSummarySection from './experience/ExperienceSummarySection';
import ReservationBox from './reservation/ReservationBox';
import Divider from './common/Divider';
import SectionTitle from './common/SectionTitle';
import ExperienceLocationMap from './experience/ExperienceLocationMap';
import ExperienceDescription from './experience/ExperienceDescription';
import ReviewSection from './review/ReviewSection';
import { dummyReviews } from './../data/dummyReviews';
import ScheduleSidebar from './reservation/ScheduleSidebar';
import { dummySchedule } from './../data/dummySchedule';
import { useGnb } from '@/src/hooks/useGnb';
import HeartButton from '@/src/components/common/buttons/HeartButton';

const dummyExperience = {
  id: 7,
  title:
    '함께 배우면 정말정말정말 즐거운 스트릿 댄스인데 제목을 길게 적으면 어떻게 될 지 한번 테스트를 해보기',
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

export default function ExperienceResponsiveLayout() {
  const { isDesktop } = useBreakpoint();

  const router = useRouter();

  // gnb 하트 찜 기능인 것 같아서 일단 상태 관리 미구현
  useGnb({
    title: dummyExperience.title,
    backAction: () => router.back(),
    rightButtons: [
      <HeartButton
        key='heart'
        isLiked={false}
        onToggle={() => {}}
        variant='black'
        aria-label='찜하기'
      />,
    ],
  });

  if (isDesktop) {
    return (
      <div className='flex max-w-[1200px] mx-auto gap-[48px] items-start'>
        {/* 왼쪽 열 */}
        <div className='w-[960px] flex flex-col gap-[40px]'>
          <ExperienceImageViewer
            bannerImageUrl={dummyExperience.bannerImageUrl}
            subImages={dummyExperience.subImages}
          />

          <div>
            <Divider />
          </div>

          <div className='map-trigger-section'>
            <SectionTitle title='만나는 곳' subtitle={dummyExperience.address} />
            <ExperienceLocationMap address={dummyExperience.address} />
            <Divider />
          </div>

          <div>
            <SectionTitle title='체험 설명' />
            <ExperienceDescription description={dummyExperience.description} />
            <Divider />
          </div>

          <div>
            <SectionTitle title='후기' />
            <div className='mt-[8px]'>
              <ReviewSection
                activityId={dummyExperience.id}
                rating={dummyExperience.averageRating}
                reviewCount={dummyExperience.totalCount}
                reviews={dummyReviews}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽 열 */}
        <div className='w-1/2 relative pt-[180px]'>
          {/* 상단 고정 영역 */}
          <div className='mb-[48px]'>
            <ExperienceSummarySection
              category={dummyExperience.category}
              title={dummyExperience.title}
              rating={dummyExperience.averageRating.toFixed(1)}
              reviewCount={dummyExperience.totalCount}
              address={dummyExperience.address}
            />
          </div>

          <Divider />

          <div className='mb-[300px]'>
            <ReservationBox pricePerPerson={dummyExperience.price} />
          </div>

          <div className='sticky top-[200px] self-start w-[400px]'>
            <ScheduleSidebar price={dummyExperience.price} schedules={dummySchedule.schedules} />
          </div>
        </div>
      </div>
    );
  }

  // 모바일/태블릿 레이아웃
  return (
    <>
      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <ExperienceImageViewer
          bannerImageUrl={dummyExperience.bannerImageUrl}
          subImages={dummyExperience.subImages}
        />
        <ExperienceSummarySection
          category={dummyExperience.category}
          title={dummyExperience.title}
          rating={dummyExperience.averageRating.toFixed(1)}
          reviewCount={dummyExperience.totalCount}
          address={dummyExperience.address}
        />
        <Divider />
      </div>

      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <SectionTitle title='만나는 곳' subtitle={dummyExperience.address} />
        <ExperienceLocationMap address={dummyExperience.address} />
        <Divider />
      </div>

      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <SectionTitle title='체험 설명' />
        <ExperienceDescription description={dummyExperience.description} />
        <Divider />
      </div>

      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <SectionTitle title='후기' />
        <ReviewSection
          activityId={dummyExperience.id}
          rating={dummyExperience.averageRating}
          reviewCount={dummyExperience.totalCount}
          reviews={dummyReviews}
        />
      </div>

      {/* 모바일/태블릿 전용 예약 UI */}
      <ReservationBox pricePerPerson={dummyExperience.price} />
    </>
  );
}
