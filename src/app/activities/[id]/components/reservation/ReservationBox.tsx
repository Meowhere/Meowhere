'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ReservationMobileFooter from './ReservationMobileFooter';
import { useModal } from '@/src/hooks/useModal';
import { dummySchedule } from '../../data/dummySchedule';

interface ReservationBoxProps {
  pricePerPerson: number;
}

export default function ReservationBox({ pricePerPerson }: ReservationBoxProps) {
  const { isMobile, isTablet, isDesktop, hasMounted } = useBreakpoint();
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
      {(isMobile || isTablet) && (
        <ReservationMobileFooter
          pricePerPerson={pricePerPerson}
          onClickDateSelect={handleOpenDateModal}
        />
      )}

      {isDesktop && (
        <div className='w-full px-[8px] pt-[8px]'>
          <div className='flex justify-between items-center'>
            <p className='text-[18px] font-bold text-gray-900'>
              ₩{pricePerPerson.toLocaleString()}{' '}
              <span className='font-normal text-[16px]'>/ 인</span>
            </p>
            <button
              onClick={handleOpenDateModal}
              className='bg-primary-300 text-white px-[20px] py-[10px] rounded-full text-md font-semibold'
            >
              일정 선택
            </button>
          </div>
        </div>
      )}
    </>
  );
}
