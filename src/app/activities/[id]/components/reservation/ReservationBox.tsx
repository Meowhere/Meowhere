'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ReservationMobileFooter from './ReservationMobileFooter';
import { useModal } from '@/src/hooks/useModal';
import { dummySchedule } from '../../data/dummySchedule';

interface ReservationBoxProps {
  pricePerPerson: number;
}

export default function ReservationBox({ pricePerPerson }: ReservationBoxProps) {
  const { isMobile, hasMounted } = useBreakpoint();
  const { openScheduleModal } = useModal();

  // hasMounted가 false면 SSR 환경이므로 렌더하지 않음
  if (typeof window === 'undefined' || !hasMounted) return null;

  const handleOpenDateModal = () => {
    openScheduleModal({
      price: dummySchedule.price,
      schedules: dummySchedule.schedules,
    });
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
