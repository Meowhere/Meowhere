'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useGnb } from '@/src/hooks/useGnb';
import { useUser } from '@/src/hooks/auth/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useFavoritesStore } from '@/src/store/favoritesStore';

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
import { useToastStore } from '@/src/store/toastStore';
import { fadeInUp, slideLeft, slideRight } from '@/src/lib/animation/variants';


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
  showLikeButton,
}: Props) {
  const { isDesktop } = useBreakpoint();
  const { data: user } = useUser();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { openScheduleModal } = useModal();

  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const isOwner = user?.id === activity.userId;

  const handleLikeClick = () => {
    toggleFavorite(activity);
  };

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
      !!showLikeButton && (
        <LikeIcon
          showOverlay
          isFilled={isFavorite(activity.id)}
          onClick={handleLikeClick}
          className='w-[32px] h-[32px] text-white cursor-pointer'
        />
      ),
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
    <motion.div variants={fadeInUp} initial='initial' animate='animate' className='mt-[8px]'>
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
    </motion.div>
  );

  if (isDesktop) {
    return (
      <>
        <div className='max-w-[1200px] mx-auto flex gap-[48px] px-4 mt-[64px] justify-center items-center'>
          <motion.div
            className='flex-[1.2]'
            variants={slideLeft}
            initial='initial'
            animate='animate'
          >
            <ExperienceImageViewer
              bannerImageUrl={activity.bannerImageUrl}
              subImages={activity.subImages}
            />
          </motion.div>
          <motion.div
            className='flex-1 relative'
            variants={slideRight}
            initial='initial'
            animate='animate'
          >
            <div className='flex flex-row gap-[8px] absolute top-[2px] right-[2px] z-10 cursor-pointer'>
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
          </motion.div>
        </div>

        <motion.div
          className='max-w-[1200px] mx-auto px-4 flex flex-col gap-[48px] mt-[80px]'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
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
        </motion.div>
      </>
    );
  }

  // 모바일 & 태블릿
  return (
    <motion.div
      className='w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px]'
      variants={fadeInUp}
      initial='initial'
      animate='animate'
    >
      <ExperienceImageViewer
        bannerImageUrl={activity.bannerImageUrl}
        subImages={activity.subImages}
      />
      <div className='flex flex-row mt-[8px] gap-[8px] justify-end'>
        <KakaoShareButton size={24} activity={activity} />
      </div>
      <ExperienceSummarySection
        category={activity.category}
        title={activity.title}
        rating={activity.rating?.toFixed(1) ?? '0.0'}
        reviewCount={activity.reviewCount}
        address={activity.address}
      />
      <Divider />
      <SectionTitle title='만나는 곳' subtitle={activity.address} />
      <ExperienceLocationMap address={activity.address} />
      <Divider />
      <SectionTitle title='체험 설명' />
      <ExperienceDescription description={activity.description} />
      <Divider />
      <SectionTitle title='후기' />
      {renderReviewSection}

      {user && user.id !== activity.userId && (
        <ReservationBox
          pricePerPerson={activity.price}
          onClick={() =>
            openScheduleModal({ price: activity.price, schedules, activityId: activity.id })
          }
        />
      )}
    </motion.div>
  );
}
