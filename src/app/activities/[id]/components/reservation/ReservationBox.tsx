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

  return (
    <>
      {isMobile && (
        <ReservationMobileFooter
          pricePerPerson={pricePerPerson}
          onClickDateSelect={handleOpenDateModal}
        />
      )}

      {isTablet && (
        <ReservationMobileFooter
          pricePerPerson={pricePerPerson}
          onClickDateSelect={handleOpenDateModal}
        />
      )}
    </>
  );
}
