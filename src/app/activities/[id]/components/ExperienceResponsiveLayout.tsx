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
import { useGnb } from '@/src/hooks/useGnb';
import HeartButton from '@/src/components/common/buttons/HeartButton';
import { Activity } from '@/src/types/activity.types';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import { useModal } from '@/src/hooks/useModal';
import { Review } from '@/src/types/review.type';
import { useUser } from '@/src/hooks/auth/useAuth';
import { deleteActivity } from '@/src/services/myActivityService';
import { useToastStore } from '@/src/store/toastStore';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import KebabIcon from '@/src/components/common/icons/KebabIcon';
import { useState } from 'react';
import { DROPDOWN_ITEM_TYPES, POST_ACTION_LABELS } from '@/src/constants/dropdown';

interface Props {
  activity: Activity;
  schedules: ScheduleWithTimes[];
  reviews: Review[];
  reviewStats: {
    rating: number;
    count: number;
  };
}

export default function ExperienceResponsiveLayout({
  activity,
  schedules,
  reviews,
  reviewStats,
}: Props) {
  const { isDesktop } = useBreakpoint();
  const { openScheduleModal } = useModal();
  const router = useRouter();
  const { data: user } = useUser();
  const isOwner = user && user.id === activity.userId;
  const { showToast } = useToastStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteActivity(activity.id);
      showToast('success', '체험이 삭제되었습니다');
      router.push('/');
    } catch (error) {
      showToast('error', '체험 삭제에 실패했습니다');
    }
  };

  const dropdownItems = [
    {
      type: DROPDOWN_ITEM_TYPES.LINK,
      label: POST_ACTION_LABELS.EDIT,
      href: `/activities/${activity.id}/edit`,
    },
    {
      type: DROPDOWN_ITEM_TYPES.BUTTON,
      label: POST_ACTION_LABELS.DELETE,
      onClick: handleDelete,
      isDanger: true,
    },
  ];

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
          <div className='cursor-pointer' onClick={() => setShowDropdown(true)}>
            <KebabIcon size={24} className='text-[#79747E]' />
          </div>

          {showDropdown && (
            <DropdownMenu
              isMobile
              title='게시물 관리'
              items={dropdownItems}
              onClose={() => setShowDropdown(false)}
              bottomButton={{
                type: DROPDOWN_ITEM_TYPES.BUTTON,
                label: POST_ACTION_LABELS.CANCEL,
                onClick: () => setShowDropdown(false),
              }}
            />
          )}
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
              <div
                className='absolute top-[2px] right-[2px] z-10 cursor-pointer'
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <KebabIcon size={24} className='text-[#79747E]' />
                {showDropdown && (
                  <div className='absolute top-full mt-[8px] right-0'>
                    <DropdownMenu
                      title='옵션'
                      items={dropdownItems}
                      onClose={() => setShowDropdown(false)}
                      bottomButton={{
                        type: DROPDOWN_ITEM_TYPES.BUTTON,
                        label: POST_ACTION_LABELS.CANCEL,
                        onClick: () => setShowDropdown(false),
                      }}
                    />
                  </div>
                )}
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
          rating={reviewStats.rating}
          reviewCount={reviewStats.count}
          reviews={reviews}
        />
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
