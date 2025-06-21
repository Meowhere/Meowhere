'use client';

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGnb } from '@/src/hooks/useGnb';
import { useUser } from '@/src/hooks/auth/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import { useToastStore } from '@/src/store/toastStore';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

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
import KakaoShareButton from '@/src/components/common/buttons/KakaoShareButton';

import { DROPDOWN_ITEM_TYPES, POST_ACTION_LABELS } from '@/src/constants/dropdown';
import { deleteActivity } from '@/src/services/myActivityService';

import { Activity } from '@/src/types/activity.types';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import { Review } from '@/src/types/review.type';

interface Props {
  activity: Activity;
  schedules: ScheduleWithTimes[];
  reviews: Review[];
  reviewStats: {
    rating: number;
    count: number;
  };
  showLikeButton?: boolean;
}

export default function ExperienceResponsiveLayout({
  activity,
  schedules,
  reviews,
  showLikeButton = true,
}: Props) {
  const { data: user } = useUser();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { openScheduleModal } = useModal();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isDesktop } = useBreakpoint();

  const isOwner = user?.id === activity.userId;

  const handleDeleteActivity = useCallback(async () => {
    try {
      await deleteActivity(activity.id);
      showToast('success', '삭제되었습니다.');
      router.push('/');
    } catch {
      showToast('error', '삭제에 실패했습니다.');
    }
  }, [activity.id, router, showToast]);

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
        onClick: handleDeleteActivity,
      },
    ],
    [activity.id, router, handleDeleteActivity]
  );

  useGnb({
    title: activity.title,
    backAction: () => router.push('/profile'),
    rightButtons: [
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

  const renderReviewSection = (
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
          <p className='text-lg font-regular text-gray-400'>후기가 없다냥</p>
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
  );

  return (
    <>
      {isDesktop ? (
        <div>
          <div className='max-w-[1200px] mx-auto flex gap-[48px] px-4 mt-[64px] justify-center items-center'>
            <div className='flex-[1.2]'>
              <ExperienceImageViewer
                bannerImageUrl={activity.bannerImageUrl}
                subImages={activity.subImages}
              />
            </div>
            <div className='flex-1 relative'>
              <div className='flex flex-row gap-[8px] absolute items-center justify-center top-[2px] right-[2px] z-10 cursor-pointer'>
                {showLikeButton && (
                  <HeartButton
                    isLiked={isFavorite(activity.id)}
                    onToggle={() => toggleFavorite(activity)}
                    className='w-[32px] h-[32px] cursor-pointer text-gray-600'
                  />
                )}
                <KakaoShareButton size={24} activity={activity} />
                {isOwner && (
                  <ActivityDropdown
                    dropdownItems={dropdownItems}
                    bottomSheetTitle='게시물 관리'
                    trigger={<KebabIcon size={24} className='text-[#79747E]' />}
                  />
                )}
              </div>
              <ExperienceSummarySection
                category={activity.category}
                title={activity.title}
                rating={activity.rating?.toFixed(1) ?? '0.0'}
                reviewCount={activity.reviewCount}
                address={activity.address}
              />
              {user && user.id !== activity.userId && (
                <>
                  <Divider />
                  <ReservationBox
                    pricePerPerson={activity.price}
                    onClick={() =>
                      openScheduleModal({
                        price: activity.price,
                        schedules,
                        activityId: activity.id,
                      })
                    }
                  />
                </>
              )}
            </div>
          </div>

          <div className='max-w-[1200px] mx-auto px-4 flex flex-col gap-[48px] mt-[80px]'>
            <Divider />
            <div>
              <SectionTitle title='만나는 곳' subtitle={activity.address} />
              <ExperienceLocationMap address={activity.address} />
            </div>
            <div>
              <SectionTitle title='체험 설명' />
              <ExperienceDescription description={activity.description} />
            </div>
            <div>
              <SectionTitle title='후기' />
              {renderReviewSection}
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px] flex flex-col gap-[48px]'>
          <ExperienceImageViewer
            bannerImageUrl={activity.bannerImageUrl}
            subImages={activity.subImages}
          />

          <div className='flex flex-col gap-[24px]'>
            <ExperienceSummarySection
              category={activity.category}
              title={activity.title}
              rating={activity.rating?.toFixed(1) ?? '0.0'}
              reviewCount={activity.reviewCount}
              address={activity.address}
            />
            <div className='flex flex-row gap-[24px] items-center justify-center top-[2px] right-[2px] cursor-pointer'>
              <KakaoShareButton size={22} activity={activity} />
              {showLikeButton && (
                <HeartButton
                  isLiked={isFavorite(activity.id)}
                  onToggle={() => toggleFavorite(activity)}
                  className='w-[22px] h-[22px] cursor-pointer text-gray-600'
                />
              )}
            </div>
          </div>

          <Divider />

          <div className='flex flex-col gap-[24px]'>
            <SectionTitle title='만나는 곳' subtitle={activity.address} />
            <ExperienceLocationMap address={activity.address} />
          </div>

          <Divider />

          <div className='flex flex-col gap-[24px]'>
            <SectionTitle title='체험 설명' />
            <ExperienceDescription description={activity.description} />
          </div>

          <Divider />

          <div className='flex flex-col gap-[24px]'>
            <SectionTitle title='후기' />
            {renderReviewSection}
          </div>

          {user && user.id !== activity.userId && (
            <ReservationBox
              pricePerPerson={activity.price}
              onClick={() =>
                openScheduleModal({ price: activity.price, schedules, activityId: activity.id })
              }
            />
          )}
        </div>
      )}
    </>
  );
}
