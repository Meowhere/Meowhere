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
    <div className='flex flex-col gap-[1.8rem] bg-white px-[2rem] py-[2.4rem] border-b border-gray-200 last:border-none lg:flex-row lg:justify-between lg:items-end'>
      {/* 내용 */}
      <div className='flex gap-[1rem] lg:gap-[1.4rem]'>
        <img
          src={imageUrl}
          alt='체험 활동 메인 사진'
          className='w-[8.6rem] h-[8.6rem] rounded-[0.8rem] object-cover lg:w-[9.8rem] lg:h-[9.8rem] lg:rounded-[1rem]'
        />
        <div className='flex flex-col justify-between gap-[0.6rem] lg:gap-[1.8rem]'>
          <ReservationsLabel label={label} />
          <div className='flex flex-col gap-[0.4rem] pl-[0.4rem] lg:gap-[0.8rem] '>
            <p className='text-[1.4rem] leading-[1.4rem] font-semibold text-gray-800 lg:text-[1.6rem]'>
              {title}
            </p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600'>{`${date} · ${time}`}</p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600'>{`${headCount}명, ₩${price.toLocaleString()}`}</p>
          </div>
        </div>
      </div>

      {/* 버튼은 항상 세로로 아래 정렬 (모바일/태블릿 공통) */}
      <div className='flex flex-col gap-[1rem] lg:items-end'>
        {showCancel && (
          <BaseButton
            variant='soft'
            color='red'
            className='w-full text-[1.4rem] font-semibold hover:brightness-[0.95] lg:w-[12.8rem] h-[4.2rem] rounded-[1rem]'
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
            className='w-full text-[1.4rem] font-semibold hover:brightness-[0.95] lg:w-[12.8rem] h-[4.2rem] rounded-[1rem]'
            onClick={onClick}
          >
            후기 쓰기
          </BaseButton>
        )}
      </div>
    </div>
  );
}
