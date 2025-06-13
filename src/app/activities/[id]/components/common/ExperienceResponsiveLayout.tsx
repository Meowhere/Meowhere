'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ExperienceImageViewer from '../experience/ExperienceImageViewer';
import ExperienceSummarySection from '../experience/ExperienceSummarySection';
import ReservationBox from '../reservation/ReservationBox';
import Divider from './Divider';
import SectionTitle from './SectionTitle';
import ExperienceLocationMap from '../experience/ExperienceLocationMap';
import ExperienceDescription from '../experience/ExperienceDescription';
import ReviewSection from '../review/ReviewSection';
import { dummyReviews } from '../../data/dummyReviews';

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

  return (
    <>
      {isDesktop ? (
        <div className='flex items-center max-w-[960px] mx-auto mt-[64px] gap-[48px]'>
          <div className='w-[600px]'>
            <ExperienceImageViewer
              bannerImageUrl={dummyExperience.bannerImageUrl}
              subImages={dummyExperience.subImages}
            />
          </div>
          <div className='w-1/2 flex flex-col gap-[8px] text-left'>
            <div className='text-left mb-[48px]'>
              <ExperienceSummarySection
                category={dummyExperience.category}
                title={dummyExperience.title}
                rating={dummyExperience.averageRating.toFixed(1)}
                reviewCount={dummyExperience.totalCount}
                address={dummyExperience.address}
              />
            </div>
            <Divider />
            <ReservationBox pricePerPerson={dummyExperience.price} />
          </div>
        </div>
      ) : (
        <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
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
      )}

      {/* 위치 */}
      <div className='w-full lg:max-w-4xl lg:mx-auto'>
        <SectionTitle title='만나는 곳' subtitle={dummyExperience.address} />
        <ExperienceLocationMap address={dummyExperience.address} />
        <Divider />
      </div>

      {/* 설명 */}
      <div className='w-full lg:max-w-4xl lg:mx-auto'>
        <SectionTitle title='체험 설명' />
        <ExperienceDescription description={dummyExperience.description} />
        <Divider />
      </div>

      {/* 후기 */}
      <div className='w-full lg:max-w-4xl lg:mx-auto'>
        <SectionTitle title='후기' />
        <ReviewSection
          activityId={dummyExperience.id}
          rating={dummyExperience.averageRating}
          reviewCount={dummyExperience.totalCount}
          reviews={dummyReviews}
        />
      </div>

      {/* 예약: 모바일/태블릿에서는 ReservationBox 내부에서 분기됨 */}
      {!isDesktop && <ReservationBox pricePerPerson={dummyExperience.price} />}
    </>
  );
}
