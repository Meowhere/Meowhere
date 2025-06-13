'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ReservationMobileFooter from './ReservationMobileFooter';
import { useModal } from '@/src/hooks/useModal';
import { dummySchedule } from '../../data/dummySchedule';

interface ReservationBoxProps {
  pricePerPerson: number;
}

export default function ReservationBox({ pricePerPerson }: ReservationBoxProps) {
  const { isMobile, isTablet, hasMounted } = useBreakpoint();
  const { openScheduleModal } = useModal();

  if (!hasMounted) return null;

  const handleOpenDateModal = () => {
    openScheduleModal({
      price: dummySchedule.price,
      schedules: dummySchedule.schedules,
    });
  };

  // 모바일 또는 태블릿일 때만 하단 예약 UI 표시
  if (isMobile || isTablet) {
    return (
      <ReservationMobileFooter
        pricePerPerson={pricePerPerson}
        onClickDateSelect={handleOpenDateModal}
      />
    );
  }

  return null;
}
