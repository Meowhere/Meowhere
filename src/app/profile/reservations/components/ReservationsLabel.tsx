'use client';

import { MY_RESERVATION_STATUS_MAP } from '@/src/constants/my-reservation-status';
import { MyReservationStatus } from '@/src/types/profile-reservation.types';

interface ReservationsLabelProps {
  status: MyReservationStatus; // 해당 status 기반으로 UI에 보여줄 라벨 텍스트와 스타일을 추출해 사용
}

export default function ReservationsLabel({ status }: ReservationsLabelProps) {
  const { label, bg, text } = MY_RESERVATION_STATUS_MAP[status];

  return (
    <span
      className={`inline-block w-[65px] h-[24px] px-[10px] py-[6px] rounded-[20px] text-[1.2rem] leading-[1.2rem] font-semibold ${bg} ${text} `}
    >
      {label}
    </span>
  );
}
