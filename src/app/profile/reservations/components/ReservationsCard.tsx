'use client';

import { useModal } from '@/src/hooks/useModal';
import ReservationsLabel from './ReservationsLabel';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { ReservationsCardProps } from '../../../../types/reservations-card.types';

export default function ReservationsCard({
  imageUrl,
  label,
  title,
  date,
  time,
  headCount,
  price,
  showCancel = false,
  showReview = false,
  onClick,
}: ReservationsCardProps) {
  const { confirm } = useModal();

  const cancelReservation = () => {
    // 실제 예약 취소 API 호출
    console.log('예약 취소 로직 실행');
  };

  return (
    <div className='flex flex-col gap-[18px] bg-white px-[20px] py-[24px] border-b border-gray-200 last:border-none lg:flex-row lg:justify-between lg:items-end'>
      {/* 내용 */}
      <div className='flex gap-[10px] lg:gap-[14px]'>
        <img
          src={imageUrl}
          alt='체험 활동 메인 사진'
          className='w-[86px] h-[86px] rounded-[8px] object-cover lg:w-[98px] lg:h-[98px] lg:rounded-[10px]'
        />
        <div className='flex flex-col justify-between gap-[6px] lg:gap-[18px]'>
          <ReservationsLabel label={label} />
          <div className='flex flex-col gap-[4px] pl-[4px] lg:gap-[8px]'>
            <p className='text-[1.4rem] leading-[1.4rem] font-semibold text-gray-800 lg:text-[1.6rem]'>
              {title}
            </p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600'>{`${date} · ${time}`}</p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600'>{`${headCount}명, ₩${price.toLocaleString()}`}</p>
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
            onClick={() => {
              confirm({
                message: '예약을 취소하시겠어요?',
                confirmText: '예약 취소',
                cancelText: '아니요',
                onConfirm: () => {
                  // 실제 예약 취소 로직 호출
                  cancelReservation();
                },
              });
            }}
          >
            예약 취소
          </BaseButton>
        )}

        {showReview && (
          <BaseButton
            variant='soft'
            color='blue'
            className='w-full text-[1.4rem] font-semibold hover:brightness-[0.95] lg:w-[128px] h-[42px] rounded-[10px]'
            onClick={onClick}
          >
            후기 쓰기
          </BaseButton>
        )}
      </div>
    </div>
  );
}
