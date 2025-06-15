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

      {isDesktop && (
        <div className='w-full px-[8px] pt-[8px]'>
          <div className='flex justify-between items-center'>
            <p className='text-[18px] font-bold text-gray-900'>
              {typeof pricePerPerson === 'number'
                ? `₩${pricePerPerson.toLocaleString()}`
                : '가격 정보 없음'}
              <span className='font-normal text-[16px]'>/ 인</span>
            </p>

            <button
              onClick={handleOpenDateModal}
              className='bg-orange-500 text-white px-[20px] py-[10px] rounded-full text-[14px] font-semibold hover:bg-orange-600 transition'
            >
              일정 선택
            </button>
          </div>
        </div>
      )}
    </>
  );
}
