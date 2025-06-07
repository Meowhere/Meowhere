'use client';

import { reservationStatusMap } from '@/src/constants/reservations-status';

type ReservationStatus = keyof typeof reservationStatusMap; // api에서 전송하는 상태(key)만 추출한 타입 정의

interface ReservationsLabelProps {
  status: ReservationStatus; // 해당 status 기반으로 UI에 보여줄 라벨 텍스트와 스타일을 추출해 사용
}

export default function ReservationsLabel({ status }: ReservationsLabelProps) {
  const { label, bg, text } = reservationStatusMap[status];

  return (
    <span
      className={`inline-block w-[65px] h-[24px] px-[10px] py-[6px] rounded-[20px] text-[1.2rem] leading-[1.2rem] font-semibold ${bg} ${text}`}
    >
      {label}
    </span>
  );
}
