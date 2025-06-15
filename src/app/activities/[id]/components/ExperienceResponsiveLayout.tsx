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
import ScheduleSidebar from './reservation/ScheduleSidebar';
import ScheduleModal from './reservation/ScheduleModal';
import { useGnb } from '@/src/hooks/useGnb';
import HeartButton from '@/src/components/common/buttons/HeartButton';
import { Activity } from '@/src/types/activity.types';
import { Schedule } from '@/src/types/schedule.types';

interface Props {
  activity: Activity;
  schedules: Schedule[];
}

export default function ExperienceResponsiveLayout({ activity, schedules }: Props) {
  const { isDesktop } = useBreakpoint();
  const router = useRouter();

  useGnb({
    title: activity.title,
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
            bannerImageUrl={activity.bannerImageUrl}
            subImages={activity.subImages}
          />

          <Divider />

          <div className='map-trigger-section'>
            <SectionTitle title='만나는 곳' subtitle={activity.address} />
            <ExperienceLocationMap address={activity.address} />
            <Divider />
          </div>

          <SectionTitle title='체험 설명' />
          <ExperienceDescription description={activity.description} />
          <Divider />

          <SectionTitle title='후기' />
          <div className='mt-[8px]'>
            <ReviewSection
              activityId={activity.id}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              reviews={[]}
            />
          </div>
        </div>

        {/* 오른쪽 열 */}
        <div className='w-1/2 relative pt-[180px]'>
          <div className='mb-[48px]'>
            <ExperienceSummarySection
              category={activity.category}
              title={activity.title}
              rating={activity.rating?.toFixed(1) ?? '0.0'}
              reviewCount={activity.reviewCount}
              address={activity.address}
            />
          </div>

          <Divider />

          <div className='mb-[300px]'>
            <ReservationBox pricePerPerson={activity.price} />
          </div>

          <div className='sticky top-[200px] self-start w-[400px]'>
            <ScheduleSidebar price={activity.price} schedules={schedules} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <ExperienceImageViewer
          bannerImageUrl={activity.bannerImageUrl}
          subImages={activity.subImages ?? []}
        />

        <ExperienceSummarySection
          category={activity.category}
          title={activity.title}
          rating={activity.rating?.toFixed(1) ?? '0.0'}
          reviewCount={activity.reviewCount}
          address={activity.address}
        />
        <Divider />
      </div>

      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <SectionTitle title='만나는 곳' subtitle={activity.address} />
        <ExperienceLocationMap address={activity.address} />
        <Divider />
      </div>

      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <SectionTitle title='체험 설명' />
        <ExperienceDescription description={activity.description} />
        <Divider />
      </div>

      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <SectionTitle title='후기' />
        <ReviewSection
          activityId={activity.id}
          rating={activity.rating}
          reviewCount={activity.reviewCount}
          reviews={[]}
        />
      </div>

      <ReservationBox pricePerPerson={activity.price} />
      <ScheduleModal price={activity.price} schedules={schedules} />
    </>
  );
}
