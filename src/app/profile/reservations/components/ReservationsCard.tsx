'use client';

import { useToastStore } from '@/src/store/toastStore';
import { useModal } from '@/src/hooks/useModal';
import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import { useCancelReservation } from '@/src/hooks/useCancelReservation';
import { MyReservation } from '@/src/types/profile-reservation.types';

import Toast from '@/src/components/common/toast/Toast';
import ReservationsLabel from './ReservationsLabel';
import BaseButton from '@/src/components/common/buttons/BaseButton';

export default function ReservationsCard({
  reservation,
  showCancel = false,
  showReview = false,
  isLast = false,
}: ReservationsCardProps) {
  const { mutate: cancelReservation, isPending } = useCancelReservation();
  const { openCreateReviewModal, closeModal } = useModal();
  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const { showToast } = useToastStore();

  const handleCancelReservation = () => {
    // 실제 예약 취소 API 호출
    closeModal();
    openConfirmModal({
      message: '예약을 취소하시겠어요?',
      cancelText: '아니요',
      confirmText: '예약 취소',
      onConfirm: () => {
        cancelReservation(
          { reservationId: reservation.id },
          {
            onSuccess: () => {
              showToast('success', '예약이 성공적으로 취소되었습니다');
              closeModal();
            },
            onError: () => {
              showToast('error', '예약 취소에 실패하였습니다');
              closeModal();
            },
          }
        );
      },
    });
  };

  const openReviewModal = () => {
    openCreateReviewModal({
      reservationId: reservation.id,
      title: reservation.activity.title,
      schedule: {
        id: reservation.scheduleId,
        date: reservation.date,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
      },
      headCount: reservation.headCount,
      price: reservation.totalPrice,
    });
  };

  return (
    <div
      className={`flex flex-col gap-[18px] py-[24px] ${isLast ? '' : 'border-b border-gray-200 dark:border-gray-700'} lg:flex-row lg:justify-between lg:items-end`}
    >
      {/* 내용 */}
      <Toast />
      <ConfirmModal />
      <div className='flex gap-[10px] lg:gap-[14px]'>
        <img
          src={reservation.activity.bannerImageUrl}
          alt='체험 활동 메인 사진'
          className='w-[86px] h-[86px] rounded-[8px] object-cover lg:w-[98px] lg:h-[98px] lg:rounded-[10px]'
        />
        <div className='flex flex-col justify-between gap-[6px] lg:gap-[18px]'>
          <ReservationsLabel status={reservation.status} />
          <div className='flex flex-col gap-[4px] pl-[4px] lg:gap-[8px]'>
            <p className='text-[1.4rem] leading-[1.4rem] font-semibold text-gray-800 lg:text-[1.6rem] dark:text-gray-200'>
              {reservation.activity.title}
            </p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600 dark:text-gray-400 '>{`${reservation.date} · ${reservation.startTime} - ${reservation.endTime}`}</p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600 dark:text-gray-400 '>{`${reservation.headCount}명, ₩${reservation.totalPrice.toLocaleString()}`}</p>
          </div>
        </div>
      </div>
      {/* 버튼은 항상 세로로 아래 정렬 (모바일/태블릿 공통) */}
      <div className='flex flex-col gap-[10px] lg:items-end'>
        {showCancel && (
          <BaseButton
            variant='soft'
            color='red'
            className='w-full text-[1.4rem] font-semibold hover:brightness-[0.95] lg:w-[128px] h-[42px] rounded-[10px]'
            onClick={handleCancelReservation}
          >
            예약 취소
          </BaseButton>
        )}

        {showReview && (
          <BaseButton
            variant='soft'
            color='blue'
            className='w-full text-[1.4rem] font-semibold hover:brightness-[0.95] lg:w-[128px] h-[42px] rounded-[10px]'
            onClick={openReviewModal}
          >
            후기 쓰기
          </BaseButton>
        )}
      </div>
    </div>
  );
}

export interface ReservationsCardProps {
  reservation: MyReservation;
  showCancel?: boolean;
  showReview?: boolean;
  isLast?: boolean;
}
