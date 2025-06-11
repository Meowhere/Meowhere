import BaseButton from '@/src/components/common/buttons/BaseButton';

const LABEL_STYLE_MAP = {
  '예약 완료': { bg: 'bg-green-100', text: 'text-green-200' },
  '예약 취소': { bg: 'bg-gray-100', text: 'text-gray-600' },
  '예약 거절': { bg: 'bg-red-100', text: 'text-red-300' },
  '예약 승인': { bg: 'bg-blue-100', text: 'text-blue-200' },
  '체험 완료': { bg: 'bg-purple-100', text: 'text-purple-200' },
};

export default function MyReservationsModalCard({
  reservationInfo,
  isLast,
  onDecline,
  onConfirm,
}: MyReservationsModalCardProps) {
  const statusText =
    reservationInfo.status === 'pending'
      ? '예약 완료'
      : reservationInfo.status === 'confirmed'
        ? '예약 승인'
        : '예약 거절';
  const style = LABEL_STYLE_MAP[statusText];

  return (
    <article>
      <section
        className={`inline-block w-[65px] h-[24px] px-[10px] py-[6px] rounded-[20px] text-[1.2rem] leading-[1.2rem] font-semibold ${style.bg} ${style.text}`}
      >
        {statusText}
      </section>
      <section className='flex items-center justify-between mt-[12px]'>
        <div className='text-[14px] font-semibold text-gray-800'>{reservationInfo.nickname}</div>
        <div className='text-[13px] text-gray-600'>{reservationInfo.headCount}명</div>
      </section>
      <section className='flex gap-[8px] mt-[18px]'>
        <BaseButton variant='soft' color='red' onClick={onDecline}>
          거절
        </BaseButton>
        <BaseButton variant='soft' color='blue' onClick={onConfirm}>
          예약 승인
        </BaseButton>
      </section>
      {!isLast && <div className='w-full h-[1px] bg-gray-200 mt-[20px]'></div>}
    </article>
  );
}

interface MyReservationsModalCardProps {
  reservationInfo: Reservation;
  isLast: boolean;
  onDecline: () => void;
  onConfirm: () => void;
}

interface Reservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
