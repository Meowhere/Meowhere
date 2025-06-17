'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useGnb } from '@/src/hooks/useGnb';
import { useUser } from '@/src/hooks/auth/useAuth';
import { useModal } from '@/src/hooks/useModal';

import HeartButton from '@/src/components/common/buttons/HeartButton';
import ActivityDropdown from './common/ActivityDropdown';
import KebabIcon from '@/src/components/common/icons/KebabIcon';
import Divider from './common/Divider';
import SectionTitle from './common/SectionTitle';
import ExperienceImageViewer from './experience/ExperienceImageViewer';
import ExperienceSummarySection from './experience/ExperienceSummarySection';
import ExperienceLocationMap from './experience/ExperienceLocationMap';
import ExperienceDescription from './experience/ExperienceDescription';
import ReviewSection from './review/ReviewSection';
import ReservationBox from './reservation/ReservationBox';
import ScheduleSidebar from './reservation/ScheduleSidebar';

import { DROPDOWN_ITEM_TYPES, POST_ACTION_LABELS } from '@/src/constants/dropdown';
import { deleteActivity } from '@/src/services/myActivityService';

import { Activity } from '@/src/types/activity.types';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import { Review } from '@/src/types/review.type';
import { useToastStore } from '@/src/store/toastStore';

interface Props {
  activity: Activity;
  schedules: ScheduleWithTimes[];
  reviews: Review[];
  reviewStats: {
    rating: number;
    count: number;
  };
}

export default function ExperienceResponsiveLayout({ activity, schedules, reviews }: Props) {
  const { isDesktop } = useBreakpoint();
  const { data: user } = useUser();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { openScheduleModal } = useModal();

  const isOwner = user?.id === activity.userId;

  const dropdownItems = useMemo(
    () => [
      {
        type: DROPDOWN_ITEM_TYPES.BUTTON,
        label: POST_ACTION_LABELS.EDIT,
        onClick: () => router.push(`/activities/edit/${activity.id}`),
      },
      {
        type: DROPDOWN_ITEM_TYPES.BUTTON,
        label: POST_ACTION_LABELS.DELETE,
        isDanger: true,
        onClick: async () => {
          try {
            await deleteActivity(activity.id);
            showToast('success', '삭제되었습니다.');
            router.push('/');
          } catch {
            showToast('error', '삭제에 실패했습니다.');
          }
        },
      },
    ],
    [activity.id, router, showToast]
  );

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
      !isDesktop && isOwner && (
        <div key='kebab-mobile' className='relative'>
          <ActivityDropdown
            dropdownItems={dropdownItems}
            bottomSheetTitle='게시물 관리'
            trigger={<KebabIcon size={24} className='text-[#79747E]' />}
          />
        </div>
      ),
    ].filter(Boolean),
  });

  if (isDesktop) {
    return (
      <div className='flex max-w-[1200px] mx-auto gap-[48px] items-start px-4'>
        <div className='flex-1 flex flex-col gap-[40px]'>
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
              reviews={reviews}
            />
          </div>
        </div>

        <div className='w-1/2 relative pt-[180px]'>
          <div className='mb-[48px] relative'>
            {isOwner && (
              <div className='absolute top-[2px] right-[2px] z-10 cursor-pointer'>
                <ActivityDropdown
                  dropdownItems={dropdownItems}
                  bottomSheetTitle='게시물 관리'
                  trigger={<KebabIcon size={24} className='text-[#79747E]' />}
                />
              </div>
            )}
            <ExperienceSummarySection
              category={activity.category}
              title={activity.title}
              rating={activity.rating?.toFixed(1) ?? '0.0'}
              reviewCount={activity.reviewCount}
              address={activity.address}
            />
          </div>
          <Divider />
          {user && user.id !== activity.userId && (
            <div className='mb-[300px]'>
              <ReservationBox pricePerPerson={activity.price} />
            </div>
          )}
          {user && user.id !== activity.userId && (
            <div className='sticky top-[200px] self-start w-[400px]'>
              <ScheduleSidebar price={activity.price} schedules={schedules} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 모바일 & 태블릿
  return (
    <>
      <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'>
        <ExperienceImageViewer
          bannerImageUrl={activity.bannerImageUrl}
          subImages={activity.subImages}
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
        <div className='mt-[8px]'>
          {reviews.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 text-center text-gray-400'>
              <Image
                src='/assets/icons/logo/ico-empty-view-logo.svg'
                alt='empty icon'
                width={72}
                height={72}
                className='mb-6'
              />
              <p className='text-lg font-semibold text-gray-500'>후기가 없다냥</p>
            </div>
          ) : (
            <ReviewSection
              activityId={activity.id}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              reviews={reviews}
            />
          )}
        </div>
      </div>

      {user && user.id !== activity.userId && (
        <ReservationBox
          pricePerPerson={activity.price}
          onClick={() =>
            openScheduleModal({ price: activity.price, schedules, activityId: activity.id })
          }
        />
      )}
    </>
  );
}
