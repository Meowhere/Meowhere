'use client';

import { useModal } from '@/src/hooks/useModal';
import ReservationsLabel from './ReservationsLabel';
import BaseButton from '@/src/components/common/buttons/BaseButton';

interface ReservationsCardProps {
  imageUrl: string;
  label: string;
  title: string;
  date: string;
  time: string;
  headCount: number;
  price: number;
  showCancel?: boolean;
  showReview?: boolean;
  onClick?: () => void;
}

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
    <div className='flex flex-col gap-[1.8rem] bg-white px-[2rem] py-[2.4rem] border-b border-gray-200 last:border-none'>
      {/* 내용 */}
      <div className='flex gap-[1rem]'>
        <img
          src={imageUrl}
          alt='체험 활동 메인 사진'
          className='w-[8.6rem] h-[8.6rem] rounded-[0.8rem] object-cover'
        />
        <div className='flex flex-col justify-between gap-[0.6rem]'>
          <ReservationsLabel label={label} />
          <div className='flex flex-col gap-[0.4rem]  pl-[0.4rem]'>
            <p className='text-[1.4rem] leading-[1.4rem] font-semibold text-gray-800'>{title}</p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600'>{`${date} · ${time}`}</p>
            <p className='text-[1.3rem] leading-[1.3rem] font-regular text-gray-600'>{`${headCount}명, ₩${price.toLocaleString()}`}</p>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      {showCancel && (
        <BaseButton
          variant='soft'
          color='red'
          className='hover:brightness-[0.95]'
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
          className='hover:brightness-[0.95]'
          // 후기 작성 페이지로 이동 추가
          onClick={onClick}
        >
          후기 쓰기
        </BaseButton>
      )}
    </div>
  );
}
