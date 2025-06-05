'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ReservationMobileFooter from './ReservationMobileFooter';
import { useModal } from '@/src/hooks/useModal';
import DateSelectModal from './DateSelectModal';

interface ReservationState {
  date: Date | undefined;
  time: string;
  count: number;
}

interface ReservationBoxProps {
  state: ReservationState;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onCountChange: (count: number) => void;
  onReserve: () => void;
  availableTimes: string[];
  loading?: boolean;
  pricePerPerson: number;
}

export default function ReservationBox({
  state,
  onDateChange,
  onTimeChange,
  onCountChange,
  onReserve,
  availableTimes,
  loading = false,
  pricePerPerson,
}: ReservationBoxProps) {
  const { isMobile, hasMounted } = useBreakpoint();
  // const { openModal } = useModal();

  // hasMounted가 false면 SSR 환경이므로 렌더하지 않음
  if (typeof window === 'undefined' || !hasMounted) return null;

  const handleOpenDateModal = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const overmorrow = new Date();
    overmorrow.setDate(today.getDate() + 2);

    // openModal({
    //   header: '일정을 선택하세요',
    //   children: (
    //     <DateSelectModal
    //       schedule={[
    //         {
    //           date: tomorrow,
    //           label: '내일',
    //           times: [
    //             { startTime: '오후 2:00', endTime: '오후 3:30', price: 23000 },
    //             { startTime: '오후 4:00', endTime: '오후 5:30', price: 23000 },
    //           ],
    //         },
    //         {
    //           date: overmorrow,
    //           label: '모레',
    //           times: [{ startTime: '오전 11:00', endTime: '오후 12:30', price: 25000 }],
    //         },
    //       ]}
    //       onSelect={(date, time) => {
    //         onDateChange(date);
    //         onTimeChange(`${time.startTime} ~ ${time.endTime}`);
    //       }}
    //     />
    //   ),
    // });
  };

  // 모바일일 때만 하단 예약 UI 표시
  if (isMobile) {
    return (
      <ReservationMobileFooter
        pricePerPerson={pricePerPerson}
        onClickDateSelect={handleOpenDateModal}
      />
    );
  }

  return null;
}
